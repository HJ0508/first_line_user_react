import React, {useState} from "react";
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
import { IconButton, makeStyles } from '@material-ui/core'
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';

export const useStyles = makeStyles((theme) => ({
  editorContainer : {
    padding : '1em',
    margin: '1em'
  },
  editors : {
    textAlign: 'center',
    border: 'none',
    padding: '2em',
    borderRadius: '0 0 0.3em 0.3em',
    marginBottom: '1em',
    fontFamily: "Open Sans",
    fontSize: '100%',
    background: 'linear-gradient(to bottom, #fdfbfb 0%, #f6f7fb 100%)'
  },
  ActiveButton : {
    border: '#000000'
  },
  select : {
    padding: '0.5em',
    border: 'none',
    margin: '0.1em',
    borderRadius: '6px',
    fontFamily: "Open Sans",
    fontSize: '13px',
    height: '2.25em'
  },
  styleButtonBold: {
	  fontWeight: 'bold'
  },
  styleButtonItalic: {
	  fontStyle: 'italic',
	  fontFamily: 'serif', 
  },
  styleButtonUnderline:{
    textDecoration: 'underline'
  },
  toolbar: {
    textAlign: 'center',
    margin: '0.5em',
    padding: '0.5em'
  },
  styleButton: {
    padding: '0.5em',
    border: 'none',
    margin: '0.35em',
    width: '2.75em',
    fontFamily: "Open Sans",
    fontSize: '13px',
    height: '2.25em',
    borderRadius: '4px',
    background: 'linear-gradient(to bottom, #fdfbfb 0%, #ebedee 100%)'
  },
  iconButton: {
    color:'#ffeb3b'
  }
}))


export default function PageContainer(props){
  const classes = useStyles();
  const [editorState, setState] = useState(EditorState.createEmpty())
	const [selection, setSelection] = useState(editorState.getSelection())
	const [blockType, setBlockType] = useState(editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
    .getType());
    
  const toggleBlockType = blockType => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const onChange = editorState => {
    setState(editorState);
  };

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      editorState,
      command
    );
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const onUnderlineClick = () => {
    onChange(
      RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
    );
  };

  const onBoldClick = event => {
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onItalicClick = () => {
    onChange(
      RichUtils.toggleInlineStyle(editorState, "ITALIC")
    );
  };
  const onUndoClick = () => {
    onChange(EditorState.undo(editorState))
  };

  const onRedoClick = () => {
    onChange(EditorState.redo(editorState))
  };

  const onToggleSize = event => {
		let value = event.target.value;
		this.props.onToggle(value);
	};

  const onToggleFont = e => {
		e.preventDefault();
        props.onToggle(props.style);
        if(className=={}) setClassName(className + "RichEditor-activeButton");
        else setClassName("RichEditor-styleButton");
	};

  return (
    <div className="editorContainer">
      {/* editor */}
      <div className={classes.editors}>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
        />
      </div>
      {/* toolbar */}
      <div className={classes.toolbar}> 
        <IconButton><FormatUnderlinedIcon className={classes.iconButton} fontSize="small" onClick={onUnderlineClick} /></IconButton>
        <IconButton><FormatBoldIcon className={classes.iconButton} fontSize="small" onClick={onBoldClick}/></IconButton>
        <IconButton><FormatItalicIcon className={classes.iconButton} fontSize="small" onClick={onItalicClick}/></IconButton>
        <IconButton ><UndoIcon className={classes.iconButton} fontSize="small" onClick = {onUndoClick}></UndoIcon></IconButton>
        <IconButton><RedoIcon className={classes.iconButton} fontSize="small" onClick = {onRedoClick}></RedoIcon></IconButton>
      </div>
    </div>
  );
}


