import styled from 'styled-components'

export const Main = styled.main`
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
`
export const Flex = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 90vw;
@media (max-width: 768px) {
    flex-direction: column;
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
display: flex;
justify-content: center;
align-items: center;
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
justify-content: center;
height: auto;
`


export const TitleHeading = styled.div`
line-height: clamp(70%, 150%, 80%);
font-size: clamp(3.4rem, -0.875rem + 10vw, 5.9em);
margin-bottom: 2rem;
`
