import { useEffect, useState } from 'react'
import Player from './components/Player'
import PlayList from './components/PlayList'

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { PlayerContext } from './context/PlayerContext';

const songs = require('./songlist.json')

// songs contains an array of objects, each with a title, artist, duration in seconds. Refer to README for more details.

/*
{
    "title": "#40",
    "artist": "Dave Matthews",
    "duration": 35
}, 
*/

export default function Home() {

  const [songList, setSongList] = useState(songs.songs)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1)
  const [isShuffle, setIsShuffle] = useState(false)
  const [clickedItem, setClickedItem] = useState('')

  useEffect(() => {
    setNextSongIndex((currentSongIndex + 1 > songList?.length - 1) ? 0 : currentSongIndex + 1)
    setClickedItem(currentSongIndex)
  }, [currentSongIndex])

  const handleCurrentSong = (selectedSongIndex) => {
    setCurrentSongIndex(selectedSongIndex)
  }

  return (
    <div >
      <>
        <PlayerContext.Provider value={{ songList, setSongList, isShuffle, setIsShuffle}}>
          <Container fixed>
            <Grid container
              spacing={3}
            >
              <Grid
                item xs={12}
                sm={6}
                md={5}
                lg={5}
              >
                <Player
                  playList={songList}
                  currentSongIndex={currentSongIndex}
                  nextSongIndex={nextSongIndex}
                  setCurrentSongIndex={setCurrentSongIndex}
                  setIsShuffle={setIsShuffle}
                  isShuffle={setIsShuffle}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={7} lg={7}>
                <Grid container>
                  <Grid item xs>
                    <PlayList
                      playList={songList}
                      handleCurrentSong={handleCurrentSong}
                      currentSongIndex={currentSongIndex}
                      clickedItem={clickedItem}
                      setClickedItem={setClickedItem}
                    />
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Container>
        </PlayerContext.Provider>
      </>

    </div>
  )
}
