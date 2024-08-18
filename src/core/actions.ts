import { useState, useEffect } from 'react';
import { Action, ActionType, Alert, AlertType, DefaultAlertOptions } from './types';

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
 ** dispatch: This function will handles actions by updating the state and notifying listeners of the state change.
 * @param action - The action to be performed on the state.
 */
export const dispatch = (action: Action): void => {
   memoryState = reducer(memoryState, action);
   listeners.forEach((listener) => listener(memoryState));
};

/**
 ** useStore: A custom hook that manages and returns the current state of the application, including dynamic alert configurations.
 ** The hook subscribes to state updates and ensures that the state is re-rendered in the component.
 ** It also computes and returns an alert object with customized options based on the current state and provided configuration.
 *
 * @param alertOptions - The configurable options for the alert system. This includes default alert options as well as type-specific settings.
 *
 * @returns The current state of the application, with a dynamically computed alert object that merges default options, type-specific settings, and current alert state.
 */
export const useStore = (alertOptions: DefaultAlertOptions): State => {
   const [state, setState] = useState<State>(memoryState);

   useEffect(() => {
      listeners.push(setState);
      return () => {
         const index = listeners.indexOf(setState);
         if (index > -1) {
            listeners.splice(index, 1);
         }
      };
   }, [state]);

   const { alert } = state;
   const alertType = alert?.type || 'blank';

   // Merge default and type-specific alert options together.
   const newAlert = {
      ...alertOptions,
      ...alertOptions[alertType],
      ...alert,

      duration: alert?.duration || alertOptions.duration || alertOptions[alertType]?.duration || 0,

      style: {
         ...alert?.style,
         ...alertOptions.style,
         ...alertOptions[alertType]?.style,
      },
   } as Alert;

   return {
      ...state,
      alert: newAlert,
   };
};
