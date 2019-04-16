import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const ITEM_HEIGHT = 48;
const DELETE_POST = gql`
  mutation($originalId: ID!) {
    deletePost(originalId: $originalId) {
      originalId
      createdBy
      text
      createdAt
      likes
    }
  }
`;

class MenuBar extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDelete = (deletePost) => {
    this.setState({ anchorEl: null });
    const { data } = this.props;
    const originalId = data.originalId;
    console.log('+++++++++++++++', data);
    deletePost({ variables: { originalId }});
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Mutation mutation={DELETE_POST}>
          {(deletePost) => (
            <div>
            <IconButton
              aria-label="More"
              aria-owns={open ? 'long-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                },
              }}
            >
              <MenuItem onClick={() => this.handleClose}>
                {"Edit"}
              </MenuItem>
              <MenuItem onClick={() => this.handleDelete(deletePost)}>
                {"Delete"}
              </MenuItem>
            </Menu>
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default MenuBar;