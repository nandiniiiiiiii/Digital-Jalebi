import React from 'react'
import { PacmanLoader } from 'react-spinners';
import styled from 'styled-components';

function LoadingState() {
  return (
    <Container>
      <PacmanLoader
        color="rgba(251, 138, 0, 1)"
        size={40}
        speedMultiplier={1}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-40%,300%);
`

export default LoadingState
