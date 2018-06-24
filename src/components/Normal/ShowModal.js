import { connect } from "dva";
import { Input,Form } from 'antd';
import A1 from '../Modal/A1';
const Search = Input.Search

const ShowModal = ({ dispatch,name, form }) => {
    const { getFieldDecorator, setFieldsValue, getFieldValue } = form ? form : {};
 
    function onSearch(e) {
        dispatch({
            type: 'a1/setVisible',
            payload: { visible: true },
        });
    }
    return (
        <div>
            {
                getFieldDecorator(`name`, {
                    initialValue: name,
                })(
                    <Search
                        placeholder="请输入关键字..."
                        onSearch={(e) => onSearch(e)}
                        enterButton="Search"
                    />
                )}

            <A1
                name={getFieldValue('name')}
            />
        </div>
    )
}
const ShowModalForm = Form.create()(ShowModal)

export default connect()(ShowModalForm)