import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
    const [tareas, setTareas] = useState([]);
    const navigate = useNavigate();

    const getTasks = () => {
        const API_URL = import.meta.env.VITE_API_URL;

        fetch(`${API_URL}/api/v1/tasks`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem('Token')}`
            }
        })
            .then(response => {
                if (response.status === 401) {
                    navigate('/login');
                }
                return response.json();
            })
            .then(json => {
                setTareas(json.tasks);
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
                alert('No carga las tareas');
            });
    };

    useEffect(() => {
        getTasks();
    }, []);

    return <section>
        <h1>Tareas</h1>
        <br />
        <div className="row">
            {
                tareas.map(elemento => (
                    <div className="col-sm-6 mb-3" key={elemento._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{elemento.title}</h5>
                                <br />
                                <h6 className="card-subtitle mb-2 text-body-secondary">ID: {elemento._id}</h6>
                                <p className="card-text"> {elemento.description}</p>
                                <button className="card-link btn btn-primary" onClick={() => navigate(`/task/${elemento._id}`)}>View</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

    </section>;
}
