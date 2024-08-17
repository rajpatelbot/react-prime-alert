import { generateId } from './utils';
import { ActionType, Alert, AlertHandler, AlertOptions, AlertType } from './types';
import { dispatch } from './actions';

/**
 ** A function that will create a new alert.
 * @param description, options
 * @returns Alert
 */
const createAlert = (options: AlertOptions): Alert => ({
   ...options,
   id: options.id || generateId(),
   type: options.type || 'blank',
   duration: options.duration || 0,
   mode: 'light',
   size: 'base',
   variant: 'default',
   createdAt: Date.now(),
});

/**
 ** This is a handler function to create a new alert.
 * @param type - The type of the alert.
 * @param options - The options for the alert.
 * @returns AlertHandler
 */
const createAlertHandler =
   (type: AlertType): AlertHandler =>
   (options: AlertOptions): string => {
      const alert = createAlert({ ...options, type });
      dispatch({ type: ActionType.UPSERT_ALERT, alert });
      return alert.id;
   };

/**
 ** Creates a default (blank) alert with no specific type.
 ** The `alert` function uses the 'blank' type to generate a basic alert with default configurations.
 * @param options - Configurable options for the alert.
 * @example: Example - alert({ title: 'Hello World', description: 'Hello, I am prime alert.' });
 */
const alert = (options: AlertOptions) => createAlertHandler('blank')(options);

/**
 ** Creates a new alert with the 'info' type.
 * @param options - Configurable options for the alert.
 * @example: Example - alert.info({ title: 'Info', description: 'I am an info alert.' });
 */
alert.info = createAlertHandler('info');

/**
 ** Creates a new alert with the 'warning' type.
 * @param options - Configurable options for the alert.
 * @example: Example - alert.warning({ title: 'Warning', description: 'I am a warning alert.' });
 */
alert.warning = createAlertHandler('warning');

/**
 ** Creates a new alert with the 'error' type.
 * @param options - Configurable options for the alert.
 * @example: Example - alert.error({ title: 'Error', description: 'I am an error alert.' });
 **/
alert.error = createAlertHandler('error');

/**
 ** Creates a new alert with the 'success' type.
 * @param options - Configurable options for the alert.
 * @example: Example - alert.success({ title: 'Success', description: 'I am a success alert.' });
 */
alert.success = createAlertHandler('success');

/**
 ** Creates a new alert with the 'custom' type.
 * @param options - Configurable options for the alert.
 * @example: Example - alert.custom({ title: 'Custom', description: 'I am a custom alert.' });
 */
alert.custom = createAlertHandler('custom');

/**
 ** Action dispatched for auto closing the alert.
 * @param alertId - The id of the alert to be auto closed.
 */
alert.autoClose = (alertId?: string): void => {
   dispatch({ type: ActionType.AUTO_CLOSE_ALERT, alertId });
};

/**
 ** Action dispatched for removing the alert.
 * @param alertId - The id of the alert to be removed.
 */
alert.remove = (alertId?: string): void => {
   dispatch({ type: ActionType.REMOVE_ALERT, alertId });
};

export { alert };
