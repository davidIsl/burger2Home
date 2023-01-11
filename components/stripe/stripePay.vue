<template lang="pug">
b-container(fluid)
  b-row
    b-col.mxauto(offset-md='2' md='20')
      .content.payment-simple.p-3
        b-row
          b-col(md='20')
            .p-3
              label(label-for card-number-element) Number CArd
              #card-number-element.p-2.w-25.bg-primary
              label.mt-2(label-for card-expiry-element) Validity Date
              #card-expiry-element.p-2.w-25.bg-primary
              label.mt-2(label-for card-cvc-element) CVC number
              #card-cvc-element.p-2.w-25.bg-primary
              #card-error.p-2.w-25
        b-row
          b-col.mx-auto.mt-2(md='20')
            b-button.button(@click='payOrder') PAY ORDER
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
// import { API } from '~/utils/javaBack';
// import { StripeElements, StripeElement } from 'vue-stripe-elements-plus';

declare let Stripe: any;

@Component({
  components: {},
})
export default class StripePayments extends Vue {
  // @Prop() addressId!: string;
  // @Prop() basketId!: number;

  stripe: any = null;
  elements: any = null;
  cardNumberElement: any = null;
  cardExpiryElement: any = null;
  cardCVCElement: any = null;
  stripeKey: string =
    'pk_test_51MNONxJptiWzEvlCEgYGUCW5vv20z8MQv0bqrKkegOEYupFQRNAf5TfRZX39I0pMXVyCUI8v5pwf97ji8gddNNVS00xOOaY1nw';

  // instanceOptions = {
  //   // secretKey: ( =
  //   //   'sk_test_51MNONxJptiWzEvlCzOqMeW8bE7cIIgiePqskj8O4nB8W2AjWakkyDmvoWcmHnEl4sdWzg9sNZpNFehOZcXOZMEcG00EAqimSVp'),
  // };

  // elementsOptions = this.stripe.create('payment');
  // cardOptions = {};
  options = {
    pk: process.env.PUBLIC_STRIPE_KEY,
  };

  mounted() {
    // loadStripe(this.stripeKey);
    // elements = stripe.elements();
    this.initStripe();
    this.createMountElement();
  }

  initStripe() {
    // Vue.use(StripeElements, this.options);
    this.stripe = Stripe(this.stripeKey);
    // const options =
    // const elements = this.stripe.elements();
  }

  createMountElement() {
    this.elements = this.stripe.elements();

    this.cardNumberElement = this.elements.create('cardNumber');
    this.cardNumberElement.mount('#card-number-element');

    this.cardExpiryElement = this.elements.create('cardExpiry');
    this.cardExpiryElement.mount('#card-expiry-element');

    this.cardCVCElement = this.elements.create('cardCvc');
    this.cardCVCElement.mount('#card-cvc-element');
  }
  // pay() {
  //   // const groupComponent = this.$refs.elms;
  //   // const cardComponent = this.$refs.card;
  //   // const cardElement = cardComponent.StripeElement;
  // }

  payOrder() {
    console.log('PAY ORDER');
    console.log('card number', this.cardNumberElement);

    this.$emit('handleChangeStripe', this.stripe, this.elements);
    // const addId = parseInt(this.addressId);
    // console.log('thisADRESS', this.addressId);

    // console.log('ADDID', addId);
    // console.log('BASKET', this.basketId);
    // this.cardNumberElement = this.elements.getElement(carNumber);
    // console.log('ELEMENT STRIPE', this.cardNumberElement);

    // const response = await API.addOrder(this.basketId, addId);

    // if (response.status !== 200) {
    //   return;
    // }

    // console.log('ORDER CREATED');
  }
}
</script>
<style scoped lang="scss">
.styleBox {
  background: var(--primary);
}
</style>
