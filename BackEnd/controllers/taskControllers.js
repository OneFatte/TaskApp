const TaskModel = require('../model/Task');

const getAllTask = async (req, res) => {
    const tasks = await TaskModel.getAll()
    res.status(201).send({ tasks })

}

const getTask = async (req, res) => {
    const { id } = req.params;
    const result = await TaskModel.getTask(id);
    res.status(201).send({ tasks: result });
}

const insertTask = async (req, res) => {

    const { title, descripcion, deadline, done } = req.body;
    await TaskModel.insertTask({ title, descripcion, deadline, done })
        .then((response) => {
            res.status(201).send({ message: "Tarea agregada" })
        })
        .catch((error) => {
            res.status(401).send({ message: "Error, datos invalidos" })
        })
}


const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, descripcion, deadline } = req.body;

    await TaskModel.updateTask(id, { title, descripcion, deadline })
        .then((response) => {
            res.status(201).send({ message: "Tarea actualizada" })
        })
        .catch((error) => {
            res.status(401).send({ message: "Error, datos invalidos" })
        })
}


const removeTask = async (req, res) => {
    const { id } = req.params;

    await TaskModel.removeTask(id)
        .then((response) => {
            res.status(201).send({ message: "Tarea eliminada" })
        })
        .catch((error) => {
            res.status(401).send({ message: "Error, datos invalidos" })
        })
}


module.exports = {
    getAllTask,
    getTask,
    updateTask,
    removeTask,
    insertTask,

}


