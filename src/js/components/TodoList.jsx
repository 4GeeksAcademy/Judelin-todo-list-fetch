import React, { useState, useEffect } from "react";

import Home from "./Home";

const ToddoList = () => {

    const [imputField, setImputfield] = useState("")
    const [tasks, setNewTask] = useState([])
    const API_URL = 'https://playground.4geeks.com/todo'

    const createUsers = () => {
        fetch(API_URL + "/users/cintilmon", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => console.log(resp))
            .then(data => console.log(data))
            .then(error => console.log(error))
    }

    const bringList = () => {
        fetch(API_URL + "/users/cintilmon")
            .then((resp) => {
                if (resp.status === 404) {
                    createUsers()
                }
                return resp.json()
            })
            .then((data) => {
                console.log(data.todos)
                setNewTask(data.todos)
            })
            .then(error => console.log(error))
    };

    useEffect(() => {
        bringList()
    }, [])

    const handleTouch = (e) => {
        if (e.key === "Enter" && imputField.trim() !== "") {
            fetch(API_URL + "/todos/cintilmon", {
                method: "POST",
                body: JSON.stringify({
                    "label": imputField,
                    "is_done": false,
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then((resp) => {
                    console.log(resp)
                    if (resp.ok) {
                        setImputfield("")
                    }
                    console.log(resp.status)
                    return resp.json()
                })
                .then((data) => {
                    console.log(data)
                    setNewTask([...tasks, data])
                })
                .catch(error => console.log(error))
        }
    }

    const deleteTask = (id) => {
        fetch(API_URL + "/todos/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then((res)=> {
            if(!res.ok) throw new Error("failed to delete todo")
                setNewTask(tasks.filter((task)=> task.id !== id))
        })
    }

    const deleteUser = async () => {
        fetch(API_URL + "/users/cintilmon", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error("failed to delete this user")
                createUsers()
                setNewTask([])
            })
            .catch(error => console.log(error))
    }


    // const deleteTasks = (id) => {
    //     const upDateTask = tasks.filter((task) => task.id !== id);
    //     setNewTask(upDateTask)
    // }

    return (
        <div className="container">
            <div className="form">
                <p> todos </p>
                <ol>
                    <li className="form-control input-form justify-content-between">
                        <input className=""
                            type="text" placeholder="What needs to be done?"
                            value={imputField}
                            onChange={(e) => setImputfield(e.target.value)}
                            onKeyDown={handleTouch}
                        />
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
            <button onClick={deleteUser}>delete</button>
        </div>
    )
}

export default ToddoList