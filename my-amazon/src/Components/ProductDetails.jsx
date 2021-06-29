import { Component } from "react";
import { Card, ListGroup, ListGroupItem, Badge } from 'react-bootstrap'

class ProductDetails extends Component {
    state = {  }

    componentDidMount = async () => {
        const apiURL = process.env.REACT_APP_BE_URL
        const productID = this.props.productId
        console.log(this.props.productId)
        console.log(`${apiURL}/products/${productID}`)

        try {
            const response = await fetch(`${apiURL}/products/${productID}`)
            console.log(response)
            if(response.ok) {
                const product = await response.json()
                console.log(product)
    
                this.setState({
                    ...this.state,
                    product
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <>
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
            </>
        );
    }
}
 
export default ProductDetails;