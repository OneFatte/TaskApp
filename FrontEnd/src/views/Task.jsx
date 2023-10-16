import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Task() {

    const [tarea, setTarea] = useState([]);
    const navigate = useNavigate();
    const { taskId } = useParams();

    const getTask = () => {
        const API_URL = import.meta.env.VITE_API_URL;

        fetch(`${API_URL}/api/v1/task/${taskId}`, {
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
                setTarea(json.task.taskId);
                console.log(tarea);
            })
    };

    return <div>
        <h1>Detalles de la tarea</h1>
        <p>ID: {tarea._id}</p>
        <p>Título: {tarea.title}</p>
        <p>Descripción: {tarea.description}</p>
        {/* Otros detalles de la tarea */}
    </div>;
}
