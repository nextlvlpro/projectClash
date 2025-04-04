const express = require('express');
const registerRoute = express.Router();
jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerNewUser} = require('../../controller/auth/authComps/register');

registerRoute.post("/", async (req, res, next) => {

const userRegistered = await registerNewUser(req, res, next);

})


module.exports = registerRoute