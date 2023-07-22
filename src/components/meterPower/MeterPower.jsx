import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { Column } from '@ant-design/plots';
import axios from '../../api/axios';
import { Select, Button } from 'antd';
import moment from 'moment';
const { Option } = Select;

const MeterPower = () => {
  const current_year = moment().year();
  const current_month = moment().format('MM');
  const [power, setPower] = useState([]);
  const [month, setMonth] = useState(current_month);
  const [year, setYear] = useState(current_year);
  const [filter, setFilter] = useState('month');
  useEffect(() => {
    axios.get(`/api/v1/meter-powers/month/${current_year}-${current_month}`).then((res) => {
      console.log('res', res.data.data);
      setPower(res.data.data);
    });
  }, []);

  const listYear = [2021, 2022,2023];
  const listMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  // eslint-disable-next-line array-callback-return
  const data = power.map((item) => {
    let obj = {
      Month: item.day || item._id,
      Power: item.activePower || item.totalActivePower,
    };
    return obj;
  });
  // const data = [
  //   {
  //     Month: 'January',
  //     Power: 38,
  //   },
  // ];
  const config = {
    data,

    // các tên quy ước trục
    xField: 'Month',
    yField: 'Power',

    // label cho trục x
    label: {
      position: 'bottom',
      style: {
        fontSize: 24,
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },

    // css cho trục x
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
        style: {
          fill: 'white',
          opacity: 0.6,
          fontSize: 24,
        },
      },
    },
    meta: {
      Month: {
        alias: 'Month',
      },
      Power: {
        alias: 'Power',
      },
    },
  };

  const onChange = (value) => {
    setYear(value);
  };

  const onChangeMonth = (value) => {
    setMonth(value);
  };

  const onSubmit = () => {
    if (filter === 'year') {
      axios.get(`/api/v1/meter-powers/MonthInYear/${year}`).then((res) => {
        console.log('res', res.data.data);
        setPower(res.data.data);
      });
    } else {
      axios.get(`/api/v1/meter-powers/month/${year}-${month}`).then((res) => {
        console.log('res', res.data.data);
        setPower(res.data.data);
      });
    }
  };
  const onChangeFilter = (value) => {
    setFilter(value);
  };
  return (
    <div>
      <Row>
        <Col span="4">
          <Select
            showSearch
            placeholder="Select a year"
            optionFilterProp="year"
            onChange={onChange}
            size="large"
            style={{ width: 160 }}
            filterOption={(input, option) => option.year?.toLowerCase().includes(input.toLowerCase())}
          >
            {listYear.map((item) => {
              return (
                <Option key={item} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Col>
        <Col span="4">
          <Select
            showSearch
            placeholder="Select a month"
            optionFilterProp="month"
            onChange={onChangeMonth}
            size="large"
            style={{ width: 160 }}
            filterOption={(input, option) => option.month.toLowerCase().includes(input.toLowerCase())}
          >
            <Option value="01">1</Option>
            <Option value="02">2</Option>
            <Option value="03">3</Option>
            <Option value="04">4</Option>
            <Option value="05">5</Option>
            <Option value="06">6</Option>
            <Option value="07">7</Option>
            <Option value="08">8</Option>
            <Option value="09">9</Option>
            <Option value="10">10</Option>
            <Option value="11">11</Option>
            <Option value="12">12</Option>
            {/* {listMonth.map((item) => {
              if (item < 10) {
                var month_data = '0' + item;
              } else month_data = item;
              return (
                <Option key={item} value={item}>
                  {month_data}
                </Option>
              );
            })} */}
          </Select>
        </Col>

        <Col span="4">
          <Select
            showSearch
            placeholder="Filter"
            onChange={onChangeFilter}
            size="large"
            style={{ width: 160, color: 'black' }}
          >
            <Option value="month">Filter by month</Option>
            <Option value="year">Filter by year</Option>
          </Select>
        </Col>
        <Button type="primary" style={{ width: 160 }} size="large" onClick={onSubmit}>
          Lọc
        </Button>
      </Row>

      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '25px' }}>Biểu đồ sử dụng điện</h2>
      <Column {...config} />
    </div>
  );
};

export default MeterPower;
