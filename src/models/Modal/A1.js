
export default {
    namespace: 'a1',
    state: {
        visible:false,
    },
    reducers: {
        setVisible(state, { payload: { visible } }) {
            return { ...state, visible };
        },
    },
};
