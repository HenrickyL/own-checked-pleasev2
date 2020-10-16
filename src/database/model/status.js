import mongoose from 'mongoose'


const statusSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    }
})
mongoose.model('status',statusSchema);
// module.exports =  login

const status = mongoose.model('status')
async function exec(){

    const all = await status.find()
    if(all.length<1){
        status.create({type:'Ativo'})
        status.create({type:'Fechado'})
        status.create({type:'Pago'})
    }
}
exec()

export default {}