//@ts-nocheck
import { USER, APP_ENV  } from '@approbado/server/dist/config'
import { User, Trivia, Category, Level, Plan } from '@approbado/server/dist/models'
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
            bio: 'Hola soy Matías y soy estudiante de segundo de Derecho en la Universidad de Chile. Me gusta el campo de Derecho político, así que... vamos a darle!',
            profile: {
                ocupation: 'Estudiante de derecho',
                summary: 'Hola soy Matías y soy estudiante de segundo de Derecho en la Universidad de Chile. Me gusta el campo de Derecho político, así que... vamos a darle!',
                linkedin: 'username',
                twitter: 'username'
            }
        })

        await User.query().insertGraph({
            names: 'OtroUsuario',
            user_name: 'otrousuario',
            password: encryptedPassword,
            is_registered: true,
            email: 'user@ejemplo2.com',
            bio: 'Hola soy otro usuario',
            profile: {
                ocupation: 'Estudiante de arte',
                summary: 'Hola soy otro usuario',
                twitter: 'username',
            }
        })

        await Category.query().insert({
            name: 'Derecho comercial',
        })

        await Level.query().insert({
            name: 'Básico',
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

        const plan = await Plan.query().insert({
            name: 'Approbado free',
            duration: 0,
            amount: 0
        });

        trivia.$relatedQuery('plans').relate(plan)
    }
};
