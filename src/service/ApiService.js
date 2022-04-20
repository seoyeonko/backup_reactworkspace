import { API_BASE_URL } from '../app-config';
// defulat export가 아니였으므로 {} 즁괄호로 감싸주어야 함

// call() : backend로 요청시 사용하는 유틸리티 함수
export function call(api, method, request) {
  let options = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    // 요청시 데이터가 있으면
    // GET method
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        // !false = 에러 응답
        return Promise.reject(json);
      }
      return json;
    })
  );
}
