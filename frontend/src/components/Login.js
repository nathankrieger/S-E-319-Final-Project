import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import '../style.css';

const Login = () => {
    const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm();
    const { register: registerRegister, handleSubmit: handleRegisterSubmit, formState: { errors: registerErrors } } = useForm();

    const navigate = useNavigate();

    const [dbUser, setdbUser] = useState({});
    const [formUser, setFormUser] = useState("");
    const [formPass, setFormPass] = useState("");

    const [formRegistrationUser, setRegistrationFormUser] = useState("");
    const [formRegistrationPass, setRegistrationFormPass] = useState("");

    const logIn = async data => {

        fetch(`http://localhost:8081/user/${data.username}`)
            .then((response) => response.json())
            .then((data) => {
                setdbUser(data);
            });
    }

    useEffect(() => {
        if (JSON.stringify(dbUser) !== '{}') {
            if (dbUser.error !== "Object not found") {
                if (dbUser.username === formUser && dbUser.password === formPass) {
                    localStorage.setItem("username", dbUser.username);
                    navigate("/");
                    window.location.reload();
                }
                else {
                    alert("Incorrect password.");
                }
            }
            else {
                alert("The username or password entered does not exist. ");
            }
        }
    }, [dbUser]);

    const accRegister = async data => {

        const payload = {
            "username": data.registrationUsername,
            "password": data.registrationPassword
        }
        const userRes = await fetch(`http://localhost:8081/userRegister/${data.registrationUsername}`);


        if (userRes.status === 200) {
            const response = await fetch(`http://localhost:8081/user`, {
                method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
            });
            alert("Account registered!")
            window.location.reload();
        }
        else {
            alert("There already exists an account with this username");
        }
    }

    return (
        <div className="login-container text-center">
            <div className="col justify-content-center">

                <h3 className="mt-3 mb-3">Log In:</h3>
                <form className="container" onSubmit={handleLoginSubmit(logIn)}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input {...loginRegister("username", { required: true })} onChange={(e) => setFormUser(e.target.value)} placeholder="Enter your username..." className="form-control" autoFocus />
                        {loginErrors.username && <p className="text-danger">Username is required.</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input {...loginRegister("password", { required: true })} onChange={(e) => setFormPass(e.target.value)} placeholder="Enter your password..." className="form-control" autoFocus />
                        {loginErrors.password && <p className="text-danger">Password is required.</p>}
                    </div>
                    <button type="submit" className="form-submit">Submit</button>
                </form>

                <h3 className="mt-5 mb-3">Register:</h3>
                <form className="container" onSubmit={handleRegisterSubmit(accRegister)}>
                    <div className="form-group">
                        <label htmlFor="registrationUsername">Username</label>
                        <input {...registerRegister("registrationUsername", { required: true })} onChange={(e) => setRegistrationFormUser(e.target.value)} placeholder="Enter a username..." className="form-control" autoFocus />
                        {registerErrors.registrationUsername && <p className="text-danger">Username is required.</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="registrationPassword">Password</label>
                        <input {...registerRegister("registrationPassword", { required: true })} onChange={(e) => setRegistrationFormPass(e.target.value)} placeholder="Enter a password..." className="form-control" autoFocus />
                        {registerErrors.registrationPassword && <p className="text-danger">Password is required.</p>}
                    </div>
                    <button type="submit" className="form-submit">Submit</button>
                </form>

            </div>
        </div>


    );
}

export default Login;
