import React from 'react'
import Logo from './Logo'
import { Flex, studioTheme, ThemeProvider} from '@sanity/ui'
const ImgLogo = () => (
       <ThemeProvider theme={studioTheme}>
        <Flex justify='center' align='center'>
          <Logo/>
        </Flex>
      </ThemeProvider>
   ) 

export default ImgLogo
