import { useState, useEffect } from 'react';

/**
 * Custom Hook: useLocalStorage
 * 
 * Hook ini menyinkronkan state React dengan localStorage browser.
 * Konsep yang digunakan:
 * - useState dengan lazy initializer (fungsi sebagai initial value)
 * - useEffect untuk side effect (menyimpan ke localStorage)
 * - JSON.parse / JSON.stringify untuk serialisasi data
 * 
 * @param {string} key - Nama key di localStorage
 * @param {any} initialValue - Nilai awal jika belum ada data di localStorage
 * @returns {[any, Function]} - Tuple [state, setState] seperti useState
 */
export function useLocalStorage(key, initialValue) {
  // Lazy initialization: fungsi ini hanya dijalankan sekali saat komponen pertama kali render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Jika sudah ada data di localStorage, parse dan gunakan
      // Jika belum, gunakan initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error membaca localStorage:', error);
      return initialValue;
    }
  });

  // useEffect: setiap kali storedValue berubah, simpan ke localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error menyimpan ke localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
