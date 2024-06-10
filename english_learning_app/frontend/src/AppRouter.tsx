import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import ExistingPlan from './pages/ExistingPlan';
import EbbinghausPlan from './pages/EbbinghausPlan';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/existing-plan">现有学习计划</Link>
                        </li>
                        <li>
                            <Link to="/ebbinghaus-plan">艾宾浩斯遗忘曲线学习计划</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/existing-plan" element={<ExistingPlan />} />
                    <Route path="/ebbinghaus-plan" element={<EbbinghausPlan />} />
                </Routes>
            </div>
        </Router>
    );
};

export default AppRouter;
