const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "../user.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const UserService = grpc.loadPackageDefinition(packageDefinition).UserService;

const client = new UserService(
    "127.0.0.1:50051",
    grpc.credentials.createInsecure()
);

client.getAllUsers({}, (error, users) => {
    console.log(users);
});