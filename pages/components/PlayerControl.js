import React from 'react'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import RepeatOnOutlinedIcon from '@mui/icons-material/RepeatOnOutlined';
import ShuffleOnOutlinedIcon from '@mui/icons-material/ShuffleOnOutlined';
import Button from '@mui/material/Button';

export default function PlayerControl(props) {

    const { togglePlaySong, isPlaying, handlePlay, handleRepeat, isRepeat, isShuffle, shufflePlayList } = props;

    return (
        <div>
            <div>
                <Button color='inherit' onClick={() => handleRepeat()}>
                    {isRepeat ? <RepeatOnOutlinedIcon /> : <RepeatOutlinedIcon />}
                </Button>
                <Button color='inherit' onClick={(event) => togglePlaySong(false, event)}>
                    <FastRewindIcon />
                </Button>
                <Button color='inherit' onClick={() => handlePlay()}>
                    {isPlaying ? <PauseCircleIcon /> : <PlayCircleFilledWhiteIcon />}
                </Button>
                <Button color='inherit' onClick={() => togglePlaySong()}>
                    <FastForwardIcon />
                </Button>
                <Button color='inherit' onClick={() => shufflePlayList()}>
                    {isShuffle ? <ShuffleOnOutlinedIcon /> : <ShuffleOutlinedIcon />}
                </Button>
            </div>
        </div>
    )
}
