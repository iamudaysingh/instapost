import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


export class FormPersonalDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <div align="center">
          <AppBar position="static" >
            <Typography variant="h6" color="inherit" align="center">
              Enter Personal Details
          </Typography>
          </AppBar>
          <TextField

            label="Enter Your Occupation"
            id="Occupation"
            onChange={handleChange('occupation')}
            value={values.occupation}
          />
          <br />
          <TextField
            label="Enter Your City"
            id="City"
            onChange={handleChange('city')}
            value={values.city}
          />
          <br />
          <TextField
            label="Enter Your Phone Number"
            id="Bio"
            onChange={handleChange('bio')}
            value={values.bio}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={this.continue}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
            onClick={this.back}
          >
            Back
        </Button>
        </div>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

export default FormPersonalDetails;
