import * as fruitService from '../../services/fruit';
import queryString from 'query-string';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'fruitForm',
  state: {
    pageMode: null,
    record: {},
  },
  reducers: {
    updateState(state, { payload: { pageMode, record} }) {
      return { ...state,pageMode, record};
    },
  },
  effects: {
    *new({ payload: values }, { call, put }) {
      const { data, headers } = yield call(fruitService.createFruit, values);
      yield put(routerRedux.push('/fruit'));
    },
    *edit({ payload: values }, { call, put }) {
      const { data, headers } = yield call(fruitService.updateFruit,values);
      if (data ==204){
        yield put(routerRedux.push('/fruit'));
      }
    },
    *delete({ payload: values }, { call, put }) {
      const { data, headers } = yield call(fruitService.deleteFruit, values);
      yield put(routerRedux.push('/fruit'));
    },
    *setState({ payload: {pageMode, record } }, { call, put }) {
      yield put({ type: 'updateState', payload: {pageMode, record } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,pageMode, record }) => {
        if (pathname === '/fruitForm') {
          dispatch({ type: 'setState', payload: { pageMode, record } });
        }
      });
    },
  },
};
