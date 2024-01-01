// Mongoose Models
const Project = require("../models/Project");
const Client = require("../models/Client");

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} = require("graphql");

// Client Type
const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },

        // This is how you create the relation between two schemas in GQL
        client: {
            type: ClientType,
            resolve(parent, _args) {
                return Client.findById(parent.clientId);
            },
        },
    }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            async resolve(_parent, _args) {
                return await Project.find();
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            async resolve(_parent, args) {
                return await Project.findById(args.id);
            },
        },
        clients: {
            type: new GraphQLList(ClientType),
            async resolve(_parent, _args) {
                return await Client.find();
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            async resolve(_parent, args) {
                return await Client.findById(args.id);
            },
        },
    },
});

// Mutations
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // Add a client
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(_parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });

                return await client.save();
            },
        },
        // Delete a client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(_parent, args) {
                return await Client.findByIdAndDelete(args.id);
            },
        },
        // Add a project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatus",
                        values: {
                            new: { value: "Not Started" },
                            progress: { value: "In Progress" },
                            completed: { value: "Completed" },
                        },
                    }),
                    defaultValue: "Not Started",
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(_parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });

                return await project.save();
            },
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        // This value has to be unique or it will throw an error
                        name: "ProjectStatusUpdate",
                        values: {
                            new: { value: "Not Started" },
                            progress: { value: "In Progress" },
                            completed: { value: "Completed" },
                        },
                    }),
                },
            },
            async resolve(_parent, args) {
                return await Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    // If it is not there, it will create a new project
                    { new: true }
                );
            },
        },
        // Delete a project
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(_parent, args) {
                return await Project.findByIdAndDelete(args.id);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});
