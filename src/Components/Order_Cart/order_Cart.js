import React from 'react';

import './order_Cart.css';
import { Table, Container, Input, Button } from 'reactstrap';
import Header from '../Header/header';


class OrderCart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItems: []
        }

        this._handleQuantityChange = this._handleQuantityChange.bind(this);
        this._handleRemoveItemFromCart = this._handleRemoveItemFromCart.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('cartItems')) {
            const cartItems = JSON.parse(localStorage.getItem('cartItems'));
            this.setState({
                cartItems: [...this.state.cartItems, ...cartItems]
            })
        }
    }

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

    _handleRemoveItemFromCart(id) {
        const allItemsFromCart = JSON.parse(localStorage.getItem('cartItems'));
        const afterRemoveItemFromCart = allItemsFromCart.filter((product) => product.item._id !== id);
        localStorage.setItem('cartItems', JSON.stringify(afterRemoveItemFromCart));
        this.setState({
            cartItems: afterRemoveItemFromCart
        })
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
                                        <td width="40%">
                                            <div>
                                                <h6>{item.item.product_name}</h6>
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
                                        <td width="10%">{item.item.price}</td>
                                        <td width="10%">{(item.quantity * item.item.price)}</td>
                                        <td>
                                            <Button color="danger" onClick={() => this._handleRemoveItemFromCart(item.item._id)}>X</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Container>
            </React.Fragment>
        )
    }
}



export default OrderCart;