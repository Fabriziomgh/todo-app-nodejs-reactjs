import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import { createdTokenAccess } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

export const register = async (req, res) => {
   const { username, email, password } = req.body;
   try {
      const userFound = await User.findOne({ email });
      if (userFound)
         return res.status(400).json({ message: 'This email is already in' });

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
         username,
         email,
         password: hashPassword,
      });
      const userSaved = await newUser.save();
      const token = await createdTokenAccess(userSaved._id);

      res.cookie('token', token);
      res.send({
         id: userSaved._id,
         username: userSaved.username,
         email: userSaved.email,
         createdAt: userSaved.createdAt,
         updateAt: userSaved.updatedAt,
      });
   } catch (error) {
      return res.status(500).json({
         message: error.message,
      });
   }
};
export const login = async (req, res) => {
   const { email, password } = req.body;
   try {
      const userFound = await User.findOne({ email });

      if (!userFound)
         return res.status(400).json({ message: 'User not found.' });

      const passwordIsMatch = await bcrypt.compare(
         password,
         userFound.password
      );
      if (!passwordIsMatch)
         return res.status(400).json({ message: 'Password incorrect.' });

      const token = await createdTokenAccess(userFound._id);

      res.cookie('token', token);
      res.send({
         id: userFound._id,
         username: userFound.username,
         email: userFound.email,
         createdAt: userFound.createdAt,
         updateAt: userFound.updatedAt,
      });
   } catch (error) {
      return res.status(500).json({
         message: error.message,
      });
   }
};

export const logout = (req, res) => {
   res.cookie('token', '', {
      expires: new Date(0),
   });
   res.sendStatus(200);
};
export const profile = async (req, res) => {
   const { payload: id } = req.user;

   const userFound = await User.findById(id);
   console.log(userFound);

   if (!userFound) return res.status(400).json({ message: 'User not found.' });
   res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
   });
};

export const verifyToken = async (req, res) => {
   const { token } = req.cookies;

   if (!token) return res.send(false);

   jwt.verify(token, SECRET_KEY, async (error, user) => {
      if (error) return res.sendStatus(401);
      const { payload: id } = user;
      const userFound = await User.findById(id);
      if (!userFound) return res.sendStatus(401);

      return res.json({
         id: userFound._id,
         username: userFound.username,
         email: userFound.email,
      });
   });
};
