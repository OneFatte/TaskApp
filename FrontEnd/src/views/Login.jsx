import React, { useState } from "react";
import "../assets/login.css";
import { redirect, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = () => {
        fetch("http://localhost:3000/auth", {
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify({
                "email": email,
                "pass": password
            })
        })
            .then(response => response.json())
            .then(json => {
                if (json.token) {
                    window.sessionStorage.setItem("Token", json.token);
                    navigate("/tasks")
                } else {
                    alert('Datos incorrectos');
                }
            })
    };

    //-----------------------------------------------------------------------------video4 1:16min

    const handleEmail = (e) => {
        setEmail(e.target.value);
        console.log(email);
        console.log(e.target.value);
    }
    const handlePass = (e) => {
        setPassword(e.target.value);
        console.log(password);
        console.log(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login();

    }


    return <>
        <div className='contenedor'>
            <form className='formulario' onSubmit={handleSubmit}>

                <div>
                    <span className='texto'>Email</span>
                    <input className='inputs' type="text" value={email} onChange={handleEmail} />
                </div>

                <div>
                    <span className='texto'>Contraseña</span>
                    <input className='inputs' type="password" value={password} onChange={handlePass} />
                </div>

                <div>
                    <button type="submit" className='boton' >Enviar</button>
                </div>
            </form>
        </div>
    </>
}
