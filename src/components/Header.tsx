import { Button, Container, Navbar } from "react-bootstrap"

function Header(props: any) {
  const {isAuth, logOut} = props.props
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            iLearning TASK #4 <br /> "Block, Unblock, Delete" app
          </Navbar.Brand>
          {isAuth && <Button variant="outline-light" onClick={logOut}>Log out</Button>}
        </Container>
      </Navbar>
  )
}

export default Header