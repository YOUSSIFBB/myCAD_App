import axios from 'axios';  //axios for HTTP requests

/*Refrence: 
 * https://stackoverflow.com/questions/78352966/react-js-api-calls-using-axios
 * https://medium.com/@aqeel_ahmad/handling-jwt-access-token-refresh-token-using-axios-in-react-react-native-app-2024-f452c96a83fc
 * https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
 * https://www.youtube.com/watch?v=nI8PYZNFtac
 * https://saurabhnativeblog.medium.com/react30-project-8-building-a-navbar-using-react-router-6910ab5a0268
 */

//api url for my backend app using enviroemtn varaibles
const API_URL = process.env.REACT_APP_API_URL;
//fucntioanlity ment for the sig in and sing out but removed last second due to errors
export const signIn = (credentials) => axios.post(API_URL + "/users/sign_in", credentials);

export const signUp = (data) => axios.post(API_URL + "/users", data);
//fetch all goals from user
export const getGoals = () =>
    axios.get(API_URL + "/goals", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
//delete spefic gola using the goal id, each goal has an id number
export const deleteGoal = (id) =>
    axios.delete(API_URL + "/goals/" + id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
//update edited goals 
export const updateGoalStatus = (id, status) =>
    axios.patch(
        API_URL + "/goals/" + id,
        { goal: { status: status } },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
