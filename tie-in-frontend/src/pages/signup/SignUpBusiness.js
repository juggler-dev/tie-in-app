import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

import { addBusiness } from "../../api/business";
import { addUser } from "../../api/user";
import { signUp } from "../../auth/Authorization";
import Button from "../../components/Button";
import InputType from "../../components/InputType";
import { isEmailValid } from "../../utils/email";
import validateTextInput from "../../utils/validateTextInput";

const SignUpBusiness = () => {
    const userType = "business";
    const uid = sessionStorage.getItem("userId");
    const navigate = useNavigate();

    const saveBusiness = useMutation(['business'], () => addBusiness({
        name: businessName,
        email: businessEmail,
        description: description,
        website_url: websiteUrl,
        linkedIn_url: linkedInUrl,
        location: businessLocation,
        logo_url: logo,
    }),
        {
            onError: (error) => {
                alert(error.message);
            }
        });

    const saveUser = useMutation(["user"], () => addUser({
        uid: uid,
        email: businessEmail,
        type: userType,
    }),
        {
            enabled: !!uid,
            onError: (error) => {
                alert(error.message);
            }
        })

    const [businessName, setBusinessName] = useState("");
    const [businessLocation, setBusinessLocation] = useState("");
    const [description, setDescription] = useState("");
    const [businessEmail, setBusinessEmail] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [linkedInUrl, setLinkedInUrl] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [termsCondition, setTermsCondition] = useState(false);
    const [logo, setLogo] = useState(null);

    const formValidation = () => {
        if (!validateTextInput(businessName)) {
            alert("Company name is required.");
            return false;
        } else if (!validateTextInput(businessLocation)) {
            alert("Last Name is required.");
            return false;
        } else if (!isEmailValid(businessEmail) || !businessEmail || businessEmail === "") {
            alert("Email is required.")
            return false;
        } else if (!validateTextInput(description)) {
            alert("Description is required");
            return false;
        } else if (!password || password === "") {
            alert("Password is required and should not be empty!");
            return false;
        } else if (password !== confirmPassword) {
            alert("Password and confirm password should match.");
            return false;
        } else if (!termsCondition) {
            alert("You need to accept the Terms and Conditions to register!")
        } else {
            return true;
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (formValidation()) {
            await signUp(businessEmail, password)
            saveBusiness.mutate();
            saveUser.mutate();
            sessionStorage.clear();
            navigate("/login")
        } else
            alert("Something went wrong! Please try again.")
    }

    return (
        <div className='signup-business'>
            <h2>Sign Up</h2>
            <form name='registration_form' onSubmit={onSubmit}>
                <InputType
                    type={"text"}
                    placeholder={"Enter your company name"}
                    label={"Company Name (required)"}
                    onChange={(e) => setBusinessName(e.target.value)}
                    value={businessName}
                />
                <InputType
                    type={"file"}
                    label={"Project Business Plan(optional) "}
                    onChange={(e) => setLogo(e.target.value)}
                />
                <InputType
                    type={"text"}
                    placeholder={"Enter company location"}
                    label={"Company Location (required)"}
                    onChange={(e) => setBusinessLocation(e.target.value)}
                    value={businessLocation}
                />
                <InputType
                    type={"text"}
                    placeholder={"Enter your company description"}
                    label={"Company Description (required)"}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <InputType
                    placeholder={"Enter your company email"}
                    label={"Email"}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    type={"text"}
                    value={businessEmail}
                />
                <InputType
                    type={"text"}
                    placeholder={"Enter company website URL"}
                    label={"Company Website Url (optional)"}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    value={websiteUrl}
                />
                <InputType
                    type={"text"}
                    placeholder={"Enter company linkedIn URL"}
                    label={"LinkedIn Url (optional)"}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                    value={linkedInUrl}
                />
                <InputType
                    placeholder={"Enter your password"}
                    label={"Password"}
                    onChange={(e) => setPassword(e.target.value)}
                    type={"text"}
                    value={password}
                />
                <InputType
                    placeholder={"Confirm your  Password"}
                    label={"Confirm Password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={"text"}
                    value={confirmPassword}
                />
                <InputType
                    type={"checkbox"}
                    label={"I agree the Terms & Conditions of Tie-in"}
                    onChange={() => setTermsCondition(true)}
                />
                <Button label={"Sign Up"} variant={"primary"} onClick={onSubmit} />
            </form>
        </div>
    );
}

export default SignUpBusiness;
