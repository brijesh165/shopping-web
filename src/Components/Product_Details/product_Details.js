import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Header from './../Header/header';
import { Container, Row, Col, Button } from 'reactstrap';

const ProductDetails = (props) => {
    const location = useLocation();
    const [item, setItem] = useState(location.state);
    const history = useHistory();

    const _handleAddToCart = () => {
        if (localStorage.getItem('cartItems')) {
            const previousCartItems = JSON.parse(localStorage.getItem('cartItems'));
            const itemExist = previousCartItems.find((product) => product.item._id === item._id);
            if (itemExist) {
                itemExist.quantity++;
                localStorage.setItem('cartItems', JSON.stringify(previousCartItems));
                history.push("/user-dashboard")
            } else {
                const newItem = {
                    item: item,
                    quantity: 1
                }
                const addNewItemInCard = [...previousCartItems, newItem]
                localStorage.setItem('cartItems', JSON.stringify(addNewItemInCard));
                history.push("/user-dashboard")
            }
        } else {
            const cartItems = [];
            const product = {
                item: item,
                quantity: 1
            }
            cartItems.push(product);
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            history.push("/user-dashboard")
        }
    }

    return (
        <React.Fragment>
            <Header />

            <Container className="mt-4">
                <Row className="mt-3">
                    <h1>Product Details</h1>
                </Row>
                <Row className="mt-3">
                    <Col lg={6}>
                        <img src={`http://localhost:3001/${item.image}`} alt="product Image" />
                    </Col>
                    <Col lg={6} style={{ textAlign: 'left' }}>
                        <h3>{item.product_name}</h3>
                        <p>{item.price}</p>
                        <p>{item.description}</p>
                        <Button color="success" onClick={_handleAddToCart}>ADD TO CART</Button>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default ProductDetails;