const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Task",
    tableName: "task",
    columns: {
        id: {
            primary: true,
            type: "bigint",
            generated: true
        },

        title: {
            type: "varchar",
        },

        description: {
            type: "text",
        },

        endingAt: {
            type: "date",
        },

        createdAt:{
            type: "datetime"
        },

        updatedAt:{
            type: "datetime"
        },

        priority:{
            type: "varchar",
        },

        status:{
            type: "varchar",
        },
    },
    relations: {
        creator: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            cascade: true
        },
        responsible: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            cascade: true
        }
    }
});