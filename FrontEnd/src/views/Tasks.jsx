import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
    const [tareas, setTareas] = useState([]);
    const navigate = useNavigate();

    const getTasks = () => {
        fetch("http://localhost:3000/api/v1/tasks/", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "authorization": `Bearer ${window.sessionStorage.getItem('Token')}`
            }
        })
            .then(response => {
                if (response.status === 401) {
                    navigate('/login');
                }
                return response.json();
            })
            .then(json => {
                // console.log(json);
                setTareas(json.tasks);
                console.log(tareas);
            })
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
                                <a className="card-link">View</a>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </section>;
}
