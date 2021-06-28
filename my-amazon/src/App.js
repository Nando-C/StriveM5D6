import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Container } from 'react-bootstrap';
import MyNavBar from './Components/Navbar'
import MyFooter from './Components/MyFooter';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProductList from './Components/ProductList';
import Details from './Components/Details';

function App() {
  return (
    <div className="App">
      <Router>
        <MyNavBar />
        <Container>
          <Route exact path='/' component={ProductList} />
          <Route path='/details/:id' component={Details}/>
        </Container>
        <MyFooter />
      </Router>
    </div>
  );
}

export default App;
