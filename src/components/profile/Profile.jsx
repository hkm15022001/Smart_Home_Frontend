import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { UserOutlined } from '@ant-design/icons';
import { Row } from 'antd';
// import UserData from '../../database/user.js';
import axios from '../../api/axios';
const imgProfile = `${process.env.PUBLIC_URL}image/img_profile.jpg`;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    minWidth: 700,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
}));

function Profile(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    console.log('userId: ', userId);
    axios
      .get(`/api/v1/users/info`)
      .then((res) => {
        let user = res.data.data.info;
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log('user '+user)

  const handleExpandClick = () => {
    setExpanded(!expanded);
    console.log('user: ', user);
  };

  return user === undefined ? (
    <h3>User is undefined</h3>
  ) : (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card className={classes.root}>
          <CardHeader
            avatar={<Avatar size="large" icon={<UserOutlined />} />}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={user.fullName}
            subheader="My house"
          />
          <CardMedia className={classes.media} image={imgProfile} title="Paella dish" />
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="div">
              <Row>Account ID: {user._id}</Row>
              <Row>Email: {user.email}</Row>
              <Row>Phone: {user.phone}</Row>
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* expand detail user */}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Profile:</Typography>
              <Typography paragraph>This is website for smart house.</Typography>
              <Typography paragraph>Detail profile</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
