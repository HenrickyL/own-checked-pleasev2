import mongoose from 'mongoose'
import billSchema from './bill.js'

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    // bills:[billSchema],
    createAt:{
        type: Date,
        default: Date.now
    }
})
mongoose.model('login',loginSchema);
console.log('create')
// module.exports =  login
export default {}