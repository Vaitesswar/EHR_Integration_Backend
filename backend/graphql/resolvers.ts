const Contact = require("../models/contactModel");

module.exports = {
    Query: {
        async getContact(_, {ID}){
            return await Contact.findById(ID);
        },

        async getContacts(){
            return await Contact.find();
        }

    },

    Mutation: {
        async createContact(_, {contactInput: {name,email,phone}}){
            const contact = await Contact.create({
                name, 
                email, 
                phone,
            })

            return contact;
        },

        async deleteContact(_, {ID}){
            const deletedContact = await Contact.findByIdAndDelete(ID)

            return deletedContact;
        },

        async editContact(_, {contactInput:{_id,name,email,phone}}){
            const updatedContact = await Contact.findByIdAndUpdate(_id,
                                                                   {name:name,email:email,phone:phone});
            return updatedContact; 
        }      
    }
}