const server = require('../dist')
const chai = require('chai')
const chaiHttp = require('chai-http')
const request = require('supertest')
const creds = require('./creds')

chai.should();
chai.use(chaiHttp);

describe('Schedules', () => {
    let token = '';

    before((done) => {
      request(server)
        .post('/auth/login')
        .send(creds.user1)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
            let result = JSON.parse(res.text);
            token = `Bearer ${result.token}`;
            done();
        });
    });

    describe('/GET schedules for user', () => {
        it('It should return 401 status', done => {
            chai.request(server)
                .get('/schedules')
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                })
        })

        it('It should return an empty array of schedules', done => {
            chai.request(server)
                .get('/schedules')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })

        it('It should return a 422 user not found', done => {
            chai.request(server)
                .get('/schedules/user/undefined')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.have.keys('errors');
                    done();
                })
        })
    })
}, 2500)
