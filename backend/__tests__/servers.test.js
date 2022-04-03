require("dotenv").config();
const app = require("../server");
const request = require('supertest');
const jwt = require("jsonwebtoken");
const db = require("./config/database");
const agent = request.agent(app);
const User = require("../models/User");
const Server = require("../models/Server");

let token;
//let savedServer;
const baseServer = {
    name: "testServerName",
    code: "1789456123"
};

const baseUser = {
        firstName: "John",
        lastName: "Smith",
        email: "JohnSmith@gmail.com",
        password: "testing123"
};

beforeAll(async () => {
    const userToSave = new User(baseUser);
    userToSave.save((err, user) => {
        token = jwt.sign({
            id: user._id,
            serverID: user.serverID,
            ...baseUser
        },
        process.env.JWT_SECRET
        );
    }); 
});

beforeAll(async () => await db.connect());
afterAll(async () => await db.clear());
afterAll(async () => await db.close());
//------------------------------------------------------------------
//test the GET routes
//------------------------------------------------------------------

//test @route GET /api/servers/:id
//@access Private
describe("GET /:id", () => {
    test("it should get the id of the server and return 200", async () => {
        const validServer = new Server(baseServer);
        const savedServer = await validServer.save();
        
        return request(app)
            .get(`/api/servers/${savedServer._id}`)
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
        });
    });
});

//test @route GET /api/code/:code
//@access Private
describe("GET /code/:code", () => {
    test("it should get the server by join code and return 200", async () => {
        const validServer = new Server(baseServer);
        const savedServer = await validServer.save();
        
        return request(app)
            .get(`/api/servers/code/${savedServer.code}`)
            .set('Authorization', `Bearer ${token}`)
            //.send({...savedServer})
            .then((response) => {
                expect(response.statusCode).toBe(200);
        });
    });
});