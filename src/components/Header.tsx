import { Container, Navbar } from "react-bootstrap"

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            iLearning TASK #4 <br /> "Block, Unblock, Delete" app
          </Navbar.Brand>
        </Container>
      </Navbar>
  )
}

export default Header