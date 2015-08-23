'use strict';

import React from 'react';
import Footer from './Footer.react';
import Header from './Header.react';
import MainSection from './MainSection.react';
import TodoStore from '../stores/TodoStore';

function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  }
}

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = getTodoState();
  }

  componentDidMount() {
    TodoStore.addChangeListener(this.onChange.bind(this));
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this.onChange.bind(this));
  }

  onChange() {
    this.setState(getTodoState());
  }

  render() {
    return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  }
}
