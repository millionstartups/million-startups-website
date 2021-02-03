import styled from 'styled-components'
import {FaFacebookSquare, FaTwitterSquare, FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'
import Modal from "../ui/Modal";
import OpenModalButton from "../ui/OpenModalButton";
import MailingListForm from '../ui/MailingListForm';

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
width: 90%;
`


const FooterSection = styled.footer`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
margin: 2rem 0;
padding-top: 1rem;
`

const Social= styled.div`
display: flex;
justify-content: space-evenly;
color: white;
span {
    font-size: 2.5rem;
}
a{
    color: white;
}
`



const Footer = () => {
    const [isModal, toggle] = useState(false);

    function handlOpenModal(open) {
    console.log("close modal");
    toggle(open);
    }

    return (
        
        <FooterSection>
        <Wrapper>
        <Social>
          <span><Link href='#'><a><FaFacebookSquare /></a></Link></span>
          <span><Link href='#'><a><FaTwitterSquare /></a></Link></span>
          <span><Link href='#'><a><FaLinkedin /></a></Link></span>
        </Social>
        <OpenModalButton handlClick={() => handlOpenModal(true)}>
        Join the mailing list
      </OpenModalButton>
      <Modal isOpen={isModal} handleClose={() => handlOpenModal(false)}>
          <MailingListForm/>
      </Modal>
       </Wrapper>
        </FooterSection>
    )
}

export default Footer