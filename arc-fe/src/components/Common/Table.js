// Common/Table.js
import React from 'react';
import { Table } from 'antd';
import { Switch } from 'antd';

function CustomTable({ data }) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Device Name',
      dataIndex: 'device_name',
      key: 'device_name',
    },
    {
      title: 'Device IP',
      dataIndex: 'device_ip',
      key: 'device_ip',
    },
    {
      title: 'Status',
      dataIndex: 'is_on',
      key: 'is_on',

      render: (isOn) =>  <Switch checked={isOn}/>,
    },
    {
      title: 'edit',
      dataIndex: 'edit',
      key: 'edit',
      // render: (isOn) => (isOn ? 'On' : 'Off'),
    },
  ];

  return (
    <Table dataSource={data} columns={columns} />
  );
}

export default CustomTable;
