const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
  Query: {
    member: (root, args, ctx) => ctx.prisma.member({ _id: args.id }),
    policy: (root, args, ctx) => ctx.prisma.policy({ _id: args.id }),
    group: (root, args, ctx) => ctx.prisma.group({ _id: args.id }),
    company: (root, args, ctx) => ctx.prisma.company({ _id: args.id })
  },
  Member: {
    policies: (parent, args, ctx) =>
      ctx.prisma.member({ _id: parent._id }).policies(),
    beneficiaryOf: (parent, args, ctx) =>
      ctx.prisma.member({ _id: parent._id }).beneficiaryOf()
  },
  Policy: {
    groupContract: (parent, args, ctx) =>
      ctx.prisma.policy({ _id: parent._id }).groupContract(),
    subscriber: (parent, args, ctx) =>
      ctx.prisma.policy({ _id: parent._id }).subscriber(),
    beneficiaries: (parent, args, ctx) =>
      ctx.prisma.policy({ _id: parent._id }).beneficiaries()
  },
  Group: {
    company: (parent, args, ctx) =>
      ctx.prisma.group({ _id: parent._id }).company(),
    policies: (parent, args, ctx) =>
      ctx.prisma.group({ _id: parent._id }).policies()
  },
  Company: {
    groupContracts: (parent, args, ctx) =>
      ctx.prisma.company({ _id: parent._id }).groupContracts()
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
