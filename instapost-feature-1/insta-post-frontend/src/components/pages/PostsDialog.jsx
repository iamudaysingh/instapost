import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { AddPostDialog } from '../AddPostDialog';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { ShowPosts } from '../ShowPosts';

const GET_POSTS = gql`
  query {
    posts {
        originalId
        createdBy
        text
        createdAt
        likes
    }
  }
`;
const POST_SUBSCRIPTION = gql`
  subscription {
    postCreated {
        originalId
        createdBy
        text
        createdAt
        likes
    }
  }
`;

const ADD_POST = gql`
  mutation($createdBy: String!, $text: String!) {
    createPost(createdBy: $createdBy, text: $text) {
      originalId
      createdBy
      text
      createdAt
      likes
    }
  }
`;


class PostsDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => () => {
    this.setState({
      open: false,
    });
  };

  subscribePost = (subscribeToMore) => {
    subscribeToMore({
      document: POST_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newData = subscriptionData.data.postCreated;
        const data = Object.assign({}, prev, {
          posts: [...prev.posts, newData]
        });
        return data;
      },
    });
  };

  render() {
    const { open } = this.state;
    return (
      <>
        <Query query={GET_POSTS}>
          {({ subscribeToMore, loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            const postRecord = data.posts;
            return (
              <>
                <Mutation mutation={ADD_POST}>
                  {(createPost) => (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => this.handleClickOpen()}
                      >
                        Click here to post
                    </Button>
                      <AddPostDialog open={open} onClose={this.handleClose()} createPost={createPost} />
                    </>
                  )}
                </Mutation>
                <ShowPosts data={postRecord} subscribe={() => this.subscribePost(subscribeToMore)} />
              </>
            )
          }}
        </Query>
      </>
    );
  }
}

PostsDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default PostsDialog;
