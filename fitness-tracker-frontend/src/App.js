import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Goals from './components/Goals'; // Ensure this path is correct
import Home from './components/HomePage'; // Ensure this path is correct
import StatsPage from './components/StatsPage'; // Ensure this path is correct

function App() {
    return (
        <Router>
            <div className="App">
                {/* Navigation Bar */}
                <nav style={styles.navbar}>
                    <h2 style={styles.brand}>My Goals App</h2>
                    <ul style={styles.navLinks}>
                        <li>
                            <Link to="/" style={styles.link}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/goals" style={styles.link}>
                                Goals
                            </Link>
                        </li>
                        <li>
                            <Link to="/stats" style={styles.link}>
                                StatsPage
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Routes */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/stats" element={<StatsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

// Inline styles for simplicity
const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#007bff',
        padding: '10px 20px',
        color: 'white',
    },
    brand: {
        margin: 0,
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        gap: '20px',
        margin: 0,
        padding: 0,
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

export default App;
