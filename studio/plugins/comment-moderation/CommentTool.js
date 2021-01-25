import React from 'react'

import { Container, Card, Grid, Heading, studioTheme, ThemeProvider } from '@sanity/ui'
import styles from './CommentTool.css'
import CommentCard from './CommentCard'


export default function CommentTool() {

  return (
    <ThemeProvider theme={studioTheme}>
    <Container width={3}>
      <Card radius={4} shadow={1} tone="primary" margin={3} padding={5}>
        <Heading marginBottom={1} size={5} as={"h1"}>Comment Moderation Dashboard</Heading>
        <p>Comments are moderated to avoid spam or unwanted comments. The top 5 latest comments will display for each section.</p>
      </Card>

      <Grid autoCols={"auto"} columns={[1, 1, 1, 2]}>
        <CommentCard fullWidth={true} title="To Be Moderated" description="Comments that require moderating are listed below:" approvalStatus={undefined} />
        <CommentCard title="Approved" description="Approved comment will display on the blog posts" approvalStatus={true} />
        <CommentCard title="Unapproved" description="These are the bad ones" approvalStatus={false} />  
      </Grid>

    </Container>
    </ThemeProvider>
  )
}