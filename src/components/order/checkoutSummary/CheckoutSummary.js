import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Botton/Botton'
import classes from './CheckoutSummary.css';

 const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it taste well</h1>
            <div style={{width:'100%' , margin : 'auto'}} >
            <Burger ingredients = {props.ingredients} />
            </div>
            <Button btnType="Success"
             clicked={props.checkoutContinue}>
             CONTINUE</Button>
            <Button btnType ="Danger"
            clicked={props.checkoutCancel}>
            CANCEL</Button>       
        </div>
    )
}
export default CheckoutSummary