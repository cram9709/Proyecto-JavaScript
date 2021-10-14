const chai = require('chai');
const chaiHttp = require('chai-http');
const Usuario = require('../models/usuarios.models');

const app = require('../index')

chai.should();
chai.use(chaiHttp);

describe('Registro de Usuario', () => {
    /**
     * Test registro usuario
     */
    describe('POST/ registro usuarios exitoso', () => {
        it('Debe devolver un status 200', (done) => {
            const usuario = {
                user: 'test',
                names: 'test richard test test',
                email: 'test@test.com',
                telf: '1010101',
                agendaDirecciones: { direccion: 'calle 10, crr 10' },
                pass: '12345',
                repeat_pass: '12345'
            };
            chai.request(app)
                .post('/registro')
                .send(usuario)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.an('object');
                    done();
                });
        });

        after(async () => {
            await Usuario.deleteOne({ email: 'test@test.com' })
        });

    });

    describe('POST/ registro usuarios fallido', () => {

        it('Debe devolver un status 404 por fallo en nombre', (done) => {
            const usuario = {
                user: 't',
                names: 'test richard test test',
                email: 'test@test.com',
                telf: '1010101',
                agendaDirecciones: { direccion: 'calle 10, crr 10' },
                pass: '12345',
                repeat_pass: '12345'
            };
            chai.request(app)
                .post('/registro')
                .send(usuario)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        it('Debe devolver un status 404 por fallo en email', (done) => {
            const usuario = {
                user: 'test',
                names: 'test richard test test',
                email: '',
                telf: '1010101',
                agendaDirecciones: { direccion: 'calle 10, crr 10' },
                pass: '12345',
                repeat_pass: '12345'
            };
            chai.request(app)
                .post('/registro')
                .send(usuario)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });






});