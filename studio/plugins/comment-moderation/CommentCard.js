import React from 'react'
import {Card, Heading} from '@sanity/ui'
import CommentList from './CommentList'

export default function CommentCard(props) {
    const {title, description, approvalStatus, fullWidth=false} = props
  
    return (
      <Card radius={4} tone="primary" column={fullWidth ? 'full' : ''} margin={3}>
        <Card radius={4} shadow={1} tone="primary" marginBottom={1} paddingX={4} paddingTop={4} borderBottom={1} paddingBottom={0}>
        <Heading size={3} as={"h2"}>{title}</Heading>
          <p>{description}</p>
        </Card>
        <CommentList approvalStatus={approvalStatus} />
  
      </Card>
    )
}