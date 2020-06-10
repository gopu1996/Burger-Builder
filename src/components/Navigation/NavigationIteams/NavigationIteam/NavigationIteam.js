
import React from 'react'
import classes from './NavigationIteam.css'
import {NavLink} from 'react-router-dom'

const navigationIteam = (props) =>  (
       <li className ={classes.NavigationItem}>
            <NavLink exact={props.exact}
             to ={props.link} 
             activeClassName={classes.active}>{props.children}
            </NavLink>
       </li>
    )


export default navigationIteam
