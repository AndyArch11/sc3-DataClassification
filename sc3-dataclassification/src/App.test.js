import { render, screen } from '@testing-library/react';
import App from './App';

// Simple test that doesn't require complex routing mocks
test('renders without crashing', () => {
  // Just test that the component renders without throwing an error
  expect(() => {
    render(<App />);
  }).not.toThrow();
  
  // Check that the main components are rendered
  // The heading text appears twice (App header + DCForm heading), so assert on the count
  expect(screen.getAllByText(/Data Classification Form/i).length).toBeGreaterThan(0);
});
