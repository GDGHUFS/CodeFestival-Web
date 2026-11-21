export const scrollToHeading = (id: string) => {
  const targetElement = document.getElementById(id);
  if (!targetElement) {
    return;
  }

  targetElement.scrollIntoView({ behavior: 'smooth' });
  window.history.pushState(null, '', `#${id}`);
};
