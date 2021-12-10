//@ts-nocheck
import { USER, APP_ENV  } from '@approbado/server/dist/config'
import { User, Trivia, Category, Level } from '@approbado/server/dist/models'
import bcrypt from 'bcrypt'

export async function seed(knex) {
    if (APP_ENV === 'development') {
        const encryptedPassword = await bcrypt.hash(USER.password, 10);

        // Create user test
        await User.query().insertGraph({
            names: 'Test User',
            user_name: 'test',
            password: encryptedPassword,
            is_registered: true,
            email: 'user@ejemplo.com',
            profile: {}
        })

        await Category.query().insert({
            name: 'Comercio',
        })

        await Level.query().insert({
            name: 'Ambiente',
        })

        const trivia = await Trivia.query().insert({
            name: 'Derecho comercial',
            category_id: 1,
            is_free: 1
        });

        trivia.$relatedQuery('subthemes').insert({
            'name': 'Subtema',
            'duration': 30
        })
    }
};
