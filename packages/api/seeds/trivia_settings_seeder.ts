//@ts-nocheck
import Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  return knex('trivia_settings').del()
    .then(function () {
      // Inserts seed entries
      return knex('trivia_settings').insert([
        {
          'grant_certification': false,
          'time_limit': 30
        },
      ]);
    });
};
