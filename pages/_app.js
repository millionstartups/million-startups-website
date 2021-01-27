import '../styles/index.css'
import NextApp from 'next/app'
import {AnimatePresence} from 'framer-motion'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  html {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}
 
  body{
      background-color: #000000;
      color: whitesmoke;
      line-height: 1.3rem;
  }
  a{
    text-decoration: none;
    :active{
        color: dodgerblue;
    }
    :hover{
        color: dodgerblue;
        text-decoration: underline;
    }
}
`
const theme = {
  colors: {
    primary: '#7e559d',
    secondary: '#e5a913'
  },
}

export default class App extends NextApp {
  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
              <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.route} />
              </AnimatePresence>
        </ThemeProvider>
    );
  }
}