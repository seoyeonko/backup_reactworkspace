import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container } from '@material-ui/core';
import './App.css';
import { call } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        // { id: 0, title: 'Hello World 1', done: true },
        // { id: 1, title: 'Hello World 2', done: false },
        // { id: 2, title: 'Hello World 3', done: false },
      ],
    };
  }

  componentDidMount() {
    call('/todo', 'GET', null).then((response) =>
      this.setState({ items: response.data })
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

    return (
      <div>
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );
  }
}

export default App;
