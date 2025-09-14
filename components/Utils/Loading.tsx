import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-white text-lg">
        <HashLoader color="white" size={40} speedMultiplier={1} />
      </div>
    </motion.div>
  );
}
