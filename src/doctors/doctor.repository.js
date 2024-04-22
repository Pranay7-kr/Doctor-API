import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb.js";
import ApplicationError from "../errorHandler/applicationError.js";




export default class DoctorRepository {
    constructor() {
        this.collection = "doctors";
    }

    async addDoctor(doctor) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(doctor);
            return doctor;
        } catch (err) {
            throw err;
        }
    }

    async getAll() {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const doctors = await collection.find().toArray();
            if (doctors.length > 0) {
                return doctors;
            } else {
                
                throw new ApplicationError("No doctor available in the hospitals", 404);
            }
        } catch (err) {
            throw err;
        }
    }

    async getOne(id) {
        const db = getDB();
        const collection = db.collection(this.collection);
        try {
            const doctor = await collection.find({ _id: new ObjectId(id) }).toArray();
            if (doctor.length > 0) {
                return doctor
            } else {
                
                throw new ApplicationError("Doctor not found", 404);
                
            }
        } catch (err) {
            
            throw err;
        }
    }

    async isAvailable(id, day) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const doctor = await collection.find({ _id: new ObjectId(id) }).toArray();
            if (doctor.length > 0) {
                const available = doctor[0].weeklyAvailability.find((d) => d.day == day);
                if (available) {
                    if (available.patients >= 0 && available.patients < 5) {
                        return true;
                    }
                    else {
                        throw new ApplicationError("No available slots for this doctor.", 404);
                    }
                }
                else {
                    throw new ApplicationError(`Doctor is not available on ${day}`, 404);
                }
            }
            else {
                throw new ApplicationError("Doctor not found", 404);
            }

        } catch (err) {

            throw err;
        }
    }

    async bookApointment(id, day) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const doctor = await collection.find({ _id: new ObjectId(id) }).toArray();

            if (doctor.length > 0) {
                const available = doctor[0].weeklyAvailability.find((d) => d.day == day);
                if (available) {
                    if (available.patients < 5) {
                        return await collection.updateOne({ name: doctor[0].name, "weeklyAvailability.day": day }, { $inc: { "weeklyAvailability.$.patients": 1 } });

                    } else {
                        throw new ApplicationError(`No slots available on ${day}`, 404);
                    }
                }
                else {
                    throw new ApplicationError(`Doctor is not available on ${day}`, 404);
                }
            }
            else {
                throw new ApplicationError("Doctor not found", 404);
            }

        } catch (err) {
            
            throw err;
        }
    }
}