import {Fragment, useState} from 'react'
import { useQuery} from 'react-query'
import { getSiteData } from '../../lib/api'
import CookieConsent from "react-cookie-consent";
import {GA_TRACKING_ID} from '../../lib/gtag'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'
import {Main} from './pageStyles'
import { motion, AnimatePresence } from 'framer-motion'
import { imageBuilder } from '../../lib/sanity'
import Footer from './Footer'
import Image from 'next/image'


const isProduction = process.env.NODE_ENV === "production";

const Nav = styled.nav`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
margin-top: 3rem;
width: 100vw;
`

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: flex-start;
flex-direction: row;
width: 95%;
max-width: 2250px;
justify-content: space-between;
`

export const Overlay = styled(motion.div)`
width: 100%;
z-index: 1000;
height: 100%;
position: fixed;
top: 0;
bottom: 0;
left:0;
right: 0;
background-color: rgba(0,1,0,.8);
`

const Brand = styled.div`
height: 60px;
`

const NavPageTitle = styled.h1`
display: inline;
margin-left: 2rem;
font-size: 2rem;
`

const Spacer = styled.div`
flex-grow: 1;
`


const Menu = styled.div`
@media (max-width: 768px) {
    display: none;
  }
@media (min-width: 769px) {
    visibility: visible;
  }
a{margin-left: 2rem; color: white;}
`

const Toggle = styled.div`
@media (min-width: 768px) {
    visibility: collapse;
  }
@media (max-width: 769px) {
    visibility: visible;
  }

svg{
    height: 30px;
    width: 30px;
    color: whitesmoke;
}
span {
position:absolute;
left:-10000px;
top:auto;
width: 1px;
height:1px;
overflow:hidden;
}
button {
    margin-right: .4rem;
    border: none;
    background-color: transparent;
}
`
const MenuDrawer = styled(motion.div)`
width: 260px;
z-index: 99999;
height: 100%;
position: fixed;
top: 0;
bottom: 0;
right: 0;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(5, 5, 20, .95);
`
const Close = styled(motion.div)`
z-index: 11000;
svg{
    height: 30px;
    width: 30px;
}
span {
  position:absolute;
  left:-10000px;
  top:auto;
  width: 1px;
  height:1px;
  overflow:hidden;
}
button, .mobile {
    position: fixed;
    top: 0;
    right: 0;
    margin: 2.4rem 2.2rem;
    border: 1px;
    border-radius: 50%;
    background-color: rgba(192,192,192,.2);
    transition: all 0.5s ease-out;
  :hover{
    transform: scale(1.122)
  }
  :active{
    transform: scale(.989)
  }
}
`

const Space = styled.div`
min-width: 100%;
min-height: 95px;
`

const MobileLinks = styled.div`
display: flex;
justify-content: top;
align-items: center;
flex-direction: column;
width: 100%;
height: 60%;
a{
  color: white;
  font-size: 2rem;
  line-height: 3.9rem;
  display: block;
  transition: all 0.5s ease-out;
  :hover{
    transform: scale(1.122)
  }
  :active{
    transform: scale(.989)
  }
}
`

const overlay = {
    open: { 
        opacity: 1,
        transition: {
        duration: .5,
      } 
    },
    closed: { 
        opacity: 0, 
        transition: {
        duration: .5,
      }  
    },
  }

  const drawer = {
    open: { 
        x: 0,
        transition: {
        duration: .7,
      } 
    },
    closed: { 
        x: '-100%',
        transition: {
        duration: .7,
      }  
    },
  }

  const MainContainer = ({preview, children, logo, facebook, twitter, linkedin, youtube, googlepodcast, applepodcast, spotify, tiktok, amazonmusic, soundcloud, navpagetitle}) => { 
   const [isOpen, setIsOpen] = useState(false);
    return (
        <Fragment>
        <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans&display=swap" rel="stylesheet"/> 
        {isProduction && (
        <>
        <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
          `,
          }}
          /> 
          </>
        )}

      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='The Million Startups' />
      <meta name='description' content='A podcast with up-and-coming startups and their pitch.' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='msapplication-tap-highlight' content='no' />

      <meta name="apple-mobile-web-app-title" content="The Million Startups"/>
      <meta name="application-name" content="The Million Startups"/>
      <meta name="msapplication-TileColor" content="#da532c"/>
      <meta name="theme-color" content="#000"/>

        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
        
      <link rel="manifest" href="/manifest.webmanifest" crossOrigin="use-credentials"/>
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5"/>
        <link rel="shortcut icon" href="/favicons/favicon.ico"/>
        
        
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:url' content='https://themillionstartups.com' />
        <meta name='twitter:title' content='The Million Startups' />
        <meta name='twitter:description' content='A podcast with up-and-coming startups and their pitch.' />
        //<meta name='twitter:image' content='https://yourdomain.com/static/icons/android-chrome-192x192.png' />
        //<meta name='twitter:creator' content='@josebonilla' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='The Million Startups' />
        <meta property='og:description' content='A podcast with up-and-coming startups and their pitch.' />
        <meta property='og:site_name' content='The Million Startups' />
        <meta property='og:url' content='https://themillionstartups.com' />
        <meta property='og:image' content='https://themillionstartups.com/favicons/apple-touch-icon.png' />

        </Head>
        <Nav>
         <Wrapper>
          <Brand>
          {logo && (
          <Link href='/'><a>   
          
                     
            <Image
              src={imageBuilder(logo)
                    .height(40)
                    .width(40)
                    .url()} 
              alt={logo.alt}
              priority
              width={40}
              height={40}
              layout='fixed'
            />
            </a></Link>)}
        </Brand>
          {navpagetitle &&  <NavPageTitle>{navpagetitle}</NavPageTitle>}
          <Spacer/>
            <Menu>
              <Link href='/'><a>Home</a></Link>
              <Link href='/blog'><a>Blog</a></Link>
              <Link href='/episodes'><a>Episodes</a></Link>
              <Link href='/contact'><a>Contact Us</a></Link>
            </Menu>
            <Toggle>
            <button onClick={() => setIsOpen(!isOpen)} type="button" id="main-menu" aria-controls="mobile-menu" aria-haspopup="true">
              <span>Open main menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </Toggle>
           </Wrapper>
        </Nav>

        <AnimatePresence>
        { isOpen && (
        <Overlay onClick={() => setIsOpen(!isOpen)} initial={{opacity: 0}} animate={isOpen ? "open" : "closed"} variants={overlay} exit={{opacity: 0}} />
        )}
        </AnimatePresence>



        <AnimatePresence>
            { isOpen && (
             <MenuDrawer id='mobile-menu' initial={{x: '+100%'}} animate={isOpen ? "open" : "closed"} variants={drawer} exit={{x: '+100%'}}>
             <Close>
             <button tabIndex='1' id='mobile-menu' className='mobile' onClick={() => setIsOpen(!isOpen)} type="button">
               <span>Close main menu</span>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
           </Close>
           <MobileLinks>
           <Link href='/'><a onClick={() => setIsOpen(!isOpen)}>Home</a></Link>
           <Link href='/blog'><a onClick={() => setIsOpen(!isOpen)}>Blog</a></Link>
           <Link href='/episodes'><a onClick={() => setIsOpen(!isOpen)}>Episodes</a></Link>
           <Link href='/contact'><a onClick={() => setIsOpen(!isOpen)}>Contact Us</a></Link>
           </MobileLinks>
             </MenuDrawer>
            )}
            </AnimatePresence>

            <Main exit={{opacity: 0}} initial='initial' animate='animate'>{children}</Main>
            <Space/>
            <Footer
              facebook={facebook}
              twitter={twitter}
              linkedin={linkedin}
              youtube={youtube}
              googlepodcast={googlepodcast}
              applepodcast={applepodcast} 
              spotify={spotify} 
              tiktok={tiktok} 
              amazonmusic={amazonmusic}
              soundcloud={soundcloud}
            />
            <CookieConsent
            location="bottom"
            buttonText="Ok, I like cookies."
            cookieName="my-cookieConsent"
            style={{ background: "dodgerblue" }}
            enableDeclineButton
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            expires={150}
          >
            We use cookies to make our website better for you. Please tell us your preference.
          </CookieConsent>
            </Fragment>
    )
}

export default MainContainer