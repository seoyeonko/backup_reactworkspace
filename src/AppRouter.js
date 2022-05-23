import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import SignUp from './SignUp';

function Copyright() {
  return (
    <Typography varient="body2" color="textSecondary" align="center">
      {'Copyright'}
      fsoftwarreengineer, {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>

            {/* ver5 설치가 안되어서 v6으로 진행함 */}
            {/* <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <App />
              </Route>
            </Switch> */}
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Router>
      </div>
    );
  }
}

export default AppRouter;
