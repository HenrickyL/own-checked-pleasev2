import mongoose from 'mongoose'
import getStatusBill from './utility.js'
const bill = mongoose.model('bills')
const login = mongoose.model('login')
const periodModel = mongoose.model('Periods')
const statusModel = mongoose.model('status')


export async function index(req,res){
    const bills = await bill.find();
    return res.send(bills)
}
export async function CreateBill(req,res){
    try {
        //value,category,description,billId
        const created = await bill.create({userId:req.body.userId,
                                            title:req.body.title,
                                            description:req.body.description,
                                            valueSum:0,
                                            limit: req.body.limit,
                                            period: req.body.period,
                                            status:'Ativo',
                                            buys:[]

                                        })

        if(created){
            const user = await login.findOne({_id:req.body.userId})
            const bills = await bill.find({userId:req.body.userId})
            const periodAll = await periodModel.find()
            const statusAll = await statusModel.find()
            const statusBill = getStatusBill(bills)
            await login.update({ _id: user._id }, 
                        { $push: { bills: created } },
                        (err,suc)=>{})
            return res.render('month.html',{user,bills,statusBill,periods:periodAll,status:statusAll})
        }else{
            return res.render('Index.html',{error:false, bug:true})

        }
        
        // return res.redirect(301,`/ok`)
    } catch (error) {
        console.log(error)
        // return res.redirect(301,`/err`)
        return res.send("error:",error)
    }
}
export default {
    index,
    CreateBill,
    
}