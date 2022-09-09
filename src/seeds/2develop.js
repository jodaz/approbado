//@ts-nocheck
import { USER, APP_ENV  } from '../config'
import { User, Trivia, Category, Level, Plan } from '../models'
import bcrypt from 'bcrypt'

export async function seed(knex) {
    if (APP_ENV === 'development') {
        const encryptedPassword = await bcrypt.hash(USER.password, 10);

        // Create user test
        const user1 = await User.query().insertGraph({
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

        const user = await User.query().insertGraph({
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

        await trivia.$relatedQuery('awards').insert({
            'file' : 'public/insignia_bronce.svg',
            'icon_winner'  : 'public/insignia_bronce.svg',
            'title'   : 'Bronce',
            'min_points' : 300,
            'type' : 'insignia'
        })

        await trivia.$relatedQuery('subthemes').insert({
            'name': 'Subtema',
            'duration': 30
        })

        const plan = await Plan.query().insert({
            name: 'Approbado free',
            duration: 0,
            amount: 0,
            trivias_in_teams: 0
        });

        const payment1 = await user.$relatedQuery('payments').insert({
            payment_method: 'none',
            amount: 0,
            plan_id : 1,
            user_id : user.id
        })

        const payment = await user1.$relatedQuery('payments').insert({
            payment_method: 'none',
            amount: 0,
            plan_id : 1,
            user_id : user.id
        })

        await user.$relatedQuery('memberships').insert({
            plan_id: 1,
            user_id: user.id,
            payment_id : payment.id,
            active : true
        })

        await user1.$relatedQuery('memberships').insert({
            plan_id: 1,
            user_id: user1.id,
            payment_id : payment1.id,
            active : true
        })

        await trivia.$relatedQuery('plans').relate(plan)
    }
};
