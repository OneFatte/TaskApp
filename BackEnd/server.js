const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const TaskRoutes = require('./routes/taskRoutes');
const UserModel = require('./model/User');
const PORT = 3000;
require('dotenv').config()
console.log(process.env)

const SECRET_KEY = process.env.SECRET_KEY
const url = process.env.mongoURL


const server = express()

server.use(cors())
server.use(express.json())


server.post('/auth', (req, res) => {
    const { email, pass } = req.body
    const validatedUser = UserModel.validateUser(email, pass)

    if (validatedUser) {
        const token = jwt.sign({ validatedUser }, SECRET_KEY, { expiresIn: '30m' })
        res.status(201).send({ token })
    } else {
        res.status(401).send({ message: "Usuario o pass invalido" })
    }
})

const validateToken = (req, res, next) => {
    const authHeader = req.get('authorization')

    if (authHeader) {
        const accessToken = authHeader.split(' ')[1]
        jwt.verify(accessToken, SECRET_KEY, (error, decode) => {
            if (error) {
                res.status(401).send({ message: "Token no valido" })
            } else {
                next()
            }
        })
    } else {
        res.status(404).send({ message: 'Petición incorrecta' })
    }
}

server.use('/api/v1/tasks', validateToken, TaskRoutes);

const mongooseConnect = async () => {
    try {
        await mongoose.connect(url);
        console.log("Success Conexion");
    } catch (error) {
        console.log("Error");
        console.error(error);
    }
}

mongooseConnect();

server.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})


