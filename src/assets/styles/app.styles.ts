import styled, {keyframes} from 'styled-components'

export const SApp = styled.div`
    height: 100vh;
`

export const SHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: black;
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const SLogo = styled.img`
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} infinite 20s linear;
  }
`

export const SLink = styled.a`
  color: #61dafb;
`

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 10fr;
  height: 100%;
`
