<template lang="pug">
b-container(fluid)
  b-row
    b-col
      .content.payment-simple.p-4
        b-row
          b-col.pl-4
            h3.title.line.text-secondary Enter your card information
        b-row
          b-col.mt-3.pl-4
            Card.p-3.stripe-card.text-primary.form-control(:stripe='stripeKey')

        b-row
          b-col.mt-3.pl-4
            b-button.button(@click='payOrder') {{ $t('pages.basket.stripe.button1') }} {{ this.$store.state.baskets.totalPrice }}€
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import {
  Card,
  CardElement,
  createPaymentMethod,
} from 'vue-stripe-elements-plus';

declare let Stripe: any;

@Component({
  components: { Card, CardElement, createPaymentMethod },
})
export default class StripePayments extends Vue {
  stripe: any = null;
  elements: any = null;
  paymentCard: any = null;
  stripeKey: string =
    'pk_test_51MNONxJptiWzEvlCEgYGUCW5vv20z8MQv0bqrKkegOEYupFQRNAf5TfRZX39I0pMXVyCUI8v5pwf97ji8gddNNVS00xOOaY1nw';

  options = {
    pk: process.env.PUBLIC_STRIPE_KEY,
  };

  mounted() {
    this.initStripe();
  }

  initStripe() {
    this.stripe = Stripe(this.stripeKey);
    this.elements = this.stripe.elements();
  }

  async payOrder() {
    const data = await createPaymentMethod('card', {});
    if (data.paymentMethod !== 'undefined' || data.paymentMethod !== null) {
      const paymentMethod = data.paymentMethod;
      this.paymentCard = {
        id: paymentMethod.id,
        expMonth: paymentMethod.card.exp_month,
        expYear: paymentMethod.card.exp_year,
        brand: paymentMethod.card.brand,
        default: paymentMethod.card.default,
        last4: paymentMethod.card.last4,
      };

      this.$emit('handleChangeStripe', paymentMethod);
    } else {
      console.log('ERROR CHAMP VIDE');
    }
  }
}
</script>
<style scoped lang="scss">
.styleBox {
  background: var(--primary);
}
.stripe-card {
  border: 1px solid grey;
  width: 400px;
}
.stripe-card.complete {
  border-color: green;
}
</style>
