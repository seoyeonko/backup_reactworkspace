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
    response
      .json()
      .then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
      .catch((error) => {
        console.log(error.status);
        // App.js componentDidMount, add, delete, update 실행;
        // !login (status code is 403; /login redirect)
        if (error.status === 403) {
          window.location.href = '/login'; // redirect
        }

        return Promise.reject(error);
      })
  );
}

export function signin(userDTO) {
  return call('/autho/signin', 'POST', userDTO).then((response) => {
    console.log('response: ', response);
    alert('로그인 토큰: ' + response.token); // response: UserDTO 객체
  });
}
