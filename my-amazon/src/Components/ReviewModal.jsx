import { Component } from 'react'
import { Modal, Button, Form, Row } from "react-bootstrap"

class ReviewModal extends Component {
    state = {  
       
    }

    componentDidMount = () => {
        this.setState({
            _id: this.props.commentData._id, //SERVER GENERATED
            comment: this.props.commentData.comment, //REQUIRED
            rate: this.props.commentData.rate, //REQUIRED
            productId: this.props.commentData.productId, //REQUIRED
            createdAt: this.props.commentData.createdAt // SERVER GENERATED
        })
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id] : e.target.value
        })
    }
   
    postComment = async (e) => {
        e.preventDefault() 

        try {
            const reviewId = this.state._id
            const response = await fetch(`http://localhost:3001/reviews/put/${reviewId}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    "Content-type": "application/json"
                }
            })
            if(response.ok) {
                const modComment = await response.json()
                console.log(modComment)
                this.props.fetchComments()

            } else {
                console.log('Something went wrong!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    deleteComment = async () => {

        try {
            const reviewId = this.state._id
            const response = await fetch(`http://localhost:3001/reviews/delete/${reviewId}`, {
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
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit = {this.postComment}>
                        {/* <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group> */}
                        <Form.Group >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control id="comment" as="textarea" rows={3} value={this.state.comment} onChange={(e) => this.handleChange(e)}/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Example select</Form.Label>
                            <Form.Control id="rate" as="select" value={this.state.rate} onChange={(e) => this.handleChange(e)} >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Row className='justify-content-between mx-1'>
                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                            <Button variant="danger" onClick={this.deleteComment} >
                                Delete
                            </Button>
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