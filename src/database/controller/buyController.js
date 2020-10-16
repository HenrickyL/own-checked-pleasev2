import mongoose from 'mongoose'
const buy = mongoose.model('buys')
const bill = mongoose.model('bills')
const login = mongoose.model('login')
const category = mongoose.model('categorys')


export async function index(req,res){
    const buys = await buy.find();
    return res.send(buys)
}
export async function CreateBuy(req,res){
    try {
        //value,category,description,billId
        const billId = req.params.id
        const created = await buy.create({...req.body,billId})
        console.log(req.body)
        if(created){
            const thisBill = bill.find({_id:billId})
            const user = login.findOne({_id: thisBill.userId})
            const buys = await buy.find()
            const categoryAll = await category.find()
            return res.render('buys.html',{bill:thisBill,buys,categoryAll})
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
    CreateBuy,
    
}