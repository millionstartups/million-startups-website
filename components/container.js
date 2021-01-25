import styled from 'styled-components'

const Contain = styled.div`
  width: 100%;
  margin-left: 1px;
  margin-right: 1px;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
`

export default function Container({ children }) {
  return <Contain>{children}</Contain>
}
