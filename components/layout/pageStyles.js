import styled from 'styled-components'
import { motion } from 'framer-motion'
import { shrinkLabel } from '../../styles/mixin'

export const Main = styled(motion.main)`
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
`
export const Flex = styled.div`
display: flex;
flex-direction: ${props => props.flexDir || `row`};
justify-content: center;
align-items: center;
width: ${props => props.width || `90vw`};
justify-content: center;
@media (max-width: 768px) {
    flex-direction: ${props => props.smFlexDir || `column`};
  }
`
export const HalfContainer = styled.div`
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
@media (motion-width: 768px) {
    width: 100%;
  }
`

export const Container30 = styled.div`
box-sizing: border-box;
width: 30%;
min-height: 200px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column-reverse;
@media (min-width: 768px) {
    width: 100%;
  }
`

export const ContainerLeft60 = styled.div`
box-sizing: border-box;
width: 60%;
display: flex;
justify-content: left;
align-items: left;
flex-direction: column;
@media (max-width: 768px) {
    width: 100%;
  }
`

export const Container60 = styled.div`
box-sizing: border-box;
width: 60%;
height: auto;
display: flex;
justify-content: center;
align-items: center;
@media (max-width: 768px) {
    width: 100%;
    height: 400px;
  }
`

export const ImageContainer = styled.div`
display: flex;
min-width: 200px;
justify-content: center;
height: auto;
`


export const TitleHeading = styled.h1`
font-family: 'Open Sans', sans-serif;
font-size: 64px;
text-shadow: 1px 3px 4px #800000;
.spacing {
  margin-bottom: 50px;
  width: 50%;
  line-height: 47px;
}
`


export const Card = styled(motion.div)`
color: black;
background-color: white;
border-radius: .7rem;
flex-direction: column-reverse;
display: flex;
justify-content: center;
align-items: center;
max-width: 1260px;

min-height: 450px;
padding: 1rem;

.wrapper{
  max-width: 1000px;
}

.image{
}

.left {
  min-width: 250px;
}


.right{ 
  align-self: flex-start;
  justify-self: flex-start;
  margin: 0 .5rem;
  padding: 0 .5rem;
  max-width: 600px;


  @media (max-width: 768px){
    max-width: 600px;
  }
  p{
    flex-wrap: wrap;
  }
}


`


export const FormWrapper = styled.div`

.group {
  position: relative;
  margin: 45px 0;

  input {
    background: none;
    background-color: none;
    color: whitesmoke;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 85%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid white;
    margin: 25px 0;

    &:focus {
      outline: none;
    }

    &:focus ~ label {
      ${shrinkLabel};
    }
  }

  textarea {
    background: none;
    background-color: none;
    color: whitesmoke;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 85%;
    border: none;
    resize: none;
    border-radius: 0;
    border-bottom: 1px solid white;
    margin: 25px 0;

    &:focus {
      outline: none;
    }

    &:active ~ label {
      ${shrinkLabel};
    }
  }

  label {
    color: $sub-color;
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 300ms ease all;

    &.shrink {
      ${shrinkLabel};
    }
  }
}
.custom-button {
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: white;
  color: black;
  text-transform: uppercase;
  border-radius: 1rem;
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: dodgerblue;
    color: black;
    border: 1px solid white;
  }
}
.errorMsg {
  color: rgba(255,99,71,.7);
  position: absolute;
  top: -18px;
  left: 75px;
  z-index: -1;

}
`
export const CircleImage = styled.div`
padding: 1rem;
img{
width: 3rem;
border-radius: 9999px;
margin-right: 1rem;}
`
export const Grid = styled.div`
display: grid;
`

export const Content = styled.div`
max-width: 60rem;
padding-left: auto;
padding-right: auto;
`