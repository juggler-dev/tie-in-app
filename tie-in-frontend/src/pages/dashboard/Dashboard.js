import { useQuery } from "@tanstack/react-query";
import React from 'react';
import {requestUser} from "../../api/user";
import BusinessDashboard from "./BusinessDashboard";
import StudentDashboard from "./StudentDashboard";

const Dashboard = () => {
    const requestUserType = useQuery(["user"], () => requestUser(sessionStorage.getItem("userId")), {
        enabled: !!sessionStorage.getItem("userId"),
        onSuccess: (data) => {
            sessionStorage.setItem("userType", data.type)
            console.log(sessionStorage.getItem("userType"))
        }
    });

    if (requestUserType.isLoading) {
        return <span>Loading...</span>
    }

    if (sessionStorage.getItem('userType') === "business") {
        return <BusinessDashboard/>
    } else {
        return <StudentDashboard />
    }
}

export default Dashboard;