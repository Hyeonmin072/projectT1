import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {


  // 페이지 전환 애니메이션 조정 값
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;