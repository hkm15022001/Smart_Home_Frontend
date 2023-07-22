import React from 'react';
import { Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { deviceList, icon } from '../../database/Devices/DevicesConfig';
import './Devices.css';

const renderDevices = () => {
  let data = deviceList.map((device, index) => {
    return (
      <Col span={8} key={device.id}>
        {/* icon.get sẽ return nội dung */}
        <Card hoverable cover={icon.get(device.icon)}>
          <Meta title={device.name} description={device.description} />
        </Card>
      </Col>
    );
  });
  return data;
};

function Devices(props) {
  return (
    <div className="Devices">
      <Row justify="start">{renderDevices()}</Row>
    </div>
  );
}

export default Devices;
