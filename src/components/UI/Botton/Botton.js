import React from 'react'
import classes from './Botton.css'

const botton = (props) => (
    <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick = {props.clicked}>
        {props.children}
    </button>

)
export default botton;
