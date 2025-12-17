import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import {generateToken} from '../utils/generateToken.js';

export const registerUser = async(req, res) => {
    const{name, email, password} = req.body;

    const userExists = await User.findOne({email});
    if(userExists) return res.status(400).json({message: 'User already exists'});

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({name, email, password: hashedPassword});

    res.status(201).json({message: 'User registered successfully'});
};

export const loginUser = async(req, res) => {
    const{ email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:"User not found"});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({messahe:'Invalid credentials'});
    
    const token = generateToken(user._id);
    res.json({
        message: "Login Successfully",
        token,
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
}