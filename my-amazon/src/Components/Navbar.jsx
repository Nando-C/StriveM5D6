import { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button, Container } from "react-bootstrap"

class MyNavBar extends Component {
    state = {  }
    render() { 
        return (  
            <>
                <Navbar bg="light" variant="light">
                    <Container>
                        <Navbar.Brand href="#home">My Amazon</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Details</Nav.Link>
                            
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-primary">Search</Button>
                        </Form>
                    </Container>
                </Navbar>
            </>
        );
    }
}
 
export default MyNavBar;