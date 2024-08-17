import { useEffect } from 'react';
import { dispatch, useStore } from '../core/actions';
import { ActionType, DefaultAlertOptions } from '../core/types';

export const useAlert = (alertOptions: DefaultAlertOptions) => {
   const { alert } = useStore(alertOptions);

   useEffect(() => {
      if (alert && alert.duration > 0) {
         const timer = setTimeout(() => {
            dispatch({ type: ActionType.REMOVE_ALERT, alertId: alert.id });
         }, alert.duration);

         return () => clearTimeout(timer);
      }
   }, [alert]);

   return { alert };
};
