// const stripe = require('stripe')('sk_test_51MTmafDHQYxS5moDceswDKdcVWRG2PS8wPfK1uXi2kqsBhskX8fjARuubnvkqxaR5ZK0pvnQkc3KHGjZLgQRDFFf00HumTvjyf');
const stripe = require('stripe')(process.env.STRIPE_KEY);

'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order',({strapi})=>({
  async create(ctx){
    const {products} = ctx.request.body;
    // console.log(products);
    const lineItems = await Promise.all(
      products?.map(async (product)=>{
        const item = await strapi.service('api::product.product').findOne(product.id);
        // console.log(item);
        return{
          price_data:{
            currency: 'usd',
            product_data:{
              name: item.title,
            },
            unit_amount: item.price*100,
          },
          quantity: product.quantity,
          // quantity: 13,
        };
      })
    );

    // console.log(lineItems);

    try{
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        // success_url: `http://localhost:3000?success=true`,
        // cancel_url: `http://localhost:3000?success=false`,
        success_url: `${process.env.CLIENT_URL}?success=true`,
        cancel_url: `${process.env.CLIENT_URL}?success=false`,
        line_items: lineItems,
        shipping_address_collection: {allowed_countries: ['US','CA']},
        payment_method_types: ['card'],
      });

      // console.log(session);

      await strapi.service('api::order.order').create({data:{
        products, stripeId: session.id,
        // products,
      }})

      return {stripeSession:session}

    }catch(err){
      ctx.response.status = 500;
      return err;
    }
  }
}));
