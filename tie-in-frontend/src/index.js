import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import BusinessDashboard from "./pages/dashboard/BusinessDashboard";
import BusinessProjectsList from "./pages/BusinessProjectsList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyProjects from "./pages/MyProjects";
import SignUpBusiness from "./pages/signup/SignUpBusiness";
import SignUpStudent from "./pages/signup/SignUpStudent";
import SignUpLandingPage from "./pages/signup/SignUpLandingPage";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import StudentProjectsList from "./pages/StudentProjectsList";
import UploadBusinessProject from "./pages/UploadBusinessProject";
import UploadStudentProject from "./pages/UploadStudentProject";
import BusinessRequestDetails from "./pages/BusinessRequestDetails";
import ApplyBusinessProject from "./pages/ApplyBusinessProject";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RequestStatus from "./pages/RequestStatus";
import StudentProjectDetailsPage from "./pages/StudentProjectDetailsPage";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Header />
                <div className="body">
                    <Routes>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signuplanding' element={<SignUpLandingPage />} />
                        <Route path='/signup/student' element={<SignUpStudent />} />
                        <Route path='/signup/business' element={<SignUpBusiness />} />
                        <Route path='/uploadstudentproject' element={<UploadStudentProject />} />
                        <Route path='/uploadbusinessproject' element={<UploadBusinessProject />} />
                        <Route path='/studentdashboard' element={<StudentDashboard />} />
                        <Route path='/studentprojectslist' element={<StudentProjectsList/>}/>
                        <Route path='/businessprojectslist' element={<BusinessProjectsList/>}/>
                        <Route path='/businessrequestdetails' element={<BusinessRequestDetails/>}/>
                        <Route path='/studentprojectdetails' element={<StudentProjectDetailsPage />}/>
                        <Route path='/requeststatus' element={<RequestStatus />} />
                        <Route path='/applybusinessproject' element={<ApplyBusinessProject />} />
                        <Route path='/businessDashboard' element={<BusinessDashboard />} />
                        <Route path='/myprojects' element={<MyProjects />} />
                        <Route
                            path="*"
                            element={
                                <main style={{ padding: "1rem" }}>
                                    <p>There's nothing here!</p>
                                </main>
                            }
                        />
                    </Routes>
                </div>
                <Footer />
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);
