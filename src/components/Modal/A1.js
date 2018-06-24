import { connect } from "dva";
import { Modal } from 'antd';

function A1({ dispatch,name,onShow, visible }) {
    function onShowPopup(flag) {
        if (onShow) {
            onShow(flag)
        } else {
            dispatch({
                type: 'a1/setVisible',
                payload: { visible: flag },
            });
        }
    }
    return (
        <div>
            <Modal
                title="用户列表"
                visible={visible}
                onCancel={() => onShowPopup(false)}
                width={620}
                footer={null}
            >
                <div style={{fontSize:36}}>params:{name}</div>
            </Modal>
        </div>
    )
}
function mapStateToProps(state) {
    const { visible } = state.a1;
    return {
        visible,
    };
}
export default connect(mapStateToProps)(A1)