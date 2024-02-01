import express from "express";
import userController from "../controller/user-controller.js";
import employeeController from "../controller/employee-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// Employee API
userRouter.post('/api/employees', employeeController.create);
userRouter.get('/api/employees/:employeeId', employeeController.get);
userRouter.put('/api/employees/:employeeId', employeeController.update);
userRouter.delete('/api/employees/:employeeId', employeeController.remove);
userRouter.get('/api/employees', employeeController.search);

export {
    userRouter
}