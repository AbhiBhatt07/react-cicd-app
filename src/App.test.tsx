import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders portfolio title', () => {
    render(<App />);
    
    // Check if the main heading is present
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toMatch(/Hello, I'm/);
  });

  it('renders navigation links', () => {
    render(<App />);
    
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /skills/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders skills section', () => {
    render(<App />);
    
    expect(screen.getByText('Skills & Technologies')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.getByText('Kubernetes')).toBeInTheDocument();
  });

  it('renders projects section', () => {
    render(<App />);
    
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
  });

  it('renders contact section', () => {
    render(<App />);
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('has correct footer text', () => {
    render(<App />);
    
    expect(screen.getByText(/Built with React, Tailwind CSS, and deployed via CI\/CD/)).toBeInTheDocument();
  });
});