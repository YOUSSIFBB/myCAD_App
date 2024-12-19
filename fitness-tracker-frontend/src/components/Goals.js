import React, { useState, useEffect } from "react";
import "./styles.css"; // Ensure this file contains your CSS styles

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        title: "",
        calories: "",
        start_date: "",
        end_date: "",
        status: "New",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [highlightedGoalId, setHighlightedGoalId] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:3000/goals")
            .then((response) => response.json())
            .then((data) => setGoals(data))
            .catch((error) => console.error("Error fetching goals:", error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            fetch(`http://127.0.0.1:3000/goals/${formData.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((updatedGoal) => {
                    setGoals(goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)));
                    resetForm();
                })
                .catch((error) => console.error("Error updating goal:", error));
        } else {
            fetch("http://127.0.0.1:3000/goals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((newGoal) => {
                    setGoals([...goals, newGoal]);
                    resetForm();
                })
                .catch((error) => console.error("Error creating goal:", error));
        }
    };

    const deleteGoal = (id) => {
        fetch(`http://127.0.0.1:3000/goals/${id}`, { method: "DELETE" })
            .then(() => setGoals(goals.filter((goal) => goal.id !== id)))
            .catch((error) => console.error("Error deleting goal:", error));
    };

    const editGoal = (goal) => {
        setFormData({ ...goal });
        setIsEditing(true);
        setHighlightedGoalId(goal.id);
    };

    const moveToNextStatus = (goal) => {
        const newStatus =
            goal.status === "New" ? "In Progress" : goal.status === "In Progress" ? "Complete" : "Complete";

        fetch(`http://127.0.0.1:3000/goals/${goal.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        })
            .then((response) => response.json())
            .then((updatedGoal) => {
                setGoals(goals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g)));
            })
            .catch((error) => console.error("Error updating goal:", error));
    };

    const resetForm = () => {
        setFormData({ id: null, title: "", calories: "", start_date: "", end_date: "", status: "New" });
        setIsEditing(false);
        setHighlightedGoalId(null);
    };

    const newGoals = goals.filter((goal) => goal.status === "New");
    const inProgressGoals = goals.filter((goal) => goal.status === "In Progress");
    const completeGoals = goals.filter((goal) => goal.status === "Complete");

    return (
        <div className="goals-container">
            <h1 className="goals-title">My Goals</h1>

            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="form-container">
                    <h2>{isEditing ? "Edit Goal" : "New Goal"}</h2>
                    <input
                        name="title"
                        placeholder="Excercise"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                    <input
                        name="calories"
                        placeholder="Calories"
                        type="number"
                        value={formData.calories}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                    <input
                        name="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                    <input
                        name="end_date"
                        type="date"
                        value={formData.end_date}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                    <button type="submit" className="btn btn-primary">
                        {isEditing ? "Update Goal" : "Add Goal"}
                    </button>
                </form>
            </div>

            <div className="goals-columns d-flex justify-content-between">
                <GoalColumn
                    title="New Goals"
                    goals={newGoals}
                    highlightedGoalId={highlightedGoalId}
                    moveToNextStatus={moveToNextStatus}
                    deleteGoal={deleteGoal}
                    editGoal={editGoal}
                    buttonLabel="Move to In Progress"
                />

                <GoalColumn
                    title="In Progress"
                    goals={inProgressGoals}
                    highlightedGoalId={highlightedGoalId}
                    moveToNextStatus={moveToNextStatus}
                    deleteGoal={deleteGoal}
                    editGoal={editGoal}
                    buttonLabel="Move to Complete"
                />

                <GoalColumn
                    title="Complete"
                    goals={completeGoals}
                    highlightedGoalId={highlightedGoalId}
                    deleteGoal={deleteGoal}
                    editGoal={editGoal}
                />
            </div>
        </div>
    );
};

const GoalColumn = ({ title, goals, highlightedGoalId, moveToNextStatus, deleteGoal, editGoal, buttonLabel }) => (
    <div className="goal-column">
        <h2>{title}</h2>
        {goals.map((goal) => (
            <div
                key={goal.id}
                className="goal-card"
                style={{ backgroundColor: highlightedGoalId === goal.id ? "#f0f8ff" : "white" }}
            >
                <h3>{goal.title}</h3>
                <p>Calories: {goal.calories}</p>
                <p>
                    Start: {goal.start_date} | End: {goal.end_date}
                </p>
                {buttonLabel && (
                    <button onClick={() => moveToNextStatus(goal)} className="btn btn-info move">
                        {buttonLabel}
                    </button>
                )}
                <button onClick={() => editGoal(goal)} className="btn btn-success edit">
                    Edit
                </button>
                <button onClick={() => deleteGoal(goal.id)} className="btn btn-danger delete">
                    Delete
                </button>
            </div>
        ))}
    </div>
);

export default Goals;
