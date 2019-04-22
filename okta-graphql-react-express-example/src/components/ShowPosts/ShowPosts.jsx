import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { MenuBar } from '../MenuBar';
import * as moment from 'moment';
import Component from '../../withAuth';

const styles = (theme) => ({
    card: {
        maxWidth: 400,
        margin: theme.spacing.unit * 5,
    },
    head: {
        fontSize: 20,
        textAlign: 'left',
    },
    actions: {
        display: 'flex',
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
})

class ShowPosts extends React.Component {
    state={
        liked:false,
        counter:0,
    }


    componentDidMount() {
   
        const { subscribe } = this.props;
        subscribe();
    };

    getDate = (date) => {
        moment.defaultFormat = 'dddd, MMMM Do YYYY, h:mm:ss a';
        return (moment(moment.utc(date).toDate().toString()).format(moment.defaultFormat));
    }
    
    getSortedData = (posts) => {
        posts.sort(function(a, b) {
          return (b.originalId - a.originalId);
        });
        return posts;
    }

    getFirstLetter = (name) => {
        return name.charAt(0).toUpperCase();
    };

    handleLike = () => {
        const { liked, counter } = this.state;
        if(liked)
        {
        this.setState({
            liked: !liked,
            color: 'red',
            counter: counter+1,
          });
        }
        else{
            this.setState({
                liked: !liked,  
                color: 'gray',
                counter: counter-1,
              });
        }
    }

    render() {
        console.log('props', this.props);
        const { classes, data} = this.props;
        const newArray = this.getSortedData(data);
        return (
            newArray.map(post => (
                <div>
                    <div align="center">
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                        {this.getFirstLetter(post.createdBy)}
                                    </Avatar>
                                }
                                action={

                                    (post.createdBy === 'Piyush')
                                    ?  <MenuBar data={post} />
                                    : ''    
                                }
                                title={post.createdBy}
                                subheader={this.getDate(post.createdAt)}
                                className={classes.head}
                            />
                            <CardContent>
                                <Typography variant="h6">{post.text}</Typography>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton aria-label="Add to favorites">
                                    <FavoriteIcon style={{ color: this.state.color }} onClick={this.handleLike}/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </div>
                </div>
            ))
        );
    }
}
ShowPosts.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ShowPosts);