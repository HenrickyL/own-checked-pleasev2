import mongoose from 'mongoose'


export const buySchema = new mongoose.Schema({
    value:{
        type:Number,
        required: true
    },
    category:{
        type:String,
        required:true,
        default:'Nenhuma'
    },
    description:{
        type:String
    },
    billId:{
        type:String,
        required:true
    }
    ,
    createAt:{
        type: Date,
        default: Date.now
    }

})
mongoose.model('buys',buySchema);
// module.exports =  login
export default {buySchema}