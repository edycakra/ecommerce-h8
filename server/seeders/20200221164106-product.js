'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  let data = [
    {
      name: 'Vacation Batman',
      image_url: "https://images.unsplash.com/photo-1538448174498-9956c159edb0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      price: 200000,
      stock: 20
    },
    {
      name: 'Stormtrooper',
      image_url: "https://images.unsplash.com/photo-1472457974886-0ebcd59440cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
      price: 200000,
      stock: 15
    },
    {
      name: 'Benny',
      image_url: "https://images.unsplash.com/photo-1560167016-022b78a0258e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80",
      price: 100000,
      stock: 25
    },
    {
      name: 'Astronaut',
      image_url: "https://images.unsplash.com/photo-1544816565-c199d6f5d2d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      price: 125000,
      stock: 17
    },
    {
      name: 'Superman',
      image_url: "https://images.unsplash.com/photo-1513384312027-9fa69a360337?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
      price: 75000,
      stock: 80
    },
    {
      name: 'Heroic Knight',
      image_url: "https://images.unsplash.com/photo-1484575639045-6a7fb6632f8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      price: 125000,
      stock: 60
    }

  ]
  return queryInterface.bulkInsert('Products', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
