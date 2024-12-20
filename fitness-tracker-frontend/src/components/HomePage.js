import React from 'react';
import './styles.css'; // Ensure your custom CSS for styling is imported



function HomePage() {
    return (
        <div className="homepage-container">
            {/*background img here*/}
            <div className="sport-section">
                <img src={require('./images/d1.jpg')} alt="Fitness" className="sport" />
                <div className="sport-text">
                    <h1 className="display-3 fw-bold">Achieve Your Fitness Goals</h1>
                    <p className="lead">
                        Your journey to a healthier and stronger body starts here. Track your progress, setachievable goals, and stay on track
                    </p>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section container py-5">
                <div className="row text-center">
                    <div className="col-md-4">
                        <div className="feature-box">
                            <h3>Set You'r goals</h3>
                            <p>Define your fitness goals by setting your monthly objective</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-box">
                            <h3>Track You'r Progress</h3>
                            <p>Track your calories and visualise you'r milestones achieved.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-box">
                            <h3>Stay Motivated</h3>
                            <p>Keep pushing yourself and aim to complete your goals</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
