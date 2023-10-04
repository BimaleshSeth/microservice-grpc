const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "../user.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const usersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
let users = [
    { id: "1", name: "Note 1", age: 12 },
    { id: "2", name: "Note 2", age: 15 },
];

server.addService(usersProto.UserService.service, {
    getAllUsers: (_, callback) => {
        callback(null, { users });
    },
    getUser: (_, callback) => {
        const userId = _.request.id;
        const user = users.find(({ id }) => userId == id);
        callback(null, user);
    },
});

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server running at grpc://127.0.0.1:50051");
        server.start();
    }
);