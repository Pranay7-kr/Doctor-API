import express from 'express';
import DoctorController from './doctor.controller.js';
import validateResult from '../midleware.js/validation.midleware.js';

const doctorRouter = express.Router();

const doctorController = new DoctorController();

doctorRouter.post('/', validateResult, (req,res, next)=>{
    doctorController.addDoctor(req,res,next);
});

doctorRouter.get('/', (req,res, next)=>{
    doctorController.getAll(req,res, next);
});

doctorRouter.get('/:id', (req,res, next)=>{
    doctorController.getOne(req,res, next);
});

doctorRouter.get('/:id/isAvailable', (req,res, next)=>{
    doctorController.isAvailable(req,res, next);
})

doctorRouter.put('/:id/bookAppointment', (req,res,next)=>{
    doctorController.bookApointment(req,res,next);
})


export default doctorRouter;