import React from 'react';
import { styled, keyframes, setup } from 'goober';
import { RenderAlert } from './render-alert';
import { AlertProps } from '../core/types';
import { useAlert } from '../hooks/use-alert';

setup(React.createElement);

const zoomIn = keyframes`
   from {
      opacity: 0;
      transform: scale(0);
   }
   to {
      opacity: 1;
      transform: scale(1);
   }
`;

const zoomOut = keyframes`
   from {
      opacity: 1;
      transform: scale(1);
   }
   to {
      opacity: 0;
      transform: scale(0);
   }
`;

const AlertOverlay = styled('div')`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: rgba(0, 0, 0, 0.2);
   z-index: 1000;
   opacity: 0;
   pointer-events: none;
   transition: opacity 0.3s ease-in-out;

   &.active {
      opacity: 1;
      pointer-events: auto;
   }

   &.inactive {
      opacity: 0;
      pointer-events: none;
   }
`;

const BlurEffect = styled('div')`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 1;
   backdrop-filter: blur(1px);
`;

const Alert = styled('div')`
   background-color: white;
   border-radius: 15px;
   box-shadow: 0 0 10px rgba(154, 154, 154, 0.3);
   z-index: 1001;
   width: 400px;

   &.zoomIn {
      animation: ${zoomIn} 0.3s ease-in-out forwards;
   }

   &.zoomOut {
      animation: ${zoomOut} 0.3s ease-in-out forwards;
   }
`;

export const PrimeAlert: React.FC<AlertProps> = (alertOptions: AlertProps) => {
   const { alert } = useAlert(alertOptions);

   const { id, className, style } = alertOptions;

   // Side effects handling
   if (alert && !alert.id) {
      return null;
   }

   return (
      <AlertOverlay className={alert?.id ? 'active' : 'inactive'}>
         <BlurEffect />
         <Alert className={alert?.id ? `zoomIn ${className}` : 'zoomOut'} id={id} style={style}>
            <RenderAlert alert={alert} alertOptions={alertOptions} />
         </Alert>
      </AlertOverlay>
   );
};
