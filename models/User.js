const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "User",
    tableName: "user",
    columns: {
        id: {
            primary: true,
            type: "bigint",
            generated: true
        },

        firstName: {
            type: "varchar",
        },

        secondName: {
            type: "varchar",
        },

        // отчество
        middleName: {
            type: "varchar",
        },

        login:{
            type: "varchar"
        },

        password:{
            type: "varchar"
        },

    },
    relations: {
        owner: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            cascade: true
        },

        workers: {
            target: "User",
            type: "one-to-many",
            joinTable: true,
            cascade: true
        },

        responsible: {
            target: "Task",
            type: "one-to-many",
            joinTable: true,
            cascade: true
        }
    }
});