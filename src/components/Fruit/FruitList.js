import React, { Component } from 'react';
import { Link } from 'dva/router';
import { PAGE_SIZE } from '../../constants';
import { connect } from 'dva';
import { Layout, Table, Popconfirm, Button, Icon, Form, Row, Card, message, Input } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Fruit.less';
import queryString from 'query-string';
const FormItem = Form.Item
const Content = Layout.Content
const Search =Input.Search


const FruitList = ({ dispatch, loading, list, total, page: current, form,searchCondition }) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form ? form : {};
  searchCondition = searchCondition ? searchCondition : {}
  const { name } = searchCondition
  function onCreate() {
    dispatch(routerRedux.push({
      pathname: '/fruit',
      search: queryString.stringify({ pageMode: 'new' }),
    }));
  }

  function onEdit(record) {
    dispatch(routerRedux.push({
      pathname: '/fruit',
      search: queryString.stringify({ id: record.id, pageMode: 'edit' }),
    }));
  }

  function onDelete(record) {
    dispatch({
      type: "fruit/delete",
      payload: { id: record.id },
      onComplete: (data) => {
        if (data && data.success) {
          message.success("Delete success")
        } else {
          let errMsg = data && data.error && data.error.message
          message.success("Delete failure:" + errMsg)
        }
        fetchAll({})
      },
    })
  }
  function onSearch() {
    list=[]//for clear checkbox if exist checkbox in table
    fetchAll({ msgShow: true })
  }
  function onPressEnter() {
    onSearch()
  }
  function onChangeName(e, l) {
    searchCondition.name=e.target.value
  }

  const pagination = {
    total: total,
    current: current,
    pageSize: PAGE_SIZE,
    onChange: pageChangeHandler,
  };
  function pageChangeHandler(page) {
    fetchAll({ page: page })
  }


  function fetchAll({ page, msgShow }) {
    form.validateFields((err, formValues) => {
      if (err) {
        return
      }

      let reqType = "fruit/fetchAll"
      const values = {
        name: formValues.name,
      }
      dispatch({
        type: reqType,
        payload: { page: page ? page : 1, values },
        onComplete: (data) => {
          if (msgShow) {
            if (data && data.success) {
              message.success("Search Success")
            } else {
              let errMsg = data && data.error && data.error.message
              message.error("Search failure:" + errMsg)
            }
          }
        },
      })

    })
  }


  const columns = [
    {
      title: 'Name',//
      dataIndex: 'name',
      width: '20%',
    },
    { title: 'Color', dataIndex: 'color', width: '20%', },//
    { title: 'Price', dataIndex: 'price', width: '20%', },//
    {
      title: 'Operation',//
      dataIndex: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <a onClick={() => onEdit(record)}>Edit</a>
          <Popconfirm title="Confirm to delete?" onConfirm={() => onDelete(record)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];


  return (
    <Content>
      <Row>
        <Card bodyStyle={{
          padding: '0.4rem 2.4rem'
        }}>
          <div style={{
            fontSize: 14,
            fontWeight: 500,
          }}>
            <Form layout={'inline'}>
              <FormItem label=''
              >
                {
                  getFieldDecorator('name', {
                    initialValue:name,
                  })(
                    <Search
                      placeholder={'Please type name.'}
                      onPressEnter={() => onPressEnter()}
                      onChange={(e, l) => onChangeName(e, l)}
                      onSearch={()=>onSearch()}
                      enterButton="Search"
                    />
                  )
                }
              </FormItem>
              <FormItem style={{ marginLeft: '2rem' }}
              >
                <Button onClick={() => onCreate()} type="primary"><Icon type="plus" />{"Create"}</Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </Row>
      <Row>
        <Table columns={columns} dataSource={list}
          loading={loading}
          rowKey={row => row.id.toString()}
          pagination={pagination}
        />
      </Row>
    </Content>
  );

}

const FruitListFrom = Form.create()(FruitList)

function mapStateToProps(state) {
  state = state ? state : {}
  const { list, total, page, searchCondition } = state.fruit;
  return {
    loading: state.loading && state.loading.models && state.loading.models.fruit,
    list,
    total,
    page,
    searchCondition,
  };
}

export default connect(mapStateToProps)(FruitListFrom)
