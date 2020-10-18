import React, {useState, useRef, useContext} from 'react';
import { colors, IconButton, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import PostStore from '../../stores/PostStore'


const useStyle = makeStyles((theme) => ({
    root:{
        display: 'flex'
    },
    input:{
        color:'#ffeb3b'
    },
    searchIcon:{
        color:'#ffeb3b'
    },
    select:{
        color:'#ffeb3b'
    }
}))
export default function SearchSpace(props){
    // for css
    const classes = useStyle();
    const inputTheme = createMuiTheme({
        palette: {
            primary: {
            main: '#ffeb3b'
            }
        }
    })
    const category = useRef();
    const input = useRef();
    const [open, setOpen] = React.useState(false);
    const postStore = useContext(PostStore.context);
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const searchButtonClick = () => {
        postStore.search(category.current.value, input.current.value)
    }
    return (
        <div class="input-holder">
            <Select className={classes.select}
                defaultValue={1}
                onClose={handleClose}
                onOpen={handleOpen}
                inputRef={category}
            >
                <MenuItem value={1}>contents</MenuItem>
                <MenuItem value={2}>keyword</MenuItem>
                <MenuItem value={3}>writer</MenuItem>
                <MenuItem value={4}>tag</MenuItem>
            </Select>
            <ThemeProvider theme={inputTheme}>
                <Input className={classes.input} inputRef={input} placeholder="Search"  inputProps={{ 'aria-label': 'description'}}  />
            </ThemeProvider>
            <IconButton className={classes.searchIcon}> 
                <SearchIcon className={classes.searchIcon} onclick={searchButtonClick} fontsize="small"></SearchIcon>
            </IconButton>
            <div></div>
        </div>
    );
}