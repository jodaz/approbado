//@ts-nocheck
import { USER } from '../config'
import { User, ReportReason } from '../models'
import bcrypt from 'bcrypt'

const reasons = [
    'No me interesa este tipo de publicaciones',
    'No es académico',
    'Expresa intenciones de discriminación'
];

export async function seed(knex) {
  const encryptedPassword = await bcrypt.hash(USER.password, 10);
  await knex('report_reasons').del()
    .then(async function () {
        const data = await reasons.map(item => ({ item: item }))

        await ReportReason.query().insert(data)
  });

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
