import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';  //libary improt
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

/*Refrerence: 
 *https://www.youtube.com/watch?v=yOousFGfmZc
 *https://www.stanleyulili.com/javascript/beginner-guide-to-chartjs
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StatsPage() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        //fetch goals from api
        const fetchGoals = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/goals');
                const goals = response.data;

                //filter goals
                const completedGoals = goals.filter(goal => goal.status === 'Complete');

                //group the saved calories burned by month
                const caloriesByMonth = completedGoals.reduce((acc, goal) => {
                    const month = new Date(goal.end_date).toLocaleString('default', { month: 'long' });
                    acc[month] = (acc[month] || 0) + goal.calories;
                    return acc;
                }, {});

                const labels = Object.keys(caloriesByMonth);
                const data = Object.values(caloriesByMonth);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Calories Burned per Month',
                            data: data,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        fetchGoals();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Total Calories Burned per Month',
            },
        },
    };

    return (
        <div style={{ width: '80%', margin: '50px auto' }}>
            <h2>Your Monthly progress</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
}

export default StatsPage;
