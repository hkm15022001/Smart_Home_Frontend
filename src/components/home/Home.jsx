import { Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { AiOutlineAudio } from 'react-icons/ai';
import { BsFillStopCircleFill } from 'react-icons/bs';
import SpeechRecognitionApi from "components/common/SpeechRecognition";
import "./Home.css";
import { Card as CardAntd, notification } from "antd";
import axios from "../../api/axios";
const imgHome = `${process.env.PUBLIC_URL}image/home.jpg`;
const imgModelHome = `${process.env.PUBLIC_URL}image/model_home.jpg`;


const useStyles = makeStyles({
  root: {
    maxWidth: 540,
    marginBottom: 15,
  },
});



function Home(props) {
  const [isRecording, setIsRecording] = useState(false);
  const [output, setOutput] = useState("");
  useEffect(() => {
    let speech;
    if (isRecording) {
      speech = new SpeechRecognitionApi({
        output: document.querySelector('.output'),
        handleSpeechRecognitionResult: handleSpeechRecognitionResult,
      });
      speech.init();
    } else {
      if (speech) {
        speech.stop();
      }
    }

    return () => {
      if (speech) {
        speech.stop();
      }
    };
  }, [isRecording]);

  const handleMicrophoneClick = () => {
    setIsRecording(!isRecording);
  };

  const handleSpeechRecognitionResult = (result) => {
    axios
      .post(`/speech`, { message: result.toLowerCase() })
      .then((res) => {
        notification.success({
          message: res.data.msg,
          style: {
            borderRadius: 15,
            backgroundColor: '#b7eb8f',
          },
          duration: 2,
        });
      })
      .catch((err) => {
        console.log(err);
        notification.warn({
          message: 'Lệnh của bạn không phù hợp !',
          style: {
            borderRadius: 15,
            backgroundColor: '#fff2f0',
          },
          duration: 2,
        });
      });
  };
  const classes = useStyles();
  return (
    <div className="home">
      <Row>
        <Col span={12}>
          <Row style={{ marginBottom: "15px" }}>
            <CardAntd
              hoverable
            //   style={{ width: "540px", height: "312px", marginBottom: "15px" }}
            >
              <Typography gutterBottom variant="h5" component="p">
                Smart Home 1:
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                The house consists of two roofs stretching down to a narrow area, the whole house is painted white, combined with many layers of glass and large cedar wood panels.
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                In the middle of the house is a smartly designed high space that runs the entire length of the house, linking all other spaces of the house. Create harmony between the front and back of the house.
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                The basement of the house is designed differently to help light penetrate deeply, ensuring a living space filled with natural light throughout the day.
              </Typography>
            </CardAntd>
          </Row>

          <Row>
            <CardAntd
              hoverable
              style={{ height: "320px" }}
            >
              <Typography gutterBottom variant="h5" component="p">
                Smart Home 2:
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                In winter the entire valley is surrounded by fog, but the house is kept warm thanks to the smart design that helps to store solar energy, and the heating system.
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                Since the owner of the house works on a farm and raises cattle, the house is designed to have a good view to easily monitor the cattle in the valley through the large windows. Each room has a far-reaching view of the grasslands.
              </Typography>

            </CardAntd>
          </Row>
        </Col>

        <Col span={8}>
          <Row>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Image smart home"
                  height="248"
                  image={imgHome}
                  title="Image smart home"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center"
                  >
                    Smart Home 1
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Row>

          <Row>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Image smart home"
                  height="244"
                  image={imgModelHome}
                  title="Modeling of smart home"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center"
                  >
                    Smart home 2
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Row>
        </Col>

        <Col span={4} className="voice">
          {isRecording ? (
            <BsFillStopCircleFill style={{ fontSize: '40px', color: 'red', backgroundColor: 'white' }} onClick={handleMicrophoneClick} />
          ) : (
            <AiOutlineAudio style={{ fontSize: '40px', backgroundColor: 'white' }} onClick={handleMicrophoneClick} />
          )}

          <Typography className="output" style={{ backgroundColor: 'white' }} variant="body1" component="p">
          </Typography>
        </Col>

      </Row>
    </div>
  );
}

export default Home;
