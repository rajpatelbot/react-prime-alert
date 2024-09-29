import { CSSProperties } from 'react';

/**
 ** Represent the mode of the alert, which can be light or dark.
 */
export type AlertMode = 'light' | 'dark';

/**
 ** Represent the size of the alert.
 */
export type AlertSize = 'sm' | 'base' | 'lg';

/**
 ** Represent the type of the alert, which determines it's categeory.
 */
export type AlertType = 'info' | 'warning' | 'error' | 'success' | 'blank' | 'custom';

/**
 ** Renderable Element type.
 */
export type Renderable = JSX.Element | string | null;

/**
 ** Specifies the style variants available for the alert component.
 */
export type DefinedStyle = 'default' | 'modern';

/**
 ** Defines the properties of an alert, including its appearance, content, and behavior.
 */
export interface Alert {
   id: string;
   type: AlertType;

   icon?: Renderable;
   title?: string;
   description: string;

   mode: AlertMode;
   size: AlertSize;

   header?: Renderable;

   buttons?: {
      label: string;
      onClick: () => unknown;
      type?: 'button' | 'submit' | 'reset';
      variant?: 'primary' | 'secondary';
      className?: string;
      style?: CSSProperties;
   }[];

   className?: string;
   style?: CSSProperties;
   variant: DefinedStyle;

   duration: number;
   createdAt: number;
}

export type DefaultAlertOptions = AlertProps & {
   [key in AlertType]?: AlertOptions;
};

/**
 ** Represents the props for the Alert component.
 */

export type PartialAlertProps = Partial<Pick<Alert, 'id' | 'type' | 'duration' | 'className' | 'style'>> & {
   children?: Renderable;
};

export type AlertProps = Pick<Alert, 'mode' | 'size' | 'variant'> & PartialAlertProps;

/**
 ** Represents the options for the alert.
 */
export type AlertOptions = Partial<
   Pick<
      Alert,
      'id' | 'type' | 'title' | 'icon' | 'header' | 'buttons' | 'className' | 'style' | 'duration' | 'createdAt'
   >
> & {
   description: string;
};

/**
 ** Handler function's return type.
 */
export type AlertHandler = (options: AlertOptions) => string;

/**
 ** Represents an actions types for an alerts.
 */
export enum ActionType {
   ADD_ALERT,
   UPDATE_ALERT,
   UPSERT_ALERT,
   AUTO_CLOSE_ALERT,
   REMOVE_ALERT,
}

/**
 ** Represents an actions for an alert.
 */
export type Action =
   | {
        type: ActionType.ADD_ALERT;
        alert: Alert;
     }
   | {
        type: ActionType.UPDATE_ALERT;
        alert: Partial<Alert>;
     }
   | {
        type: ActionType.UPSERT_ALERT;
        alert: Alert;
     }
   | {
        type: ActionType.AUTO_CLOSE_ALERT;
        alertId?: string;
     }
   | {
        type: ActionType.REMOVE_ALERT;
        alertId?: string;
     };
