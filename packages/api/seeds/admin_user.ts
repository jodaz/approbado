//@ts-nocheck
import Knex from 'knex'
import { USER } from '../config'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          names: USER.name,
          email: USER.email,
          password: USER.password,
          rol: 'Administrador',
        },
      ]);
    });
};
