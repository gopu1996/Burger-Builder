
import React, { Component } from 'react'
import Aux from '../../../hoc/AuxHoc/Aux'
import Button from '../../UI/Botton/Botton'




 class OrderSummary extends Component {
 
    render() {

        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey =>{
            return(
                 <li key={igKey}>
                <span style = {{textTransform: 'capitalize'}}>{igKey}</span>
                : {this.props.ingredients[igKey]}
                </li>
            )
            })
        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger wirh the following ingredients:</p>
            <ul>
                 {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout ?</p>
         <Button btnType="Danger" clicked ={this.props.purchaseCancelled}>CANCEL</Button>
         <Button btnType="Success" clicked ={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        )
    }
}

export default OrderSummary
