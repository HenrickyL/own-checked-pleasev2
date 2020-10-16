import express from 'express'
// import {db} from './database/db.js'
import {leftpad as fd} from './helper/timestamp.js'
import nunjucks from 'nunjucks'
import mongoose from 'mongoose'
import {} from './database/model/_loadAll.js'
import getStatusBill from './database/controller/utility.js'



import * as loginController from './database/controller/LoginController.js'
import * as billController from './database/controller/billController.js'
import * as buyController from './database/controller/buyController.js'






const app = express()
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log('APP run in', port)
});

////////////////////////
nunjucks.configure("src/views",{
    express: app,
    noCache:true
})
///////////////////////////////////
mongoose.connect(
    'mongodb://localhost:27017/own-cheked',  
    {useNewUrlParser:true,useUnifiedTopology: true}
)


const login =mongoose.model('login')
const bill =mongoose.model('bills')
const buy = mongoose.model('buys')
const periods = mongoose.model('Periods')
const category = mongoose.model('categorys')
const status = mongoose.model('status')

//////////////////////////////////
app.get('/',(req, res)=>{
    return res.render("index.html",{error:null})
})
app.post('/register',loginController.CreateUser)
app.post('/login',loginController.VerifyLogin)
app.get('/data',loginController.index)
app.post('/savebill',billController.CreateBill)
app.get('/deletebill/:billId/:id', async (req,res)=>{
    const billId = req.params.billId
    const id = req.params.id
    await bill.findByIdAndDelete(billId)
    
    const user = await login.findOne({_id:id})
    const bills = await bill.find({userId:id})
    const periodAll = await periods.find()
    const statusAll = await status.find()
    const statusBill = getStatusBill(bills)
    
    return res.render('month.html',{user,bills,statusBill,periods:periodAll,status:statusAll})
})

app.get('/buys/:id', async (req,res)=>{
   
    const id = req.params.id
    const thisBill = await bill.findById(id)
    // const user = await login.findOne({_id:id})
    const buys = await buy.find({billId:id})
    const categoryAll = await category.find()
    console.log(bill)
    return res.render('buys.html',{bill:thisBill,buys,categoryAll})
})
app.post("/savebuy/:id",buyController.CreateBuy)

app.get('/deletebuy/:billId/:id', async (req,res)=>{
    const billId = req.params.billId
    const id = req.params.id
    await buy.findByIdAndDelete(id)

    const thisBill = await bill.findById(billId)
    const buys = await buy.find({billId})
    const categoryAll = await category.find()

    return res.render('buys.html',{bill:thisBill,buys,categoryAll})

})



// app.get('/deletebuy/:id/:value',(req,res)=>{
//     let billId = req.params.id
//     let buyId = req.params.value
//     db.all(`UPDATE bill SET 
//         countBuys = countBuys - ${1},
//         valueSum = valueSum - (SELECT value FROM buy WHERE id = ${buyId})
//         WHERE id = ${billId}`,(err)=>{

//         db.all(`DELETE FROM buy
//         WHERE id = ${buyId};`,(err)=>{
//             res.redirect(301,`/buys/${billId}`)
//         })
//     })
// })
// app.get('/deletebill/:id',(req,res)=>{
//     let billId = req.params.id
//     db.all(`DELETE FROM bill
//         WHERE id = ${billId};`,(err)=>{
//             res.redirect(301,`/month/dateCreate`)
//         })
// })

// app.get('/closebill/?:id',(req,res)=>{
//     let billId = req.params.id
//     db.all(`UPDATE bill SET 
//         status_id= status_id + ${1}
//         WHERE id = ${billId}`,(err)=>{
//             res.redirect(301,`/month/dateCreate`)
//         })
// })



app.get("/*",(req, res)=>{
    return res.render("notFound.html")
})



//////////////////////////////////////////////
