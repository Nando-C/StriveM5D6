import { Component } from "react";
import { Container, Card, ListGroup, ListGroupItem, Badge, Button } from 'react-bootstrap'

class ProductReviews extends Component {
    state = {  
        comments: [],
        isLoading: true
    }

    componentDidMount = async () => {
        const productID = this.props.productId
        // console.log(this.props.match.params.id)
        // console.log(`http://localhost:3001/products/${productID}`)

        try {
            const respComments = await fetch(`http://localhost:3001/reviews/get/${productID}`)
            const commentsList = await respComments.json()
            console.log(commentsList)

            this.setState({
                ...this.state,
                comments: commentsList,
                isLoading: false
            })
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <>
                <Card className='mb-5' >
                    <h2 className='my-3'>Reviews</h2>
                    {console.log(this.state.comments)}
                    {this.state.isloading ? <p>Loading...</p>
                        : <ListGroup className='mb-5 border-0'>
                            {this.state.comments.map(comData =>
                                <ListGroup.Item className='border-0'>
                                    <Card>
                                        <Card.Body>
                                            <Card.Text>
                                                " <em>{comData.comment}</em>"
                                            </Card.Text>
                                            <Card.Text>
                                                Rating: <strong>{comData.rate}</strong>
                                            </Card.Text>
                                        </Card.Body>
                                        <div>
                                            <Button className='m-2' size='sm' variant="primary" onClick={(e) => this.handleShow(e)}>Update</Button>
                                            <Button className='m-2' size='sm' variant="danger">Delete</Button>
                                        </div>
                                    </Card>
                                </ListGroup.Item>)}
                        </ListGroup>
                    }
                </Card>
            </>
        );
    }
}
 
export default ProductReviews;