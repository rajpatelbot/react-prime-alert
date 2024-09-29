'use client';

import { useState } from 'react';

export default function Home() {
   const [showAlert, setShowAlert] = useState(false);

   return (
      <main className='flex min-h-screen flex-col items-center justify-center p-24'>
         <p>Hello</p>
      </main>
   );
}
