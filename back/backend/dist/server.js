"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./db/index");
const fastify_1 = __importDefault(require("fastify"));
//import { Server, IncomingMessage, ServerResponse } from 'http'
const ToDo_model_1 = __importDefault(require("./db/models/ToDo.model"));
const cors_1 = __importDefault(require("@fastify/cors"));
const server = (0, fastify_1.default)({ logger: true });
(0, index_1.initDB)();
server.register(cors_1.default);
server.get('/ping', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { pong: 'it worked!' };
}));
server.get('/', function (req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const toDoList = yield ToDo_model_1.default.findAll(); //SELECT * FROM "ToDos"
            reply.send(toDoList);
        }
        catch (error) {
            reply.type('application/json').code(500);
            return {
                error: fastify_1.default.errorCodes.FST_ERR_BAD_STATUS_CODE,
            };
        }
        ;
    });
});
server.post('/todos', function (req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const crToDo = yield ToDo_model_1.default.create({
                title: req.body.title,
                description: req.body.description,
                isCompleted: req.body.isCompleted
            });
            reply.type('application/json').code(200);
            return {
                crToDo,
            };
        }
        catch (error) {
            console.log("This is error!", error);
            reply.type('application/json').code(500);
            return {
                error: fastify_1.default.errorCodes.FST_ERR_BAD_STATUS_CODE,
            };
        }
        ;
    });
});
server.get('/todos/:id', function (req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const oneToDo = yield ToDo_model_1.default.findByPk(req.params.id);
            if (!oneToDo) {
                reply.type('application/json').code(404);
                return {
                    message: "ToDo not found with ID!",
                };
            }
            reply.type('application/json').code(200);
            return {
                oneToDo
            };
        }
        catch (error) {
            reply.type('application/json').code(500);
            return {
                error: fastify_1.default.errorCodes.FST_ERR_BAD_STATUS_CODE,
            };
        }
        ;
    });
});
server.patch('/todos/:id', function (req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const findToDo = yield ToDo_model_1.default.findByPk(req.params.id);
            if (!findToDo) {
                reply.type('application/json').code(404);
                return {
                    message: "ToDo not found with ID!",
                };
            }
            yield findToDo.update(Object.assign({}, req.body));
            const updToDo = yield ToDo_model_1.default.findByPk(req.params.id);
            reply.type('application/json').code(200);
            return {
                updToDo
            };
        }
        catch (error) {
            console.log("This is error!", error);
            reply.type('application/json').code(500);
            return {
                error: fastify_1.default.errorCodes.FST_ERR_BAD_STATUS_CODE,
            };
        }
        ;
    });
});
server.delete('/todos', function (req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allDelToDo = yield (ToDo_model_1.default.destroy({
                where: {},
            }));
            reply.type('application/json');
            return {
                allDelToDo
            };
        }
        catch (error) {
            reply.type('application/json').code(500);
            return {
                error: fastify_1.default.errorCodes.FST_ERR_BAD_STATUS_CODE,
            };
        }
        ;
    });
});
server.delete('/todos/:id', function (req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const delToDo = yield (ToDo_model_1.default.destroy({
                where: {
                    id: req.params.id,
                }
            }));
            reply.type('application/json');
            return {
                delToDo
            };
        }
        catch (error) {
            reply.type('application/json').code(500);
            return {
                error: fastify_1.default.errorCodes.FST_ERR_BAD_STATUS_CODE,
            };
        }
        ;
    });
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen({ port: 4444 });
        const address = server.server.address();
        const port = typeof address === 'string' ? address : address === null || address === void 0 ? void 0 : address.port;
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();
