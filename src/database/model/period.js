import mongoose from 'mongoose'


const PeriodsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    days:{
        type:Number,
        required:true
    }
})
mongoose.model('Periods',PeriodsSchema);
// module.exports =  login
const period = mongoose.model('Periods')
async function exec(){

    const all = await period.find()
    if(all.length <1){
        period.create({name:'Uma Semana', days:7})
        period.create({name:'Quinze Dias', days:15})
        period.create({name:'Um Mês', days:30})
        period.create({name:'Três Meses', days:90})
        period.create({name:'Seis Meses', days:120})
        period.create({name:'Um Ano', days:365})
        period.create({name:'Indefinido', days:-1})
    }
}
exec()

export default {}