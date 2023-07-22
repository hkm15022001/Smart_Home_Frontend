import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { roomList, imageRoom } from '../../database/Rooms/Roomsconfig';
// import axios from '../../api/axios';

const useStyles = makeStyles({
  root: {
    maxWidth: 540,
    marginBottom: 15,
    marginRight: 15,
  },
});

function renderRooms(classes, navigate) {
  let rooms = roomList.map((room, index) => {
    return (
      <Col span={12} key={room.id}>
        <Card
          className={classes.root}
          onClick={() => {
            navigate(`/rooms/${room.id}`);
          }}
        >
          {/* Phần slide ảnh */}
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Image smart home"
              height="240"
              image={imageRoom.get(room.image)}
              title={room.name}
            />
            <CardContent style={{ padding: '4px' }}>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                {room.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Col>
    );
  });
  return rooms;
}

function Room(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  // const [rooms, setRooms] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('/api/v1/rooms')
  //     .then((res) => {
  //       console.log(res.data.data.rooms);
  //       setRooms(res.data.data.rooms);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div className="rooms">
      <Row>{renderRooms(classes, navigate)}</Row>
    </div>
  );
}

export default Room;
