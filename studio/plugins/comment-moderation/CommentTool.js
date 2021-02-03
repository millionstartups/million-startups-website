import React from 'react'

import { Container, Card, Grid, Heading, studioTheme, ThemeProvider,  usePrefersDark } from '@sanity/ui'
import CommentCard from './CommentCard'
import styles from './CommentTool.css'


export default function CommentTool() {
  const prefersDark = usePrefersDark()
  
  // The theme system supports either "dark" or "light"
  const scheme = prefersDark ? 'dark' : 'dark'

  return (
    <ThemeProvider scheme={scheme} theme={studioTheme}>
    <Container width={3}>
      <Card className={styles.card} radius={4} margin={3} padding={5}>
        <Heading marginBottom={1} size={5} as={"h1"}>Comment Moderation Dashboard</Heading>
        <p>Comments are moderated to avoid spam or unwanted comments. The top 5 latest comments will display for each section.</p>
      </Card>

      <Grid autoCols={"auto"} columns={[1, 1, 1, 2]}>
        <CommentCard fullWidth={true} title="To Be Moderated" description="Comments that require moderating are listed below:" approvalStatus={undefined} />
        <CommentCard title="Approved" description="Most recent approved comments" approvalStatus={true} />
        <CommentCard title="Unapproved" description="Most recent unapproved comments" approvalStatus={false} />  
      </Grid>

    </Container>
    </ThemeProvider>
  )
}