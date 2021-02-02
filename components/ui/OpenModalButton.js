import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const OpenModalButton = styled(motion.button)`
  min-width: 145px;
  width: auto;
  height: 2.5rem;
  letter-spacing: 0.5px;
  padding: 0 10px 0 10px;
  background-color: white;
  color: black;
  text-transform: uppercase;
  border-radius: 1rem;
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: dodgerblue;
    color: black;
    border: 1px solid white;
  }
  &:focus {
      outline: none;
      box-shadow: 0 0 5px 0 white;  
  }
`;
const animatedOpenButton = ({ children, handlClick }) => {
  return (
    <OpenModalButton
      onClick={handlClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </OpenModalButton>
  );
};

export default animatedOpenButton;
