import React from 'react';
import TodoActions from '../actions/TodoActions';
import TodoItem from './TodoItem.react';

let ReactPropTypes = React.PropTypes;

export default class MainSection extends React.Component {
  render() {
    if(Object.keys(this.props.allTodos).length < 1) {
      return null;
    }

    let allTodos = this.props.allTodos;
    let todos = [];

    for (let key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }

    return (
      <section id='main'>
        <input
          id='toggle-all'
          type='checkbox'
          onChange={this.onToggleCompleteAll.bind(this)}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor='toggle-all'>Mark all as complete</label>
        <ul id='todo-list'>{todos}</ul>
      </section>
    );
  }

  onToggleCompleteAll() {
    TodoActions.toggleCompleteAll();
  }
}

MainSection.propTypes = {
  allTodos: ReactPropTypes.object.isRequired,
  areAllComplete: ReactPropTypes.bool.isRequired
}

