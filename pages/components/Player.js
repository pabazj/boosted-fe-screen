import React, { useState, useEffect, useContext } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

import PlayerControl from './PlayerControl';
import { PlayerContext } from '../context/PlayerContext'

const MusicPlayer = styled(Card)({
    position: "sticky",
    top: "3rem"
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const PlayerWrapperDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px',
    paddingBottom: '20px'
}));

export default function Player(props) {
    const theme = useTheme();
    const { setSongList, setIsShuffle, isShuffle} = useContext(PlayerContext)
    const { playList, currentSongIndex, nextSongIndex, setCurrentSongIndex } = props;

    const [isPlaying, setIsPlaying] = useState(false)
    const [position, setPosition] = useState(0);
    const [intervalHandle, setIntervalHandle] = useState(0)
    const [isRepeat, setIsRepeat] = useState(false)

    useEffect(() => {
        if (nextSongIndex) {
            resetPlayer()
        }
    }, [nextSongIndex])

    // Simulate the song playing part.
    // Seting a timer that will call simulateStepSong() per second and that will move the slider and song time on the player.
    // For a real player that will stream data from backend this function should be changed.
    useEffect(() => {
        if (isPlaying) {
            let handle = setInterval(simulateStepSong, 1000)
            setIntervalHandle(handle)
        }
        else {
            clearInterval(intervalHandle)
        }

    }, [isPlaying])

    // Take a decision when song is over.
    useEffect(() => {
        if (playList[currentSongIndex].duration <= position) {

            if (isRepeat) {
                setPosition(0)
            }
            else {
                playNextSong()
            }

        }
    }, [position])

    // Advancing to next song.
    const playNextSong = () => {
        setCurrentSongIndex(() => {
            let temp = currentSongIndex;
            temp++;

            if (temp > playList.length - 1) {
                temp = 0;
            }

            return temp;
        })
    }

    // Moving back to previous song.
    const playPrevSong = () => {
        setCurrentSongIndex(() => {
            let temp = currentSongIndex;
            temp--;

            if (temp < 0) {
                temp = playList.length - 1;
            }

            return temp;
        });
    }

    // Return to the start of the current song.
    const startCurrentSong = () => {
        resetPlayer()
    }

    // Taking a desision based on user click previous button onece and twice.s
    const togglePlaySong = (next = true, event) => {
        if (next) {
            playNextSong()
        } else {
            switch (event.detail) {
                case 1: {
                    startCurrentSong()
                    break;
                }
                case 2: {
                    playPrevSong()
                    break;
                }
                default: {
                    break;
                }
            }

        }
    }

    // Logic when user clicks on the slider.
    const handleDuration = (value) => {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    // Shuffle the play list.
    const shufflePlayList = () => {
        setIsShuffle(!isShuffle)
        let newPlayList = playList.sort((a, b) => 0.5 - Math.random())
        setSongList(newPlayList)
    }

    const simulateStepSong = () => {
        setPosition(position => position + 1)
    }

    const handlePlay = () => {
        setIsPlaying(!isPlaying)
    }

    const resetPlayer = () => {
        setPosition(0)
    }

    const handleRepeat = () => {
        setIsRepeat(!isRepeat)
    }

    return (

        <MusicPlayer elevation={15}>

            <CardContent>
                <Typography
                    variant="h4"
                    color="textSecondary"
                    gutterBottom
                >
                    {playList[currentSongIndex].title}
                </Typography>
                <Typography
                    variant="h6"
                    component="h3">
                    {playList[currentSongIndex].artist}
                </Typography>

                <div>
                    <PlayerWrapperDiv>
                        <PlayerControl
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            togglePlaySong={togglePlaySong}
                            handlePlay={handlePlay}
                            handleRepeat={handleRepeat}
                            isRepeat={isRepeat}
                            isShuffle={isShuffle}
                            shufflePlayList={shufflePlayList}
                        />
                    </PlayerWrapperDiv>
                    <div>
                        <Slider
                            aria-label="time-indicator"
                            size="small"
                            value={position}
                            min={0}
                            step={1}
                            max={playList[currentSongIndex].duration}
                            onChange={(_, value) => setPosition(value)}
                            sx={{
                                color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                                height: 4,
                                '& .MuiSlider-thumb': {
                                    width: 8,
                                    height: 8,
                                    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                    '&:before': {
                                        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                    },
                                    '&:hover, &.Mui-focusVisible': {
                                        boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                                            ? 'rgb(255 255 255 / 16%)'
                                            : 'rgb(0 0 0 / 16%)'
                                            }`,
                                    },
                                    '&.Mui-active': {
                                        width: 20,
                                        height: 20,
                                    },
                                },
                                '& .MuiSlider-rail': {
                                    opacity: 0.28,
                                },
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mt: -2,
                            }}
                        >
                            <TinyText>{handleDuration(position)}</TinyText>
                            <TinyText>-{handleDuration((playList[currentSongIndex].duration) - position)}</TinyText>
                        </Box>
                    </div>
                </div>
            </CardContent>

            <CardActions>
            </CardActions>

        </MusicPlayer>
    )
}

