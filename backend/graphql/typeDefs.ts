const { gql } = require("apollo-server-express");
module.exports = gql`
    type Contact {
        _id: String
        name: String,
        email: String,
        phone: String
    }

    input ContactInput {
        _id: String
        name: String,
        email: String,
        phone: String
    }

    type Query {
        getContact(ID: ID!): Contact!
        getContacts: [Contact]
    }

    type Mutation {
        createContact(contactInput: ContactInput): Contact!
        deleteContact(ID: ID!): Contact!
        editContact(contactInput: ContactInput): Contact!
    } 
`;