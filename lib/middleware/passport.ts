import { Request, Response, NextFunction } from 'express';
import passport from "passport";
import passportJWT from "passport-jwt";
const extractJwt = passportJWT.ExtractJwt;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const JWTstrategy = require("passport-jwt").Strategy;
import {Users} from '../models/Users' ;
import { jwtsecret } from "../config/config";
//const constants = require("../helper/constants");

const opt = {
  jwtFromRequest: extractJwt.fromHeader("x-access-token"),
  secretOrKey: jwtsecret,
  passReqToCallback: true,
};

passport.use(
  "jwt",
  new JWTstrategy(opt, (req, jwtPayload, done) => {
    console.log("payloaddad ::",jwtPayload )
    try {
      const token = req.headers["x-access-token"];
      Users
        .findOne({
          where: {
            id: jwtPayload.id,
          },
        })
        .then((result) => {
          if (result && token === result.token) {
            done(null, result);
          } else {
            done(null, false);
          }
        });
        
    } catch (err) {
      done(err);
    }
  })
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function authenticateJwt(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("jwt", { session: false }, function (error, user) {
    const token = req.headers["x-access-token"];
    if(!token){
      return res.send({message: "Unauthorized"})
    }
    if (error) {
      return next({ error });
    }
    if (!user) {
      return res.send({message: "Session Expired"})
    }
    req['user'] = user.user_id;
    next();
  })(req, res, next);
}

export {
  authenticateJwt
}
