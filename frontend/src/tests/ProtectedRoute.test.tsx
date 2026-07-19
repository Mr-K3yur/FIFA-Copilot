import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { AuthContext } from '../context/AuthContext';
import { vi } from 'vitest';

const renderWithAuth = (user: any, allowedRoles: string[]) => {
  return render(
    <AuthContext.Provider value={{ user, login: vi.fn(), logout: vi.fn() }}>
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/unauthorized" element={<div>Unauthorized Page</div>} />
          <Route path="/protected" element={
            <ProtectedRoute allowedRoles={allowedRoles}>
              <div>Protected Content</div>
            </ProtectedRoute>
          } />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('ProtectedRoute', () => {
  it('redirects to login when user is not authenticated', () => {
    renderWithAuth(null, ['Fan']);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('redirects to unauthorized when user has wrong role', () => {
    const mockUser = { id: '1', name: 'Test', role: 'Fan' };
    renderWithAuth(mockUser, ['Organizer']);
    expect(screen.getByText('Unauthorized Page')).toBeInTheDocument();
  });

  it('renders children when user is authenticated with correct role', () => {
    const mockUser = { id: '1', name: 'Test', role: 'Fan' };
    renderWithAuth(mockUser, ['Fan']);
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
