// CustomMenuButton.jsx

import { useState, useEffect } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";


const CustomMenuButton = ({
    isHovered,
    onClick,
    onMouseEnter,
    onMouseLeave,
    isMenuOpen,
    barColor, // Accept the barColor prop
  }) => (
    <Box
      className={`menu-icon ${isMenuOpen ? "hover" : ""}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      position="fixed"
      top="50px"
      right="30px"
      zIndex="11"
    >
      <Box
        as="span"
        className={`bar ${isMenuOpen ? "bar-clicked" : ""}`}
        backgroundColor={barColor} // Set the background color
      ></Box>
      <Box
        as="span"
        className={`bar ${isMenuOpen ? "bar-clicked" : ""}`}
        backgroundColor={barColor} // Set the background color
      ></Box>
    </Box>
  );

  export default CustomMenuButton;