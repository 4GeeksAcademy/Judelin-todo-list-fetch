import React, { useState, useEffect } from "react";

import Home from "./Home";

const ToddoList = () => {


    const [imputField, setImputfield] = useState("")
    const [tasks, setNewTask] = useState([])

    const showlist = () => {

        fetch('https://playground.4geeks.com/todo/users/judelin', {

        })
            .then(resp => {
                console.log(resp.ok); // Será true si la respuesta es exitosa
                console.log(resp.status); // El código de estado 201, 300, 400, etc.
                return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
            })
            .then(data => {
                setNewTask(data.todos)
                console.log(tasks)
                // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
                console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
            })
            .catch(error => {
                // Manejo de errores
                console.log(error);
            });

    }

    useEffect(() => {
        showlist()
    }, [])

    const imputChange = (event) => {
        setImputfield(event.target.value)
    }

    const handleTouch = (e) => {
        if (e.key === "Enter" && imputField.trim() !== "") {
            // const newtask = { label: 'hola', is_done: false }

            fetch('https://playground.4geeks.com/todo/todos/judelin', {
                method: "POST",
                body: JSON.stringify({
                    label: imputField,
                    is_done: false
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    console.log(resp.ok);
                    if (resp.ok) {
                        // onLoad()
                        setImputfield("")
                    }
                    console.log(resp.status);
                    return resp.json();
                })
                .then(data => {
                    console.log(data);
                    setNewTask([...tasks, data])
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    function addTask() {
        if (imputField.trim() === "") {
            return alert("Write before you add it")
        }
        setNewTask(texte => [...texte, imputField])
        setImputfield("")
    }


    const deletetask = (id) => {
        const upDateTask = tasks.filter((task) => task.id !== id);
        setNewTask(upDateTask)
    }

    const deleteTask = async (id) => {
        try {
            const res = await fetch( `https://playground.4geeks.com/todo/todos/judelin ${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error(`Failed to delete task with id ${id}`);
            }

            // Update state locally after successful deletion
            deletetask()
        } catch (error) {
            console.error(error);
            alert("Error deleting task. Please try again.");
        }
    };



    return (
        <div className="container">

            <div className="form">
                <p> todos </p>

                <ol>
                    <li className="form-control input-form justify-content-between">
                        <input className=""
                            type="text" placeholder="What needs to be done?"
                            value={imputField}
                            onChange={imputChange}
                            onKeyDown={handleTouch}

                        />
                        <button className="add-button" onClick={addTask}>Add</button>
                    </li>
                    {
                        tasks.map((task) =>
                            <li className="form-control d-flex justify-content-between"
                                key={task.id}><span> {task.label} </span>
                                <button className="delete-button" onClick={() => deleteTask(task.id)} >X</button>
                            </li>
                        )
                    }
                    <li className="form-control length"> {tasks.length} item left</li>
                </ol>
            </div>


        </div>
    )
}

export default ToddoList