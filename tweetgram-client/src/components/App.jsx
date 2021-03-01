import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MenuBar from './MenuBar';
import Container from '@material-ui/core/Container';

const App = () => {
  return (
    <Router>
      <Container maxWidth='xl'>
        <MenuBar />
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Container>
    </Router>
  );
};

export default App;
