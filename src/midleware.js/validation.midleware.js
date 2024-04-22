import {body, validationResult} from 'express-validator';

const validateResult = async (req,res,next)=>{
    const rules = [
        body('name').notEmpty().withMessage('Name is Required'),
        body('name').isString().withMessage('Name is Required'),
        body('speciality').notEmpty().withMessage('specialist is Required'),
        body('speciality').isString().withMessage('specialist is Required')
    ]

    await Promise.all(rules.map(rule=>rule.run(req)));

    var ValidationErrors = validationResult(req);
    if(!ValidationErrors.isEmpty()){
        res.status(400).json({success: false, msg: "Invalid input. Please check your name/specialist and try again."})
    }
    else{
        next();
    }
}

export default validateResult;