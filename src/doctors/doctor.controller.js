import DoctorRepository from "./doctor.repository.js";
import DoctorsModel from "./doctors.model.js";


export default class DoctorController {
    constructor() {
        this.doctorRepository = new DoctorRepository();
    }
    async addDoctor(req, res, next) {
        try {
            const { name, speciality } = req.body;
            const doctor = new DoctorsModel(name, speciality);
            const result = await this.doctorRepository.addDoctor(doctor);
            res.status(201).send(result);
        } catch (err) {
           next(err);
        }
    }

    async getAll(req, res, next) {
        try {
            const doctors = await this.doctorRepository.getAll();
            res.status(200).send(doctors);
        } catch (err) {
            next(err);
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params;
            const doctor = await this.doctorRepository.getOne(id);
            res.status(200).send(doctor);
        } catch (err) {
            next(err);
        }
    }

    async isAvailable(req, res, next) {
        try {
            const { id } = req.params;
            const day = req.query.day;
            
            const available = await this.doctorRepository.isAvailable(id, day);
            res.status(200).send("Doctor is available, You can book the appointment");
        } catch (err) {
            next(err);
        }
    }

    async bookApointment(req, res, next) {
        try {
            const { id } = req.params;
            const day = req.query.day;
            const available = await this.doctorRepository.bookApointment(id, day);
            res.status(200).send("Slot booked Successfully");
        } catch (err) {
            next(err);
        }
    }
}