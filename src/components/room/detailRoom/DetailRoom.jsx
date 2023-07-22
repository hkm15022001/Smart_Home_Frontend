import { Card, Carousel, Col, notification, Row, Switch } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SiApacheairflow } from 'react-icons/si';
import { GiLightBulb } from 'react-icons/gi';
import { ImPower } from 'react-icons/im';
import { RiCharacterRecognitionFill } from 'react-icons/ri';
import { AiFillCodeSandboxSquare } from 'react-icons/ai';
import { TiDeviceDesktop } from 'react-icons/ti';
import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs';
import { Pie } from 'ant-design-pro/lib/Charts';
import { Liquid } from '@ant-design/plots';
import { AiOutlineAudio } from 'react-icons/ai';
import { BsFillStopCircleFill } from 'react-icons/bs';

import axios from '../../../api/axios';
import './DetailRoom.css';

const contentStyle = {
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  borderRadius: 15,
};

const configLiquid = {
  autoFill: false,
  height: 150,
  width: 150,
  outline: {
    border: 8,
    distance: 8,
  },
  wave: {
    length: 128,
  },
};

// Với mỗi room sẽ gán các device cho nó
function DetailRoom(props) {
  const roomId = useParams().id;
  // const token = localStorage.getItem('token');
  const [lights, setLights] = useState([]);
  const [airCondition, setAirCondition] = useState();
  const [humidity, setHumidity] = useState();
  const [temperature, setTemperature] = useState();
  const [door, setDoor] = useState();
  const [number_devices, setNumberDevices] = useState();
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    axios.get(`/api/v1/rooms/${roomId}`).then((res) => {
      let light = [];
      let listDevices = res.data.data;
      console.log('listDevices', listDevices);
      let count = listDevices === undefined ? 0 : listDevices.length;
      setNumberDevices(count);
      // eslint-disable-next-line array-callback-return
      listDevices.map((item, index) => {
        if (item.deviceName === 'fan') {
          setAirCondition(item);
        } else if (item.deviceName === 'door') {
          setDoor(item);
        } else {
          light.push(item);
        }
      });
      console.log('res ', listDevices);
      setLights(light);
    });
  }, []);

  // Update chart độ ẩm nhiệt độ từ sensor
  useEffect(() => {
    setInterval(() => {
      axios.get('/api/v1/sensors').then((res) => {
        console.log('data sensor : ', res.data.data.sensors);
        const dataSensor = res.data.data.sensors;
        setHumidity(dataSensor.humidityAir / 100);
        setTemperature(dataSensor.temperature);
      });
    }, 1000);
  }, []);


  // sự kiện click vào switch on/off mỗi phòng
  const onChange = (id, checked, event) => {
    console.log('checked ', id, checked, event);
    let status = 'off';
    if (checked === true) {
      status = 'on';
    } else {
      status = 'off';
    }
    axios
      .patch(`/api/v1/devices/${id}`, { status: status })
      .then((res) => {
        let device = res.data.data;
        console.log('device ', device);
        if (airCondition && id === airCondition._id) {
          setAirCondition(device);
        } else {
          let tmp = lights.map((item) => item);
          let index = findById(id, lights);
          tmp[index].status = status;
          console.log('tmp ', tmp);
          setLights(tmp);
        }
        console.log(device.status);
        if (device.status === 'on') {
          notification.success({
            message: 'Turn on device successfully!',
            style: {
              borderRadius: 15,
              backgroundColor: '#b7eb8f',
            },
            duration: 2,
          });
        } else {
          notification.success({
            message: 'Turn off device successfully!',
            style: {
              borderRadius: 15,
              backgroundColor: '#b7eb8f',
            },
            duration: 2,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: 'server has an error!',
          style: {
            borderRadius: 15,
            backgroundColor: '#fff2f0',
          },
          duration: 2,
        });
      });
  };

  // Thực hiện khóa/mở cửa
  const handleLock = () => {
    console.log(door);
    let status = door.status;
    let tmp = 'off';
    if (status === 'on') {
      tmp = 'off';
    } else {
      tmp = 'on';
    }
    if (status === 'open') {
      tmp = 'off';
    }
    axios
      .patch(`/api/v1/devices/${door._id}`, { status: tmp })
      .then((res) => {
        console.log('te ', res.data.data);
        let door = res.data.data;
        setDoor(door);
        if (door.status === 'off') {
          notification.success({
            message: 'Lock door successfully!',
            style: {
              borderRadius: 15,
              backgroundColor: '#b7eb8f',
            },
            duration: 2,
          });
        } else {
          notification.success({
            message: 'Open door successfully!',
            style: {
              borderRadius: 15,
              backgroundColor: '#b7eb8f',
            },
            duration: 2,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: 'server has an error!',
          style: {
            borderRadius: 15,
            backgroundColor: '#fff2f0',
          },
          duration: 2,
        });
      });
  };

  // tìm light trong array lights
  const findById = (id, arr) => {
    let index = -1;
    // eslint-disable-next-line array-callback-return
    arr.map((item, i) => {
      if (item._id === id) {
        index = i;
      }
    });
    return index;
  };

  // mặc định sẽ gồm 1 AirConditional, 1 door, và nhiều light
  return (
    <div className="detail-room">
      <Row>
        <Col span={16}>
          <Row className="list-switch">
            {/* Air Conditional */}
            <Col span={6}>
              {airCondition === undefined ? (
                ''
              ) : (
                <Card
                  hoverable
                  cover={
                    <SiApacheairflow
                      size={50}
                      color="#518e1a"
                      className={airCondition.status === 'on' ? 'icon-air' : ''}
                    />
                  }
                >
                  <Switch
                    checkedChildren="on"
                    unCheckedChildren="off"
                    checked={airCondition.status === 'on' ? true : false}
                    onChange={(checked, event) => onChange(airCondition._id, checked, event)}
                  />
                  <Meta title={airCondition.name} />
                </Card>
              )}

            </Col>

            {/* lights */}
            {lights.map((item, index) => {
              return (
                <Col span={6} key={index}>
                  <Card hoverable cover={<GiLightBulb size={54} color={item.status === 'on' ? '#ece707' : 'black'} />}>
                    <Switch
                      checkedChildren="on"
                      unCheckedChildren="off"
                      checked={item.status === 'on' ? true : false}
                      onChange={(checked, event) => onChange(item._id, checked, event)}
                    />
                    <Meta title={item.name} />
                  </Card>
                </Col>
              );
            })}

          </Row>
          {/* temp-3 : các ảnh động */}
          <Row className="temp-3">
            <Col span={24}>
              <div className="image-room">
                <Carousel autoplay>
                  <div>
                    <div className="carousel-1" style={contentStyle}></div>
                  </div>
                  <div>
                    <div className="carousel-2" style={contentStyle}></div>
                  </div>
                  <div>
                    <div className="carousel-3" style={contentStyle}></div>
                  </div>
                  <div>
                    <div className="carousel-4" style={contentStyle}></div>
                  </div>
                </Carousel>
              </div>
            </Col>
          </Row>
        </Col>
        {/* col-2 : phần chứa icon khóa + biểu đồ nhiệt độ + detail room */}
        <Col span={8}>
          <Row className="detail-2">
            <Col span={9} style={{ marginTop: 0, marginLeft: 5, marginRight: 10, color: 'white' }}>
              <Liquid percent={humidity} {...configLiquid} />
            </Col>
            <Col span={9} style={{ backgroundColor: 'black' }}>
              {/* biểu đồ của nhiệt độ và độ ẩm */}
              {temperature === undefined ? (
                ''
              ) : (
                <Pie
                  color="#0041ff"
                  percent={temperature}
                  subTitle="Nhiệt độ"
                  total={temperature + '°C'}
                  height={165}
                />
              )}
            </Col>
            {/* icon khóa mở cửa */}
            <Col span={5} style={{ position: 'relative' }}>
              {door === undefined ? (
                ''
              ) : door.status !== 'off' ? (
                <div className="lock">
                  <BsFillUnlockFill size={60} onClick={handleLock} className="icon-lock" color="#0041ff" />
                </div>
              ) : (
                <div className="lock">
                  <BsFillLockFill size={60} onClick={handleLock} className="icon-lock" color="red" />
                </div>
              )}
            </Col>
          </Row>

          {/* Phần detail room */}
          <Row className="detail-3">
            <Col span={24}>
              {/* <Card hoverable cover={<FaLightbulb size={50} />}>
                                <div style={{ fontSize: 30 }}>Detail</div>
                            </Card> */}
              <div className="info-room">
                <Row>
                  <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="title-detail">Detail of Room</div>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <div
                      style={{
                        marginLeft: 18,
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <TiDeviceDesktop size="20" />
                      &nbsp; Number of devices: {number_devices}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        marginLeft: 18,
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <ImPower size="20" />
                      &nbsp;Power: 220 V
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <div
                      style={{
                        marginLeft: 18,
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <AiFillCodeSandboxSquare size="20" />
                      &nbsp;Square: 50m
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        marginLeft: 18,
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <RiCharacterRecognitionFill size="20" />
                      &nbsp;Ampe: 1,5 A
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

    </div>
  );
}

export default DetailRoom;
