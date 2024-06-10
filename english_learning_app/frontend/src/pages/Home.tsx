import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h2>学习计划主页</h2>
            <p>欢迎使用学习计划管理系统！请选择一个学习计划模式：</p>
            <ul>
                <li>
                    <Link to="/existing-plan">现有学习计划</Link>
                </li>
                <li>
                    <Link to="/ebbinghaus-plan">艾宾浩斯遗忘曲线学习计划</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
