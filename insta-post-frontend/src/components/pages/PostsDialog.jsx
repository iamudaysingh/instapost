import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ShowPosts from './ShowPosts';
import withMobileDialog from "@material-ui/core/withMobileDialog";

class PostsDialog extends React.Component {
  state = {
    open: false,
    posts: "",
    showPost: false,
  };

  handleCloseChange = field => event => {
    this.setState({
      [field]: event.target.value
    });
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
      posts: ""
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      showPost: true,
    });
  };

  handleCloseBack = () => {
    this.setState({
      open: false,
      posts: ""
    });
  };

  render() {
    const { fullScreen, classes } = this.props;
    const { posts, showPost } = this.state;
    const value = posts;
    console.log("state", this.state);
    return (
      <>
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Click here to post
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextField
                id="filled-textarea"
                label="Start expressing your thoughts"
                // placeholder="Placeholder"
                multiline
                onChange={this.handleCloseChange("posts")}
                // className={classes.textField}
                fullWidth="true"
                margin="normal"
                variant="filled"
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseBack} color="primary">
              Back
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
          {
            showPost? <ShowPosts post={value}/> : ''
          }
      </div>
      </>
    );
  }
}

PostsDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default withMobileDialog()(PostsDialog);
