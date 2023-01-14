export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 80,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

export const stagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};
