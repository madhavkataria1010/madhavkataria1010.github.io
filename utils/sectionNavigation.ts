const PENDING_SECTION_KEY = 'portfolio.pending-section';

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);

  if (!element) {
    return false;
  }

  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
};

export const queueSectionNavigation = (sectionId: string) => {
  window.sessionStorage.setItem(PENDING_SECTION_KEY, sectionId);
};

export const consumeQueuedSection = () => {
  const sectionId = window.sessionStorage.getItem(PENDING_SECTION_KEY);

  if (!sectionId) {
    return null;
  }

  window.sessionStorage.removeItem(PENDING_SECTION_KEY);
  return sectionId;
};
