import { motion, type HTMLMotionProps } from "framer-motion";
import { useMagnet } from "../hooks";
type Props = HTMLMotionProps<"button"> & { douce?: boolean };
export default function Bouton({ douce, className = "", children, style, type = "button", ...p }: Props) {
  const { r, x, y } = useMagnet();
  return (
    <motion.button ref={r} type={type} whileTap={{ scale: 0.94 }} transition={{ type: "spring", stiffness: 400, damping: 18 }} className={`btn ${douce ? "soft" : ""} ${className}`} {...p} style={{ x, y, ...style }}>
      {children}
    </motion.button>
  );
}
