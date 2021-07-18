// import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import Header from '../src/component/header/headar'
import Footer from '../src/component/footer/footer'
function App() {
  return (
    <Router>
    <>
      <Switch>
      <Header className="App-header"/>
       
        
          <Route exact path = "/"></Route>
      </Switch>

      <h1>VIBIN</h1>
      <Footer/>
   
    </>
    </Router>
    
  );
}

export default App;
