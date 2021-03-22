const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwtoken = require('jsonwebtoken')

const userController ={
    signUp: async (req, res) =>{
        const {firstName, lastName, password, picUrl, email} = req.body
        const errors = []
        const userExists = await User.findOne({email: email})
        if(userExists){
            errors.push('Tu mail ya está vinculado a una cuenta')
        }
        if(errors.length===0){
            const hashedPass = bcryptjs.hashSync(password, 10)
            const newUser =  new User({
                firstName, lastName, password: hashedPass, picUrl, email
            })
            var createdUser = await newUser.save()
            var token = jwtoken.sign({...createdUser}, process.env.SECRET_KEY, {})
        }
        return res.json({
            success: errors.length !== 0 ? fase : true,
            errors,
            response: errors.length === 0 && {
                token,
                firstName: createdUser.firstName,
                lastName: createdUser.lastName,
                email: createdUser.email,
                picUrl: createdUser.picUrl,
                _id: createdUser._id
            }
        })
    },
    signIn: async (req, res) =>{
        const {email, password} = req.body
        const existingUser = await User.findOne({email: email})
        if(!existingUser){
            return res.json({
                success: false,
                response: 'No existe un usuario con esa dirección de mail'
            })    
        }
        const matchedPass = bcryptjs.compareSync(password, existingUser.password)
        if(!matchedPass){
            return res.json({
                success: false,
                response: 'Contraseña incorrecta'
            })  
        }
        var token = jwtoken.sign({...existingUser}, process.env.SECRET_KEY, {})
        return res.json({
            success: true,
            response:{
                token,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                picUrl: existingUser.picUrl,
                _id: existingUser._id
            }
        })
    },
    preserveLog: (req, res) =>{
        const {token} = req.body
        const {firstName, lastName, email, picUrl, _id} = req.user
        res.json({
            success: true,
            response:{
                firstName, lastName, email, picUrl, token, _id
            }
        })
    }
}
module.exports = userController