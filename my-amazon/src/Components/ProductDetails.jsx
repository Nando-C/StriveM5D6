import { Component } from "react";
import { Card, ListGroup, ListGroupItem, Badge, Button } from 'react-bootstrap'
import ProductModal from "./ProductModal";

class ProductDetails extends Component {
    state = {  
        product: {},
        show: false,
        isLoading: true
    }

    handleShow = () => {
        this.setState({
            ...this.state,
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            show: false
        })
    }

    fetchProduct = async () => {
        const apiURL = process.env.REACT_APP_BE_URL
        const productID = this.props.productId
        console.log(this.props.productId)
        console.log(`${apiURL}/products/${productID}`)
    
        try {
            const response = await fetch(`${apiURL}/products/${productID}`)
            console.log(response)
            if(response.ok) {
                const productData = await response.json()
                console.log(productData)
    
                this.setState({
                    ...this.state,
                    product: productData,
                    isLoading: false
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount = async () => {
        this.fetchProduct()
    }

    render() {
        return (
            <>
                <div>
                    <Button className='m-2' size='sm' variant="primary" onClick={this.handleShow}>Edit</Button>
                </div>
                {this.state.isLoading
                ? <p>Loading...</p> 
                : <>
                    <Card className='my-3'>
                        <Card.Img variant="top" src={this.state.product?.imageUrl} />
                        <Card.Body>
                            <Card.Title>{this.state.product?.name}</Card.Title>
                            <Card.Text>
                                {this.state.product?.description}
                            </Card.Text>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>{this.state.product?.brand}</ListGroupItem>
                                <ListGroupItem>
                                    <Badge variant="warning">£ {this.state.product?.price}</Badge>
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                    <ProductModal show={this.state.show} handleShow={this.handleShow} handleClose={this.handleClose} product={this.state?.product} fetchProduct={this.fetchProduct} history={this.props.history} />
                </>}
            </>
        );
    }
}
 
export default ProductDetails;