import React, {useState} from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import BlockStyleToolbar, {
  getBlockStyle
} from "./BlockStyleToolbar";
import "./TextEditor.css";



export default function PageContainer(props){
  const [editorState, setState] = useState(EditorState.createEmpty())


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



  return (
    <div className="editorContainer">
      <div className="toolbar">
        <BlockStyleToolbar editorState={editorState} onToggle={toggleBlockType}/>
        <button className="styleButton" onClick={onUnderlineClick}>
          U
        </button>
        <button className="styleButton" onClick={onBoldClick}>
          <b>B</b>
        </button>
        <button className="styleButton" onClick={onItalicClick}>
          <em>I</em>
        </button>
      </div>

      <div className="editors">
        <Editor
          blockStyleFn={getBlockStyle}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
        />
      </div>
    </div>
  );
}


