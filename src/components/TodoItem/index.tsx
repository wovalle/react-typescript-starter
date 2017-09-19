import * as React from 'react';
import * as classNames from 'classnames';
import { TodoTextInput } from '../TodoTextInput';
import { applyMiddleware } from 'redux';
import './style.scss';

export namespace TodoItem {
  export interface Props {
    todo: TodoItemData;
    editTodo: (todo: TodoItemData) => any;
    deleteTodo: (id: number) => any;
    completeTodo: (id: number) => any;
  }

  export interface State {
    editing: boolean;
  }
}

export class TodoItem extends React.Component<TodoItem.Props, TodoItem.State> {

  constructor(props?: TodoItem.Props, context?: any) {
    super(props, context);
    this.state = {
      editing: false,
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id: number, text: string) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo({ id, text });
    }
    this.setState({ editing: false });
  }

  handleInput(id: number) {
    return (text: string) => this.handleSave(id, text);
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;

    const handleCompleteTodo = (id: number) => completeTodo(id);
    const handleDeleteTodo = (id: number) => deleteTodo(id);

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={this.handleInput(todo.id)}
        />
      );
    } else {
      element = (
        <div className={'view'}>
          <input
            className={'toggle'}
            type="checkbox"
            checked={todo.completed}
            onChange={handleCompleteTodo(todo.id)}
          />

          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>

          <button className={'destroy'} onClick={handleDeleteTodo(todo.id)} />
        </div>
      );
    }

    // TODO: compose
    const classes = classNames({
      ['completed']: todo.completed,
      ['editing']: this.state.editing,
      ['normal']: !this.state.editing,
    }, 'todo-item');

    return (
      <li className={classes}>
        {element}
      </li>
    );
  }
}
