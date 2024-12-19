import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const signIn = (credentials) => axios.post(`${API_URL}/users/sign_in`, credentials);
export const signUp = (data) => axios.post(`${API_URL}/users`, data);
export const getGoals = () =>
    axios.get(`${API_URL}/goals`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const deleteGoal = (id) =>
    axios.delete(`${API_URL}/goals/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const updateGoalStatus = (id, status) =>
    axios.patch(
        `${API_URL}/goals/${id}`,
        { goal: { status } },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
