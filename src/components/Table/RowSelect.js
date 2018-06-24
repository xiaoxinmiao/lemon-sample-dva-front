import React, { Component } from 'react';
import { PAGE_SIZE } from '../../constants';
import { connect } from 'dva';
import { Layout, Table, Popconfirm, Button, Icon, Form, Row, Col, Card, message, Input } from 'antd';
const FormItem = Form.Item
const Content = Layout.Content
const Search = Input.Search


const RowSelect = ({ dispatch, loading, list, total, page: current, form, selectedItem }) => {
    selectedItem = selectedItem ? selectedItem : {}
    const { getFieldDecorator, setFieldsValue, getFieldValue } = form ? form : {};
    function onSearch() {
        list = []//for clear checkbox if exist checkbox in table
        fetchAll({ msgShow: true })
    }
    function onPressEnter() {
        onSearch()
    }
    function onChangeName(e, l) {
        searchCondition.name = e.target.value
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

            let reqType = "rowSelect/fetchAll"
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
            title: 'id',//
            dataIndex: 'id',
            width: '20%',
        },
        {
            title: 'Name',//
            dataIndex: 'name',
            width: '20%',
        },
        { title: 'Color', dataIndex: 'color', width: '20%', },//
        { title: 'Price', dataIndex: 'price', width: '20%', },//
    ];

    const rowSelection = {
        selectedRowKeys: selectedItem.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            let selectedRowsNew = []
            let selectedRowsOld = selectedItem.selectedRows ? selectedItem.selectedRows : []
            selectedRowsNew = selectedRows.concat(selectedRowsOld)
            selectedRowsNew = selectedRowsNew.filter((item, index, self) => index === self.findIndex((t) => (
                t.id == item.id
            )));
            let removeItem = list && list.filter((item) => -1 === selectedRows.findIndex((t) => (
                t.id == item.id
            )));
            selectedRowsNew = selectedRowsNew.filter((item) => -1 === (removeItem && removeItem.findIndex((t) => (
                t.id == item.id
            ))));
            dispatch({
                type: 'rowSelect/setSelectedItem',
                payload: {
                    selectedItem: {
                        selectedRowKeys,
                        selectedRows: selectedRowsNew,
                    },
                },
            });
        },
    }
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
                                        initialValue: name,
                                    })(
                                        <Search
                                            placeholder={'Please type name.'}
                                            onPressEnter={() => onPressEnter()}
                                            onChange={(e, l) => onChangeName(e, l)}
                                            onSearch={() => onSearch()}
                                            enterButton="Search"
                                        />
                                    )
                                }
                            </FormItem>
                        </Form>
                    </div>
                </Card>
            </Row>
            <Row style={{ marginTop: '1rem' }}>
                <Col>
                    <span>
                        <span style={{display:'block'}}>{"selected row ids"}</span>
                        {
                            selectedItem.selectedRows && selectedItem.selectedRows.map((item,index) =>
                                <span style={{display:'block'}} key={index}>{'id:'}{item.id}</span>
                            )
                        }
                    </span>
                </Col>
            </Row>
            <Row style={{ marginTop: '2rem' }}>
                <Table columns={columns} dataSource={list}
                    loading={loading}
                    rowKey={row => row.id.toString()}
                    pagination={pagination}
                    rowSelection={rowSelection}
                />
            </Row>
        </Content>
    );

}

const RowSelectFrom = Form.create()(RowSelect)

function mapStateToProps(state) {
    state = state ? state : {}
    const { list, total, page, selectedItem } = state.rowSelect;
    return {
        loading: state.loading && state.loading.models && state.loading.models.rowSelect,
        list,
        total,
        page,
        selectedItem,
    };
}

export default connect(mapStateToProps)(RowSelectFrom)
