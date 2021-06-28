import { Component } from "react";
import { Container, Card, ListGroup, ListGroupItem, Badge, } from 'react-bootstrap'

class Details extends Component {
    state = {  
        // product: {
            // _id: "5d318e1a8541744830bef139", //SERVER GENERATED
            // name: "3310",  //REQUIRED
            // description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem veniam sapiente quam facere culpa assumenda, libero doloremque! Laboriosam, cumque dolore!", //REQUIRED
            // brand: "nokia", //REQUIRED 	  "imageUrl":"https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
            // price: 100, //REQUIRED
            // category: "smartphones", //REQUIRED
            // imageUrl: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTlplJDPDcl7K04MNiKMFo3bnhKe1x333JPxGaPUTKj1x6WFWA&usqp=CAY"
            // // "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
            // // "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
        // },
        comments: [
            // {
            //     _id: "123455", //SERVER GENERATED
            //     comment: "A good book but definitely I don't like many parts of the plot", //REQUIRED
            //     rate: 3, //REQUIRED, max 5
            //     productId: "5d318e1a8541744830bef139", //REQUIRED
            //     createdAt: "2019-08-01T12:46:45.895Z" // SERVER GENERATED
            // },
            // {
            //     _id: "123456", //SERVER GENERATED
            //     comment: "Another good book but definitely I don't like many parts of the plot", //REQUIRED
            //     rate: 3, //REQUIRED, max 5
            //     productId: "5d318e1a8541744830bef149", //REQUIRED
            //     createdAt: "2019-09-01T12:46:45.895Z" // SERVER GENERATED
            // },
        ]
    }

    componentDidMount = async () => {
        const productID = this.props.match.params.id
        // console.log(this.props.match.params.id)
        // console.log(`http://localhost:3001/products/${productID}`)

        try {
            const response = await fetch(`http://localhost:3001/products/${productID}`)
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

        try {
            const respComments = await fetch(`http://localhost:3001/reviews/get/${productID}`)
            const commentsList = respComments.json()
            console.log(commentsList)

            this.setState({
                ...this.state,
                comments: commentsList
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() { 
        return (  
            <>
            <Container>
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
                <div>
                    <Card className='mb-5' >
                            <h2 className='my-3'>Reviews</h2>
                            {console.log(this.state.comments)}
                            {/* <ListGroup className='mb-5 border-0'>
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
                                        </Card>
                                    </ListGroup.Item>)}
                            </ListGroup> */}
                    </Card>
                </div>


            </Container>
            </>
        );
    }
}
 
export default Details;