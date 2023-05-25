import { PageNotFound } from './components/PageNotFound';
import { HeroesPage } from './components/HeroesPage';
import { FormLayout } from './components/FormLayout';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('show correct text', () => {
  render(<PageNotFound />);
  const textElement = screen.getByText('PageNotFound');
  expect(textElement).toBeInTheDocument();
});

test('renders element with the correct class', () => {
  render(<HeroesPage />);
  const element = screen.getByTestId('test');
  expect(element).toBeInTheDocument();
  expect(element).toHaveClass('heroPage');
});

test('updates input value on change', () => {
  render(<FormLayout />);
  const input = screen.getByLabelText('name');
  fireEvent.change(input, { target: { value: 'Serhii Zelinskyi' } });
  expect(input.value).toBe('Serhii Zelinskyi');
});

test('limited characters on input element', () => {
  render(<FormLayout />);
  const input = screen.getByLabelText('description');
  fireEvent.change(input, { target: { value: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis ab illo laboriosam, itaque pariatur distinctio rerum'} });
  expect(input.value.length).toBeLessThanOrEqual(255)});

  test('checks placeholder presence in input', () => {
    render(<FormLayout />);
    const input = screen.getByPlaceholderText('image');
  
    expect(input).toBeInTheDocument();
  });
