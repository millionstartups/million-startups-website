import styled from 'styled-components'
import BlockContent from '@sanity/block-content-to-react'

const ContentBody = styled.div`
max-width: 60rem;
margin-left: auto;
margin-right: auto;
`

export default function PostBody({ content }) {
  return (
    <ContentBody>
      <BlockContent blocks={content} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} />
    </ContentBody>
  )
}
