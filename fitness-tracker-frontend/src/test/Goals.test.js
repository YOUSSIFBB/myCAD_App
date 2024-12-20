import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Goals from '../components/Goals';

test('renders the Goals component with a form and adds a new goal', async () => {
    render(<Goals />);

    // Check that form inputs are present
    const titleInput = screen.getByPlaceholderText(/Exercise/i);
    const caloriesInput = screen.getByPlaceholderText(/Calories/i);
    const submitButton = screen.getByText(/Add Goal/i);

    expect(titleInput).toBeInTheDocument();
    expect(caloriesInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Simulate adding a goal
    fireEvent.change(titleInput, { target: { value: 'Run 5km' } });
    fireEvent.change(caloriesInput, { target: { value: '500' } });
    fireEvent.click(submitButton);

    // Wait for the DOM to update
    await waitFor(() => {
        const newGoal = screen.getByText(/Run 5km/i);
        expect(newGoal).toBeInTheDocument();
    });
});
