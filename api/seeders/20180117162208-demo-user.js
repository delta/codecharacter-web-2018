'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
        {
          name: 'lpg',
          password: '$2a$10$HeJxlmueXdrD5XrEgGubbu5m0yoy0pGVrTK4yzLzvPVBi0uN0Udzu',//lpg,
          email:'lpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 0,
          is_active: 1
        },
        {
          name: 'lpg1',
          password: '$2a$10$UQoqZGg0nPpau2taEX2Y8e7UmCzX0XFiL7g5QQUi/LvK/QP2LXH/K',//lpg1,
          email:'lpg1',
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 0,
          is_active: 1
        }
      ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
