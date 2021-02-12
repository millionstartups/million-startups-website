import React from "react";
import styled from "styled-components";
import {IoCloseOutline} from 'react-icons/io5'
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;
const ModalContainer = styled(motion.div)`
  max-width: 450px;
  height: 100vh;
  color: #181818;
  background-color: whitesmoke;
  position: fixed;
  right: 0;
  @media (max-width: 769) {
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: red;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 18px;
  top: 18px;
  width: 25px;
  height: 25px;
  object-fit: center;
  background-color: transparent;
  outline: none;
  border-style: none;
  color: #181818;
  &:focus {
    outline: 1px solid dogerblue;
  }
  svg{
  font-size: 2rem;
  }
`


const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 }
};
const containerVariant = {
  initial: { y: "-100%", transition: { type: "spring" } },
  isOpen: { y: 0, transition: {duration: .9} },
  exit: { y: "-100%", transition : {duration: .4} }
};
const Modal = ({ handleClose, children, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          variants={modalVariant}
        >
          <ModalContainer variants={containerVariant}>
            <CloseButton
              onClick={handleClose}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20.39 20.39"
             
            >
            <IoCloseOutline  tabIndex='0'/>
            </CloseButton>
            <ModalContent>
            {children}
            </ModalContent>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
