import { connect } from 'dva';
import { Popconfirm, Button, Form, Input ,Select} from 'antd';
import styles from './Fruit.less';
import { routerRedux } from 'dva/router';
const FormItem = Form.Item;

const FruitForm = ({ dispatch,  pageMode,record, form }) => {
    function onOkHandler(el, op) {
        form.validateFields((err, values) => {
            if (!err) {
                switch (pageMode) {
                    case "edit":
                        dispatch({
                            type: 'fruitForm/edit',
                            payload: values
                        });
                        break;
                    case "new":
                        dispatch({
                            type: 'fruitForm/new',
                            payload: values
                        });
                        break;
                    default:
                        break;
                }
            }
        });
    }
    function onBackHandler() {
        dispatch(routerRedux.push({
            pathname: '/Fruit',
        }));
    }

    const onOk = onOkHandler.bind(this)
    const backHandler = onBackHandler.bind(this)
    const { getFieldDecorator } = form;
    const { id, name, path, color, price } = record;
    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 6 }
    };
    const tailFormItemLayout = {
        wrapperCol: { span: 6, offset: 2 }
    };
   const visibleList =["private","public","internal"]
    return (
        <div>
            <div className={styles.pageTitle}>
                <Button icon="left-circle-o" onClick={backHandler} />
                <span className={styles.leftMargin5}>
                    {(function (mode) {
                        if (mode == "Edit") return "编辑 Fruit"
                        else return "创建 Fruit"
                    })(pageMode)
                    }
                </span>
            </div >
            <Form>
                <FormItem className={styles.hidden}    {...formItemLayout} label="编号">
                    {
                        getFieldDecorator('id', {
                            initialValue: id,
                            rules: [{ required: false, message: 'Please input your id!' }],
                        })(<Input  readOnly={true}/>)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout} label="名称">
                    {
                        getFieldDecorator('name', {
                            initialValue: name,
                            rules: [{ required: true, message: 'Please input your name!' }],
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout} label="颜色">
                    {
                        getFieldDecorator('color', {
                            initialValue: color,
                            rules: [{ required: true, message: 'Please input your color!' }],
                        })(<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout} label="价格">
                    {
                        getFieldDecorator('price', {
                            initialValue: price,
                            rules: [{ required: false, message: 'Please input your price!' }],
                        })(<Input />)
                    }
                </FormItem>
                <FormItem     {...tailFormItemLayout}>
                    <Button type="primary" onClick={onOk}>
                        {pageMode}
                    </Button>
                </FormItem>
            </Form >
        </div>
    );
}

const fruitFromCreate = Form.create()(FruitForm)

function mapStateToProps(state) {
    const { pageMode, record } = state.fruitForm;
    return {
        pageMode,
        record,
    };
}

export default connect(mapStateToProps)(fruitFromCreate)
