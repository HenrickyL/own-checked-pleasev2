import mongoose from 'mongoose'
import buySchema from './buy.js'

export const billSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true,
    },
    valueSum:{
        type:Number,
        default:0
    },
    limit:{
        type:Number,
        default:0
    },
    period:{
        type:String,
        default:'Um Mês'
    },
    status:{
        type:String,
        default:'Ativo'
    },
    buys:[buySchema],
    createAt:{
        type: Date,
        default: Date.now
    },
    endedAt:{
        type: Date
    }

})
mongoose.model('bills',billSchema);
// module.exports =  login
export default {billSchema}