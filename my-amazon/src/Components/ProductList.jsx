import { Component } from "react";
import SingleProduct from "./SingleProduct";
import { Row } from 'react-bootstrap'

class ProductList extends Component {
    state = {  
        products : []
    }

    componentDidMount = async () => {
        try {
            const apiURL = process.env.REACT_APP_BE_URL
            const response = await fetch(`${apiURL}/products`)
            if(response.ok) {
                const productsList = await response.json()
                // console.log(productsList)
                this.setState({
                    products: productsList
                })
            } else {
                console.log(response)
            }
        } catch (error) {
            alert('Something went wrong')
            console.log(error)
        }
    }
    render() { 
        return (  
            <>
            <Row className='my-5 justify-content-between'>
                {this.state.products.map(prod => <SingleProduct key={prod._id} product={prod}/>)}

            </Row>
            </>
        );
    }
}
 
export default ProductList;