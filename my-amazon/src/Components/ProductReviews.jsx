import { Component } from "react";
import { Card, ListGroup, Button } from 'react-bootstrap'
import ReviewModal from "./ReviewModal";
import SingleReview from "./SingleReview";

class ProductReviews extends Component {
    state = {  
        comments: [],
        isLoading: true,
        show: false,
        modalCreate: true
    }

    fetchComments = async () => {
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
                isLoading: false,
                // show: false
            })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount = async () => {
        this.fetchComments()
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
                <Card className='mb-5' >
                    <div>
                        <h2 className='my-3'>Reviews</h2>
                        <Button variant="secondary" onClick={this.handleShow}>
                            Add Review
                        </Button>
                    </div>
                    {/* {console.log(this.state.comments)} */}
                    {this.state.isloading ? <p>Loading...</p>
                        : <ListGroup className='mb-5 border-0'>
                            {this.state.comments.map(comData =>
                                <>
                                    <SingleReview comData={comData} fetchComments={this.fetchComments} />
                                </>
                            )}
                        </ListGroup>
                    }
                </Card>
                <ReviewModal show={this.state.show} handleClose={this.handleClose} handleShow={this.handleShow} fetchComments={this.fetchComments} modalCreate={this.state.modalCreate} productID={this.props.productId}/>
            </>
        );
    }
}
 
export default ProductReviews;