import React from 'react';
import { signin } from './service/ApiService';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this); // this: 현재 로그인 컴포넌트 의미
  }

  handleSubmit(event) {
    event.preventDefault(); // submit 버튼 클릭시의 고유의 동작을 막아줌
    const data = new FormData(event.target); // FormData: event 발생한 form element data 담는 객체
    console.log(data);
    // name 속성 값과 value 속성 값을 key, value 쌍으로 유지
    const email = data.get('email');
    const password = data.get('password');
    console.log(email, password);
    // ApiService sign 메서드 사용해 로그인
    signin({ email: email, password: password });
  }

  render() {
    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: '8%' }}>
        {' '}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
          </Grid>
        </Grid>
        <form noValidate onSubmit={this.handleSubmit}>
          {' '}
          {/* sbmit btn click; handleSubmit 연결 */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="이메일 주소"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="패스워드"
                type="password"
                autoComplete="password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default Login;
