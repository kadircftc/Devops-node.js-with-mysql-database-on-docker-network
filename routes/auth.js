const express=require("express");
const router=express.Router();
require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtSecret = process.env.SECRET;

const user = {
    id: 1,
    username: "testuser",
    password: "$2y$12$zjntkJ6xq..6DFXtV4ti9OX1wMjFxJ9eQHiqYoM/U5F9O4xB9tGH." // hashed password
  };


  router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (username !== user.username) {
      return res.status(400).json({ msg: "User not found" });
    }
  
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
    //   if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
  
      const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, secure: false });
      res.json({ token });
    });
  });

  router.get('/login', (req, res) => {
   res.render('login')
  });
  
  module.exports=router;