import express from 'express';
const Router =  express.Router();
import { signup, signin } from '../controllers/auth.controller.js';

Router.post('/signup', signup);
Router.post('/signin', signin);

export default Router;