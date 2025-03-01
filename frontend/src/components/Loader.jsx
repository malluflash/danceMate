import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <motion.div
        className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-accent border-l-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        role="status"
        aria-label="loading"
      />
    </div>
  );
};

export default Loader;