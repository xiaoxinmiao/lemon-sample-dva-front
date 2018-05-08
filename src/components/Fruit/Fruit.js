import React, { Component } from 'react';
import { Link } from 'dva/router';
import { PAGE_SIZE } from '../../constants';
import { connect } from 'dva';
import { Badge,Table,Popconfirm ,Button,Icon} from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Fruit.less';
import queryString from 'query-string';

function Fruit({dispatch,loading,list,total, page: current }) {
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/fruit',
      search: queryString.stringify({ page:page }),
    }));
  }
  
  function onCreateHandler(record) {
    dispatch(routerRedux.push({
      pathname: '/fruitForm',
      record,
      pageMode:"new",
    }));
  }

  function onEditHandler(record) {
    dispatch(routerRedux.push({
      pathname: '/fruitForm',
      record,
      pageMode:"edit",
    }));
  }

  function onDeleteHandler(record) {
    dispatch({
      type: 'fruitForm/delete',
      payload: record
  });
  }
  const onCreate = onCreateHandler.bind(this)
  const onEdit = onEditHandler.bind(this)
  const onDelete = onDeleteHandler.bind(this)

  const columns = [
    { title: '编号',//
      width: 100,
      dataIndex: 'id',
      fixed: 'left'
    },
    { title: '名字',//
      dataIndex: 'name',
      fixed: 'left'
    },
    { title: '颜色', dataIndex: 'color' },//
    { title: '价格', dataIndex: 'price' },//
    {
      title: '操作',//
      dataIndex: 'operation',
      fixed: 'right',
      width: 200,
      render: (text, record) => (
        <span className={styles.operation}>
          <a onClick={()=>{onEdit(record)}}>Edit</a>
          <Popconfirm title="Confirm to delete?" onConfirm={()=>{onDelete(record)}}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  let newDatas = list.map(
    (data, index) => {
        data.key = index;
        // data add a new property
        return data;
    }
  );

  const pagination = {
    // className : "order-alarm-table-pagination",
    total : total,
    current : current,
    pageSize : PAGE_SIZE,
    onChange : pageChangeHandler,
  };

  return (
    <div className={styles['fruit-table']}>
      <h2>
        Fruit table
      </h2>
      <div>
          <Button className={styles.create} type="primary" onClick={onCreate}><Icon type="plus"/>Create</Button>
        </div>
      <Table columns={columns} dataSource={newDatas}
      loading={loading}
      rowKey={row => row.key}
      pagination={pagination}
      scroll={{ x: 1300 }} />
    </div>
  );

}

function mapStateToProps(state) {
  const {loading, list, total, page } = state.fruit;
  return {
    loading: state.loading.models.fruit,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Fruit)
