// Devices/Devices.js
import React, { useState, useEffect } from 'react';
import CustomTable from '../Common/Table';
import { fetchDeviceData, EditDeviceData } from './devicesAPI';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { Switch } from 'antd';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function Devices() {
  const [deviceData, setDeviceData] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.id === editingKey;


  const edit = (record) => {
    form.setFieldsValue({
      device_name: '',
      device_ip: '',
      is_on: record.is_on,
      ...record,
    });
    setEditingKey(record.id);
  };


  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...deviceData];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log(row);
        setDeviceData(newData);
        // Send the API request to update the device data
        EditDeviceData(key, row) // Pass the 'key' (ID) and 'row' (updated data) to the API function
        .then((response) => {
          // Handle the API response, if needed
          console.log('Device data updated:', response);
        })
        .catch((error) => {
          console.error('Error updating device data:', error);
        });
        setEditingKey('');
      } else {
        newData.push(row);
        setDeviceData(newData);
        setEditingKey('');
      }

      console.log(row)
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  useEffect(() => {
    // Fetch device data using devicesAPI
    fetchDeviceData()
      .then((data) => setDeviceData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

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
      editable: true,
    },
    {
      title: 'Device IP',
      dataIndex: 'device_ip',
      key: 'device_ip',
      editable: true,

    },
    {
      title: 'Status',
      dataIndex: 'is_on',
      key: 'is_on',
      editable: false,

      render: (isOn) =>  <Switch defaultChecked={isOn} />,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => {
            edit(record)}}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <h1>Device Data:</h1>
      <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={deviceData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>    </div>
  );
}

export default Devices;
