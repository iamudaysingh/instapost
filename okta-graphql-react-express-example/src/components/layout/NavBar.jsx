import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const styles = {
  root: {
    marginBottom: '10px',
  },
  grow: {
    flexGrow: 1,
  },
  logout: {
    flexGrow: 0.07,
  },
};


class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4 " color="inherit" className={classes.grow}>
                       Welcome To Insta Post : Connecting People
            </Typography>
            <Link component={RouterLink} to="/login" color="inherit" underline="none">
              <Button color="inherit">LOGIN</Button>
            </Link>
            <Link component={RouterLink} to="/signup" color="inherit" underline="none">
              <Button color="inherit" className={classes.logout}>Sign Up</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(Navbar);