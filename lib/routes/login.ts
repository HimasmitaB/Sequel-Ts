import {Router} from 'express';
import {Users} from '../models/Users';
import {comparePassword} from '../helper/common';

export const loginroute = Router();
import jwt from 'jsonwebtoken';
import { jwtsecret } from "../config/config";

loginroute.post('/', async (req, res, next) => {
  try {
    
    const userData = await Users.findOne({
      where: {
        email: req.body.email
      },
    });
    
    
    if(userData){
      const matchpwd = await comparePassword(req.body.password, userData.get("password"));
        if (!matchpwd) {
          return res.status(401).send({message: "Invalid Password"});
        }
        const token = jwt.sign(
            {
              id: userData.id,
              email: userData.get("email"),
            },
            jwtsecret
          );
          return Users
            .update(
              {
                token: token,
              },
              {
                //transaction: trx,
                returning: true,
                where: {
                  id: userData.id,
                },
              }
            )
        .then(() => {
        return res.status(201).json({message:"Login Successfull","token ": token});
        })
        .error((error) =>{
          next({
            error,
            externalHttpCode: 500,
            errorMessage: "Internal Server Error.",
            internalHttpCode: 5000,
          });
        })
    }else{
        return res.status(500).send({message:"User Not Found"})
    }
    
  } catch (e) {
    next(e);
  }
});