import styled from 'styled-components'
import BlockContent from '@sanity/block-content-to-react'

const ContentBody = styled.div`
max-width: 60rem;
padding-left: 1rem;
padding-right: 1rem;
`

export default function PostBody({ content }) {
  return (
    <ContentBody>
      <BlockContent blocks={content} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} />
    </ContentBody>
  )
}
