import React from 'react';
import { render, screen } from '@testing-library/react';
import { LandingAnimation3D } from '../LandingAnimation3D';

describe('LandingAnimation3D', () => {
  it('renders with role img and accessible label', () => {
    render(<LandingAnimation3D label="Hero animation" />);
    const el = screen.getByRole('img', { name: /hero animation/i });
    expect(el).toBeInTheDocument();
  });
});
