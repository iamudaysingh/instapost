import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
    align: 'right',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class ShowPosts extends React.Component {
  state = {
    openMenu: false,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleRender = (posts) => {
    console.log('inside handle render', posts);
    const { classes, post } = this.props;
    return (
      <p></p>
    );
  }
  handleLike = () => {

    console.log('like');
  }

  optionsHandler = () => {

    this.setState({
      openMenu: true,
    })

  }

  menuHandler = () =>{
    return (
      <PopupState variant="popover" popupId="demo-popup-menu">
        {popupState => (
          <React.Fragment>
            {/* <Button variant="contained" {...bindTrigger(popupState)}>
              Open Menu
            </Button> */}
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={popupState.close}>Cake</MenuItem>
              <MenuItem onClick={popupState.close}>Death</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    );
  }
  



  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { openMenu } = this.state;
    console.log('inside show posts', this.props.post);
    const { post } = this.props;
    let newPosts = post.reverse();
    console.log('new posts', newPosts);
    const allPost = newPosts.map(i => {
      return (
        <>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>

                </Avatar>
              }
              action={
                <IconButton onClick={this.optionsHandler}>
                  <MoreVertIcon />
                </IconButton>
              }
              title="Uday"
              subheader={
                Date(Date.now()).toString()
              }
            />
            <CardContent>
              <Typography component="p">
                {i}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton aria-label="Add to favorites" onClick={this.handleLike}>
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <CommentIcon />
              </IconButton>
            </CardActions>
          </Card>
          {/* {openMenu ? this.menuHandler : ''} */}
          {openMenu ?   <PopupState variant="popover" popupId="demo-popup-menu">
        {popupState => (
          <React.Fragment>
            {/* <Button variant="contained" {...bindTrigger(popupState)}>
              Open Menu
            </Button> */}
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={popupState.close}>Cake</MenuItem>
              <MenuItem onClick={popupState.close}>Death</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState> : ''}
          <Divider light={true} />
        </>
      )
    }

    )

    return (
      <div style={{ fullWidth: true }}>
        {allPost}
      </div>
    );
  }
}

ShowPosts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowPosts);