import express from 'express';
import { signin, signup } from '../controllers/auth.controller';
const Router = express.Router();    

Router.post('/signup', adminSignup);
Router.post('/signin', adminSignin);

export default Router;