import { useSyncExternalStore } from 'react';

const subscribe = (onChange: () => void) => {
  window.addEventListener('languagechange', onChange);
  return () => window.removeEventListener('languagechange', onChange);
};

const getSnapshot = () => navigator.language.toLowerCase().startsWith('ko');

const getServerSnapshot = () => true;

export const usePrefersKorean = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
