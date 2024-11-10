import { Membership, Payment, Plan, User } from '../models'
import { paginatedQueryResponse } from '../utils'
import { PDF, STRIPE_KEY } from '../config'
import path from 'path'
import Stripe from 'stripe'

const stripe = new Stripe(STRIPE_KEY);

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = Payment.query()
            .withGraphFetched('[user,plan]')

        if (filter) {
            if (filter.global_search) {
                query.where('payment_method', 'ilike', `%${filter.global_search}%`)
            }
        }

        if (sort && order) {
            switch (sort) {
                case 'user.email':
                    break;
                case 'plan.name':
                    break;
                default:
                    query.orderBy(sort, order);
                    break;
            }
        }

        return paginatedQueryResponse(query, req, res)
    } catch (error) {
        console.log(error)

        return res.status(500).json(error)
    }
}

export const download = async (req, res) => {
    try {
        const { from, to, payment_method } = req.query.filter;

        const query = await Payment.query().withGraphFetched('[user,plan]')
            .where('created_at', from)
            .where('created_at', to)
            .where('payment_method', payment_method)

        const pdfFilePath = path.resolve(__dirname, '../../public/reports/pagos.pdf');
        const templateFilePath = path.resolve(__dirname, '../resources/pdf/reports/memberships.pug')

        const compilerParams = {
            records: query,
            total: '0.00',
            title: 'Reporte de pagos'
        }

        await PDF(
            compilerParams,
            templateFilePath,
            pdfFilePath
        );

        return res.download(pdfFilePath)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const createSuscription = async (req, res) => {
    const { planId } = req.body;
    const { id: currUserId } = req.user;

    const user = await User.query().findById(currUserId)
    const plan = await Plan.query().findById(planId)

    try {
        const customer = await stripe.customers.create({
            email: user.email,
        });

        // Create a subscription
        const stripePlan = await stripe.plans.create({
            amount: plan.amount * 100, // Amount in cents
            currency: 'usd',
            interval: 'month', // Adjust the interval as needed
            product: {
                name: plan.name,
            },
        });

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{
                plan: stripePlan.id, // Use the newly created plan ID
            }],
            trial_end: Math.floor(Date.now() / 1000) + (plan.duration * 24 * 60 * 60), // Set trial end based on duration
        });

        await Payment.query().insert({
            user_id: currUserId,
            amount: plan.amount, // Amount in cents
            payment_method: 'Stripe',
            plan_id: plan.id
        });

        await Membership.query().insert({
            active: true,
            plan_id: plan.id,
            user_id: user.id
        })

        res.status(200).json({ subscription });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export const cancelSuscription = async (req, res) => {
    const { subscriptionId } = req.body;
    return res.status(200).json({ success: true });

    // try {
    //     await stripe.subscriptions.del(subscriptionId);

    //     res.status(200).json({ success: true });
    // } catch (error) {
    //     res.status(400).json({ error: error.message });
    // }
}
