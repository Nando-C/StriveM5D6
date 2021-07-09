import { Component } from "react";
import SingleProduct from "./SingleProduct";
import { Row, Button } from 'react-bootstrap'
import ProductModal from "./ProductModal";

class ProductList extends Component {
    state = {  
        products : [],
        show: false,
        modalCreate: true,
    }

    fetchProducts = async () => {
        try {
            const apiURL = process.env.REACT_APP_BE_URL
            const response = await fetch(`${apiURL}/products`)
            if(response.ok) {
                const productsData = await response.json()
                // console.log(productsData.products)
                this.setState({
                    products: productsData.products
                })
            } else {
                console.log(response)
            }
        } catch (error) {
            alert('Something went wrong')
            console.log(error)
        }

    }
    componentDidMount = async () => {
        this.fetchProducts()
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

    render() { 
        return (  
            <>
            <div className='mt-4 d-flex justify-content-end'>
                <Button variant="secondary" onClick={this.handleShow}>
                    Add New Product
                </Button>
            </div>
                <Row className='my-4 justify-content-between'>
                    {this.state.products.map(prod => <SingleProduct key={prod._id} product={prod} />)}
                </Row>
                <ProductModal show={this.state.show} handleShow={this.handleShow} handleClose={this.handleClose} modalCreate={this.state.modalCreate} fetchProducts={this.fetchProducts}/>
            </>
        );
    }
}
 
export default ProductList;