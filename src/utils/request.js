import fetch from 'dva/fetch';
import { message } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '创建数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '修改或删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function checkStatus(response) {
  if ((response.status >= 200 && response.status < 300) || response.status == 404) {
    return response;
  }

  const errortext = codeMessage[response.status] || response.statusText;
  message.error('请求错误 $' + response.status + ':' + response.url + '  ' + errortext, 10);
  throw new Error(errortext);

}

function parseJSON(response) {
  if (response.status == 204) {
    return { status: response.status }
  } if (response.status == 404) {
    return { raw: response.json(), status: response.status }
  } else {
    return response.json();
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      console.log(data)
      if (data && data instanceof Object) {
        if (data.status == 404) {
          return data.raw.then(d => {
            d.success = true
            return { data: d }
          })
        } else if (data.status == 204) {
          return { data: { success: true } }
        } else {
          const { result, success, error } = data
          if (success == true) {
            return Promise.resolve({ data });
          } else {
            if (error && error instanceof Object) {
              message.error(error.message, 10);
              throw new Error("服务器内部错误.");
            } else {
              message.error("服务器内部错误.", 10);
              throw new Error("服务器内部错误.");
            }
          }
        }
      }
      return Promise.reject(null);
    })
    .catch(err => ({ err }));
}