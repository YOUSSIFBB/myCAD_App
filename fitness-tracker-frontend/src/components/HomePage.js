import React from 'react';
import './styles.css'; // Ensure your custom CSS for styling is imported

function HomePage() {
    return (
        <div className="homepage-container">
            {/* Sports image div's here */}
            <div className="hero-section">
                <img src={require('./images/d1.jpg')} alt="Fitness" className="hero-image" />
                <div className="hero-text">
                    <h1 className="display-3 fw-bold">Achieve Your Fitness Goals</h1>
                    <p className="lead">
                        Your journey to a healthier and stronger body starts here. Track your progress, set
                        achievable goals, and stay motivated.
                    </p>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section container py-5">
                <div className="row text-center">
                    <div className="col-md-4">
                        <div className="feature-box">
                            <h3>Set Goals</h3>
                            <p>Define your fitness objectives and track progress easily.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-box">
                            <h3>Track Progress</h3>
                            <p>Monitor calories burned and milestones achieved.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-box">
                            <h3>Stay Motivated</h3>
                            <p>Keep pushing with a clear and measurable plan.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
