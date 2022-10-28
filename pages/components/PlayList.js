import React from 'react'
import { styled } from '@mui/material/styles';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

const HeaderText = styled(Typography)({
    fontSize: '3rem',
});

export default function PlayList(props) {

    const { playList, handleCurrentSong, clickedItem, setClickedItem } = props

    const HandleClick = (index) => {
        setClickedItem(index)
        handleCurrentSong(index)
    }


    return (
        <div>
            <HeaderText>Play List</HeaderText>
            <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {playList.map((song, index) =>
                    <ListItem
                        style={{ backgroundColor: clickedItem === index ? '#D3D3D3' : null }}
                        key={song.title}
                        onClick={() => HandleClick(index)}
                        secondaryAction={
                            <button >
                                <PlayCircleFilledWhiteIcon />
                            </button>
                        }
                    >
                        <ListItemText><b>{song.title}</b> by {song.artist} </ListItemText>
                    </ListItem>

                )}
            </List>
        </div>
    )
}
