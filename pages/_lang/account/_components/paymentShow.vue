<template lang="pug">
b-container
  b-row
    b-col.py-3.text-center
      h2.mb-5.underline-title {{ $t('pages.account.showPayment.title') }}
      b-row
        b-col.mb-3(v-for='(data, index) in paymentList' :key='index' md='12')
          b-card(
            border-variant='secondary'
            footer-border-variant='secondary'
            footer-text-variant='dark'
            text-variant='dark'
          )
            b-card-text.align-items-center
              .default-payment-icon 
                b-img-lazy(
                  height='30'
                  src='@/assets/img/payment/americanexpress.svg'
                  v-if='data.cardType === "americanexpress"'
                ).
                b-img-lazy(
                  height='30'
                  src='@/assets/img/payment/mastercard.svg'
                  v-if='data.cardType === "mastercard"'
                ).
                b-img-lazy(
                  height='30'
                  src='@/assets/img/payment/visa.svg'
                  v-if='data.cardType === "visa"'
                ).
              .default-payment.bg-primary.text-light(v-if='data.default') {{ $t('pages.account.showPayment.defaultLabel') }}
              .default-payment.bg-secondary(v-if='!data.default')
                a.text-light(href='#') {{ $t('pages.account.showPayment.changeDefaultLabel') }}
              .mt-3
                .text-center {{ data.cardHolder }}
                .text-center {{ data.cardType }} {{ data.cardNumber }} ({{ data.cardExpiration }})
            template(#footer)
              .text-right.w-100
                b-button.ml-2(
                  variant='danger'
                  size='sm'
                  @click='alertConfirmDelete'
                )
                  font-awesome-icon(icon='trash')
      b-row
        b-col
          b-button.mt-1(
            variant='primary'
            block
            @click='changeChild("add-payment")'
          ) {{ $t('pages.account.showPayment.buttonAdd') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';

export interface Payment {
  default: boolean;
  id: string;
  cardHolder: string;
  cardType: string;
  cardNumber: string;
  cardExpiration: string;
}

@Component({
  components: {},
})
export default class extends Vue {
  changeChild(pageName: string) {
    this.$emit('childChange', pageName);
  }

  paymentList: Payment[] = [
    {
      default: true,
      id: '1',
      cardHolder: 'Westhoven Maxime',
      cardType: 'mastercard',
      cardNumber: '**** **** **** 8521',
      cardExpiration: '10/2028',
    },
    {
      default: false,
      id: '2',
      cardHolder: 'Westhoven Maxime',
      cardType: 'visa',
      cardNumber: '**** **** **** 7106',
      cardExpiration: '11/2024',
    },
    {
      default: false,
      id: '3',
      cardHolder: 'Westhoven Maxime',
      cardType: 'americanexpress',
      cardNumber: '**** **** **** 2751',
      cardExpiration: '02/2032',
    },
  ];

  alertConfirmDelete() {
    this.$swal({
      title: this.$tc('swal.confirmDelete.title'),
      text: this.$tc('swal.confirmDelete.text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7479f3',
      cancelButtonColor: '#6c757d',
      confirmButtonText: this.$tc('swal.confirmDelete.confirButton'),
      cancelButtonText: this.$tc('swal.confirmDelete.cancelButton'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.$swal(
          this.$tc('swal.confirmDelete.nextTitle'),
          this.$tc('swal.confirmDelete.nextText'),
          'success'
        );
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.default-payment-icon {
  position: absolute;
  top: 3px;
  left: 3px;
}

.default-payment {
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px 4px;
  font-size: 12px;
  border-radius: 0px 3px 0px 3px;
}

.card-footer {
  padding: 8.5px;
}
</style>
