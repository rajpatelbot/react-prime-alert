'use client';

import { useState } from 'react';
import { alert, PrimeAlert } from 'react-prime-alert';
import Alert from './Alert';

export default function Home() {
   const handleAlert = () => {
      alert({
         header: 'Payment Confirmation',
         title: 'Payment of $100 processed',
         type: 'success',
         // footer: (
         //    <>
         //       <button>Cancel</button>
         //       <button>Cancel</button>
         //    </>
         // ),
         description:
            'Thank you for your payment. Your order will be processed shortly. Please check your email for further instructions.',
      });
   };

   const [showAlert, setShowAlert] = useState(false);

   // const handleAlert = () => {
   //    setShowAlert((prev) => !prev);
   // };

   return (
      <main className='flex min-h-screen flex-col items-center justify-center p-24'>
         <PrimeAlert mode={'light'} size={'base'} variant={'default'} />

         <button type='button' onClick={handleAlert}>
            Test
         </button>

         {/* <Alert showAlert={showAlert} handleAlert={handleAlert} /> */}
      </main>
   );
}
