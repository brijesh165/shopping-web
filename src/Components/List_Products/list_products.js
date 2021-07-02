import React from 'react';
import { connect } from 'react-redux';

import Header from './../Header/header';
import * as actions from './../../store/actions/index';

import {
    Container, Button, Label, Col,
    CustomInput,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import './list_products.css';

class ListProducts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addModal: false,
            form: {
                name: "",
                category: 1,
                subcategory: 1,
                description: "",
                price: "",
                image: null,
                status: false
            }
        }

        this._handleAddModalToggle = this._handleAddModalToggle.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._onFormSubmit = this._onFormSubmit.bind(this);
    }

    _handleAddModalToggle() {
        this.setState({
            addModal: !this.state.addModal
        })
    }

    _handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "image") {
            this.setState({
                form: {
                    ...this.state.form,
                    image: e.target.files[0]
                }
            })
        } else if (name === "status") {
            this.setState({
                form: {
                    ...this.state.form,
                    status: !this.state.form.status
                }
            })
        } else {
            this.setState({
                form: {
                    ...this.state.form,
                    [name]: value
                }
            })
        }
    }

    _onFormSubmit(e) {
        e.preventDefault();
        console.log("Form", this.state.form.name)

        // let data = new FormData();
        // data.set('product_name', this.state.form.name);
        // data.append('category', this.state.form.category);
        // data.append('subcategory', this.state.form.subcategory);
        // data.append('price', this.state.form.price);
        // data.append('description', this.state.form.description);
        // data.append('image', this.state.form.image, this.state.form.image.name);
        // data.append('status', this.state.form.status)

        // console.log("Form Data: ", data);
        this.props.onCreate(this.state.form)
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <Container className="mt-4">
                    <div className="addButton">
                        <Button color="primary" onClick={this._handleAddModalToggle}>Add</Button>
                    </div>

                    <Modal
                        isOpen={this.state.addModal}
                        size="lg"
                        centered>
                        <ModalHeader
                            toggle={this._handleAddModalToggle}>Add</ModalHeader>
                        <ModalBody>
                            <AvForm onValidSubmit={this._onFormSubmit}>
                                <AvGroup row>
                                    <Label lg={4}>Name</Label>
                                    <Col lg={8}>
                                        <AvField
                                            name="name"
                                            id="name"
                                            value={this.state.form.name}
                                            onChange={this._handleChange}
                                            validate={{
                                                required: { value: true, errorMessage: "Please enter name" }
                                            }}
                                        />
                                    </Col>
                                </AvGroup>

                                <AvGroup row>
                                    <Label lg={4}>Category</Label>
                                    <Col lg={8}>
                                        <AvField type="select"
                                            name="category"
                                            value={this.state.form.category}
                                            onChange={this._handleChange}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </AvField>
                                    </Col>
                                </AvGroup>

                                <AvGroup row>
                                    <Label lg={4}>Subcategory</Label>
                                    <Col lg={8}>
                                        <AvField type="select"
                                            name="Subcategory"
                                            value={this.state.form.subcategory}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </AvField>
                                    </Col>
                                </AvGroup>

                                <AvGroup row>
                                    <Label lg={4}>Description</Label>
                                    <Col lg={8}>
                                        <AvField type="textarea"
                                            name="description"
                                            value={this.state.form.description}
                                            onChange={this._handleChange}
                                            validate={{
                                                required: { value: true, errorMessage: "Please provide description." }
                                            }} />
                                    </Col>
                                </AvGroup>

                                <AvGroup row>
                                    <Label lg={4}>Price</Label>
                                    <Col lg={8}>
                                        <AvField type="number"
                                            name="price"
                                            value={this.state.form.price}
                                            onChange={this._handleChange}
                                            validate={{
                                                required: { value: true, errorMessage: "Please enter price" }
                                            }} />
                                    </Col>
                                </AvGroup>

                                <AvGroup row>
                                    <Label lg={4}>Image</Label>
                                    <Col lg={8}>
                                        <AvField type="file"
                                            name="image"
                                            accept="image/png, image/jpeg"
                                            onChange={this._handleChange}
                                            validate={{
                                                required: { value: true, errorMessage: "Please select image" }
                                            }} />
                                    </Col>
                                </AvGroup>

                                <AvGroup row>
                                    <Label lg={4}>Status</Label>
                                    <Col lg={8}>
                                        <CustomInput type="switch"
                                            id="status"
                                            name="status"
                                            onChange={this._handleChange} />
                                    </Col>
                                </AvGroup>

                                <AvGroup row>
                                    <Button color="success" type="submit">Add</Button>
                                </AvGroup>
                            </AvForm>
                        </ModalBody>
                    </Modal>

                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        _loading: state.products.loading,
        _productList: state.products.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: (params) => dispatch(actions.oncreateproduct(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);