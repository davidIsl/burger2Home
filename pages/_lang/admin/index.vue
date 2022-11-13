<template lang="pug">
b-container.p-3(fluid)
  b-row
    b-col(md='4')
      .p-3.content.text-secondary
        h6 Products interface
        ul
          li Menu
          li Burgers
          li fries
          li Drinks
    b-col(md='16')
      .p-3.content.text-secondary
        h3.text-center Listing of our Products
        div
          b-table.bg-gray(
            striped
            outlined
            hover
            borderless
            selectable
            :items='items'
            :fields='fields'
          )
            template(#head(x)='data')
              b-form-checkbox#checkbox-header(
                name='checkbox-header'
                @change='selectAllTableItems($event)'
              ).
            template(#cell(x)='data')
              b-form-checkbox(
                :id='`checkbox-${data.item.app_training_id}`'
                :name='`checkbox-${data.item.app_training_id}`'
                :checked='selectedAllItems'
                @input='selectTableItem($event, data.item.app_training_id)'
              )
          b-pagination(
            :pills='paginationPills'
            v-model='currentPage'
            :size='paginationSize'
            :align='paginationAlign'
            :total-rows='totalRows'
            :per-page='perPage'
            aria-controls='my-table'
          )
    b-col(md='4')
      .p-3.content
        b-button.w-100.button Add
        b-button.w-100.mt-2.button Edit
        b-button.w-100.mt-2.button Delete
</template>
<script lang="ts">
import { Vue } from 'nuxt-property-decorator';
// import { rolesType } from '@/utils/utils';

export default class extends Vue {
  // user: rolesType = rolesType.ADMIN;
  // roleType = rolesType;
  // role = rolesType.NONE;
  fields = [
    {
      key: 'Photos',
      sortable: false,
    },
    {
      key: 'Name',
      sortable: true,
    },
    {
      key: 'Description',
      sortable: false,
    },
    {
      key: 'Price',
      sortable: true,
    },
  ];

  items = [
    {
      Photos: '/img/products/classico.jpg',
      Name: 'Le Classico',
      Description: 'Blablablabla',
      Price: '11',
    },
    {
      Photos: '/img/products/classico.jpg',
      Name: 'Le Classico',
      Description: 'Blablablabla',
      Price: '11',
    },
    {
      Photos: '/img/products/classico.jpg',
      Name: 'Le Classico',
      Description: 'Blablablabla',
      Price: '11',
    },
    {
      Photos: '/img/products/classico.jpg',
      Name: 'Le Classico',
      Description: 'Blablablabla',
      Price: '11',
    },
    {
      Photos: '/img/products/classico.jpg',
      Name: 'Le Classico',
      Description: 'Blablablabla',
      Price: '11',
    },
  ];
}
</script>
<style lang="scss" scoped></style>
