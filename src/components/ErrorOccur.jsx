import React from 'react'
import styled from 'styled-components';

function ErrorOccur({error}) {
  return (
    <Container>
      <h2>{error || "There seems to be some issue..."}</h2>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(0%,100%);
  font-size: 1.8rem;
  background-color: red;
  height: auto;
  width: auto;
  border-radius: 10px;
  padding: 5px 30px;
`

export default ErrorOccur
