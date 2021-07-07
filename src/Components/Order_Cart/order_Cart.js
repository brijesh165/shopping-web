import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';

import './order_Cart.css';
import {
    Table, Container, Input, Button, Alert,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import Header from '../Header/header';


class OrderCart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItems: [],
            checkoutSuccessModal: false
        }

        this._handleQuantityChange = this._handleQuantityChange.bind(this);
        this._handleRemoveItemFromCart = this._handleRemoveItemFromCart.bind(this);
        this._handleContinueShoppingCart = this._handleContinueShoppingCart.bind(this);
        this._handleCheckout = this._handleCheckout.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('cartItems')) {
            const cartItems = JSON.parse(localStorage.getItem('cartItems'));
            this.setState({
                cartItems: [...this.state.cartItems, ...cartItems]
            })
        }
    }

    // called when user increase or decrease quantity
    _handleQuantityChange(e, item, quantity) {
        const currentValue = e.target.value;
        if (currentValue - quantity == 1) {
            console.log('Add: ', currentValue - quantity, item)
            const allItems = JSON.parse(localStorage.getItem('cartItems'));
            const itemExist = allItems.find((product) => product.item._id === item._id);
            if (itemExist) {
                itemExist.quantity++;
                localStorage.setItem('cartItems', JSON.stringify(allItems));
            }
            this.setState({
                cartItems: allItems
            })
        } else if (currentValue - quantity == -1) {
            console.log('Subtract: ', currentValue - quantity)
            const allItems = JSON.parse(localStorage.getItem('cartItems'));
            const itemExist = allItems.find((product) => product.item._id === item._id);
            if (itemExist) {
                itemExist.quantity--;
                localStorage.setItem('cartItems', JSON.stringify(allItems));
            }
            this.setState({
                cartItems: allItems
            })
        }
    }

    // called when user clicks on X button
    _handleRemoveItemFromCart(id) {
        const allItemsFromCart = JSON.parse(localStorage.getItem('cartItems'));
        const afterRemoveItemFromCart = allItemsFromCart.filter((product) => product.item._id !== id);
        localStorage.setItem('cartItems', JSON.stringify(afterRemoveItemFromCart));
        this.setState({
            cartItems: afterRemoveItemFromCart
        })
    }

    // called when user clicks on countinue shopping button
    _handleContinueShoppingCart() {
        this.props.history.push({ pathname: "/user-dashboard" })
    }

    // caled when user clicks on checkout button
    _handleCheckout() {
        const params = {
            user_id: this.props._user_id
        }

        // checkout api
        axios.post("http://localhost:3001/checkout", params)
            .then((data) => {
                console.log("Data: ", data.data.status);
                this.setState({
                    checkoutSuccessModal: true
                })
                localStorage.removeItem("cartItems")
            })
            .catch((error) => {
                console.log("Error: ", error);
            })

        setTimeout(() => {
            this.setState({
                checkoutSuccessModal: false
            })
            this.props.history.push({
                pathname: "/user-dashboard",
            })
        }, 2000);


    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <Container className="mt-4">
                    <Table style={{ textAlign: 'left' }}>
                        <thead>
                            <tr>
                                <th>image</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cartItems.map((item) => {
                                console.log("Item: ", item)
                                return (
                                    <tr key={item._id}>
                                        <td width="30%">
                                            <img src={`http://localhost:3001/${item.item.image}`}
                                                alt={`productImage${item._id}`}
                                                className="productImage" /></td>
                                        <td width="30%">
                                            <div>
                                                <h4>{item.item.product_name}</h4>
                                                <p>color: black</p>
                                                <p>size: small</p>
                                            </div>
                                        </td>
                                        <td width="10%">
                                            <Input
                                                type="number"
                                                name="quantity"
                                                value={item.quantity}
                                                onChange={(e) => this._handleQuantityChange(e, item.item, item.quantity)} />
                                        </td>
                                        <td width="10%">{
                                            this.props._currency === "USD" ?
                                                `$${item.item.price}` : `INR${item.item.price}`
                                        }</td>
                                        <td width="25%">{
                                            this.props._currency === "USD" ?
                                                `$${(item.quantity * item.item.price)}` : `INR${(item.quantity * item.item.price)}`
                                        }</td>
                                        <td>
                                            <Button color="danger" onClick={() => this._handleRemoveItemFromCart(item.item._id)}>X</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><b>SUBTOTAL</b></td>
                                <td>{
                                    this.state.cartItems.length > 0 ?
                                        (this.props._currency === "USD" ?
                                            `$${(this.state.cartItems.reduce((s, i) => s + (i.item.price * i.quantity), 0))}` : `INR${(this.state.cartItems.reduce((s, i) => s + (i.item.price * i.quantity), 0))}`)
                                        : 0
                                }</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><b>SHIPPING FEE</b></td>
                                <td>
                                    {this.props._currency === "USD" ? `$${15}` : `INR${15}`}
                                    15</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><b>GRANDTOTAL</b></td>
                                <td>{
                                    this.state.cartItems.length > 0 ?
                                        (this.props._currency === "USD" ?
                                            `$${(this.state.cartItems.reduce((s, i) => s + (i.item.price * i.quantity), 0)) + 15}` : `INR${(this.state.cartItems.reduce((s, i) => s + (i.item.price * i.quantity), 0)) + 15}`)
                                        : 0
                                }</td>
                            </tr>
                            <tr>
                                <td>
                                    <Button color="danger" onClick={this._handleContinueShoppingCart}>Continue Shopping</Button>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td colSpan="2" style={{ textAlign: 'left' }}>
                                    <Button color="success" onClick={this._handleCheckout}>Checkout</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <Modal
                        isOpen={this.state.checkoutSuccessModal}
                        size="md"
                    >
                        <ModalHeader>Checkout Success</ModalHeader>
                        <ModalBody>
                            <Alert color="success">
                                Your payment done successfully.
                                Thank you for shopping with us.
                                Please provide your feedback and continue shoping with us.
                            </Alert>
                        </ModalBody>
                    </Modal>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        _user_id: state.users.user_id,
        _currency: state.users.currency
    }
}

export default withRouter(connect(mapStateToProps)(OrderCart));