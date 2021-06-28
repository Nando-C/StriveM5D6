import { Component } from "react";
import { Container } from 'react-bootstrap'
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";

class Details extends Component {
    state = {  
        productId: this.props.match.params.id,
    }

    render() { 
        return (  
            <>
            <Container>
                <ProductDetails productId={this.state.productId}/>
                <ProductReviews productId={this.state.productId}/>
            </Container>
            </>
        );
    }
}
 
export default Details;