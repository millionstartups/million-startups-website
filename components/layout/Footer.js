import styled from 'styled-components'
import {FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaAmazon, FaYoutube, FaSoundcloud } from 'react-icons/fa'
import {SiGooglepodcasts, SiSpotify, SiApplepodcasts, SiTiktok} from 'react-icons/si'
import { useState } from 'react'
import Modal from "../ui/Modal";
import OpenModalButton from "../ui/OpenModalButton";
import MailingListForm from '../ui/MailingListForm';

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
max-width: 2250px;
width: 90%;
`


const FooterSection = styled.footer`
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
margin: 2rem 0;
padding-top: 1rem;
`

const Social= styled.div`
display: flex;

@media (max-width: 725px) {
         max-width: 350px;
       }
@media (max-width: 305px) {
      max-width: 160px;
      }
justify-content: space-evenly;
flex-wrap: wrap;
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
const Footer = ({facebook, twitter, linkedin, youtube, googlepodcast, applepodcast, spotify, tiktok, amazonmusic, soundcloud }) => {
    const [isModal, toggle] = useState(false);

    function handlOpenModal(open) {
    console.log("close modal");
    toggle(open);
    }

    return (
        
        <FooterSection>
        <Wrapper>
        <Social>
        {facebook && ( <a href={facebook}　rel="noreferrer noopener"　target="_blank"><FaFacebookSquare /></a>)}  
        {twitter && ( <a href={twitter} rel="noreferrer noopener"　target="_blank"><FaTwitterSquare /></a> )}
        {linkedin && ( <a href={linkedin} rel="noreferrer noopener"　target="_blank"><FaLinkedin /></a> )}
        {youtube && ( <a href={youtube} rel="noreferrer noopener"　target="_blank"><FaYoutube /></a> )}
        {tiktok && ( <a href={tiktok} rel="noreferrer noopener"　target="_blank"><SiTiktok /></a> )}
          {googlepodcast && ( <a href={googlepodcast} rel="noreferrer noopener"　target="_blank"><SiGooglepodcasts /></a> )}
          {spotify && ( <a href={spotify} rel="noreferrer noopener"　target="_blank"><SiSpotify /></a> )}
          {applepodcast && ( <a href={applepodcast} rel="noreferrer noopener"　target="_blank"><SiApplepodcasts /></a> )}
          {amazonmusic && ( <a href={amazonmusic} rel="noreferrer noopener"　target="_blank"><FaAmazon /></a> )}
          {soundcloud && ( <a href={soundcloud} rel="noreferrer noopener"　target="_blank"><FaSoundcloud /></a> )}
        
        
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