'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import TodoConstants from '../constants/TodoConstants';

class TodoActions {
  // @param {string} text
  create(text) {
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    });
  }

  // @param {string} id of the todo item
  // @param {string} text
  updateText(id, text) {
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  }

  // Toggle whether is single todo is complete
  // @param {object} todo
  toggleComplete(todo) {
    let id = todo.id;
    // Check whether if it is currently completed
    let actionType = todo.complete ? TodoConstants.TODO_UNDO_COMPLETE : TodoConstants.TODO_COMPLETE;

    // Handle the action
    AppDispatcher.handleViewAction({
      actionType: actionType,
      id: id
    });
  }

  toggleCompleteAll() {
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
    });
  }

  destroy(id) {
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  }

  destroyCompleted() {
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  }
}

export default new TodoActions();
