// import { useState, useEffect } from 'react';

// const getLocalValue = (key, initValue) => {
//   //if we use Next.js(SSR)
//   if(typeof window === 'undefined') return initValue;

//   //if a value is already exist
//   const localValue = JSON.parse(localStorage.getItem(key));
//   if(localValue) return localValue;

//   //return result of a function
//   if(initValue instanceof Function) return initValue();

//   return initValue;
// } 

// const useLocalStorage = (key, initValue) => {// ('user','')||('persist',false)
// 	const [value, setValue] = useState(() => {
//     return getLocalValue(key, initValue);
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key,value])

//   return [value, setValue];
// };

// export default useLocalStorage;
