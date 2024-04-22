

export default class DoctorsModel{
    constructor(name, speciality){
        this.name = name;
        this.speciality = speciality;
        this.weeklyAvailability = [
            {day: "Monday", patients: 0},
            {day: "Tuesday", patients: 0},
            {day: "Wednesday", patients: 0},
            {day: "Thursday", patients: 0},
            {day: "Friday", patients: 0},
            {day: "Saturday", patients: 0}
        ];
        
    }
}