import React, { useState, useEffect } from "react"; //Import React with hooks 
import "./styles.css"; //css link 

/* References
 * https://www.guvi.in/blog/how-to-fetch-and-display-data-from-api-in-react/
 * https://medium.com/@shriharim006/how-to-use-axios-in-react-1429f3217dba
 * https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
 * https://stackoverflow.com/questions/74658562/how-to-fetch-data-from-an-api-and-display-it-as-raw-data-on-the-front-end
 * VS code extention have been used to fromat this code
 */

//function to manage and display fitness goals
const Goals = () => {

    const [goals, setGoals] = useState([]); //store all goals fetched from the backend

    const [formData, setFormData] = useState({  //manage the form data (used for creating or editing a goal)
        id: null,
        title: "",
        calories: "",
        start_date: "",
        end_date: "",
        status: "New" //all new goals will default the status to new goal
    });


    const [isEditing, setIsEditing] = useState(false); //check if a goal is being edited


    const [highlightedGoalId, setHighlightedGoalId] = useState(null); //this will hilight an exisitng goal if the user it edeting it

    //fetch all goals from the backend when the component is mounted then convert the response to JSON and store fetched goals in state
    useEffect(() => {
        fetch("http://127.0.0.1:3000/goals")
            .then((response) => response.json())
            .then((data) => setGoals(data))
            .catch((error) => console.error("Error fetching goals:", error)); //throw this error if we cannot fetch the goals
    }, []);

    //update the form fields dynamically (help from chatgbt)
    const handleChange = (e) => {
        setFormData({
            ...formData, //spread sytax, keep other fields unchanged
            [e.target.name]: e.target.value
        });
    };

    //method to handel form submission for adding or editing a goal
    const handleSubmit = (e) => {
        e.preventDefault(); //prevent the form from refreshing the page

        if (isEditing) {
            fetch("http://127.0.0.1:3000/goals/" + formData.id, {  //we the user is editing, send a PATCH request to update the goal
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),                     //send updated data to the backend api
            })
                .then((response) => response.json()) //convert response to json
                .then((updatedGoal) => {
                    //update the goal
                    setGoals(goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)));
                    resetForm(); //reset the form
                })
                .catch((error) => console.error("Error updating goal:", error));
        } else {
            //send post request for creating a goal
            fetch("http://127.0.0.1:3000/goals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData), //send goal data
            })
                .then((response) => response.json()) //convert response to JSON
                .then((newGoal) => {
                    setGoals([...goals, newGoal]);
                    resetForm(); //reset the form
                })
                .catch((error) => console.error("Error creating goal:", error));
        }
    };

    //delete a goal by sending a DELETE request to backend api
    const deleteGoal = (id) => {
        fetch("http://127.0.0.1:3000/goals/" + id, { method: "DELETE" })
            .then(() => setGoals(goals.filter((goal) => goal.id !== id))) //remove the deleted goal
            .catch((error) => console.error("Error deleting goal:", error));
    };

    //populate the form with the goal data for editing
    const editGoal = (goal) => {
        setFormData({ ...goal }); //populate the form with the goal's data
        setIsEditing(true);   //allow edeting
        setHighlightedGoalId(goal.id); //highlight the goal being edited
    };

    //move a goal to the next status (e.g., New, In Progress, Complete) like JIRA tickets
    const moveToNextStatus = (goal) => {
        const newStatus =
            goal.status === "New" ? "In Progress" :
                goal.status === "In Progress" ? "Complete" :
                    "Complete"; //keep "Complete" as the final status

        fetch("http://127.0.0.1:3000/goals/" + goal.id, {
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

    //reset the form t
    const resetForm = () => { setFormData({ id: null, title: "", calories: "", start_date: "", end_date: "", status: "New" }); setIsEditing(false); setHighlightedGoalId(null); };

    //filter goals into categories based on status
    const newGoals = goals.filter((goal) => goal.status === "New");
    const inProgressGoals = goals.filter((goal) => goal.status === "In Progress");
    const completeGoals = goals.filter((goal) => goal.status === "Complete");

    //Reference: https://www.guvi.in/blog/how-to-fetch-and-display-data-from-api-in-react/
    return (
        <div className="goals-container">
            <h1 className="goals-title">Set Your Goals</h1>
            {/*form for creating or editing a goal*/}
            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="form-container">
                    <h2>{isEditing ? "Edit Goal" : "New Goal"}</h2>
                    <input
                        name="title"
                        placeholder="Exercise"
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

            {/*display goals in columns based on their status*/}
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

//display a column of goals
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
