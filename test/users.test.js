const server = require('../dist')
const chai = require('chai')
const chaiHttp = require('chai-http')
const request = require('supertest')
const creds = require('./creds')

chai.should();
chai.use(chaiHttp);

describe('Users', () => {
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

    describe('/GET Users by username', () => {
        it('It should return 401 status', done => {
            chai.request(server)
                .get(`/users/profile/${creds.user1.user_name}`)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                })
        })

        it('It should return a 422 user not found', done => {
            chai.request(server)
                .get('/users/profile/121241')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.have.keys('errors');
                    done();
                })
        })

        it('It should return an object', done => {
            chai.request(server)
            .get(`/users/profile/${creds.user1.email}`)
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                })
        })
    })

    describe('/GET Users by ID', () => {
        it('It should return a 422 user not found', done => {
            chai.request(server)
                .get('/users/121241')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.have.keys('errors');
                    done();
                })
        })

        it('It should return an object', done => {
            chai.request(server)
            .get(`/users/1`)
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                })
        })
    })
}, 2500)
