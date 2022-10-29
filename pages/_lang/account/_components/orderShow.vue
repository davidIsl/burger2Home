<template lang="pug">
b-container.h-100
  b-row.h-100.align-items-center
    b-col.py-3.text-center
      h2.mb-5.underline-title {{ $t('pages.account.showOrders.title') }}
      b-row
        b-col
          dataTable(
            perPage='5'
            head-variant='primary'
            foot-variant='primary'
            paginationSize='sm'
            :fields='fieldList'
            :items='itemList'
          )
            template(#cell(amount)='data')
              span {{ data.item.amount }} € {{ $t('pages.account.showOrders.VAT') }}
            template(#cell(payment_methode)='data')
              .mt-2
                b-img-lazy(
                  height='30'
                  src='@/assets/img/payment/americanexpress.svg'
                  v-if='data.item.payment_methode === "americanexpress"'
                ).
                b-img-lazy(
                  height='30'
                  src='@/assets/img/payment/apple-pay.svg'
                  v-if='data.item.payment_methode === "apple-pay"'
                ).
                b-img-lazy(
                  height='30'
                  src='@/assets/img/payment/bancontact.svg'
                  v-if='data.item.payment_methode === "bancontact"'
                ).
                b-img-lazy(
                  height='30'
                  src='@/assets/img/payment/bank-transfer.svg'
                  v-if='data.item.payment_methode === "bank-transfer"'
                ).
                b-img-lazy(
                  height='20'
                  src='@/assets/img/payment/google-pay.svg'
                  v-if='data.item.payment_methode === "google-pay"'
                ).
                b-img-lazy(
                  height='30'
                  src='@/assets/img/payment/maestro.svg'
                  v-if='data.item.payment_methode === "maestro"'
                ).
                b-img-lazy(
                  height='30'
                  src='@/assets/img/payment/mastercard.svg'
                  v-if='data.item.payment_methode === "mastercard"'
                ).
                b-img-lazy(
                  height='30'
                  src='@/assets/img/payment/paypal.svg'
                  v-if='data.item.payment_methode === "paypal"'
                ).
                b-img-lazy(
                  height='30'
                  src='@/assets/img/payment/store-payment.svg'
                  v-if='data.item.payment_methode === "store-payment"'
                ).
                b-img-lazy(
                  height='30'
                  src='@/assets/img/payment/visa.svg'
                  v-if='data.item.payment_methode === "visa"'
                ).
            template(#cell(actions)='data')
              .mt-2
                a.ml-1(:href='data.item.ref')
                  b-button(variant='outline-primary' size='sm')
                    font-awesome-icon(icon='search')
                a.ml-1(:href='data.item.ref')
                  b-button(variant='outline-primary' size='sm')
                    font-awesome-icon(icon='file-pdf')
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';
import dataTable from '@/components/dataTable.vue';

export interface Field {
  key: string;
  label: string;
  sortable: boolean;
  class?: string;
}

export interface Item {
  ref: number;
  date: string;
  amount: number;
  payment_methode: string;
  status: string;
}

@Component({
  components: { dataTable },
})
export default class extends Vue {
  fieldList: Field[] = [
    {
      key: 'ref',
      label: this.$tc('pages.account.showOrders.field1'),
      sortable: true,
      class: 'text-center table-font-size text-primary',
    },
    {
      key: 'date',
      label: this.$tc('pages.account.showOrders.field2'),
      sortable: true,
      class: 'text-center table-font-size',
    },
    {
      key: 'amount',
      label: this.$tc('pages.account.showOrders.field3'),
      sortable: true,
      class: 'text-center table-font-size',
    },
    {
      key: 'payment_methode',
      label: this.$tc('pages.account.showOrders.field4'),
      sortable: true,
      class: 'text-center table-font-size',
    },
    {
      key: 'status',
      label: this.$tc('pages.account.showOrders.field5'),
      sortable: true,
      class: 'text-center table-font-size',
    },
    {
      key: 'actions',
      label: this.$tc('pages.account.showOrders.field6'),
      sortable: false,
    },
  ];

  itemList: Item[] = [
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'americanexpress',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'apple-pay',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'bancontact',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'bank-transfer',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'google-pay',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'maestro',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'mastercard',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'paypal',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'store-payment',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'visa',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'americanexpress',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'apple-pay',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'bancontact',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'bank-transfer',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'google-pay',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'maestro',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'mastercard',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'paypal',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'store-payment',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'visa',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'americanexpress',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'apple-pay',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'bancontact',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'bank-transfer',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'google-pay',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'maestro',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'mastercard',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'paypal',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'store-payment',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'visa',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'americanexpress',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'apple-pay',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'bancontact',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'bank-transfer',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'google-pay',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'maestro',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'mastercard',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'paypal',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'store-payment',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'visa',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'americanexpress',
      status: 'Annulé',
    },
    {
      ref: 400368,
      date: '2020-06-07 10:44',
      amount: 89.95,
      payment_methode: 'visa',
      status: 'Annulé',
    },
  ];
}
</script>

<style lang="scss" scoped>
.btn-sm {
  font-size: 12px !important;
  padding: 2px 5px !important;
}
.btn-md {
  font-size: 15px !important;
  padding: 1.5px 7px !important;
}
</style>
