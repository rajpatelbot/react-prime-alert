/**
 ** Generates a random id.
 */
export const generateId = ((): (() => string) => {
   let count = 0;
   return () => {
      return (++count).toString();
   };
})();
