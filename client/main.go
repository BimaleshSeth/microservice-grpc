package main

import (
	"context"
	"fmt"
	"log"

	"github.com/golang/protobuf/proto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/metadata"

	"grpc-client/pb"
)

func main() {
	// Set up the gRPC connection
	conn, err := grpc.Dial("127.0.0.1:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("Failed to connect to the server: %v", err)
	}
	defer conn.Close()

	// Create a gRPC client
	client := pb.NewUserServiceClient(conn)

	// Define your request
	request := &pb.UserRequest{
		Id: 1, // Set your user ID here
	}

	// Set up context and metadata if needed
	ctx := context.Background()
	md := metadata.Pairs("key", "value") // Add any metadata you require
	ctx = metadata.NewOutgoingContext(ctx, md)

	// Call the gRPC method
	user, err := client.GetUser(ctx, request)
	if err != nil {
		log.Fatalf("Error calling GetUser: %v", err)
	}

	users, err := client.GetAllUsers(ctx, &pb.Empty{})
	if err != nil {
		log.Fatalf("Error calling GetUser: %v", err)
	}

	// Handle the response
	fmt.Printf("User: %v\n", proto.MarshalTextString(user))
	fmt.Printf("User: %v\n", proto.MarshalTextString(users))
}
