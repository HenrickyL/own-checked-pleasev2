// const mongoose = require("mongoose")
import getStatusBill from './utility.js'
import mongoose from 'mongoose'
const login = mongoose.model('login')
const periodModel = mongoose.model('Periods')
const statusModel = mongoose.model('status')
const bill = mongoose.model('bills')





export async function index(req,res){
    const logins = await login.find({});
    return res.send(logins)
}
export async function CreateUser(req,res){
    try {
        //pesquisa o usuário
        let user = await login.findOne({email:req.body.email, username:req.body.username})
        console.log(req.body)
        if(!user){//se não existir add
            const created = await login.create(req.body)
            return res.render('index.html',{error:false, login:false})
        }else{
            return res.render('sign-in.html',{error:true, login:false})
        }
        
        // return res.redirect(301,`/ok`)
    } catch (error) {
        console.log(error)
        // return res.redirect(301,`/err`)
        return res.send("error:",error)
    }
}
export async function VerifyLogin(req,res){
    try {
        const user = await login.findOne({username:req.body.username,password:req.body.password})
        const bills = await bill.find({userId:user._id})
        if(user){//se existir redireciona para a página passado as informações
            const statusBill = getStatusBill(bills)
            const periodAll = await periodModel.find()
            const statusAll = await statusModel.find()
            return res.render('month.html',{user,bills,statusBill,periods:periodAll,status:statusAll})
        }else{
            return res.render('index.html',{error:true, login:true})
        }
    } catch (error) {
        console.log(error)
        // return res.redirect(301,`/err`)
        return res.send("error:",error)
    }
}
export async function compare(_username, _password){
    const logins = await login.findOne({
        username: _username,
        password:_password
    })
    return logins
}
export async function remove(_username){
    try {
    const logins = await login.deleteOne({
        username:_username
    })
        
    } catch (error) {
        console.log(error)
    }
}
export async function getUser(){
    return await login.find();
}

// export const loginController = {
//     index,
//     CreateUser,
//     VerifyLogin,
//     compare,
//     remove    
// }
export default {
    index,
    CreateUser,
    VerifyLogin,
    compare,
    remove    
}