
import NextApp from 'next/app'
import Head from 'next/head'
import {AnimatePresence} from 'framer-motion'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

 
  body{
      background-color: #181818;
      color: #E4E6EB;
      font-size: 1.02rem;
      overflow-x: hidden;
      font-family: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }
  a{
    color: #a7a9be;
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
      <>
      <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
              <AnimatePresence exitBeforeEnter>
                  <Component 
                  {...pageProps} 
                  key={router.route} />
              </AnimatePresence>
        </ThemeProvider>
        </>
    );
  }
}