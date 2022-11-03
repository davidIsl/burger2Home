<template lang="pug">
.py-5
  b-container(fluid)
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 TABLE
          a(
            href='https://bootstrap-vue.org/docs/components/table'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/table
          .mt-5
            dataTable(
              perPage='5'
              paginationAlign='left'
              :fields='fieldList'
              :items='itemList'
            )
              template(#cell(actions)='data')
                a.ml-1(:href='data.item.id')
                  b-button(variant='outline-primary' size='sm')
                    font-awesome-icon(icon='edit')
                a.ml-2(:href='data.item.id')
                  b-button(variant='outline-danger' size='sm')
                    font-awesome-icon(icon='trash')
          .mt-5
            dataTable(
              perPage='5'
              paginationAlign='right'
              :fields='fieldList'
              :items='itemList'
            )
              template(#cell(actions)='data')
                a.ml-1(:href='data.item.id')
                  b-button(variant='outline-primary' size='sm')
                    font-awesome-icon(icon='edit')
                a.ml-2(:href='data.item.id')
                  b-button(variant='outline-danger' size='sm')
                    font-awesome-icon(icon='trash')
          .mt-5
            dataTable(
              perPage='5'
              paginationAlign='center'
              paginationSize='sm'
              :fields='fieldList'
              :items='itemList'
            )
              template(#cell(actions)='data')
                a.ml-1(:href='data.item.id')
                  b-button(variant='outline-primary' size='sm')
                    font-awesome-icon(icon='edit')
                a.ml-2(:href='data.item.id')
                  b-button(variant='outline-danger' size='sm')
                    font-awesome-icon(icon='trash')
          .mt-5
            dataTable(
              perPage='10'
              paginationAlign='center'
              paginationSize='lg'
              :paginationPills='true'
              :tableSmall='false'
              :fields='fieldList'
              :items='itemList'
            )
              template(#cell(actions)='data')
                a.ml-1(:href='data.item.id')
                  b-button(variant='outline-secondary' size='md')
                    font-awesome-icon(icon='edit')
                a.ml-2(:href='data.item.id')
                  b-button(variant='outline-darkRed' size='md')
                    font-awesome-icon(icon='trash')
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';
import dataTable from '@/components/dataTable.vue';

export interface Field {
  key: string;
  sortable: boolean;
}

export interface Item {
  id: number;
  age: number;
  first_name: string;
  last_name: string;
  mail: string;
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
      key: 'age',
      sortable: true,
    },
    {
      key: 'mail',
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
      age: 40,
      first_name: 'Dickerson',
      last_name: 'Macdonald',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 2,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 3,
      age: 89,
      first_name: 'Geneva',
      last_name: 'Wilson',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 4,
      age: 40,
      first_name: 'Dickerson',
      last_name: 'Macdonald',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 5,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 6,
      age: 89,
      first_name: 'Geneva',
      last_name: 'Wilson',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 7,
      age: 40,
      first_name: 'Dickerson',
      last_name: 'Macdonald',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 8,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 9,
      age: 89,
      first_name: 'Geneva',
      last_name: 'Wilson',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 10,
      age: 40,
      first_name: 'Dickerson',
      last_name: 'Macdonald',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 11,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 12,
      age: 89,
      first_name: 'Geneva',
      last_name: 'Wilson',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 13,
      age: 40,
      first_name: 'Dickerson',
      last_name: 'Macdonald',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 14,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 15,
      age: 89,
      first_name: 'Geneva',
      last_name: 'Wilson',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 16,
      age: 40,
      first_name: 'Dickerson',
      last_name: 'Macdonald',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 17,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 18,
      age: 89,
      first_name: 'Geneva',
      last_name: 'Wilson',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 19,
      age: 40,
      first_name: 'Dickerson',
      last_name: 'Macdonald',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 20,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 21,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 22,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 23,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 24,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 25,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 26,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 27,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 28,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 29,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 30,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 31,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 32,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 33,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 34,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 35,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 36,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 37,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 38,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 39,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 40,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 41,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
    {
      id: 42,
      age: 21,
      first_name: 'Larsen',
      last_name: 'Shaw',
      mail: 'demo@demo.com',
      phone: '0400/00.00.00',
    },
  ];
}
</script>

<style lang="scss" scoped></style>
