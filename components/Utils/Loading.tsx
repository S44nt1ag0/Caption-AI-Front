import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-white text-lg">Loading...</div>
    </motion.div>
  );
}
