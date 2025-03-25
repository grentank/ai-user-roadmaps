import React from 'react';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => (
  <footer className="bg-dark text-light text-center py-3 mt-auto">
    <Container>
      <p className="mb-0">&copy; {new Date().getFullYear()} Travel Planner. Все права защищены.</p>
    </Container>
  </footer>
);

export default Footer;
