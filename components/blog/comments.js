import styled from 'styled-components'
import Date from './date'

const CommentH2 = styled.h2`
font-size: 1.7rem;
margin-top: 2rem;
`


export default function Comments({ comments = [] }) {
  return (
    <>
      <CommentH2>Comments:</CommentH2>
      <ul>
        {comments?.map(({ _id, _createdAt, name, email, comment }) => (
          <li key={_id} className="mb-5">
            <hr className="mb-5" />
            <h4 className="mb-2 leading-tight"><a href={`mailto:${email}`}>{name}</a> (<Date
              dateString={_createdAt}
            />)</h4>
            <p>{comment}</p>
            <hr  className="mt-5 mb-5" />
          </li>
        ))}
      </ul>
    </>
  )
}
