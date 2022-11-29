<template lang="pug">
b-container.p-4.bg-gray(fluid)
  b-row.line.pb-3
    b-col(md='18')
      h2.pb-2.text-secondary.text-center.text-sm-left {{ $t('pages.history.title1') }}

    b-col.mt-2(md='6')
      span.text-secondary {{ $t('pages.history.text1' + ' David') }}
      //- b-button.button.my-2 {{ $t('pages.history.button1') }}
  b-row.pt-3
    b-col
      h2.text-center {{ $t('pages.history.title2') }}
  b-row
    b-col.pt-3(offset-lg='2' lg='20')
      .p-3.content.text-secondary
        .m-2
          b-table(
            hover
            borderless
            responsive
            table-variant='secondary'
            :items='ordersInProgress'
            :fields='fields'
          )
            //- template(#head(x)='data')
            //-   b-form-checkbox#checkbox-header(
            //-     name='checkbox-header'
            //-     @change='selectItems($event)'
            //-   )
            template(#cell(image)='data')
              b-img(:src='data.item.image' width='40' height='40')
            template(#cell(details)='data')
              font-awesome-icon.mt-1(
                :icon='["fa", "eye"]'
                @click='openDetails(data.item)'
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
  .p-2
    b-row
      b-col.pb-3.text-center.text-md-left(
        :offset-lg='filters ? "0" : "2"'
        :md='filters ? "18" : "16"'
      )
        h2.text-secondary {{ $t('pages.history.title3') }}
      //- b-col.pb-3.text-center(md='6')
      //-   b-button.button.w-100(:to='`/${$i18n.locale}/admin/productsAdd/`') {{ $t('pages.admin.button1') }}
    b-row
      b-col(:offset-lg='filters ? "0" : "2"' :md='filters ? "18" : "16"')
        b-form-input.input(
          v-model='filterSearch'
          :placeholder='$t("pages.history.placeholder1")'
        )
      b-col.mt-3.mt-md-0(md='6')
        b-button.button.w-100(variant='secondary' @click='filters = !filters') {{ $t('pages.filters') }}
    b-row
      b-col.mt-3(v-if='filters' lg='4')
        filters
      b-col.mt-3(:offset-lg='filters ? "0" : "2"' lg='20')
        .p-3.content.text-secondary
          .m-2
            b-table(
              hover
              borderless
              responsive
              table-variant='secondary'
              :items='ordersList'
              :fields='fields'
            )
              template(#head(x)='data')
                b-form-checkbox#checkbox-header(
                  name='checkbox-header'
                  @change='selectItems($event)'
                )
              template(#cell(x)='data')
                b-form-checkbox(v-model='itemSelected')
              template(#cell(image)='data')
                b-img(:src='data.item.image' width='40' height='40')
              template(#cell(details)='data')
                font-awesome-icon.mt-1(
                  :icon='["fa", "eye"]'
                  @click='openDetails(data.item)'
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
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    cancel-variant='secondary'
    v-if='viewOrderInProgress'
    v-model='viewOrderInProgress'
    right
  )
    template(#modal-title)
      b-container
        h3.text-secondary Order of {{ currentOrder.date }}
    //- template(#modal-footer)
    //-   .border.p-2
    //-     font-awesome-icon(:icon='["fa", "minus"]')
    //-     p.d-inline.my-3 {{ numberToAdd }}
    //-     font-awesome-icon(:icon='["fa", "plus"]')
    //-   b-button.button {{ $t('pages.products.button1') }}
    b-container
      h4.text-secondary.text-center {{ currentOrder.status }}
      p.text-modal {{ currentOrder.price }}
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
// import { rolesType } from '@/utils/utils';
import filters from '@/components/global/filters.vue';
import { Order } from '@/utils/utils';

@Component({
  components: {
    filters,
  },
})
export default class extends Vue {
  filters: boolean = false;
  filterSearch: string = '';
  viewOrder: boolean = false;
  viewOrderInProgress: boolean = false;
  itemSelected: boolean = false;

  currentOrder: Order | null = null;
  // ordersList: Orders[] = [];
  // ordersInProgress: Orders[] = [];

  fields = [
    {
      key: 'x',
      sortable: false,
    },

    {
      key: 'date',
      sortable: false,
    },
    {
      key: 'price',
      sortable: true,
    },
    {
      key: 'status',
      sortable: false,
    },
    {
      key: 'Details',
      sortable: false,
    },
  ];

  ordersList: Order[] = [
    {
      date: new Date('2022-11-27'),
      price: 42,
      status: 'delivered',
    },
    {
      date: new Date('2022-11-27'),
      price: 42,
      status: 'delivered',
    },
    {
      date: new Date('2022-11-27'),
      price: 42,
      status: 'delivered',
    },
    {
      date: new Date('2022-11-27'),
      price: 42,
      status: 'delivered',
    },
  ];

  ordersInProgress: Order[] = [
    {
      date: new Date('2022-11-27'),
      price: 42,
      status: 'validated',
    },
  ];

  openDetails(order: any) {
    this.viewOrderInProgress = true;
    this.currentOrder = order;
  }
}
</script>
<style scoped lang="scss">
.line {
  border-bottom: 1px solid #d6c385;
}
</style>
