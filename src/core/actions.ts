import { useState, useEffect } from 'react';
import { Action, ActionType, Alert } from './types';

interface State {
   alert: Alert | null;
}

/**
 ** listeners: It is an array of callback functions that invokes whenever the state changes.
 ** Thease functions are used to perform side effects when the state changes.
 */
const listeners: Array<(state: State) => void> = [];

/**
 ** memoryState: It holds the current state of the application and keep reference to track and manage the state across multiple operations.
 ** It is initialized with `{ alert: null }`, and get updated whenever the `dispatch` function is called.
 */
let memoryState: State = { alert: null };

/**
 ** reducer: This function will take the current state and an action as arguments and returns a new state based on the action type.
 ** It defines, how the state should change in response to different actions.
 * @param state - The current state and action.
 */
const reducer = (state: State, action: Action): State => {
   switch (action.type) {
      case ActionType.ADD_ALERT:
         return { ...state, alert: action.alert };

      case ActionType.UPDATE_ALERT:
         if (!state.alert) return state;
         return {
            ...state,
            alert: { ...state.alert, ...action.alert },
         };

      case ActionType.UPSERT_ALERT:
         return state.alert?.id === action.alert?.id
            ? reducer(state, { type: ActionType.UPDATE_ALERT, alert: action.alert })
            : reducer(state, { type: ActionType.ADD_ALERT, alert: action.alert });

      case ActionType.AUTO_CLOSE_ALERT:
         return { ...state, alert: null };

      case ActionType.REMOVE_ALERT:
         return { ...state, alert: null };

      default:
         return state;
   }
};

/**
 ** reducer: This function will handles actions by updating the state and notifying listeners of the state change.
 * @param action - The action to be performed on the state.
 */
export const dispatch = (action: Action): void => {
   memoryState = reducer(memoryState, action);
   listeners.forEach((listener) => listener(memoryState));
};
