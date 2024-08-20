import React, { useState } from 'react';
import { Modal, Button, Form, Nav } from 'react-bootstrap';
import authService from '../services/authService';

interface AuthModalProps {
  onAuthenticate: (isAuthenticated: boolean) => void;
  onClose: () => void;
  show : boolean,
}

const AuthPopup :  React.FC<AuthModalProps> = ({ show, onClose, onAuthenticate }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (activeTab === 'login') {
  //     if (username && password) {
  //       onAuthenticate(true);
  //       onClose();
  //     }
  //   } else {
  //     if (username && email && password && password === confirmPassword) {
  //       // Here you would typically call an API to register the user
  //       console.log('Register:', { username, email, password });
  //       onAuthenticate(true);
  //       onClose();
  //     }
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (activeTab === 'login') {
        if (email && password) {
          const data = await authService.login({ email, password });
          // Here you might want to store the token in localStorage
          localStorage.setItem('token', data.token);
          onAuthenticate(true);
          onClose();
        }
      } else {
        if (username && email && password ) {
          const data = await authService.register({ username, email, password });
          // Here you might want to store the token in localStorage
          localStorage.setItem('token', data.token);
          onAuthenticate(true);
          onClose();
        }
      }
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
    }
  };


  const renderForm = () => {
    if (activeTab === 'login') {
      return (
        <>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
        </>
      );
    } else {
      return (
        <>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group> */}
        </>
      );
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{activeTab === 'login' ? 'Login' : 'Register'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link 
              onClick={() => setActiveTab('login')} 
              active={activeTab === 'login'}
            >
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              onClick={() => setActiveTab('register')} 
              active={activeTab === 'register'}
            >
              Register
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Form onSubmit={handleSubmit}>
          {renderForm()}
          <Button variant="secondary" onClick={onClose} className="me-2">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {activeTab === 'login' ? 'Login' : 'Register'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthPopup;