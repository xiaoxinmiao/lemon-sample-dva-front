import * as fruitService from '../../services/fruit';
import queryString from 'query-string';

export default {
  namespace: 'fruit',
  state: {
    list: [],
    total: null,
    page: null,
    loading:null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetchAll({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(fruitService.fetchAllFruit, { page });
      if (data != undefined && data.success==true) {
        yield put({
          type: 'save',
          payload: {
            data: data.result.items,
            total: parseInt(data.result.totalCount, 10),
            page: parseInt(page, 10),
          },
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/'|| pathname === '/fruit') {
          let query = queryString.parse(search)
          dispatch({ type: 'fetchAll', payload: query });
        }
      });
    },
  },
};
