import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Task() {

    const [tarea, setTarea] = useState([]);
    const [descripcion, setDescripcion] = useState();
    const navigate = useNavigate();
    // Obtener la ID de la tarea desde la URL
    const taskId = window.location.pathname.split('/').pop();


    const getTask = () => {
        const API_URL = import.meta.env.VITE_API_URL;

        fetch(`${API_URL}/api/v1/tasks/${taskId}`, {
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
                // console.log(json);
                setTarea(json.tasks);
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
                alert('No encuentra la tarea');
            });
    };


    const update = () => {
        const API_URL = import.meta.env.VITE_API_URL
        fetch(`${API_URL}/api/v1/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem('Token')}`
            },
            body: JSON.stringify({
                "description": descripcion,

            })
        })
            .then(response => {
                if (response.status === 401) {
                    navigate('/login');
                }
                return response.json();
            })
            .then(json => {
                console.log(json);
            })
            .catch(error => {
                console.error("Error en la de actualizar:", error);
                alert('Hubo un problema en modificar');
            });
    };
    const handleDescription = (e) => {
        setDescripcion(e.target.value);
        console.log(descripcion);
        console.log(tarea.description);
        console.log(tarea.done);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        update();
    }

    useEffect(() => {
        getTask();
    }, [taskId]);

    return <section>
        <h1>Detalles de la tarea</h1>
        <p>ID: {tarea._id}</p>
        <p>Título: {tarea.title}</p>
        <p>Descripción: {tarea.description}</p>
        <p>Deadline: {tarea.deadline}</p>
        <p>Done: {tarea.done}</p>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Edit
        </button>

        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{tarea.title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="col-form-label">Descripcion nueva:</label>
                                <textarea className="form-control" id="message-text" value={descripcion} onChange={handleDescription}></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" >Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}
