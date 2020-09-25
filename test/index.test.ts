import {expect} from 'chai';
import app from '../lib/app';
import {agent as request} from 'supertest';

// describe("Index Test", () => {
//     it('should always pass', function () {
//         expect(true).to.equal(true);
//     });
// });

describe("users API test", () => {
    it('should POST /users', async function () {
        const res = await request(app)
            .post('/users').send({
                firstName: "Channing",
                lastName: "Tatum",
                email: "channT@gmail.com",
                password: "#ChanT$%",
                mobile_num: 9810899777
            });

        console.log("reeses test ::", res.body, res.status)
        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an("object");
        //expect(res.body.error).to.be.empty;
    });
    it('should GET /users', async function () {
        const res = await request(app).get('/users');
        console.log("get :", res.body);
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        //expect(res.body.data).not.to.be.empty;
        //expect(res.body.data).to.be.an("array");
        //expect(res.body.error).to.be.empty;
    });
});