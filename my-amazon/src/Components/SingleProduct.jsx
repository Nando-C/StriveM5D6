import { Component } from "react";
import { Card, ListGroup, ListGroupItem, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class SingleProduct extends Component {
    state = {  
        product : {
            _id: this.props.product._id, //SERVER GENERATED
            name: this.props.product.name,  //REQUIRED
            description: this.props.product.description, //REQUIRED
            brand: this.props.product.brand, //REQUIRED 	  "imageUrl":"https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
            price: this.props.product.price, //REQUIRED
            category: this.props.product.category, //REQUIRED
            imageUrl: this.props.product.imageUrl
            // "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
            // "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
        }
    }
    render() { 
        return (  
            <>
                <Card className='my-3' style={{ width: '18rem' }}>
                    <Link to={"/details/" + this.state.product._id}>
                        <Card.Img variant="top" src={this.state.product.imageUrl} />
                    </Link>
                    <Card.Body>
                        <Card.Title>{this.state.product.name}</Card.Title>
                        <Card.Text>
                            {this.state.product.description}
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>{this.state.product.brand}</ListGroupItem>
                            <ListGroupItem>
                                <Badge variant="warning">£ {this.state.product.price}</Badge>
                            </ListGroupItem>
                        </ListGroup>
                        {/* <Button variant="primary">learn more...</Button> */}
                    </Card.Body>
                </Card>
            </>
        );
    }
}
 
export default SingleProduct;