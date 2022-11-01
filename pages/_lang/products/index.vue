<template lang="pug">
b-container(fluid)
  b-row.p-3
    b-col(md='4')
      div Filtres
    b-col(md='16')
      dataTable(
        perPage='8'
        paginationAlign='right'
        :paginationPills='true'
        :fields='fieldList'
        :items='itemList'
      )
    b-col(md='4')
      b-button.rounded-pill.w-100(variant='primary') Ajouter Panier
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import dataTable from '@/components/dataTable.vue';

export interface Field {
  key: string;
  sortable: boolean;
}

export interface Item {
  id: number;
  product_name: string;
  first_name: string;
  last_name: string;
  price: number;
  phone: string;
}

@Component({
  components: { dataTable },
})
export default class extends Vue {
  fieldList: Field[] = [
    {
      key: 'actions',
      sortable: false,
    },
    {
      key: 'id',
      sortable: true,
    },
    {
      key: 'first_name',
      sortable: true,
    },
    {
      key: 'last_name',
      sortable: true,
    },
    {
      key: 'product_name',
      sortable: true,
    },
    {
      key: 'price',
      sortable: true,
    },
    {
      key: 'phone',
      sortable: true,
    },
  ];

  itemList: Item[] = [
    {
      id: 1,
      product_name: 'Le Classico',
      first_name: 'Dickerson',
      last_name: 'Macdonald',
      price: 12.5,
      phone: '0400/00.00.00',
    },
    {
      id: 2,
      product_name: 'Le Classico',
      first_name: 'Larsen',
      last_name: 'Shaw',
      price: 12.5,
      phone: '0400/00.00.00',
    },
    {
      id: 3,
      product_name: 'Le Classico',
      first_name: 'Geneva',
      last_name: 'Wilson',
      price: 12.5,
      phone: '0400/00.00.00',
    },
    {
      id: 4,
      product_name: 'Le Classico',
      first_name: 'Dickerson',
      last_name: 'Macdonald',
      price: 12.5,
      phone: '0400/00.00.00',
    },
    {
      id: 5,
      product_name: 'Le Classico',
      first_name: 'Larsen',
      last_name: 'Shaw',
      price: 12.5,
      phone: '0400/00.00.00',
    },
    {
      id: 6,
      product_name: 'Le Classico',
      first_name: 'Geneva',
      last_name: 'Wilson',
      price: 12.5,
      phone: '0400/00.00.00',
    },
    {
      id: 7,
      product_name: 'Le Classico',
      first_name: 'Dickerson',
      last_name: 'Macdonald',
      price: 12.5,
      phone: '0400/00.00.00',
    },
    {
      id: 8,
      product_name: 'Le Classico',
      first_name: 'Larsen',
      last_name: 'Shaw',
      price: 12.5,
      phone: '0400/00.00.00',
    },
    {
      id: 9,
      product_name: 'Le Classico',
      first_name: 'Geneva',
      last_name: 'Wilson',
      price: 12.5,
      phone: '0400/00.00.00',
    },
    {
      id: 10,
      product_name: 'Le Classico',
      first_name: 'Dickerson',
      last_name: 'Macdonald',
      price: 12.5,
      phone: '0400/00.00.00',
    },
    {
      id: 11,
      product_name: 'Le Classico',
      first_name: 'Larsen',
      last_name: 'Shaw',
      price: 12.5,
      phone: '0400/00.00.00',
    },
    {
      id: 12,
      product_name: 'Le Classico',
      first_name: 'Geneva',
      last_name: 'Wilson',
      price: 12.5,
      phone: '0400/00.00.00',
    },
  ];
}
</script>

<style lang="scss" scoped></style>
