import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import '../style.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const [user, setUser] = useState({});

    const logIn = async data => {
        fetch(`http://localhost:8081/user/${data.username}`)
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
        });

        if (JSON.stringify(user) !== '{}') {
            if (user.username === data.username && user.password === data.password) {
                localStorage.setItem("username", user.username);
                navigate("/");
            }
            else {
                alert("Incorrect password.");
            }
        }
        else {
            alert("There exists no account with this username.");
        }
    }

    const accRegister = async data => {
        const payload = {
            "username": data.username,
            "password": data.password
        }

        const userRes = await fetch(`http://localhost:8081/user/${data.username}`);

        if (!userRes) {
            const response = await fetch(`http://localhost:8081/user`, {
                method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
            });
        }
        else {
            alert("There already exists an account with this username");
        }
    }

    return (
        <div>
            <h3 className="mb-5">Log In:</h3>
            <form class="m-5" onSubmit={handleSubmit(logIn)} className="container m-5">
                <div class="row">
                    <div className="col">
                        <label for="username">Username</label>
                        <input {...register("username", { required: true })} placeholder="Username" className="form-control" autoFocus />
                        {errors.username && <p className="text-danger">Username is required.</p>}
                    </div>
                </div>
                <div class="row">
                    <div class="row">
                        <div className="col">
                            <label for="password">Password</label>
                            <input {...register("password", { required: true })} placeholder="Password" className="form-control" autoFocus />
                            {errors.password && <p className="text-danger">Password is required.</p>}
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
}

export default Login;