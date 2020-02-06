const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    member: (root, args, context, info) => {
      return context.prisma.member({_id: args.id})
    },
    policy: (root, args, context, info) => {
      return context.prisma.policy({_id: args.id})
    },
  },
  Member: {
    policies: (parent, args, context, info) => {
      console.log(parent)
      return parent.policies
    },
  },
  // Mutation: {
  //   post: (root, args, context) => {
  //     return context.prisma.createLink({
  //       url: args.url,
  //       description: args.description,
  //     })
  //   },
  // },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))