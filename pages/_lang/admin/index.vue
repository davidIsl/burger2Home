<template lang="pug">
b-container.p-4.bg-gray(fluid)
  // ADMIN 
  .p-2
    b-row
      b-col.pb-3.text-md-left(
        :offset-lg='filters ? "0" : "2"'
        sm='16'
        :md='filters ? "18" : "16"'
        :lg='filters ? "18" : "14"'
      )
        h2.text-secondary {{ $t('pages.admin.title1') }}
      b-col.pb-3.text-center(sm='8' :md='filters ? "6" : "8"' lg='6')
        b-button.button.w-100(:to='`/${$i18n.locale}/admin/productsAdd/`') {{ $t('pages.admin.button1') }}
    b-row
      b-col(
        :offset-lg='filters ? "0" : "2"'
        sm='16'
        :md='filters ? "18" : "16"'
        :lg='filters ? "18" : "14"'
      )
        b-form-input.input(
          v-model='filterSearch'
          :placeholder='$t("pages.admin.placeholder1")'
        )
      b-col.mt-3.mt-sm-0(sm='8' :md='filters ? "6" : "8"' lg='6')
        b-button.button.w-100(variant='secondary' @click='filters = !filters') {{ $t('pages.filters.button1') }}
    b-row
      b-col.mt-3(v-if='filters' lg='4')
        filters
      b-col.mt-3(:offset-lg='filters ? "0" : "2"' lg='20')
        div(v-if='itemSelected.length > 0')
          b-button.mb-3(variant='outline-danger' @click='handleDelete') {{ $t('pages.admin.button3') }}
        .p-3.content.text-secondary
          .m-2
            b-table(
              hover
              borderless
              responsive
              perPage='8'
              table-variant='secondary'
              :items='products'
              :fields='fields'
              :totalProducts='totalProducts'
              :current='currentPage'
              @pageChange='handleChangePage'
            )
              template(#head(x)='data')
                b-form-checkbox#checkbox-header(
                  name='checkbox-header'
                  @change='selectAllTableItems($event)'
                )
              template(#cell(x)='data')
                b-form-checkbox(
                  :checked='selectedAllItems'
                  @input='selectTableItem($event, data.name)'
                )
              template(#cell(image)='data')
                b-img(:src='getLink(data.item.id)' width='50' height='50')
              template(#cell(details)='data')
                font-awesome-icon.mt-1(
                  :icon='["fa", "eye"]'
                  @click='openDetails(data.item)'
                )
            b-pagination(
              pills='pills'
              size='sm'
              v-model='currentPage'
              :total-rows='totalProducts'
              per-page='8'
              align='right'
            )
  // MARKETING
  .p-2
    b-row
      b-col.pb-3.text-md-left(
        :offset-lg='filters ? "0" : "2"'
        sm='16'
        :md='filters ? "18" : "16"'
        :lg='filters ? "18" : "14"'
      )
        h2.text-secondary {{ $t('pages.admin.title2') }}
      b-col.pb-3.text-center(sm='8' :md='filters ? "6" : "8"' lg='6')
        b-button.button.w-100(:to='`/${$i18n.locale}/admin/promoAdd/`') {{ $t('pages.admin.button2') }}
    b-row
      b-col(
        :offset-lg='filters ? "0" : "2"'
        sm='16'
        :md='filters ? "18" : "16"'
        :lg='filters ? "18" : "14"'
      )
        b-form-input.input(
          v-model='filterSearch'
          :placeholder='$t("pages.admin.placeholder2")'
        )
      b-col.mt-3.mt-sm-0(sm='8' :md='filters ? "6" : "8"' lg='6')
        b-button.button.w-100(variant='secondary' @click='filters = !filters') {{ $t('pages.filters.button1') }}
    b-row
      b-col.mt-3(v-if='filters' lg='4')
        filters
      b-col.mt-3(:offset-lg='filters ? "0" : "2"' lg='20')
        div(v-if='itemSelected.length > 0')
          b-button.mb-3(variant='outline-danger' @click='handleDelete') {{ $t('pages.admin.button3') }}
        .p-3.content.text-secondary
          .m-2
            b-table(
              hover
              borderless
              responsive
              perPage='8'
              table-variant='secondary'
              :items='promos'
              :fields='fieldsPromo'
              :current='currentPage'
              @pageChange='handleChangePage'
            )
              template(#head(x)='data')
                b-form-checkbox#checkbox-header(
                  name='checkbox-header'
                  @change='selectAllTableItems($event)'
                )
              template(#cell(x)='data')
                b-form-checkbox(
                  :checked='selectedAllItems'
                  @input='selectTableItem($event, data.name)'
                )
              template(#cell(details)='data')
                font-awesome-icon.mt-1(
                  :icon='["fa", "eye"]'
                  @click='openDetailsPromo(data.item)'
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
  // STOCK
  .p-2
  b-row
    b-col.pb-3.text-md-left(
      :offset-lg='filters ? "0" : "2"'
      sm='16'
      :md='filters ? "18" : "16"'
      :lg='filters ? "18" : "14"'
    )
      h2.text-secondary {{ $t('pages.admin.title3') }}
    b-col.pb-3.text-center(sm='8' :md='filters ? "6" : "8"' lg='6')
      b-button.button.w-100(:to='`/${$i18n.locale}/admin/stockAdd/`') {{ $t('pages.admin.button5') }}
  b-row
    b-col(
      :offset-lg='filters ? "0" : "2"'
      sm='16'
      :md='filters ? "18" : "16"'
      :lg='filters ? "18" : "14"'
    )
      b-form-input.input(
        v-model='filterSearch'
        :placeholder='$t("pages.admin.placeholder2")'
      )
    b-col.mt-3.mt-sm-0(sm='8' :md='filters ? "6" : "8"' lg='6')
      b-button.button.w-100(variant='secondary' @click='filters = !filters') {{ $t('pages.filters.button1') }}
  b-row
    b-col.mt-3(v-if='filters' lg='4')
      filters
    b-col.mt-3(:offset-lg='filters ? "0" : "2"' lg='20')
      div(v-if='itemSelected.length > 0')
        b-button.mb-3(variant='outline-danger' @click='handleDelete') {{ $t('pages.admin.button3') }}
      .p-3.content.text-secondary
        .m-2
          b-table(
            hover
            borderless
            responsive
            perPage='8'
            table-variant='secondary'
            :items='stocks'
            :fields='fieldsStock'
            :current='currentPage'
            @pageChange='handleChangePage'
          )
            template(#head(x)='data')
              b-form-checkbox#checkbox-header(
                name='checkbox-header'
                @change='selectAllTableItems($event)'
              )
            template(#cell(x)='data')
              b-form-checkbox(
                :checked='selectedAllItems'
                @input='selectTableItem($event, data.name)'
              )
            template(#cell(details)='data')
              font-awesome-icon.mt-1(
                :icon='["fa", "pencil-alt"]'
                @click='openDetailsStock(data.item)'
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
  // MODAL DETAILS PRODUCT
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    v-if='viewDetails'
    v-model='viewDetails'
    right
  )
    template(#modal-title)
      b-container
        b-img(
          thumbnail
          body-bg-variant='darkRed'
          :src='currentProduct.imageUrl'
        ) 
    template(#modal-footer)
      //- div
      //-   font-awesome-icon(:icon='["fas", "minus"]')
      b-button.button {{ $t('pages.admin.button1') }}
    b-container
      h4.text-secondary.text-center {{ currentProduct.name }}
      p.text-modal {{ currentProduct.description }}
    .border-top
      h6.pt-3.text-secondary {{ $t('pages.admin.text1') }}
      .pl-3.text-modal(
        v-for='(allergen, index) in currentProduct.allergens'
        :key='index'
      )
        li
          ul.m-0.p-0 {{ allergen }}
  // MODAL DETAILS PROMO
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    v-if='viewDetailsPromo'
    v-model='viewDetailsPromo'
    right
  )
    template(#modal-title)
      h4.text-secondary.text-center {{ currentPromo.name }}
    template(#modal-footer)
      b-button.button {{ $t('pages.admin.button2') }}
    b-container
      p.text-modal {{ currentPromo.description }}
      p.text-modal {{ 'Reduction: ' + currentPromo.discount + ' %' }}
      p.text-modal {{ 'StartDate: ' + currentPromo.startDate }}
      p.text-modal {{ 'EndDAte: ' + currentPromo.endDate }}
  // MODAL EDITING STOCK
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    v-model='editingStock'
    right
  )
    template(#modal-title)
      h4.text-secondary.text-center {{ $t('pages.admin.title4') }}
    template(#modal-footer)
      b-button.button {{ $t('pages.admin.button6') }}
    b-container
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.label1")'
        label-for='name'
      )
        b-form-input#name.input-form(
          v-model='$v.name.$model'
          :class='{ "is-invalid": $v.name.$error, "is-valid": !$v.name.$invalid }'
          :placeholder='$t("pages.admin.placeholder4")'
          type='text'
          name='name'
          @blur='$v.name.$touch()'
        )
        .input-error(v-if='$v.name.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]') | {{ $t('pages.errors.required') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.label2")'
        label-for='description'
      )
        b-form-textarea#description.input-area(
          v-model='$v.description.$model'
          :class='{ "is-invalid": $v.description.$error, "is-valid": !$v.description.$invalid }'
          :placeholder='$t("pages.admin.placeholder5")'
          type='text'
          name='description'
          @blur='$v.description.$touch()'
        )
        .input-error(v-if='$v.description.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.label3")'
        label-for='quantity'
      )
        b-form-input#quantity.input-form(
          v-model='quantity'
          readonly='true'
          type='text'
          name='quantity'
        )
      b-form-group.pt-3.text-primary(
        :label='$t("pages.admin.label4")'
        label-for='newQuantity'
      )
        b-form-input#newQuantity.input-form(
          v-model='$v.newQuantity.$model'
          :class='{ "is-invalid": $v.newQuantity.$error, "is-valid": !$v.newQuantity.$invalid }'
          :placeholder='$t("pages.admin.placeholder5")'
          type='number'
          name='newQuantity'
          @blur='$v.newQuantity.$touch()'
        )
        .input-error(v-if='$v.newQuantity.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]') | {{ $t('pages.errors.required') }}

  // DELETE MODAL
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    v-model='deleteAlert'
    centered
  )
    template(#modal-title)
      div {{ $t('pages.admin.alert.title1') }}
    .d-flex.align-items-center.gap-1
      div
        .modal-error
          font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
      h5 {{ $t('pages.admin.alert.text1') }}
    template(#modal-footer)
      b-button.w-48(variant='outline-danger' @click='deleteDistributor()') {{ $t('pages.admin.alert.button1') }}
      b-button.w-48(variant='primary' @click='deleteAlert = false') {{ $t('pages.admin.alert.button1') }}
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';
// import { rolesType } from '@/utils/utils';
import filters from '@/components/global/filters.vue';
import { Product, Allergens, Promo, Stock } from '@/utils/utils';
import { API } from '@/utils/javaBack';

@Component({
  components: {
    filters,
  },
})
export default class extends mixins(validationMixin) {
  // user: rolesType = rolesType.ADMIN;
  // roleType = rolesType;
  // role = rolesType.NONE;
  @Validate({ required }) name: string = '';
  @Validate({ required }) description: string = '';
  @Validate({ required }) newQuantity: string = '';
  quantity: number = 0;

  filters: boolean = false;
  filterSearch: string = '';
  viewDetails: boolean = false;
  viewDetailsPromo: boolean = false;
  editingStock: boolean = false;
  itemSelected: string[] = [];
  selectedAllItems: boolean = false;
  deleteAlert: boolean = false;

  currentPage: number = 1;
  totalProducts: number = 0;

  allergens: Allergens[] = [];
  products: Product[] | null = null;
  currentProduct: Product | null = null;
  currentPromo: Promo | null = null;
  currentStock: Stock | null = null;

  fields = [
    {
      key: 'x',
      sortable: false,
    },
    {
      key: 'image',
      sortable: false,
    },
    {
      key: 'name',
      sortable: true,
    },
    {
      key: 'description',
      sortable: false,
    },
    {
      key: 'currentPrice',
      sortable: true,
    },
    {
      key: 'details',
      sortable: false,
    },
  ];

  fieldsPromo = [
    {
      key: 'x',
      sortable: false,
    },
    {
      key: 'name',
      sortable: true,
    },
    {
      key: 'description',
      sortable: false,
    },
    {
      key: 'discount',
      sortable: true,
    },
    {
      key: 'startDate',
      sortable: true,
    },
    {
      key: 'endDate',
      sortable: true,
    },
    {
      key: 'details',
      sortable: false,
    },
  ];

  fieldsStock = [
    {
      key: 'x',
      sortable: false,
    },
    {
      key: 'name',
      sortable: true,
    },
    {
      key: 'description',
      sortable: false,
    },
    {
      key: 'quantity',
      sortable: true,
    },
    {
      key: 'details',
      sortable: false,
    },
  ];

  promos: Promo[] = [
    {
      name: 'Super Promo Burger Epicé',
      description: 'Profitez de notre super promo sur les burgers épicés',
      discount: 10,
      startDate: new Date('2022-11-22'),
      endDate: new Date('2022-11-30'),
    },
    {
      name: 'Super Promo Burger Boeuf',
      description: 'Profitez de notre super promo sur les burgers boeuf',
      discount: 15,
      startDate: new Date('2022-11-29'),
      endDate: new Date('2022-12-5'),
    },
    {
      name: 'Super Promo Burger Poulet',
      description: 'Profitez de notre super promo sur les burgers de poulet',
      discount: 5,
      startDate: new Date('2022-11-25'),
      endDate: new Date('2022-12-2'),
    },
    {
      name: 'Super Promo Burger Epicé',
      description: 'Profitez de notre super promo sur les burgers épicés',
      discount: 10,
      startDate: new Date('2022-11-22'),
      endDate: new Date('2022-11-30'),
    },
  ];

  stocks: Stock[] = [
    {
      name: 'Boeuf',
      description: 'Viande de boeuf hachée',
      quantity: 15,
    },
    {
      name: 'Poulet',
      description: 'Viande de poulet',
      quantity: 25,
    },
    {
      name: 'Tomates',
      description: 'Tomates fraiches',
      quantity: 10,
    },
    {
      name: 'Cornichons',
      description: 'Cornichons frais',
      quantity: 15,
    },
    {
      name: 'Oignons',
      description: 'Oignons frais de la région',
      quantity: 15,
    },
    {
      name: 'Bacon',
      description: 'Viande de porc',
      quantity: 35,
    },
    {
      name: 'Pain',
      description: 'Pain de seigle',
      quantity: 40,
    },
  ];

  mounted() {
    this.getBurgers();
  }

  getLink(productId: number) {
    const link: string =
      'http://localhost:8080/products/' + productId + '/image';
    return link;
  }

  async getBurgers() {
    const response = await API.burgerList(this.$i18n.locale);

    if (response.status !== 200) {
      console.log('LOG ERROR');
      console.log('RESPONSE', response.data);

      return null;
    }
    this.products = response.data;
    this.totalProducts = response.data.length;
    console.log('LOG SUCCESS');
    console.log('RESPONSE', response.data);
  }

  openDetails(product: Product) {
    this.viewDetails = true;
    this.currentProduct = product;
  }

  openDetailsPromo(promo: Promo) {
    this.viewDetailsPromo = true;
    this.currentPromo = promo;
  }

  openDetailsStock(stock: Stock) {
    this.editingStock = true;
    this.currentStock = stock;
  }

  handleChangePage(e: number) {
    this.currentPage = e;
    // this.getBurgers();
  }

  selectAllTableItems(event: boolean) {
    this.selectedAllItems = event;
  }

  selectTableItem(event: boolean, id: string) {
    if (event) {
      this.itemSelected.push(id);
      return;
    }
    this.itemSelected = this.itemSelected.filter((item) => item !== id);
  }

  handleDelete() {
    this.deleteAlert = true;
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/bt-custom.scss';

.test {
  width: 90%;
  @include for-phone-only {
    width: 50%;
  }
  @include for-tablet-only {
    width: 40%;
  }
  @include for-md-desktop-only {
    width: 75%;
  }
  // @include for-xl-desktop-only {
  //   width: 50%;
  // }
}
// .input {
//   height: 40px !important;
// }
</style>
