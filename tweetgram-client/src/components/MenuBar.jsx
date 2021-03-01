import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { AuthContext } from '../context';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  menu: {
    backgroundColor: '#d3d3d3',
    margin: '0',
  },
  alignRight: {
    marginLeft: 'auto',
  },
});

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const classes = useStyles();
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 0 : pathname === '/login' ? 1 : 2;
  const [value, setValue] = useState(path);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {user ? (
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='inherit'
            className={classes.menu}>
            <Tab component={Link} to='/' label='Home' />
            <Tab
              onClick={handleClick}
              label='Account'
              className={classes.alignRight}
            />
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Tabs>
        </Paper>
      ) : (
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='inherit'
            className={classes.menu}>
            <Tab component={Link} to='/' label='Home' />
            <Tab
              onClick={handleClick}
              label='Account'
              className={classes.alignRight}
            />
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem component={Link} to='/login' onClick={handleClose}>
                Login
              </MenuItem>
              <MenuItem component={Link} to='/register' onClick={handleClose}>
                Register
              </MenuItem>
            </Menu>
          </Tabs>
        </Paper>
      )}
    </>
  );
};

export default MenuBar;
