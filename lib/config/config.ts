import dotenv from "dotenv";
dotenv.config();
//const env = require('env-var')
 
const nodeEnv: string = (process.env.NODE_ENV as string);
//console.log(nodeEnv);
const port: number = parseInt(<string>process.env.PORT, 10) || 3000;
const jwtsecret: string = (process.env.NODE_ENV as string);
// Get the value of NODE_ENV as a string. Could be undefined since we're
// not calling required() before asString()
//const NODE_ENV = env.get('NODE_ENV').asString()
 
// Read PORT variable and ensure it's in a valid port range. If it's not in
// valid port ranges, not set, or empty an EnvVarError will be thrown
//const PORT = env.get('PORT').required().asPortNumber()
 
// If mode is production then this is required
//const JWT_SECRET = env.get('SECRET').required(NODE_ENV === 'production').asString()

export {
  nodeEnv,
  port,
  jwtsecret
}