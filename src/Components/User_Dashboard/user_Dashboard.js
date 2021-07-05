import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import * as actions from './../../store/actions/index';

import { Row, Container, Button } from 'reactstrap';
import Header from './../Header/header';
import './user_Dashboard.css';

class UserDashboard extends React.Component {
    constructor(props) {
        super(props);

        this._handleAddCart = this._handleAddCart.bind(this);
        this._handleImageClick = this._handleImageClick.bind(this);
    }

    getUserProducts() {
        console.log("Get Products")
        if (localStorage.getItem("token")) {
            this.props.onFetch();
        } else {
            this.props.history.push({
                pathname: "/"
            })
        }
    }

    componentDidMount() {
        this.getUserProducts();
    }

    _handleImageClick(item) {
        this.props.history.push({
            pathname: "/product-details",
            state: item
        })
    }

    _handleAddCart(item) {
        if (localStorage.getItem('cartItems')) {
            const previousCartItems = JSON.parse(localStorage.getItem('cartItems'));
            const itemExist = previousCartItems.find((product) => product.item._id === item._id);
            if (itemExist) {
                itemExist.quantity++;
                localStorage.setItem('cartItems', JSON.stringify(previousCartItems));
            } else {
                const newItem = {
                    item: item,
                    quantity: 1
                }
                const addNewItemInCard = [...previousCartItems, newItem]
                localStorage.setItem('cartItems', JSON.stringify(addNewItemInCard));
            }
        } else {
            const cartItems = [];
            const product = {
                item: item,
                quantity: 1
            }
            cartItems.push(product);
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header />

                <Container>
                    <Row className="mt-4">
                        <h3>Welcome {this.props._username}</h3>
                    </Row>

                    {this.props._productList.length > 0 &&
                        this.props._productList.map((item) => {
                            return (
                                <Row className="mt-4" key={item._id} style={{ 'marginBottom': '20px' }}>
                                    <div className="col-md-4">
                                        <img src={`http://localhost:3001/${item.image}`}
                                            className="productImage"
                                            alt={`product image${item._id}`}
                                            onClick={() => this._handleImageClick(item)} />
                                    </div>
                                    <div className="col-md-8 text-left">
                                        <h5>{item.product_name}</h5>
                                        <p>{item.description}</p>
                                        <h3>
                                            {
                                                this.props._currency === "USD" ?
                                                    `$${item.price}` : `INR${item.price}`
                                            }</h3>
                                        <Button color="success" onClick={() => this._handleAddCart(item)}>ADD CART</Button>
                                        &nbsp;
                                        <Button>ADD WISHLIST</Button>
                                    </div>
                                </Row>)
                        })
                    }
                </Container>
            </React.Fragment >
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("Product List: ", state.products.userproducts)
    return {
        _username: state.users.username,
        _currency: state.users.currency,
        _loading: state.products.loading,
        _productList: state.products.userproducts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => dispatch(actions.onFetchProductsForUsers())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDashboard));