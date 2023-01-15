<template lang="pug">
b-container.p-4.bg-gray(fluid)
  b-row
    b-col.mx-auto(lg='18')
      b-row.line.pb-3
        b-col.text-left(md='18')
          h2.pb-2.text-secondary {{ $t('pages.history.title1') }}

        //- b-col.mt-2(md='6')
          span.text-secondary {{ $t('pages.history.text1') }} {{ this.$store.state.users.currentUser.firstname }}
          //- b-button.button.my-2 {{ $t('pages.history.button1') }}
  b-row.pt-3
    b-col.pb-2.text-left.mx-auto(lg='18')
      h2.text-secondary {{ $t('pages.history.title2') }}
  b-row
    b-col.pt-3.mx-auto(lg='18')
      .p-3.content.text-secondary
        .m-2
          b-table(
            hover
            borderless
            responsive
            head-row-variant='darkRed'
            table-variant='gray'
            :current-page='currentPageInProgress'
            :perPage='perPage'
            :items='orderInProgress'
            :fields='fields'
          )
            template(#head(orderDate)='data')
              p {{ $t('pages.history.table.date') }}
            template(#head(totalPrice)='data')
              p {{ $t('pages.history.table.price') }}
            template(#head(status)='data')
              p {{ $t('pages.history.table.status') }}
            template(#head(Details)='data')
              p {{ $t('pages.history.table.details') }}
            template(#cell(details)='data')
              font-awesome-icon.mt-1(
                :icon='["fa", "eye"]'
                @click='openDetails(data.item)'
              )
          //- b-pagination(
          //-   pills='pills'
          //-   size='sm'
          //-   v-model='currentPageInProgress'
          //-   :total-rows='totalRowsInProgress'
          //-   :per-page='perPage'
          //-   aria-controls='my-table'
          //-   align='right'
          //- )
  .p-2
    b-row.pt-3(lg='18')
      b-col.pb-3.text-left.mx-auto(lg='18')
        h2.text-secondary {{ $t('pages.history.title3') }}
      //- b-col.pb-3.text-center(md='6')
      //-   b-button.button.w-100(:to='`/${$i18n.locale}/admin/productsAdd/`') {{ $t('pages.admin.button1') }}
    //- b-row
    //-   b-col(offset-lg='3' lg='16')
    //-     b-form-input.input(
    //-       v-model='filterSearch'
    //-       :placeholder='$t("pages.history.placeholder1")'
    //-     )

    b-row
      b-col.mt-3.mx-auto(lg='18')
        .p-3.content.text-secondary
          .m-2
            b-table(
              hover
              borderless
              responsive
              head-row-variant='darkRed'
              table-variant='gray'
              :current-page='currentPageList'
              :perPage='perPage'
              :items='orderList'
              :fields='fields'
            )
              template(#head(orderDate)='data')
                p {{ $t('pages.history.table.date') }}
              template(#head(totalPrice)='data')
                p {{ $t('pages.history.table.price') }}
              template(#head(status)='data')
                p {{ $t('pages.history.table.status') }}
              template(#head(Details)='data')
                p {{ $t('pages.history.table.details') }}
              template(#cell(details)='data')
                font-awesome-icon.mt-1(
                  :icon='["fa", "eye"]'
                  @click='openDetails(data.item)'
                )
            //- b-pagination(
            //-   pills='pills'
            //-   size='sm'
            //-   v-model='currentPageList'
            //-   :total-rows='totalRowsList'
            //-   :per-page='perPage'
            //-   align='right'
            //- )
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    cancel-variant='secondary'
    hide-header-close
    v-if='viewOrder'
    v-model='viewOrder'
    right
    size='lg'
  )
    template(#modal-title)
      b-container
        h3.text-secondary {{ $t('pages.history.modal.title1') }}{{ currentOrder.orderDate }}
    b-container
      b-table(
        hover
        borderless
        responsive
        head-row-variant='darkRed'
        table-variant='gray'
        :items='orderDetail'
        :fields='fieldsOrder'
      )
        template(#head(image)='data')
          p {{ $t('pages.history.modal.table.image') }}
        template(#head(productName)='data')
          p {{ $t('pages.history.modal.table.name') }}
        template(#head(productPrice)='data')
          p {{ $t('pages.history.modal.table.price') }}
        template(#head(amount)='data')
          p {{ $t('pages.history.modal.table.quantity') }}
        template(#cell(image)='data')
          b-img(:src='getLink(data.item.productId)' width='50' height='50')
        b-pagination(
          pills='pills'
          size='sm'
          v-model='currentPageDetails'
          :total-rows='totalRowsDetails'
          :per-page='perPage'
          align='right'
        )
      h3.text-secondary.line {{ $t('pages.history.modal.text1') }}
      p.text-primary {{ currentAddress.street }} {{ currentAddress.number }} {{ currentAddress.zipcode }} {{ currentAddress.city }}
      h3.text-secondary.line {{ $t('pages.history.modal.text2') }}
      p.text-primary {{ currentOrder.totalPrice }} Euros TTC
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
// import { rolesType } from '@/utils/utils';
import filters from '@/components/global/filters.vue';
import {
  Address,
  formatDateWithoutTime,
  Order,
  orderLines,
} from '@/utils/utils';
import { API } from '~/utils/javaBack';

@Component({
  components: {
    filters,
  },
})
export default class extends Vue {
  filters: boolean = false;
  orderDetail: orderLines[] = [];
  // ordersList: Order[] = [];
  ordersInProgress: Order[] = [];

  filterSearch: string = '';
  viewOrder: boolean = false;
  // viewOrderInProgress: boolean = false;
  itemSelected: boolean = false;

  currentPageList: number = 1;
  currentPageInProgress: number = 1;
  currentPageDetails: number = 1;
  totalRowsList: number = 0;
  totalRowsInProgress: number = 0;
  totalRowsDetails: number = 0;
  perPage: number = 8;

  currentOrder: Order | null = null;
  currentAddress: Address = {
    id: 0,
    street: '',
    city: '',
    number: 0,
    zipcode: 0,
    extension: 0,
    label: '',
    userId: 0,
    active: false,
  };

  fields = [
    {
      key: 'orderDate',
      sortable: false,
    },
    {
      key: 'totalPrice',
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

  fieldsOrder = [
    {
      key: 'image',
      sortable: true,
    },
    {
      key: 'productName',
      sortable: true,
    },
    {
      key: 'productPrice',
      sortable: true,
    },
    {
      key: 'amount',
      sortable: false,
    },
  ];

  mounted() {
    if (this.$store.state.users.currentUser === null) {
      return this.$router.push(`/${this.$i18n.locale}/error`);
    }
    // this.getOrders();
  }

  async getAddress(addressId: number) {
    const responseAddress = await API.getAddressById(addressId);

    if (responseAddress.status !== 200) {
      return;
    }

    console.log('ADD', responseAddress.data);
    return responseAddress.data as Address;
  }

  // async getOrders() {
  //   const responseOrders = await API.getAllOrdersByUserId(
  //     this.$store.state.users.currentUser.id
  //   );

  //   if (responseOrders.status !== 200) {
  //     return;
  //   }

  //   this.ordersInProgress = responseOrders.data
  //     .filter((order) => order.status === 'payment_confirmed')
  //     .map((order: Order) => ({
  //       orderDate: formatDateWithoutTime(order.orderDate),
  //       id: order.id,
  //       userId: order.userId,
  //       addressId: order.addressId,
  //       status: order.status,
  //       orderLines: order.orderLines,
  //     }));

  //   for (const order of this.ordersInProgress) {
  //     order.totalPrice = 0;
  //     for (const ol of order.orderLines) {
  //       console.log('line', ol);
  //       console.log('order', order.id);
  //       const price = await API.getPriceById(ol.priceId);
  //       console.log('PROMISE PRICE', price);

  //       (order.totalPrice as number) += price.data.amount * ol.amount;
  //       console.log('total price', order.totalPrice);
  //       console.log('price', price.data.amount);
  //       console.log('quantity', ol.amount);
  //     }
  //   }

  //   console.log('ORDERS LIST', responseOrders.data);

  //   this.ordersList = responseOrders.data
  //     .filter((order: Order) => order.status === 'shipment_confirmed')
  //     .map((order: Order) => ({
  //       orderDate: formatDateWithoutTime(order.orderDate),
  //       id: order.id,
  //       userId: order.userId,
  //       addressId: order.addressId,
  //       status: order.status,
  //       orderLines: order.orderLines,
  //     }));

  //   // const tab = this.ordersList.map((order) => order.orderLines);
  //   // console.log('TAB:', tab);

  //   // const temp = await Promise.all(
  //   //   tab.map((line) => line.map((price) => API.getPriceById(price.priceId)))
  //   // );

  //   // console.log('TEMP:', temp);
  //   // console.log('PRICE', temp[0][0].value.data.priceId);

  //   for (const order of this.ordersList) {
  //     order.totalPrice = 0;
  //     for (const ol of order.orderLines) {
  //       console.log('line', ol);
  //       console.log('order', order.id);
  //       const price = await API.getPriceById(ol.priceId);
  //       console.log('PROMISE PRICE', price);

  //       (order.totalPrice as number) += price.data.amount * ol.amount;
  //       console.log('total price', order.totalPrice);
  //       console.log('price', price.data.amount);
  //       console.log('quantity', ol.amount);
  //     }
  //     console.log('TOTAL price END BOUCLE', order.totalPrice);
  //   }
  //   // const tab = this.ordersList.map((order) => order.orderLines);
  //   // console.log('TAB', tab);

  //   // {
  //   //   const temp = await Promise.all(
  //   //     order.orderLines.map((ol) => API.getPriceById(ol.priceId))
  //   //   );
  //   // });

  //   // this.ordersList.map((order) =>
  //   //   priceTab.map((price) => price.map((line) => console.log('LINE', line)))
  //   // );

  //   console.log('this ORDERLIST', this.ordersList);

  //   this.totalRowsList = this.ordersList.length;
  //   this.totalRowsInProgress = this.ordersInProgress.length;
  // }
  async orderInProgress() {
    const responseOrders = await API.getAllOrdersByUserId(
      this.$store.state.users.currentUser.id
    );

    if (responseOrders.status !== 200) {
      return;
    }

    const list: Order[] = responseOrders.data
      .filter((order: Order) => order.status === 'payment_confirmed')
      .map((order: Order) => ({
        orderDate: formatDateWithoutTime(order.orderDate),
        id: order.id,
        userId: order.userId,
        addressId: order.addressId,
        status: order.status,
        orderLines: order.orderLines,
      }));

    for (const order of list) {
      order.totalPrice = 0;
      for (const ol of order.orderLines) {
        console.log('line', ol);
        console.log('order', order.id);
        const product = await API.getProductSumByLangAndId(
          this.$i18n.locale,
          ol.productId
        );
        console.log('PROMISE PRODUCT', product);

        (order.totalPrice as number) += product.data.actualPrice * ol.amount;
        console.log('total price', order.totalPrice);
        console.log('price', product.data.actualPrice);
        console.log('quantity', ol.amount);
      }
      console.log('TOTAL price END BOUCLE', order.totalPrice);
    }
    this.totalRowsInProgress = responseOrders.data.length;
    return list as Order[];
  }

  async orderList() {
    const responseOrders = await API.getAllOrdersByUserId(
      this.$store.state.users.currentUser.id
    );

    if (responseOrders.status !== 200) {
      return;
    }

    console.log('ORDERS LIST', responseOrders.data);

    const list: Order[] = responseOrders.data
      .filter((order: Order) => order.status === 'shipment_confirmed')
      .map((order: Order) => ({
        orderDate: formatDateWithoutTime(order.orderDate),
        id: order.id,
        userId: order.userId,
        addressId: order.addressId,
        status: order.status,
        orderLines: order.orderLines,
      }));

    for (const order of list) {
      order.totalPrice = 0;
      for (const ol of order.orderLines) {
        const product = await API.getProductSumByLangAndId(
          this.$i18n.locale,
          ol.productId
        );

        (order.totalPrice as number) += product.data.actualPrice * ol.amount;
      }
    }

    this.totalRowsList = responseOrders.data.length;
    return list as Order[];
  }

  async openDetails(order: Order) {
    this.viewOrder = true;
    this.currentOrder = order;
    this.orderDetail = this.currentOrder.orderLines;

    const responseAddress = await API.getAddressById(
      this.currentOrder.addressId
    );

    if (responseAddress.status !== 200) {
      return;
    }

    this.currentAddress.id = responseAddress.data.id;
    this.currentAddress.street = responseAddress.data.street;
    this.currentAddress.city = responseAddress.data.city;
    this.currentAddress.number = responseAddress.data.number;
    this.currentAddress.zipcode = responseAddress.data.zipcode;
    this.currentAddress.extension = responseAddress.data.extension;
    this.currentAddress.label = responseAddress.data.label;
    this.currentAddress.active = responseAddress.data.active;
    this.currentAddress.userId = responseAddress.data.userId;

    for (const line of this.orderDetail) {
      const responseProduct = await API.getProductSumByLangAndId(
        this.$i18n.locale,
        line.productId
      );

      if (responseProduct.status !== 200) {
        return;
      }

      line.productName = responseProduct.data.name;
      line.productPrice = responseProduct.data.actualPrice;
      line.imageName = responseProduct.data.imageName;
    }
  }

  getLink(productId: number) {
    const link: string =
      'http://localhost:8080/products/' + productId + '/image';
    return link;
  }
}
</script>
<style scoped lang="scss">
.line {
  border-bottom: 1px solid #d6c385;
}
</style>
