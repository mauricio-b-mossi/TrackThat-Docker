import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";
import images from "../images";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location to determine active link

    // Function to check if the current path is the path provided
    const isActive = (path) => location.pathname.includes(path);

    return (
        <div className={styles.sidebar}>
            <div className={styles["profile-section"]}>
                <img src={images.userIcon} alt="User" className={styles["profile-pic"]} />
                <span>John Doe</span>
            </div>
            <div className={styles["sidebar-links"]}>
                <div
                    className={`${styles["sidebar-link"]} ${isActive("/dashboard/overview") ? styles.active : ""}`}
                    onClick={() => navigate("/dashboard/overview")}
                >
                    <img src={images.graphIcon} alt="Overview Icon" className={styles.icon} /> Overview
                </div>
                <div
                    className={`${styles["sidebar-link"]} ${isActive("/dashboard/viewapp") ? styles.active : ""}`}
                    onClick={() => navigate("/dashboard/viewapp")}
                >
                    <img src={images.searchIcon} alt="View Applications Icon" className={styles.icon} /> View Applications
                </div>
                <div
                    className={`${styles["sidebar-link"]} ${isActive("/dashboard/settings") ? styles.active : ""}`}
                    onClick={() => navigate("/dashboard/settings")}
                >
                    <img src={images.settingsIcon} alt="Settings Icon" className={styles.icon} /> Settings
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
