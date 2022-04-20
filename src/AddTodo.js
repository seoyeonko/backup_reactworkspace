import React from 'react';
import { TextField, Paper, Button, Grid } from '@material-ui/core';

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: '' } }; // 사용자의 입력을 저장할 오브젝트
    this.add = props.add; // 함수도 Props로 넘길 수 있음
  }

  onInputChange = (e) => {
    const thisItem = this.state.item; // { title: '' } 객체
    thisItem.title = e.target.value; // '': title 값
    this.setState({ item: thisItem });
    console.log(thisItem);
  };

  onButtonClick = () => {
    this.add(this.state.item);
    this.setState({ item: { title: '' } });
  };

  enterKeyEventHandler = (e) => {
    if (e.key === 'Enter') {
      this.onButtonClick(); // 버튼 클릭 재사용
    }
  };

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container>
          <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
            <TextField
              placeholder="Add Todo here"
              fullWidth
              onChange={this.onInputChange}
              value={this.state.item.title}
              onKeyPress={this.enterKeyEventHandler}
            />
          </Grid>
          <Grid xs={1} md={1} item>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              onClick={this.onButtonClick}
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddTodo;
