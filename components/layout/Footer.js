import styled from 'styled-components'
import {FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaSpotify } from 'react-icons/fa'
import {SiGooglepodcasts, SiSpotify, SiApplepodcasts} from 'react-icons/si'
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

a{
    color: white;
    font-size: 2.5rem;
    margin: 0 .3rem;
  &:hover {
    color: dodgerblue;
    transform: scale(1.07);
  }
  
}
`

const MobileHidden = styled.div`

      @media (max-width: 768px) {
          display: none;
       }
`
const MobileShow = styled.div`

      @media (min-width: 768px) {
          display: flex;
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
          <Link href='#'><a><FaFacebookSquare /></a></Link>
          <Link href='#'><a><FaTwitterSquare /></a></Link>
          <Link href='#'><a><FaLinkedin /></a></Link>
          <MobileHidden>
          <Link href='#'><a><SiGooglepodcasts /></a></Link>
          <Link href='#'><a><SiSpotify /></a></Link> 
          <Link href='#'><a><SiApplepodcasts /></a></Link> 
          </MobileHidden>
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