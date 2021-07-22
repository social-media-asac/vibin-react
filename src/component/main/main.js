import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Header from '../header/headar';
import LogInPage from '../../pages/login';
import ProfilePage from '../../pages/profile/profile'
import Home  from '../../pages/home/home';
import RegisterPage from '../../pages/register';
// import Footer from '../footer/footer'
const Main = (props) =>{
    return (
      <Router>
        <>
        {/* <Header/> */}
        <Switch>
          <Route exact path="/" component={LogInPage} > <LogInPage /> </Route>
         
          <Route  exact path="/user/:id" component={ProfilePage} ><ProfilePage /> </Route>
          <Route  exact path="/home" component={Home} > <Home /></Route>
          <Route  exact path="/register" component={RegisterPage} > <RegisterPage/> </Route>
        </Switch>
        {/* <Footer/> */}
        </>

      </Router>
    )
}
export default Main;