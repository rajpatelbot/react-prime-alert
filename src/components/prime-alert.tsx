import React from 'react';
import { AlertProps } from '../core/types';
import { useAlert } from './use-alert';

export const PrimeAlert: React.FC<AlertProps> = (alertOptions: AlertProps) => {
   const { alert } = useAlert(alertOptions);

   const { id, className, style } = alertOptions;

   return (
      <div
         /**
          ** Style for the overlay
          */
         id={id}
         style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
         }}
      >
         {/* Style for the blur effect */}
         <div
            style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               backdropFilter: 'blur(10px)',
               zIndex: -1,
            }}
         />

         {/* Style for the Alert component */}
         <div
            style={{
               backgroundColor: 'white',
               padding: '20px',
               borderRadius: '8px',
               boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
               zIndex: 1001,
               ...style,
            }}
            className={className}
         >
            {alert?.description}
         </div>
      </div>
   );
};
