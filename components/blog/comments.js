import styled from 'styled-components'
import Date from './date'

const Section = styled.section`
width: 100%;
max-width: 1100px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`

const Content = styled.div`
width: 85%;
`

const CommentH2 = styled.h2`
font-size: 1.7rem;
margin: 2rem 0;
`
const Hr = styled.hr`
width: 100%;
margin: 1.25rem 0;
`
const H4 = styled.h4`
margin: 1rem 0;
`
const Ul = styled.ul`
padding: 1rem;
margin-bottom: 1rem;
list-style: none;
`

const Li = styled.li`
padding: 1rem;
border-radius: 1.5rem;
margin-bottom: 1rem;
background-color: rgba(200, 200, 200, .1);
`
const H1 = styled.h1`
text-align: center;
`

export default function Comments({ comments = [] }) {
  return (
    <Section>
    <Content>
      <CommentH2>Comments:</CommentH2>
      <Ul>
        {comments?.map(({ _id, _createdAt, name, email, comment }) => (
          <Li key={_id} className="mb-5">
            <H4><a href={`mailto:${email}`}>{name}</a> (
              <Date
              dateString={_createdAt}
            />)</H4>
           
            <p>{comment}</p>
            <Hr />
          </Li>
        ))}
        {comments.length === 0 && (
          <Li>
          <H1>Be the first to post a comment</H1>
          </Li>

        )}
      </Ul>
      </Content>
    </Section>
  )
}
