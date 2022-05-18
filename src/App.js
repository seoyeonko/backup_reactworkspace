import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import {
  Paper,
  List,
  Container,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import './App.css';
import { call, signout } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        // { id: 0, title: 'Hello World 1', done: true },
        // { id: 1, title: 'Hello World 2', done: false },
        // { id: 2, title: 'Hello World 3', done: false },
      ],
      loading: true, // state에 담아둔 이유; 값이 변하면 다시 rendering
    };
  }

  componentDidMount() {
    call('/todo', 'GET', null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  }

  // add: items 배열에 할일 item을 추가
  add = (item) => {
    // const thisItems = this.state.items; // [ {}, {}, {}, ... ]
    // item.id = 'ID-' + thisItems.length;
    // item.done = false;
    // thisItems.push(item);
    // this.setState({ items: thisItems }); //  [ {}, {}, {}, ..., {new!} ]
    // console.log('items: ', this.state.items);

    call('/todo', 'POST', item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  // delete
  delete = (item) => {
    // const thisItems = this.state.items;
    // console.log('Before Update Items : ', this.state.items);

    // // 매개변수로 들어온 아이템의 id와 다른 id를 갖는 아이템들만 골라냄 (== 같은 Id를 가진 것만 제외)
    // const newItems = thisItems.filter((e) => e.id !== item.id); // e: thisItems의 원소 하나하나

    // this.setState({ items: newItems }, () => {
    //   // 디버깅 콜백
    //   console.log('After delete Items : ', this.state.items);
    // });

    call('/todo', 'DELETE', item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  // update
  update = (item) => {
    call('/todo', 'PUT', item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  render() {
    // <Todo> 컴포넌트 배열
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ marign: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    );

    // navigationBar 추가
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography varient="h6">오늘의 할일</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    // !loading rendering ui
    var todoListPage = (
      <div>
        {navigationBar} {/* navigationBar rendering */}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );

    // loading(true) rendering ui
    var loadingPage = <h1>loading...</h1>;
    var content = loadingPage;

    if (!this.state.loading) {
      // !laodign(!false) - 로딩중 아니면; todoListPage
      content = todoListPage;
    }

    return <div className="App">{content}</div>;
  }
}

export default App;
