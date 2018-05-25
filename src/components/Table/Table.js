import React, { Component } from 'react';
import { Link } from 'dva/router';
import { PAGE_SIZE } from '../../constants';
import { connect } from 'dva';
import { Badge, Table, Popconfirm, Button, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Table.less';
import queryString from 'query-string';

function TableSample({ dispatch }) {
    let list = [
        {
            "id": "1",
            "code": "1",
            "name": "apple"
        },
        {
            "id": "2",
            "code": "1",
            "name": "pear"
        },
        {
            "id": "3",
            "code": "2",
            "name": "orange"
        }
    ]
    let items = []
    list.map(item => {
        let obj = {}
        obj.id = item.id
        obj.code = item.code
        obj.name = item.name
        obj.rowSpanCount = 1
        for (let i = 0; i < items.length; i++) {
            if (items[i].code === obj.code) {
                items[i].rowSpanCount++
                obj.rowSpanCount = 0
                break;
            }
        }
        items.push(obj)
    }
    )
    const columns = [
        {
            title: '编号',
            width: "20%",
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Code',//
            width: "20%",
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: '名字',//
            width: "20%",
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '操作',//
            dataIndex: 'operation',
            render: (text, record, index) => {
                return {
                    children: <Button>{"发布"}</Button>,
                    props: {
                        rowSpan: record.rowSpanCount
                    }
                }
            }
        }
    ];

    return (
        <div>
            <h2>
                Table
      </h2>
            <Table columns={columns} dataSource={items}
                rowKey={row => row.id}
                scroll={{ x: 1300 }} />
        </div>
    );

}



export default connect()(TableSample)
