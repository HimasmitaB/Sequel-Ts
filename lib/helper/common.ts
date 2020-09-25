/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Promises from 'bluebird';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = Promises.promisifyAll(require("bcryptjs"));

  async function encryptPassword(password: string) {
    const saltRounds = 10;
    const encryptPassword = await bcrypt.hashSync(password, saltRounds);
    return encryptPassword;
  }

  async function comparePassword(password: string, hashpassword: string) {
    const comparePassword = await bcrypt.compareSync(password, hashpassword);
    return comparePassword;
  }

  export {
    encryptPassword,
    comparePassword,
  }