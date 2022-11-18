<template lang="pug">
b-container.p-3.bg-gray(fluid)
  b-row
    b-col.mt-3(lg='4')
      .p-3.content.text-secondary
        h6 Products interface
        ul
          li Menu
          li Burgers
          li fries
          li Drinks
    b-col.mt-3(lg='16')
      .p-3.content.text-secondary
        h3.text-center Listing of our Products
        div
          b-table(
            hover
            borderless
            responsive
            table-variant='secondary'
            :items='items'
            :fields='fields'
          )
            template(#head(x)='data')
              b-form-checkbox#checkbox-header(name='checkbox-header').
            template(#cell(x)='data')
              b-form-checkbox(:checked='selectedAllItems')
            template(#cell(details)='data')
              font-awesome-icon.mt-1(
                :icon='["fa", "eye"]'
                @click='openDetails((this.items.id = 1))'
              )

          b-pagination(
            pills='pills'
            size='sm'
            v-model='currentPage'
            :total-rows='totalRows'
            :per-page='perPage'
            aria-controls='my-table'
            align='right'
          )
    b-col.mt-3(lg='4')
      .p-3.content
        b-button.button.test.d-block.mx-auto(
          :to='`/${$i18n.locale}/admin/productsAdd/`'
        ) {{ $t('pages.admin.button1') }}
        b-button.mt-2.button.test.d-block.mx-auto(
          :to='`/${$i18n.locale}/admin/productsEdit/`'
        ) {{ $t('pages.admin.button2') }}
        b-button.mt-2.button.test.d-block.mx-auto {{ $t('pages.admin.button3') }}
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
      key: 'x',
      sortable: false,
    },
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
    {
      key: 'details',
      sortable: false,
    },
  ];

  items = [
    {
      id: '1',
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

  openDetails(id: number) {
    console.log(id);
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/bt-custom.scss';

.test {
  width: 100%;
  // @include for-phone-only {
  //   width: 50%;
  // }
  @include for-tablet-only {
    width: 50%;
  }
  @include for-md-desktop-only {
    width: 40%;
  }
  // @include for-xl-desktop-only {
  //   width: 50%;
  // }
}
</style>
