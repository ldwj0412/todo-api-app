// require('dotenv').config();
// const mongoose = require('mongoose');
// const supertest = require('supertest');
// const Todo = require('../models/Todo');
// const chai = require('chai');
// const app = require('../server'); // make sure you export app from your server.js
// const chaiHttp = require('chai-http');


// chai.use(chaiHttp);

// const expect = chai.expect;
// const request = supertest(app);


// describe('Todo API', function() {
    

//     before(function() {
//         return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     });

//     beforeEach(function(done) {
//         mongoose.connection.collections.todos.drop(() => {
//             done();
//         });
//     });

//     describe('POST /todos', function() {
//         it('should create a new todo', function(done) {
//             request
//                 .post('/todos')
//                 .send({
//                     name: 'Test todo',
//                     description: 'Test description',
//                     dueDate: new Date(),
//                     status: 'Not Started'
//                 })
//                 .end((err, res) => {
//                     if (err) return done(err);
//                     expect(res).to.have.status(201);
//                     expect(res.body.name).to.equal('Test todo');
//                     done();
//                 });
//         });
//     });

//     describe('GET /todos', function() {
//         it('should retrieve all todos',async function() {
//             const todo = new Todo({
//                 name: 'Test todo',
//                 description: 'Test description',
//                 dueDate: new Date(),
//                 status: 'Not Started'
//             });

//             await todo.save();
                

//             request               
//                 .get('/todos')
//                 .end((err, res) => {
//                     if (err) throw err;
//                     expect(res).to.have.status(200);
//                     expect(res.body.length).to.equal(1); 
                    
//                 });
            
//         });
//     });

//     describe('GET /todos/:id', function() {
//         it('should retrieve a todo by ID', async function() {
//             const todo = new Todo({
//                 name: 'Test todo',
//                 description: 'Test description',
//                 dueDate: new Date(),
//                 status: 'Not Started'
//             });

//             await todo.save() ;

//                 request
//                     .get(`/todos/${todo.id}`)
//                     .end((err, res) => {
//                         if (err) throw err;
//                         expect(res).to.have.status(200);
//                         expect(res.body.name).to.equal('Test todo');
                   
//                     });
           
//         });
//     });

//     describe('PUT /todos/:id', function() {
//         it('should update a todo', async function() {
//             const todo = new Todo({
//                 name: 'Test todo',
//                 description: 'Test description',
//                 dueDate: new Date(),
//                 status: 'Not Started'
//             });

//             await todo.save() ;
//                 request
//                     .put(`/todos/${todo.id}`)
//                     .send({ name: 'Updated test todo' })
//                     .end((err, res) => {
//                         if (err) throw err;
//                         expect(res).to.have.status(200);
//                         expect(res.body.name).to.equal('Updated test todo');
                       
//                     });
           
//         });
//     });

//     describe('DELETE /todos/:id', function() {
//         it('should delete a todo', async function() {
//             const todo = new Todo({
//                 name: 'Test todo',
//                 description: 'Test description',
//                 dueDate: new Date(),
//                 status: 'Not Started'
//             });

//             await todo.save();
//                 request
//                     .delete(`/todos/${todo.id}`)
//                     .end((err, res) => {
//                         if (err) throw err;
//                         expect(res).to.have.status(200);
//                         expect(res.body.message).to.equal('Todo successfully deleted');
                        
//                     });
            
//         });
//     });

//     describe('GET /todos with filtering', function() {
//         it('should filter todos by status', function(done) {
//             const todo1 = new Todo({
//                 name: 'Test todo 1',
//                 description: 'Test description',
//                 dueDate: new Date(),
//                 status: 'Not Started'
//             });

//             const todo2 = new Todo({
//                 name: 'Test todo 2',
//                 description: 'Test description',
//                 dueDate: new Date(),
//                 status: 'Completed'
//             });

//             Promise.all([todo1.save(), todo2.save()])
//                 .then(() => {
//                     request
//                         .get('/todos?status=Not Started')
//                         .end((err, res) => {
//                             if (err) return done(err);
//                             expect(res).to.have.status(200);
//                             expect(res.body.length).to.equal(1);
//                             expect(res.body[0].name).to.equal('Test todo 1');
//                             done();
//                         });
//                 });
//         });
//     });

//     describe('GET /todos with sorting', function() {
//         it('should sort todos by name', function(done) {
//             const todo1 = new Todo({
//                 name: 'B Test todo',
//                 description: 'Test description',
//                 dueDate: new Date(),
//                 status: 'Not Started'
//             });

//             const todo2 = new Todo({
//                 name: 'A Test todo',
//                 description: 'Test description',
//                 dueDate: new Date(),
//                 status: 'Completed'
//             });

//             Promise.all([todo1.save(), todo2.save()])
//                 .then(() => {
//                     request
//                         .get('/todos?sortBy=name')
//                         .end((err, res) => {
//                             if (err) return done(err);
//                             expect(res).to.have.status(200);
//                             expect(res.body.length).to.equal(2);
//                             expect(res.body[0].name).to.equal('A Test todo');
//                             done();
//                         });
//                 });
//         });
//     });

//     after(function() {
//         return mongoose.connection.close();
//     });
// });

require('dotenv').config();
const mongoose = require('mongoose');
const supertest = require('supertest');
const Todo = require('../models/Todo');
const User = require('../models/User');
const chai = require('chai');
const server = require('../server'); // make sure you export app from your server.js
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; 

chai.use(chaiHttp);

const expect = chai.expect;
const request = supertest(server);

describe('Todo API', function() {
    let userId;

    before(function() {
        return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    describe('POST /register', function() {
        it('should create a new user when valid data is provided', function(done) {
            request
                .post('/register')
                .send({
                    username: 'newuser',
                    password: 'newpassword'
                })
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'User created successfully');
                    User.findOne({username: 'newuser'})
                        .then(user => {
                            expect(user).to.not.be.null;
                            done();
                        });
                });
        });
    
        it('should return an error when the username already exists', function(done) {
            request
                .post('/register')
                .send({
                    username: 'test', // this username is already taken
                    password: 'test'
                })
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message', 'Username already exists');
                    done();
                });
        });
    });
    
    describe('POST /login', function() {
        it('should return a token when valid credentials are provided', function(done) {
            request
                .post('/login')
                .send({
                    username: 'test',
                    password: 'test'
                })
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token');
                    done();
                });
        });

        it('should return an error when invalid credentials are provided', function(done) {
            request
                .post('/login')
                .send({
                    username: 'test',
                    password: 'wrongpassword'
                })
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message', 'Invalid username or password');
                    done();
                });
        });
    });

    let token;
    let username;

    beforeEach(async function() {
        await mongoose.connection.dropDatabase();
        
        user = new User({username: 'test', password: 'test'});
        const savedUser = await user.save();
        userId = savedUser._id;
        username = savedUser.username;
        console.log("username: "+ username);

        // Create a token for the user
        token = jwt.sign({ userId: savedUser._id, username: savedUser.username}, jwtSecret);
        
    });
    // beforeEach(function(done) {
    //     mongoose.connection.dropDatabase()
    //         .then(() => {
    //             const user = new User({ username: 'test', password: 'test' });
    //             return user.save();
    //         })
    //         .then((savedUser) => {
    //             userId = savedUser._id;
    //             token = jwt.sign({ userId: savedUser._id }, 'your_jwt_secret');
    //             done();
    //         })
    //         .catch((err) => {
    //             done(err);
    //         });
    // });
    
    describe('POST /todos', function() {
        it('should create a new todo', function(done) {
            request
                .post('/todos')
                .set('auth-token', token)
                .send({
                    
                    name: 'Test todo',
                    description: 'Test description',
                    dueDate: new Date(),
                    status: 'Not Started',
                    user: username,
                    priority: 'High',
                    tags: ['tag1', 'tag2']
                })
                .end((err, res) => {
                    if (err) { return done(err);}
                   
                    expect(res).to.have.status(201);
                    expect(res.body.user).to.equal('test');
                    expect(res.body.name).to.equal('Test todo');
                    expect(res.body.priority).to.equal('High');
                    expect(res.body.tags).to.eql(['tag1', 'tag2']);
                    done();
                });
        });
    });

    describe('GET /todos', function() {
        it('should retrieve all todos', function(done) {
            const todo = new Todo({
                user: username,
                name: 'Test todo',
                description: 'Test description',
                dueDate: new Date(),
                status: 'Not Started',
                priority: 'High',
                tags: ['tag1', 'tag2']
            });
    
            todo.save().then(() => {
                request
                    .get('/todos')
                    .set('auth-token', token)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res).to.have.status(200);
                        expect(res.body.length).to.equal(1);
                        expect(res.body[0].priority).to.equal('High');
                        expect(res.body[0].tags).to.eql(['tag1', 'tag2']);
                        done();
                    });
            });
        });
    });


    describe('DELETE /todos/:id', function() {
        it('should delete a todo', function(done) {
            const todo = new Todo({
                user: username,
                name: 'Test todo',
                description: 'Test description',
                dueDate: new Date(),
                status: 'Not Started',
                priority: 'High',
                tags: ['tag1', 'tag2']
            });
    
            todo.save().then(() => {
                request
                    .delete(`/todos/${todo.id}`)
                    .set('auth-token', token)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res).to.have.status(200);
                        expect(res.body.message).to.equal('Todo successfully deleted');
                        done();
                    });
            });
        });
    });

    describe('PUT /todos/:id', function() {
        it('should update a todo', function(done) {
            const todo = new Todo({
                user: username,
                name: 'Test todo',
                description: 'Test description',
                dueDate: new Date(),
                status: 'Not Started',
                priority: 'High',
                tags: ['tag1', 'tag2']
            });
    
            todo.save().then(() => {
                const updatedTodoName = 'Updated test todo';
    
                request
                    .put(`/todos/${todo.id}`)
                    .set('auth-token', token)
                    .send({ name: updatedTodoName })
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res).to.have.status(200);
                        expect(res.body.user).to.equal('test');
                        expect(res.body.name).to.equal(updatedTodoName);
                        done();
                    });
            });
        });
    });

    describe('GET /todos with filtering', function() {
        it('should filter todos by status', function(done) {
            const todo1 = new Todo({
                user: username,
                name: 'Test todo 1',
                description: 'Test description',
                dueDate: new Date(),
                status: 'Not Started',
                priority: 'High',
                tags: ['tag1', 'tag2']
            });

            const todo2 = new Todo({
                user: username,
                name: 'Test todo 2',
                description: 'Test description',
                dueDate: new Date(),
                status: 'Completed',
                priority: 'Low',
                tags: ['tag3', 'tag4']
            });

            Promise.all([todo1.save(), todo2.save()])
                .then(() => {
                    request
                        .get('/todos?status=Not Started')
                        .set('auth-token', token)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res).to.have.status(200);
                            expect(res.body.length).to.equal(1);
                            expect(res.body[0].name).to.equal('Test todo 1');
                            done();
                        });
                });
        });
    });

    describe('GET /todos with sorting', function() {
        it('should sort todos by name', function(done) {
            const todo1 = new Todo({
                user: username,
                name: 'B Test todo',
                description: 'Test description',
                dueDate: new Date(),
                status: 'Not Started',
                priority: 'High',
                tags: ['tag1', 'tag2']
            });

            const todo2 = new Todo({
                user: username,
                name: 'A Test todo',
                description: 'Test description',
                dueDate: new Date(),
                status: 'Completed',
                priority: 'Low',
                tags: ['tag3', 'tag4']
            });

            Promise.all([todo1.save(), todo2.save()])
                .then(() => {
                    request
                        .get('/todos?sortBy=name')
                        .set('auth-token', token)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res).to.have.status(200);
                          
                            expect(res.body.length).to.equal(2);
                            expect(res.body[0].name).to.equal('A Test todo');
                            done();
                        });
                });
        });
    });

    after(function() {
        return mongoose.connection.close();
    });
});