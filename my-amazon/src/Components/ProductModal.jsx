import React, { Component, createRef } from "react";
import { Modal, Button, Form, Row } from 'react-bootstrap'

class ProductModal extends Component {
    state = {  
        product: {
            _id: "", //SERVER GENERATED
            name: "",  //REQUIRED
            description: "", //REQUIRED
            brand: "", //REQUIRED 	  "imageUrl":"https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
            price: 0, //REQUIRED
            category: "", //REQUIRED
            imageUrl: "",
            // createdAt: "", //SERVER GENERATED
            // updatedAt: "", //SERVER GENERATED
        },
        imageFile: '',
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            product : {
                _id: this.props.product?._id, //SERVER GENERATED
                name: this.props.product?.name,  //REQUIRED
                description: this.props.product?.description, //REQUIRED
                brand: this.props.product?.brand, //REQUIRED 
                price: this.props.product?.price, //REQUIRED
                category: this.props.product?.category, //REQUIRED
                imageUrl: this.props.product?.imageUrl
            }
        }, () => console.log(this.state)
        )
    }

    inputChange = (e) => {
        this.setState({
            ...this.state,
            product: {
                ...this.state.product,
                [e.target.id]: e.target.value
            }
        })
    }

    fileInputRef = createRef()

    handleFile = () => {
      this.fileInputRef.current.click()
    }

    createProduct = async () => {
        try {
            const apiURL = process.env.REACT_APP_BE_URL
            // const productId = this.state.product._id

            const newProductImage = new FormData()
            newProductImage.append( 'imageUrl', this.state.imageFile )

            const response = await fetch(`${apiURL}/products`, {
                method: 'POST',
                body: JSON.stringify(this.state.product),
                headers: {
                    "Content-type": "application/json"
                }
            })
            if(response.ok) {
                const newProduct = await response.json()
                // console.log(newProduct._id)
                const responseUpload = await fetch(`${apiURL}/products/${newProduct._id}/uploadImage`, {
                    method: 'POST',
                    body: newProductImage,
                })
                if(responseUpload.ok) {
                    const newProdUploaded = await responseUpload.json()
                    console.log(newProdUploaded);

                    this.props.fetchProducts()
                    this.setState({product:{}, imageFile:''})
                    this.props.handleClose()
                } else {
                    console.log('Something went wrong uploading new Product Image')
                }
            } else {
                console.log('Something went wrong adding a New Product!')
            }
        } catch (error) {
            console.log(error)
        }

    }

    updateProduct = async (e) => {
        e.preventDefault() 

        try {
            const apiURL = process.env.REACT_APP_BE_URL
            const productId = this.state.product._id
            const response = await fetch(`${apiURL}/products/${productId}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.product),
                headers: {
                    "Content-type": "application/json"
                }
            })
            if(response.ok) {
                if (this.state.imageFile) {
                    const newProductImage = new FormData()
                    newProductImage.append('imageUrl', this.state.imageFile)

                    const responseUpload = await fetch(`${apiURL}/products/${productId}/uploadImage`, {
                        method: 'POST',
                        body: newProductImage,
                    })
                    if(responseUpload.ok) {
                        const newProdUploaded = await responseUpload.json()
                        console.log(newProdUploaded);
                    } else {
                        console.log('Something went wrong uploading new Product Image')
                    }
                }
                const modProduct = await response.json()
                console.log(modProduct)
                this.props.fetchProduct()
                this.props.handleClose()
                
            } else {
                console.log('Something went wrong!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    editPicture = async (e) => {
        try {
            const apiURL = process.env.REACT_APP_BE_URL
            // const productId = this.state.product._id

            const productImage = new FormData()
            productImage.append('avatar', e.target.files[0])

            const response = await fetch(`${apiURL}/files/upload`, {
                method: 'POST',
                body: productImage,
                // headers: {
                //     "Content-type": "application/json"
                // }
            })
            if(response.ok) {
                // const modComment = await response.json()
                console.log(response)
            } else {
                console.log('Something went wrong!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async () => {
        try {
            const apiURL = process.env.REACT_APP_BE_URL
            const productId = this.state.product._id
            const response = await fetch(`${apiURL}/products/${productId}`, {
                method: 'DELETE',
            })
            if(response.ok) {
                console.log(response)
                // this.props.fetchProduct()
                this.props.handleClose()
                this.props.history.push("/")
            } else {
                console.log('Something went wrong!')
            }
        } catch (error) {
            console.log(error)
        }

    }

    render() { 
        return (  
            <>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit = {this.updateProduct}>
                            <Form.Group >
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control id="name" type="text" placeholder="Enter product name" value={this.state.product.name} onChange={(e) => this.inputChange(e)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Product description</Form.Label>
                                <Form.Control id="description" as="textarea" rows={3} placeholder="Write a description fro the product" value={this.state.product.description} onChange={(e) => this.inputChange(e)}/>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control id="brand" type="text" placeholder="Enter brand name" value={this.state.product.brand} onChange={(e) => this.inputChange(e)}/>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Price</Form.Label>
                                <Form.Control id="price" type="number" placeholder="Enter price in £" value={this.state.product.price} onChange={(e) => this.inputChange(e)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Select category</Form.Label>
                                <Form.Control id="category" as="select" value={this.state.product.category} onChange={(e) => this.inputChange(e)}>
                                    <option>category</option>
                                    <option>Toys</option>
                                    <option>Tech</option>
                                    <option>Wearables</option>
                                    <option>Food</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Control
                                    type="file"
                                    hidden
                                    ref={this.fileInputRef}
                                    onChange={e => this.setState({ ...this.state, imageFile: e.currentTarget.files[0] })}
                                />
                                <Button variant="dark" className="mr-4" onClick={this.handleFile}>
                                    Upload Image
                                </Button>
                                <Button variant="outline-dark"
                                    onClick={() => this.setState({ ...this.state, imageFile: "" })}
                                >
                                    Reset Image
                                </Button>
                                <img
                                    src={
                                        this.state.imageFile
                                            ? URL.createObjectURL(this.state.imageFile)
                                            : this.state.product.imageUrl || "https://via.placeholder.com/600x600?text=Blog+Image"
                                    }
                                    height="200px"
                                    alt="cover"
                                    className="d-block mt-4"
                                />
                            </Form.Group>
                            <Row className='justify-content-between mx-1'>
                            {this.props.modalCreate
                                ?  <Button variant="primary" onClick={this.createProduct} >
                                        Add Product
                                    </Button>
                                :
                                <>
                                    <Button variant="primary" type="submit">
                                        Update
                                    </Button>
                                    <Button variant="danger" onClick={this.deleteProduct} >
                                        Delete
                                    </Button>
                                </>
                            }
                        </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
 
export default ProductModal;