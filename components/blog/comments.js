import styled from 'styled-components'
import {Content} from '../layout/pageStyles'
import Date from './date'

const CommentH2 = styled.h2`
font-size: 1.7rem;
margin: 2rem 0;
`
const Hr = styled.hr`
margin: 1.25rem 0;
`
const H4 = styled.h4`
margin: 1rem 0;
`
const Ul = styled.ul`
list-style: none;
`
export default function Comments({ comments = [] }) {
  return (
    <Content>
      <CommentH2>Comments:</CommentH2>
      <Ul>
        {comments?.map(({ _id, _createdAt, name, email, comment }) => (
          <li key={_id} className="mb-5">
            <Hr />
            <H4 className="mb-2 leading-tight"><a href={`mailto:${email}`}>{name}</a> (
              <Date
              dateString={_createdAt}
            />)</H4>
            <p>{comment}</p>
            <Hr />
          </li>
        ))}
      </Ul>
    </Content>
  )
}
