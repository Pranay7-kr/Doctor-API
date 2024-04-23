# Project Name
Doctor-API
# Description
Doctor API is a RESTful API server designed to manage doctor information, appointments, and availability. In my Doctor-API you can add doctor with their name and speciality , you can see all doctor name, spciality, on which day u can take appointment, book a slot for paitents
# Used Technology
Node.js and their frameworks and libraries
# Feature
# List of key feature of API
Adding a doctor with name and specialty
Taking appointments
Retrieving all doctors
Retrieving a doctor by ID
Checking doctor availability
# Installation
Clone the repository: `git clone https://github.com/yourusername/doctor-api.git`

Install dependencies: npm install

Start the server: npm start
# Usage

# To add a doctor: POST /api/doctors 

 Request body: { "name": "Dr. Smith", "specialty": "Cardiology" }


# To retrieve a doctor: GET /api/doctors

# To retrive a doctor by: GET /api/doctors/id

for example(Id must be from mongodb): 66250396b03d4721bc469528

# To check doctor is available or not on that day: /api/doctors/id/isAvailable?day

for example: /api/doctors/66250396b03d4721bc469528/isAvailable?day=Tuesday

# To book an appointment: /api/doctors/id/bookappointment?day

for example: /api/doctors/66250396b03d4721bc469528/bookappointment?day=Tuesday



