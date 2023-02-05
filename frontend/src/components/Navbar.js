import React from 'react';
import { IoReorderThree } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion, useCycle } from "framer-motion";

const links = [
  { name: "Home", to: "/home", id: 1 },
  { name: "Updates", to: "/updates", id: 2 },
  { name: "Grades", to: "/grades", id: 3 },
  { name: "Members", to: "/members", id: 4 }
];

const itemVariants = {
  closed: {
    opacity: 0
  },
  open: { opacity: 1 }
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1
    }
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1
    }
  }
};

function Navbar() {

  const [open, cycleOpen] = useCycle(false, true);
  return (
    <div className="navbar">
        <AnimatePresence>
            {open && (
            <motion.aside
                initial={{ width: 0 }}
                animate={{
                width: 200
                }}
                exit={{
                width: 0,
                transition: { delay: 0.7, duration: 0.3 }
                }}
            >
                <motion.div
                className="container"
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}
                >
                {links.map(({ name, to, id }) => (
                      <motion.a
                        key={id}
                        href={to}
                        whileHover={{ scale: 1.1 }}
                        variants={itemVariants}
                      >
                    {name}
                    </motion.a>
                ))}
                </motion.div>
            </motion.aside>
            )}
        </AnimatePresence>
        <div className="btn-container">
          <button onClick={cycleOpen}>{open ? <IoClose /> : <IoReorderThree />}</button>
        </div>
    </div>
  )
}

export default Navbar