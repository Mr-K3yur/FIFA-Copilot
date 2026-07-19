import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { AuthContext } from '../context/AuthContext';
import { vi } from 'vitest';

const mockLogin = vi.fn();

const renderLogin = () => {
  return render(
    <AuthContext.Provider value={{ user: null, login: mockLogin, logout: vi.fn() }}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all role selection buttons', () => {
    renderLogin();
    expect(screen.getByText('Fan')).toBeInTheDocument();
    expect(screen.getByText('Organizer')).toBeInTheDocument();
    expect(screen.getByText('Volunteer')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });

  it('calls login function with correct role when a button is clicked', () => {
    renderLogin();
    
    // Find the Fan role button container and click it
    const fanButton = screen.getByText('Fan').closest('button');
    fireEvent.click(fanButton!);
    
    expect(mockLogin).toHaveBeenCalledWith('Fan');
  });
});
