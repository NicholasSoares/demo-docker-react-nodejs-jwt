'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('products',
      [
          {
              "name" : "teste 1",
              "price" : 1000,
              "is_perishable" : false,
              "manufactured_at" : "2020-09-30T05:07:54.528Z"
          },
          {
              "name" : "teste 2",
              "price" : 2000,
              "is_perishable" : true,
              "void_at" : "2024-09-30T05:07:54.528Z",
              "manufactured_at" : "2020-09-30T05:07:54.528Z"
          },
          {
              "name" : "teste 3",
              "price" : 3000,
              "is_perishable" : true,
              "void_at" : "2023-09-30T05:07:54.528Z",
              "manufactured_at" : "2020-09-30T05:07:54.528Z"
          },
          {
              "name" : "teste 4",
              "price" : 4000,
              "is_perishable" : true,
              "void_at" : "2022-09-30T05:07:54.528Z",
              "manufactured_at" : "2020-09-30T05:07:54.528Z"
          },
          {
              "name" : "teste 5",
              "price" : 5000,
              "is_perishable" : true,
              "void_at" : "2021-09-30T05:07:54.528Z",
              "manufactured_at" : "2020-09-30T05:07:54.528Z"
          },
          {
              "name" : "teste 6",
              "price" : 6000,
              "is_perishable" : true,
              "void_at" : "2023-09-30T05:07:54.528Z",
              "manufactured_at" : "2020-09-30T05:07:54.528Z"
          },
          {
              "name" : "teste 7",
              "price" : 7000,
              "is_perishable" : true,
              "void_at" : "2024-09-30T05:07:54.528Z",
              "manufactured_at" : "2019-09-30T05:07:54.528Z"
          },
          {
              "name" : "teste 8",
              "price" : 8000,
              "is_perishable" : true,
              "void_at" : "2024-08-30T05:07:54.528Z",
              "manufactured_at" : "2018-09-30T05:07:54.528Z"
          },
          {
              "name" : "teste 9",
              "price" : 9000,
              "is_perishable" : true,
              "void_at" : "2024-07-30T05:07:54.528Z",
              "manufactured_at" : "2019-09-30T05:07:54.528Z"
          },
          {
              "name" : "teste 10",
              "price" : 1000,
              "is_perishable" : true,
              "void_at" : "2023-05-30T05:07:54.528Z",
              "manufactured_at" : "2021-09-30T05:07:54.528Z"
          },
          {
              "name" : "teste 11",
              "price" : 11000,
              "is_perishable" : true,
              "void_at" : "2026-01-30T05:07:54.528Z",
              "manufactured_at" : "2021-09-30T05:07:54.528Z"
          },
          {
              "name" : "teste 12",
              "price" : 12000,
              "is_perishable" : true,
              "void_at" : "2027-08-30T05:07:54.528Z",
              "manufactured_at" : "2019-09-30T05:07:54.528Z"
          },
          {
              "name" : "teste 13",
              "price" : 13000,
              "is_perishable" : false,
              "manufactured_at" : "2021-09-30T05:07:54.528Z"
          },
          {
              "name" : "teste 14",
              "price" : 14000,
              "is_perishable" : false,
              "manufactured_at" : "2020-09-30T05:07:54.528Z"
          }
      ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('products', null, {}),
};
