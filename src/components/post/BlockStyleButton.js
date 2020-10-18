import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
// const useStyles = makeStyles({
//     button:{

//     }
//   });

export default function BlockStyleButton(props) {
    // const classes = useStyles()
    const onToggle = e => {
		e.preventDefault();
        props.onToggle(props.style);
        if(className=="RichEditor-styleButton") setClassName(className + " RichEditor-activeButton");
        else setClassName("RichEditor-styleButton");
	};
    
    const [className, setClassName] = useState("RichEditor-styleButton");
    
    return (
        <span className={className} onClick={onToggle} >
            {props.label}
        </span>
    );
    
}
