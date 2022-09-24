let server = require('../dist')
let chai = require('chai')
let chaiHttp = require('chai-http')

chai.should();
chai.use(chaiHttp);

describe('Schedules', () => {
    describe('/GET schedules for user', () => {
        it('It should return 401 status', done => {
            chai.request(server)
                .get('/schedules')
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                })
        })
    })
}, 2500)
