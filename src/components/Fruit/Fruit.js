import { connect } from 'dva';
import { Button, Form, Input, Layout, Row, Card, message } from 'antd';
import styles from './Fruit.less';
import { routerRedux, withRouter } from 'dva/router';
import queryString from 'query-string';
const FormItem = Form.Item
const Content = Layout.Content

const Fruit = ({ dispatch, pageMode, currentFruit, form }) => {
    const { getFieldDecorator, setFieldsValue, getFieldValue } = form ? form : {};

    const { id, name, color, price, storeName } = currentFruit ? currentFruit : {};
    function onBack() {
        dispatch(routerRedux.goBack());
    }
    function onSave() {
        form.validateFields((err, formValues) => {
            if (err) {
                return
            }
            let path = 'fruit/new'
            let values = {
                name: formValues.name,
                color: formValues.color,
                price: formValues.price,
            }
            if (pageMode === 'edit') {
                path = 'fruit/edit'
                values = {
                    ...values,
                    id: formValues.id,
                }
            }
            dispatch({
                type: path,
                payload: values,
                onComplete: (data) => {
                    if (data && data.success) {
                        message.success("Save success.")
                        dispatch(routerRedux.push({
                            pathname: '/fruitList',
                            pageMode: 'reload',
                        }))
                    } else {
                        let errMsg = data && data.error && data.error.message
                        message.error("Save failure:" + errMsg)
                    }
                },
            });
        });
    }

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    return (
        <Content>
            <div>
                <Row>
                    <Card bodyStyle={{
                        padding: '0.4rem 2.4rem'
                    }}>
                        <Button style={{ borderWidth: '0rem' }} icon="left-circle-o" onClick={() => onBack()} >返回</Button>
                        <Button style={{ marginLeft: '1rem', textAlign: 'right' }} type="primary" onClick={() => onSave()}>保存</Button>
                    </Card>
                </Row>
                <Row style={{ marginTop: '1rem' }}>
                    <Card>
                        <div
                            style={{
                                fontSize: 14,
                                marginBottom: '1rem',
                                fontWeight: 500,
                            }}
                        >
                            <Form>
                                <FormItem label='storeName' {...formItemLayout}
                                >{
                                        getFieldDecorator(`storeName`, {
                                            initialValue: storeName,
                                        })(
                                            <span>{storeName}</span>
                                        )}
                                </FormItem>
                                <FormItem label='name' {...formItemLayout}
                                >{
                                        getFieldDecorator(`name`, {
                                            initialValue: name,
                                            rules: [{
                                                required: true,
                                                message: 'name is required!',
                                            }],
                                        })(
                                            <Input placeholder="Please enter the name" />
                                        )}
                                </FormItem>
                                <FormItem label='color' {...formItemLayout}
                                >{
                                        getFieldDecorator(`color`, {
                                            initialValue: color,
                                            rules: [{
                                                required: true,
                                                message: 'color is required!',
                                            }],
                                        })(
                                            <Input placeholder="Please enter the color" />
                                        )}
                                </FormItem>
                                <FormItem label='price' {...formItemLayout}
                                >{
                                        getFieldDecorator(`price`, {
                                            initialValue: price,
                                            rules: [{
                                                required: true,
                                                message: 'price is required!',
                                            }],
                                        })(
                                            <Input placeholder="Please enter the price" />
                                        )}
                                </FormItem>
                                <FormItem  {...formItemLayout}
                                >{
                                        getFieldDecorator(`id`, {
                                            initialValue: id,
                                        })(
                                            <Input hidden={true} />
                                        )}
                                </FormItem>
                            </Form>
                        </div>
                    </Card>
                </Row>
            </div>
        </Content>
    );
}

const fruitFrom = Form.create()(Fruit)

function mapStateToProps(state, ownProps) {
    const { currentFruit } = state.fruit;
    const search = ownProps && ownProps.location && ownProps.location.search ? queryString.parse(ownProps.location.search) : {}
    return {
        pageMode: search.pageMode ? search.pageMode : '',
        currentFruit,
    };
}

export default withRouter(connect(mapStateToProps)(fruitFrom))
