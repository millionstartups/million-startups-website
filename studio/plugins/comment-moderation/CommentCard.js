import React from 'react'
import {Card, Heading} from '@sanity/ui'
import CommentList from './CommentList'

export default function CommentCard(props) {
    const {title, description, approvalStatus, fullWidth=false} = props
  
    return (
      <Card radius={4} column={fullWidth ? 'full' : ''} margin={3}>
        <Card radius={4} marginBottom={1} paddingX={4} paddingTop={4} borderBottom={0} paddingBottom={0}>
        <Heading size={3} as={"h2"}>{title}</Heading>
          <p>{description}</p>
        </Card>
        <CommentList approvalStatus={approvalStatus} />
  
      </Card>
    )
}