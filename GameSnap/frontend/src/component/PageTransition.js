import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const PageTransition = ({ children }) => {
  const [direction, setDirection] = useState(0); // 0: initial, 1: next, -1: prev

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setDirection(1);
      } else if (e.key === 'ArrowLeft') {
        setDirection(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? -30 : 30,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <motion.div
      initial="enter"
      animate="center"
      exit="exit"
      variants={variants}
      custom={direction}
      transition={{
        x: { 
          type: "spring",
          stiffness: 300,
          damping: 30
        },
        opacity: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;