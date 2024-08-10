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
   footer: Renderable;

   className?: string;
   style?: CSSProperties;
   variant: DefinedStyle;

   duration: number;
   createdAt: number;
}

/**
 ** Represents the props for the Alert component.
 */
export type AlertProps = Pick<Alert, 'id' | 'mode' | 'size' | 'className' | 'style' | 'variant'>;

/**
 ** Represents the options for the alert.
 */
export type AlertOptions = Pick<
   Alert,
   | 'id'
   | 'type'
   | 'title'
   | 'description'
   | 'icon'
   | 'header'
   | 'footer'
   | 'className'
   | 'style'
   | 'duration'
   | 'createdAt'
>;

/**
 ** Handler function's return type.
 */
export type AlertHandler = (options: AlertOptions) => string;
