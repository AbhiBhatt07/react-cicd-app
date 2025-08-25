import { render, screen, within } from '@testing-library/react';
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

    // "Contact" appears in navbar and hero → use getAllByRole
    const contactLinks = screen.getAllByRole('link', { name: /contact/i });
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  it('renders skills section', () => {
    render(<App />);
    
    const skillsSectionHeading = screen.getByRole('heading', { name: /skills & technologies/i });
    expect(skillsSectionHeading).toBeInTheDocument();

    const skillsSection = skillsSectionHeading.closest('section');
    expect(skillsSection).not.toBeNull();

    // Scope only inside the Skills section
    if (skillsSection) {
      const utils = within(skillsSection);
      expect(utils.getByText('React')).toBeInTheDocument();
      expect(utils.getByText('Docker')).toBeInTheDocument();
      expect(utils.getByText('Kubernetes')).toBeInTheDocument();
    }
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
    
    expect(
      screen.getByText(/Built with React, Tailwind CSS, and deployed via CI\/CD/)
    ).toBeInTheDocument();
  });
});
