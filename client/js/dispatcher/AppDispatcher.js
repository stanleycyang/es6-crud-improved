'use strict';

import { Dispatcher } from 'flux';

// Dispatcher class

class AppDispatcher extends Dispatcher {
  // handleViewAction will dispatch the action
  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
}

// Create the AppDispatcher object and export it
export default new AppDispatcher();
