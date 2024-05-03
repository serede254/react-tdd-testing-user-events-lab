import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from "../App";

// Portfolio Elements tests (existing tests)

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  const checkbox1 = screen.getByLabelText(/Interest 1/i);
  const checkbox2 = screen.getByLabelText(/Interest 2/i);
  const checkbox3 = screen.getByLabelText(/Interest 3/i);

  expect(checkbox1).toBeInTheDocument();
  expect(checkbox2).toBeInTheDocument();
  expect(checkbox3).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  const checkboxes = screen.getAllByRole("checkbox");

  checkboxes.forEach((checkbox) => {
    expect(checkbox).not.toBeChecked();
  });
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  userEvent.type(nameInput, "John Doe");
  userEvent.type(emailInput, "john@example.com");

  expect(nameInput).toHaveValue("John Doe");
  expect(emailInput).toHaveValue("john@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  const checkbox1 = screen.getByLabelText(/Interest 1/i);
  const checkbox2 = screen.getByLabelText(/Interest 2/i);
  const checkbox3 = screen.getByLabelText(/Interest 3/i);

  userEvent.click(checkbox1);
  userEvent.click(checkbox2);

  expect(checkbox1).toBeChecked();
  expect(checkbox2).toBeChecked();
  expect(checkbox3).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  userEvent.type(nameInput, "John Doe");
  userEvent.type(emailInput, "john@example.com");
  userEvent.click(submitButton);

  expect(screen.getByText(/thank you, john doe!/i)).toBeInTheDocument();
});