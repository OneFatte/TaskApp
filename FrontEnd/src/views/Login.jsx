import React, { useState } from "react";
import "../assets/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = () => {
        const API_URL = import.meta.env.VITE_API_Tasks_URL;
        fetch(`${API_URL}/auth`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                "email": email,
                "pass": password
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                if (json.token) {
                    window.localStorage.setItem("Token", json.token);
                    navigate("/tasks")
                } else {
                    alert('Datos incorrectos');
                }
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
                alert('Hubo un problema en la autenticación');
            });
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
