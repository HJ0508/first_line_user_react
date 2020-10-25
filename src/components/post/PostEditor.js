import React, {useState, useEffect, Component, useRef, useContext} from 'react'
import { IconButton, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import TextEditor from './TextEditor'
import { CenterFocusStrong } from '@material-ui/icons';
import TelegramIcon from '@material-ui/icons/Telegram';
import KeywordStore from '../../stores/KeywordStore';

const useStyles = makeStyles({
    root: {
        width:'100%',
        padding:'0%'
      },
      gridContainer:{
          marginTop : "2%",
      },
      title:{
          color : 'black',
          background : 'white',
          width : '100%',
          height : '30%',
          borderRadius: '0.3em 0.3em 0 0',
          textAlign: 'center',
      } 
      ,keyword:{
          color : '#ffeb3b',
          marginBottom:'2%',
          fontSize: 20
      },textEditor:{
          margin: '0%',
          width: '40%'
      },button:{
          color: '#ffeb3b',
          borderRadius: '6px'
      }
    }
  );
export default function PostEditor(){
    const classes = useStyles();
    const title = useRef();
    const text = useRef();
    const [keyword, setKeyword] = useState({ keywords: [] });
    const keywordStore = useContext(KeywordStore.context)
    useEffect(() => {
        async function fetchData() {
            const result = await keywordStore.readTodayKeyword()
            if (result != null)
                setKeyword(result)
        }
        fetchData()
        }
    ,[]);

    const addPost = () => {
        if (postStore.addPost(title.current.value, text.current.value)){
            alert("작품이 게시되었습니다");
            {history.push("/post");}
        } else {
            alert("작품 게시에 실패하였습니다");
            handleClose();
        }
    }
    return(
        <div className={classes.root}>
            <Grid Container spacing={5} className={classes.gridContainer} direction="column" align="center">
            <Grid item xs = {12} className={classes.keyword}> <label>Keyword:{keyword.keyword}</label></Grid>
                <Grid item xs ={12}  direction="column">
                    <TextField 
                    id="standard-textarea"
                    placeholder="제목을 입력해주세요"
                    multiline
                    className={classes.title}
                    inputRef={title}
                    inputProps={{
                        style: { textAlign: "center" }
                      }}
                    />
                </Grid>
                <Grid direction="row">
                    <Grid><TextEditor className={classes.textEditor} inputRef={text}></TextEditor></Grid>
                    <Grid>
                        <IconButton>
                            <TelegramIcon 
                                className={classes.button}
                                type="submit"
                                onClick={addPost}
                                fontSize="large"/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

