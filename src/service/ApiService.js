import { API_BASE_URL } from '../app-config';
// defulat export가 아니였으므로 {} 즁괄호로 감싸주어야 함
const ACCESS_TOKEN = 'ACCESS_TOKEN';

// call() : backend로 요청시 사용하는 유틸리티 함수
export function call(api, method, request) {
  let headers = new Headers({
    'Content-Type': 'application/json',
  });

  // localStorage에서 ACCESS_TOKEN 가져오기
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  if (accessToken && accessToken !== null) {
    headers.append('Authorization', 'Bearer ' + accessToken); // 주의) Bearer_ (빈칸 있음)
  }

  let options = {
    headers: headers,
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
  return call('/auth/signin', 'POST', userDTO).then((response) => {
    if (response.token) {
      // localStroge에 token 저장 (login시 tocken 인증을 하므로)
      localStorage.setItem(ACCESS_TOKEN, response.token);
      // token 존재? Todo 화면 redirect
      window.location.href = '/';
    }
    // console.log('response: ', response);
    // alert('로그인 토큰: ' + response.token); // response: UserDTO 객체
  });
}

export function signout() {
  localStorage.setItem(ACCESS_TOKEN, null);
  window.location.href = '/login';
}

export function signup(userDTO) {
  return call('/auth/signup', 'POST', userDTO);
}
