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
            type: "varchar",
            select: false
        },

        password:{
            type: "varchar",
            select: false
        },

    },
    relations: {
        owner: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            //joinColumn: true,
        },

        worker: {
            target: "User",
            type: "one-to-many",
            joinTable: true,
            inverseSide: 'owner',
            //joinColumn: "id",
        },

        responsible: {
            target: "Task",
            type: "one-to-many",
            joinTable: true,
            inverseSide: 'responsible',
        }
    }
});