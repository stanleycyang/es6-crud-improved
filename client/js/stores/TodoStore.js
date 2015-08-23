'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import TodoConstants from '../constants/TodoConstants';
import { EventEmitter } from 'events';
import objectAssign from 'object-assign';

const CHANGE_EVENT = 'change';

class TodoStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.todos = {};

    this.dispatcherIndex = AppDispatcher.register(this.handleAction.bind(this));
  }

  // Handle the actions
  handleAction(payload) {
    let action = payload.action;
    let text = '';

    switch(action.actionType) {

      case TodoConstants.TODO_CREATE:
        text = action.text.trim();
        if (text !== '') {
          this.create(text);
          this.emitChange();
        }
        break;

      case TodoConstants.TODO_COMPLETE:
        this.update(action.id, {complete: true});
        this.emitChange();
        break;

      case TodoConstants.TODO_DESTROY:
        this.destroy(action.id);
        this.emitChange();
      break;

      case TodoConstants.TODO_DESTROY_COMPLETED:
        this.destroyCompleted();
        this.emitChange();
      break;

      case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
        if (this.areAllComplete()) {
          this.updateAll({complete: false});
        } else {
          this.updateAll({complete: true});
        }
        this.emitChange();
      break;

      case TodoConstants.TODO_UNDO_COMPLETE:
        this.update(action.id, {complete: false});
        this.emitChange();
      break;

      case TodoConstants.TODO_UPDATE_TEXT:
        text = action.text.trim();
        if (text !== '') {
          this.update(action.id, {text: text});
          this.emitChange();
        }
      break;

    }

    return true; // No errors. Need by promise in the Dispatcher
  }

  create(text) {
    // Create an unique id
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

    // Add it into the todos object
    this.todos[id] = {
      id: id,
      complete: false,
      text: text
    }
  }

  // @param {string} id
  // @param Pobject} updates an object literal
  update(id, updates) {
    this.todos[id] = objectAssign({}, this.todos[id], updates);
  }

  updateAll(updates) {
    for(let id in this.todos) {
      this.update(id, updates);
    }
  }

  // @param {string} id
  destroy(id) {
    delete this.todos[id];
  }

  // Delete all the complete todos
  destroyCompleted() {
    for (let id in this.todos) {
      if(this.todos[id].complete) {
        this.destroy(id);
      }
    }
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  // Tests whether all todos are complete
  areAllComplete() {
    for (let id in this.todos) {
      if(!this.todos[id].complete) {
        return false;
      }
    }
    return true;
  }

  // Get the entire collection of todos
  getAll() {
    return this.todos;
  }

  // Add the event listener
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  // Remove the event listener
  removeChangeListener(callback) {
    this.removeLister(CHANGE_EVENT, callback);
  }

}

export default new TodoStore();
