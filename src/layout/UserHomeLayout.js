import React, { Component, useState, useEffect } from 'react';
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles
} from '@material-ui/core';
import { Menu, ChevronLeft, Home, Inbox, Mail } from '@material-ui/icons';
import Link from '@material-ui/core/Link';
import AccountButton from '../components/common/AccountButton'
import SignInPopOver from "../components/member/SignInPopOver"
import UserInfoPopOver from "../components/member/UserInfoPopOver"
import SearchSpace from '../components/common/SearchSpace';

const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
    document.getElementsByTagName('head')[0].appendChild(meta);

var drawerWidth 
if(window.outerWidth>500)
    drawerWidth = '15vw'
else
    drawerWidth = '80vw'

const useStyle = makeStyles(theme=>({
    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.1rem',
          backgroundColor: '#2a2a40',
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#eabc28',
          outline: '1px solid slategrey'
        },
        '*::-webkit-scrollbar:horizontal': {
            display:'none'
          },
        background:'#2a2a40',
      },
    root:{
        width:'100%',
        height:'100%',
    },
    title : {
        fontSize :"1.5rem",
        fontStyle : 'solid',
        color : '#eabc28',
        flexGrow: 1,
    },
    listItemText :{
        fontSize : "2rem",
        fontStyle : 'solid',
        color : 'black'
    },
    toolBar:{
        position:"fixed",
        width:"100%",
        height: '7vh',
    }
}))


function UserHomeLayout(props){
    
    const { children } = props;
    const [open, setState] = useState(false);
    const classes = useStyle();
    const authInfo = localStorage.getItem('memberInfo')
    return(
         <div className={classes.root}>
            <AppBar
                position="fixed"
                style={{
                    width:"100%",
                    height: '7vh',
                    transition: 'all 0.2s',
                    background : '#2a2a40',
                }}
            >
                <Toolbar className={classes.toolBar} alignItems="flex-end" position="fixed">
                    <IconButton edge="start" color="inherit" aria-label="Menu" onClick={() => setState(!open)}>
                        <Menu />
                    </IconButton>
                    <div className={classes.title}>
                         첫 줄
                    </div>
                    <div>
                        <SearchSpace></SearchSpace>
                    </div>
                    <div alignSelf="flex-end" style={{marginRight:'2%'}}>
                        { authInfo === null ? 
                        (<AccountButton dialog={SignInPopOver}/>):(<AccountButton dialog={UserInfoPopOver}/>)}
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer open={open} style={{ width: drawerWidth }}>
                <div style={{ width: drawerWidth }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={() => setState(!open)}>
                            <ChevronLeft />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Link  href='/home'>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>Home</ListItemText>
                        </ListItem>
                        </Link>
                        <Link  href='/post'>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>Post</ListItemText>
                        </ListItem>
                        </Link>
                        <Link  href='/about'>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>About</ListItemText>
                        </ListItem>
                        </Link>
                    </List>
                </div>
            </Drawer>
            <div style={{width: '100vw', minHeight:'93vh' ,background:"#2a2a40", marginTop:'7vh', position:'sticky'}}>
                        {children}
            </div>
    </div>
    );
}

export default UserHomeLayout;