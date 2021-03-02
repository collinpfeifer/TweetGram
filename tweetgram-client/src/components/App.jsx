import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MenuBar from './MenuBar';
import Container from '@material-ui/core/Container';
import { AuthProvider } from '../context';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SinglePost from '../pages/SinglePost';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <Container maxWidth='xl'>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/posts/:postId' component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
