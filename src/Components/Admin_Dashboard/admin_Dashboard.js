import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import Header from '../Header/header';
import * as actions from '../../store/actions/index';

import {
    Container, Button, Label, Col,
    CustomInput,
    Table,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import './admin_Dashboard.css';

const options1 = {
    "category": [
        { value: 'category1', name: 'Category 1' },
        { value: 'category2', name: 'Category 2' },
        { value: 'category3', name: 'Category 3' }
    ]
};

const option2 = {
    "subcategory": [
        { value: 'subcategory1', name: 'Subcategory 1' },
        { value: 'subcategory2', name: 'subcategory 2' },
        { value: 'subcategory3', name: 'Subcategory 3' }
    ]
}

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addModal: false,
            form: {
                name: "",
                category: options1.category[0].value,
                subcategory: option2.subcategory[0].value,
                description: "",
                price: "",
                image: null,
                status: false
            },
            isEdit: false,
            editProductId: "",
            loading: props._loading
        }

        this._handleAddModalToggle = this._handleAddModalToggle.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._onFormSubmit = this._onFormSubmit.bind(this);
        this._handleEdit = this._handleEdit.bind(this);
        this._handleResetForm = this._handleResetForm.bind(this);
        this._handleCancel = this._handleCancel.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleImageDelete = this._handleImageDelete.bind(this);
    }

    // called to open/close model
    _handleAddModalToggle() {
        this.setState({
            addModal: !this.state.addModal,
            isEdit: false
        })
        this._handleResetForm();
    }

    // called when user enter information in product form
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
        } else if (name === "category") {
            const index = options1.category.findIndex(item => item.value === value);
            this.setState({
                form: {
                    ...this.state.form,
                    category: options1.category[index].value,
                    subcategory: option2.subcategory[index].value
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


    // update state when user click on edit button
    _handleEdit(item) {
        this.setState({
            addModal: true,
            isEdit: true,
            editProductId: item._id,
            form: {
                name: item.product_name,
                category: item.category,
                subcategory: item.subcategory,
                description: item.description,
                price: item.price,
                image: item.image,
                status: item.status
            }
        })
    }

    // called when user clicks on delete image button
    _handleImageDelete() {
        this.setState({
            form: {
                ...this.state.form,
                image: null
            }
        })
    }

    // called when user delete the product
    _handleDelete(id, imagepath) {
        const deleteParams = {
            id: id,
            imagepath: `${imagepath}`
        }
        this.props.onDelete(deleteParams);
    }

    _handleResetForm() {
        this.setState({
            form: {
                name: "",
                category: options1.category[0].value,
                subcategory: option2.subcategory[0].value,
                description: "",
                price: "",
                image: null,
                status: false
            }
        })
    }

    // called when user click on cancel button
    _handleCancel() {
        this.setState({
            addModal: false,
            isEdit: false,
            editProductId: ""
        })
        this._handleResetForm();
    }

    // called when user submit the form for edit/create product
    _onFormSubmit() {
        if (this.state.isEdit) {
            const params = {
                id: this.state.editProductId,
                form: this.state.form,
                user_id: this.props._user_id
            }
            this.props.onEdit(params);
            this._handleAddModalToggle();
            this._handleResetForm();
        } else {
            const params = {
                form: this.state.form,
                user_id: this.props._user_id
            }
            this.props.onCreate(params);
            this._handleAddModalToggle();
            this._handleResetForm();
        }
    }

    // called from componentDidMount to get all the products
    getAllProducts() {
        const { _id } = JSON.parse(sessionStorage.getItem("user"));
        this.props.onFetchProducts(_id);
    }

    componentDidMount() {
        this.getAllProducts();
    }

    render() {
        const { t } = this.props;
        const { category } = options1;
        const { subcategory } = option2;
        const categoryOptions = category.map(item => {
            return <option value={item.value}>{item.name}</option>
        });
        const subcategoryOptions = subcategory.map(item => {
            return <option value={item.value}>{item.name}</option>
        });

        return (
            <React.Fragment>
                <Header />
                <Container className="mt-4">
                    <div className="addButton">
                        <Button color="primary" onClick={this._handleAddModalToggle}>{t('admindashboard.add')}</Button>
                    </div>

                    {
                        this.props._productList.length > 0 ?
                            <Table className="mt-4">
                                <thead>
                                    <tr>
                                        <th>{t('admindashboard.table.thumb')}</th>
                                        <th>{t('admindashboard.table.name')}</th>
                                        <th>{t('admindashboard.table.category')}</th>
                                        <th>{t('admindashboard.table.subcategory')}</th>
                                        <th>{t('admindashboard.table.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props._productList.map((item, index) =>
                                        <tr key={item._id}>
                                            <td><img
                                                className="productImage"
                                                alt={`productimage${index}`} src={`http://localhost:3001/${item.image}`} /></td>
                                            <td>{item.product_name}</td>
                                            <td>{item.category}</td>
                                            <td>{item.subcategory}</td>
                                            <td>
                                                <Button color="success" onClick={() => this._handleEdit(item)}>
                                                    {t('admindashboard.table.edit')}</Button>
                                                &nbsp;
                                                <Button color="danger" onClick={() => this._handleDelete(item._id, item.image)}>
                                                    {t('admindashboard.table.delete')}</Button>
                                            </td>
                                        </tr >
                                    )
                                    }
                                </tbody>
                            </Table > :
                            <div className="mt-4" key="1">
                                <p>Please add your product</p>
                            </div>
                    }


                    <Modal
                        isOpen={this.state.addModal}
                        size="lg"
                        toggle={this._handleAddModalToggle}
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
                                            {categoryOptions}
                                        </AvField>
                                    </Col>
                                </AvGroup>

                                <AvGroup row>
                                    <Label lg={4}>Subcategory</Label>
                                    <Col lg={8}>
                                        <AvField type="select"
                                            name="subcategory"
                                            value={this.state.form.subcategory}
                                            disabled
                                            onChange={this._handleChange}>
                                            {subcategoryOptions}
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

                                {this.state.isEdit && this.state.form.image ?
                                    <AvGroup row>
                                        <Label lg={4}>Image</Label>
                                        <Col lg={6}>
                                            <img
                                                className="productImage"
                                                src={`http://localhost:3001/${this.state.form.image}`} alt="Edit Image" />
                                        </Col>
                                        <Col lg={2}>
                                            <Button color="danger"
                                                onClick={this._handleImageDelete}
                                            >X</Button>
                                        </Col>
                                    </AvGroup>
                                    :
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
                                }


                                <AvGroup row>
                                    <Label lg={4}>Status</Label>
                                    <Col lg={8}>
                                        <CustomInput type="switch"
                                            id="status"
                                            name="status"
                                            checked={this.state.form.status}
                                            onChange={this._handleChange} />
                                    </Col>
                                </AvGroup>

                                <AvGroup row>
                                    <Col lg={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button color="success" style={{ marginRight: '10px' }} type="submit">
                                            {this.state.isEdit ? 'Edit' : 'Add'}</Button>
                                        <Button color="danger" onClick={this._handleCancel}>
                                            {t('admindashboard.form.cancel')}</Button>
                                    </Col>
                                </AvGroup>
                            </AvForm>
                        </ModalBody>
                    </Modal>

                </Container >
            </React.Fragment >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        _user_id: state.users.user_id,
        _loading: state.products.loading,
        _productList: state.products.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: (params) => dispatch(actions.oncreateproduct(params)),
        onFetchProducts: (params) => dispatch(actions.onFetchProducts(params)),
        onEdit: (params) => dispatch(actions.onEditproduct(params)),
        onDelete: (params) => dispatch(actions.onDeleteproduct(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AdminDashboard));