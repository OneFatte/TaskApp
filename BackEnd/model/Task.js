const mongoose = require('mongoose');

const taskSchema = {
    title: {
        type: String,
        required: true,
    },
    descripcion: String,
    deadline: {
        type: Date,
        required: true,
        default: new Date()
    },
    done: {
        type: Boolean,
        default: false
    }
}

const Task = mongoose.model('tasks', taskSchema);

const getAll = async () => {
    try {
        const result = await Task.find();
        return result;
    } catch (error) {
        throw new Error("Error al obtener tareas: " + error.message);
    }
}

const getTask = async (id) => {
    return await Task.findById(id);
}

const insertTask = async (task) => {
    return await Task.create(task)
}

const updateTask = async (id, newTask) => {
    const oldTask = await Task.findById(id);

    oldTask.descripcion = newTask.descripcion;
    return await oldTask.save();
}

const removeTask = async (id) => {
    return await Task.deleteOne({ _id: id });
}


module.exports = {
    getAll,
    getTask,
    insertTask,
    updateTask,
    removeTask
}