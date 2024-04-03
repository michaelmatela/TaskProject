import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('[]')),
  setItem: jest.fn(() => Promise.resolve()),
}));

describe('App', () => {
  test('renders task list', async () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('Enter task');
    const addButton = getByText('Add Task');
    
    expect(input).toBeDefined();
    expect(addButton).toBeDefined();
  });

  test('adds a task', async () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('Enter task');
    const addButton = getByText('Add Task');

    fireEvent.changeText(input, 'Test task');
    fireEvent.press(addButton);

    // Use waitFor to wait for the state change
    await waitFor(() => {
      expect(input.props.value).toBe('');
      expect(getByText('Test task')).toBeDefined();
    });
  });

  test('toggles task done', async () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('Enter task');
    const addButton = getByText('Add Task');

    fireEvent.changeText(input, 'Test task');
    fireEvent.press(addButton);
    

    

    await waitFor(() => {
      const doneButton = getByText('Test task');
      fireEvent.press(doneButton);
      waitFor(() => {
        expect(doneButton).toHaveStyle({ textDecorationLine: 'line-through' });
      });
    });
  });

  test('deletes a task', async () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('Enter task');
    const addButton = getByText('Add Task');

    fireEvent.changeText(input, 'Test task');
    fireEvent.press(addButton);
    
    await waitFor(() => {
      const deleteButton = getByText('Delete');

      fireEvent.press(deleteButton);
      waitFor(() => {
        expect(queryByText('Test task')).toBeNull();
      });
    });
  });

  test('edit a task', async () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('Enter task');
    const addButton = getByText('Add Task');

    fireEvent.changeText(input, 'Test task');
    fireEvent.press(addButton);
    
    await waitFor(() => {
      const editButton = getByText('Edit');
      fireEvent.changeText(input, 'Edit task');
      fireEvent.press(editButton);

      
      waitFor(() => {
        const updateButton = getByText('Update Task');
        fireEvent.changeText(input, 'Edit task');
        fireEvent.press(updateButton);
        waitFor(() => {
          expect(getByText('Edit task')).toBeDefined();
        });
      });
    });
  });

  test('display a task', async () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('Enter task');
    const addButton = getByText('Add Task');

    fireEvent.changeText(input, 'longwordcharacter');
    fireEvent.press(addButton);
    
    await waitFor(() => {
      expect(getByText('longwordch...')).toBeDefined();
      const displayButton = getByText('Display');
      fireEvent.press(displayButton);
      
      waitFor(() => {
        expect(getByText('longwordcharacter')).toBeDefined();
      });
    });
  });
});