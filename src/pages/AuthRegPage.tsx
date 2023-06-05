import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'

function AuthRegPage(props: any) {
  const {setIsAuth, isLoading, setIsLoading} = props.props
  const location = useLocation()
  const isLogin = location.pathname === '/'
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function storeEmail() {
    localStorage.setItem('email', email);
  }

  async function handleLogin(e: any){
    e.preventDefault()
    if (password.length > 0 && email != '') {
      setIsLoading(true)
      setError('')
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + 'users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, password: password}),
      })
      if (response.ok) {
          setIsAuth(true)
          storeEmail()
          navigate('/admin')
        } else {
          const responseData = await response.json();
          setError(responseData.error);
        }
      } catch (error) {
        setError('Sorry but something went wrong on the server side, please try again later')
        console.log(error)
      }
      setIsLoading(false)
    } else {
      setError('Invalid email or password')
    }
  }

  async function handleRegistration(e: any) {
    e.preventDefault()
    if (password && userName) {
      setError('')
      setIsLoading(true)
      try {
        const response = await fetch(import.meta.env.VITE_API_URL+"users/registration", {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify({name: userName,email: email,password: password,}),
        })
        if(response.ok) {
          const responseData = await response.json();
          alert(responseData.message);
          navigate('/')
        } else {
          const responseData = await response.json();
          setError(responseData.error);
        }
      } catch (error) {
        setError('Sorry but something went wrong on the server side, please try again later')
        console.log(error);
      }
      setIsLoading(false)
    } else {
      setError('Please enter a valid email and fill all fields')
    }
  }

  const handleSubmit = isLogin ? handleLogin : handleRegistration

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card className='mt-5' style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title>{isLogin ? 'LOGIN' : 'REGISTRATION'}</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {isLoading && <Alert variant="primary">Loading...</Alert>}
          <Form onSubmit={handleSubmit}>
            {!isLogin && 
              <Form.Group controlId="formUserName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>}
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>


            <div className='d-flex justify-content-between align-items-center mt-3'>
              <Button variant="primary" type="submit">
                {isLogin ? 'Login' : 'Registrate'}
              </Button>
              {isLogin ? 
                <div>
                  Don't have an account?  <NavLink onClick={()=> setError('')} to='/registration'>Sign up</NavLink>
                </div>
                :
                <div>
                  Have an account already?  <NavLink onClick={()=> setError('')} to='/'>Log in</NavLink>
                </div>
              }
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AuthRegPage
