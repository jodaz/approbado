//@ts-nocheck
import { USER } from '@approbado/server/dist/config'
import { User } from '@approbado/server/dist/models'
import bcrypt from 'bcrypt'

export async function seed(knex) {
  const encryptedPassword = await bcrypt.hash(USER.password, 10);

  // Deletes ALL existing entries
  return knex('users').del()
        .then(async function () {
            // Inserts seed entries
            await User.query().insert({
                ...USER,
                user_name: 'admin',
                password: encryptedPassword,
                rol: 'Administrador',
                is_registered: false
            })
        });
};
