import { Component } from "react";
import { Card, ListGroup, Button} from 'react-bootstrap'
import ReviewModal from "./ReviewModal";

class SingleReview extends Component {
    state = {  
        show: false
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
                <ListGroup.Item className='border-0'>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                " <em>{this.props.comData.comment}</em> "
                            </Card.Text>
                            <Card.Text>
                                Rating: <strong>{this.props.comData.rate}</strong>
                            </Card.Text>
                        </Card.Body>
                        <div>
                            <Button className='m-2' size='sm' variant="primary" onClick={this.handleShow}>Edit</Button>
                            {/* <Button className='m-2' size='sm' variant="danger" onClick={e => this.deleteComment(e)}>Delete</Button> */}
                        </div>
                    </Card>
                </ListGroup.Item>
                <ReviewModal productID={this.props.productID} show={this.state.show} handleClose={this.handleClose} commentData={this.props.comData} fetchComments={this.props.fetchComments}/>
            </>
        );
    }
}
 
export default SingleReview;