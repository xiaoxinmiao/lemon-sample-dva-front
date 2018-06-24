import * as fruitService from '../../services/fruit';
import commonHelper from '../../utils/commonHelper';

export default {
    namespace: 'rowSelect',
    state: {
        list: [],
        total: null,
        page: null,
        selectedItem: {},//selectedRowKeys, selectedRows
    },
    reducers: {
        save(state, { payload: { data: list, total, page } }) {
            return { ...state, list, total, page };
        },
        setSelectedItem(state, { payload: { selectedItem } }) {
            return { ...state, selectedItem };
        },
        removeRecord(state, { payload: { record }, onComplete }) {
            let selectedItem = {
                selectedRowKeys: [],
                selectedRows: [],
            }
            let oldList = state.selectedItem ? state.selectedItem.selectedRows : []
            commonHelper.removeObj(oldList, record)
            let oldKeyList = state.selectedItem ? state.selectedItem.selectedRowKeys : []
            oldKeyList.splice(() => {
                return oldKeyList.findIndex((id) => id === record.id)
            }, 1)
            selectedItem.selectedRowKeys = oldKeyList
            selectedItem.selectedRows = oldList
            return { ...state, selectedItem }
        },
    },
    effects: {
        *fetchAll({ payload: { page = 1, values }, onComplete }, { call, put }) {
            const { data, headers } = yield call(fruitService.fetchAllFruit, { page: page, values: values });
            if (data && data.success && data.result) {
                yield put({
                    type: 'save',
                    payload: {
                        data: data.result.items,
                        total: parseInt(data.result.totalCount, 10),
                        page: parseInt(page, 10),
                    },
                });
            }
            if (onComplete) {
                onComplete(data);
            }
        },
    },

};
