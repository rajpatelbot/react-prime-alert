import { generateId } from './utils';
import { Alert, AlertHandler, AlertOptions, AlertType } from './types';

/**
 ** A function that will create a new alert.
 * @param description, options
 * @returns Alert
 */
const createAlert = (options: AlertOptions): Alert => ({
   ...options,
   id: options.id || generateId(),
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
   (options: AlertOptions) => {
      const alert = createAlert({ ...options, type });
      //TODO: Will dispatch the action with new alert.
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

// TODO: Will have to handle close and dismiss actions here.

export { alert };
