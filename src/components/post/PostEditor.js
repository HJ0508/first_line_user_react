import React, {useState, useEffect, Component, useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import TextEditor from './TextEditor'

const useStyles = makeStyles({
    root: {
        width:'100%',
        padding:'0%'
      },
      gridContainer:{
          marginTop : "2%",
      },
      editor:{
          color : 'black',
          background : 'white',
          width : '50%',
          height : '30%',
          borderRadius: '6px'
      } 
      ,keyword:{
          color : '#ffeb3b',
          marginBottom:'2%',
          fontSize: 20
      },textEditor:{
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
                <Grid item xs = {12} className={classes.keyword}> <label>Keyword: 첫줄(테스트)</label></Grid>
                <Grid item xs ={12}  direction="column">
                    <TextField 
                    id="standard-textarea"
                    placeholder="제목을 입력해주세요"
                    multiline
                    className={classes.editor}
                    inputRef={title}
                    />
                </Grid>
                <Grid direction="row">
                    <Grid><TextEditor className={classes.textEditor} inputRef={text}></TextEditor></Grid>
                    <Grid>
                        <Button
                            className={classes.button}
                            type="submit"
                            onClick={addPost}
                        >발행</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

