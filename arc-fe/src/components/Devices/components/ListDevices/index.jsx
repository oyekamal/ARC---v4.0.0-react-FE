import React, { useState } from 'react';
import { Card, Space, Table, Tag, Typography, Switch, Button } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    EditOutlined,
    DeleteOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { loadListDevices } from '../../../../redux/slice';




const columns = [
    {
        title: 'ID',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Device IP',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Device Name',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'ON/OFF',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Switch defaultChecked />
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button icon={<EditOutlined />} />
                <Button icon={<DeleteOutlined />} />
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];


const ListDevices = () => {
    
    const dispatch = useDispatch();
    const [mockdata, setMockData] = useState();

    useEffect(() => {
        dispatch(
            loadListDevices()
        );
    }, []);
    return (
        <Card>
            <Typography.Title>Devices List</Typography.Title>
            <Table columns={columns} dataSource={data} />
        </Card>
    )

}
export default ListDevices;