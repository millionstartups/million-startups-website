import styled from 'styled-components'
import {FaFacebookSquare, FaTwitterSquare, FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'

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
    return (
        
        <FooterSection>
        <Wrapper>
        <Social>
          <span><Link href='#'><a><FaFacebookSquare /></a></Link></span>
          <span><Link href='#'><a><FaTwitterSquare /></a></Link></span>
          <span><Link href='#'><a><FaLinkedin /></a></Link></span>
        </Social>
       <div>Join our mail list</div>
       </Wrapper>
        </FooterSection>
    )
}

export default Footer