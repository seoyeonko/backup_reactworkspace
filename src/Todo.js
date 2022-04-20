import React from 'react';
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item, readOnly: true }; // Component가 갖는 값
    this.delete = props.delete;
  }

  editEventHandler = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    console.log(thisItem); // test
    console.log(thisItem.title); // test
    this.setState({ item: thisItem });
  };

  offReadOnlyMode = () => {
    console.log('Event!', this.state.readOnly);
    this.setState({ readOnly: false }, () => {
      console.log('ReadOnly?', this.state.readOnly);
    });
  };

  enterKeyEventHandler = (e) => {
    if (e.key === 'Enter') {
      this.setState({ readOnly: true }); // input에서 enter키로 입력을 마치면 편집 불가능하도록 상태값 변경
    }
  };

  deleteEventHandler = () => {
    this.delete(this.state.item);
  };

  checkboxEventHandler = () => {
    const thisItem = this.state.item;
    thisItem.done = !thisItem.done;
    this.setState({ item: thisItem });
  };

  render() {
    const item = this.state.item;

    return (
      <ListItem>
        <Checkbox checked={item.done} onChange={this.checkboxEventHandler} />
        <ListItemText>
          <InputBase
            inputProps={{
              'aria-label': 'naked',
              readOnly: this.state.readOnly,
            }}
            onClick={this.offReadOnlyMode}
            type="text"
            id={item.id}
            name={item.id}
            value={item.title}
            multiline={true}
            fullWidth={true}
            onKeyPress={this.enterKeyEventHandler}
            onChange={this.editEventHandler}
          />
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete Todo"
            onClick={this.deleteEventHandler}
          >
            <DeleteOutline />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;
