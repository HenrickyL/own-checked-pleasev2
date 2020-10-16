import mongoose from 'mongoose'


const categorySchema = new mongoose.Schema({
   name:{
        type:String,
        required:true
   }
})
mongoose.model('categorys',categorySchema);
// module.exports =  login
const category = mongoose.model('categorys')
async function exec(){
   const allCategorys = await category.find({})
   if(allCategorys.length <1){
      category.create({name:'Transporte'})
      category.create({name:'Alimentação'})
      category.create({name:'Lazer'})
      category.create({name:'Saúde'})
      category.create({name:'Aluguel'})
      category.create({name:'Nenhuma'})
   }
}
exec()


export default {}