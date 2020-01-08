const request = require('supertest');
const mongoose = require('mongoose');

const { Todo } = require('../../models/Todo');

let server;

describe('/api/todos', () => {
    beforeEach(() => {
        server = require('../../app');
    });

    afterEach(async () => {
        await Todo.remove({});
        server.close();
    });

    describe('GET /', () => {
        it('should return all todos', async () => {
            await Todo.collection.insertMany([
                { title: 'todo1' },
                { title: 'todo2' }
            ]);
            const res = await request(server).get('/api/todos');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(todo => todo.title === 'todo1')).toBeTruthy();
            expect(res.body.some(todo => todo.title === 'todo2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a todo if valid ID is passed', async () => {
            const todo = new Todo({ title: 'todo1' });
            await todo.save();

            const res = await request(server).get(`/api/todos/${todo._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title', 'todo1');
        });

        it('should return 400 if bad ID is passed', async () => {
            const res = await request(server).get('/api/todos/1');
            expect(res.status).toBe(400);
        });

        it('should return 404 if invalid ID is passed', async () => {
            const id = mongoose.Types.ObjectId().toHexString();
            const res = await request(server).get(`/api/todos/${id}`);
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        it('should create a todo if valid todo is passed', async () => {
            const res = await request(server)
                .post('/api/todos')
                .send({ title: 'todo1' });
            expect(res.status).toBe(201);
        });

        it('should return 400 if todo title is not defined', async () => {
            const res = await request(server)
                .post('/api/todos')
                .send({ title: '' });
            expect(res.status).toBe(400);
        });

        it('should return 400 if todo title is less than 3 characters', async () => {
            const res = await request(server)
                .post('/api/todos')
                .send({ title: 'a' });
            expect(res.status).toBe(400);
        });

        it('should return 400 if todo title is more than 255 characters', async () => {
            const res = await request(server)
                .post('/api/todos')
                .send({ title: new Array(257).join('a') });
            expect(res.status).toBe(400);
        });
    });

    describe('PUT /:id', () => {
        it('should return 400 if bad ID is passed', async () => {
            const res = await request(server)
                .put('/api/todos/1')
                .send({ title: 'todo1' });
            expect(res.status).toBe(400);
        });

        it('should return 404 if invalid ID is passed', async () => {
            const id = mongoose.Types.ObjectId().toHexString();
            const res = await request(server)
                .put(`/api/todos/${id}`)
                .send({ title: 'todo1' })
            expect(res.status).toBe(404);
        });

        it('should update todo if valid ID is passed', async () => {
            const todo = new Todo({ title: 'todo1' });
            await todo.save();
            const res = await request(server)
                .put(`/api/todos/${todo._id}`)
                .send({ title: 'updatedTodo1' });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title', 'updatedTodo1');
        });
    });

    describe('DELETE /:id', () => {
        it('should delete todo if valid ID is passed', async () => {
            const todo = new Todo({ title: 'todo1' });
            await todo.save();
            const res = await request(server)
                .delete(`/api/todos/${todo._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', todo._id.toHexString());
            expect(res.body).toHaveProperty('title', 'todo1');
        });

        it('should return 400 if bad ID is passed', async () => {
            const res = await request(server)
                .delete('/api/todos/1');
            expect(res.status).toBe(400);
        });

        it('should return 404 if invalid ID is passed', async () => {
            const id = mongoose.Types.ObjectId().toHexString();
            const res = await request(server)
                .delete(`/api/todos/${id}`);
            expect(res.status).toBe(404);
        });
    });
});