import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, FileText, User, LogOut,Archive } from "lucide-react";
import "./DealerNav.css";

const DealerNav = () => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showMenu, setShowMenu] = useState(false);
    // Live running time
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <div className="dealer-navbar-container">
            {/* Left empty (for spacing balance) */}
            <div className="dealer-navbar-left">
                <h2>DEALER</h2>
            </div>

            {/* Center Menu */}
            <div className="dealer-navbar-center">
                <div
                    className="dealer-navbar-item"
                    onClick={() => navigate("/dealer/home")}
                >
                    <Home size={18} />
                    <span>Home</span>
                </div>

                <div
                    className="dealer-navbar-item"
                    onClick={() => navigate("/dealer")}
                >
                    <FileText size={18} />
                    <span>Applications</span>
                </div>
                <div
                    className="dealer-navbar-item"
                    onClick={() => navigate("/dealer/history")}
                >
                    <Archive size={18} />
                    <span>History</span>
                </div>
            </div>

            {/* Right Section */}
            <div className="dealer-navbar-right">
                <div className="dealer-navbar-time">
                    {currentTime.toLocaleTimeString()}
                </div>

                <div
                    className="dealer-navbar-profile"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <User size={20} />
                </div>

                {showMenu && (
                    <div className="dealer-navbar-dropdown">
                        <div
                            className="dealer-navbar-logout"
                            onClick={handleLogout}
                        >
                            <LogOut size={16} />
                            <span>Logout</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DealerNav;