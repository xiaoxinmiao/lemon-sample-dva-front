import * as fruitService from '../../services/fruit';
import queryString from 'query-string';

export default {
  namespace: 'fruit',
  state: {
    list: [],
    total: null,
    page: null,
    currentFruit: {},
    searchCondition: {},
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
    setCurrentFruit(state, { payload: { currentFruit } }) {
      return { ...state, currentFruit }
    },
    setSearchCondition(state, { payload: { searchCondition } }) {
      return { ...state, searchCondition }
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
    *reload({ payload: { }, onComplete }, { call, put, select }) {
      let searchCondition = yield select(state => state.fruit.searchCondition)
      searchCondition = searchCondition ? searchCondition : {}
      const values = { name: searchCondition.name ? searchCondition.name : "" }
      yield put({
        type: 'fetchAll',
        payload: {
          values,
        },
      })
      if (onComplete) {
        onComplete(data)
      }

    },
    *get({ payload: { id }, onComplete }, { call, put, select }) {
      const { data, headers } = yield call(fruitService.getFruit, id);
      if (data && data.success) {
        yield put({
          type: 'setCurrentFruit',
          payload: {
            currentFruit: data.result,
          },
        });
      }
      if (onComplete) {
        onComplete(data);
      }
    },
    *new({ payload: values, onComplete }, { call, put }) {
      const { data, headers } = yield call(fruitService.createFruit, values);
      if (onComplete) {
        onComplete(data)
      }
    },
    *edit({ payload: values, onComplete }, { call, put }) {
      const { data, headers } = yield call(fruitService.updateFruit, values);
      if (onComplete) {
        onComplete(data)
      }
    },
    *delete({ payload: { id }, onComplete }, { call, put }) {
      const { data, headers } = yield call(fruitService.deleteFruit, id);
      if (onComplete) {
        onComplete(data)
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search, pageMode }) => {
        if (pathname === '/fruitList') {
          if (pageMode === 'reload') {
            dispatch({
              type: 'reload',
              payload: {},
            })
          }
        } else if (pathname === '/fruit') {
          const query = queryString.parse(search)
          if (query && query.pageMode === 'edit') {
            dispatch({ type: 'get', payload: query });
          } else {
            dispatch({
              type: "setCurrentFruit",
              payload: { currentFruit: {} }
            })
          }
        }
      });
    },
  },
};
