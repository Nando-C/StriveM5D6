import { Component } from 'react'
import { Modal, Button, Form, Row } from "react-bootstrap"

class ReviewModal extends Component {
    state = {
        review: {
            _id: "", //SERVER GENERATED
            comment: "", //REQUIRED
            rate: "Rate this product", //REQUIRED
            productId: "", //REQUIRED
            createdAt: "" // SERVER GENERATED
        },
        productID: "",
    }

    componentDidMount = () => {
        console.log(this.props);
        this.setState({
            review: {
                _id: this.props.commentData?._id, //SERVER GENERATED
                comment: this.props.commentData?.comment, //REQUIRED
                rate: this.props.commentData?.rate, //REQUIRED
                productId: this.props.commentData?.productId, //REQUIRED
                createdAt: this.props.commentData?.createdAt // SERVER GENERATED
            },
            productID: this.props.productID,
        })
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            review: {
                ...this.state.review,
                [e.target.id] : e.target.value
            }
        })
    }
   
    createComment = async () => {
        const productID = this.state.productID
        console.log(productID);
        console.log(this.props);

        try {
            const apiURL = process.env.REACT_APP_BE_URL
            console.log(`${apiURL}/products/${productID}`)
            const response = await fetch(`${apiURL}/products/${productID}`, {
                method: 'POST',
                body: JSON.stringify(this.state.review),
                headers: {
                    "Content-type": "application/json"
                }
            })
            if(response.ok) {
                const modComment = await response.json()
                console.log(modComment)
                this.props.fetchComments()
                this.setState({review:{}})
                this.props.handleClose()

            } else {
                console.log('Something went wrong!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    updateComment = async (e, props) => {
        e.preventDefault() 

        const apiURL = process.env.REACT_APP_BE_URL
        const productID = this.state.productID
        const reviewId = this.props.commentData._id
        console.log(this.props)
        try {
            const response = await fetch(`${apiURL}/products/${productID}/reviews/${reviewId}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.review),
                headers: {
                    "Content-type": "application/json"
                }
            })
            if(response.ok) {
                const modComment = await response.json()
                console.log(modComment)
                this.props.fetchComments()
                this.props.handleClose()

            } else {
                console.log('Something went wrong!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    deleteComment = async () => {

        try {
            const apiURL = process.env.REACT_APP_BE_URL
            const productID = this.state.productID
            const reviewId = this.props.commentData._id
            const response = await fetch(`${apiURL}/products/${productID}/reviews/${reviewId}`, {
                method: 'DELETE'
            })
            if(response.ok) {
                // const deletedComment = await response.json()
                // console.log(deletedComment)
                this.props.fetchComments()
                this.props.handleClose()

            } else {
                console.log('Something went wrong!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() { 
        return (  
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit = {this.updateComment}>
                        {/* <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group> */}
                        <Form.Group >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control id="comment" as="textarea" rows={3} value={this.state.review.comment} onChange={(e) => this.handleChange(e)}/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Example select</Form.Label>
                            <Form.Control id="rate" as="select" value={this.state.review.rate} onChange={(e) => this.handleChange(e)} >
                                <option>Rate this product</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Row className='justify-content-between mx-1'>
                            {this.props.modalCreate
                                ? <Button variant="primary" onClick={this.createComment} >
                                    Add Review
                                </Button>
                                :
                                <>
                                    <Button variant="primary" type="submit">
                                        Update
                                    </Button>
                                    <Button variant="danger" onClick={this.deleteComment} >
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
        );
    }
}
 
export default ReviewModal;