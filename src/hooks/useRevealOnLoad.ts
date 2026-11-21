import { useState } from 'react';

export const useRevealOnLoad = (loading: boolean) => {
  const [mountedWhileLoading] = useState(loading);
  return mountedWhileLoading;
};
