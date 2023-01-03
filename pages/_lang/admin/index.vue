<template lang="pug">
b-container.p-4.bg-gray(fluid)
  // ADMIN 
  .p-2
    b-row
      b-col.pb-3.text-md-left(
        :offset-lg='filters ? "0" : "2"'
        offset-xl='2'
        sm='16'
        :md='filters ? "18" : "16"'
        :lg='filters ? "18" : "14"'
        xl='16'
      )
        h2.text-secondary {{ $t('pages.admin.title1') }}
      b-col.pb-3.text-center(
        sm='8'
        :md='filters ? "6" : "8"'
        lg='6'
        xl='4'
      )
        b-button.button.w-100(:to='`/${$i18n.locale}/admin/productsAdd/`') {{ $t('pages.admin.button1') }}
    b-row
      b-col(
        offset-sm='16'
        :offset-md='filters ? "18" : "16"'
        offset-xl='18'
        sm='8'
        :md='filters ? "6" : "8"'
        lg='6'
        xl='4'
      )
        b-button.mb-3.button.w-100(
          :to='`/${$i18n.locale}/admin/ingredientsAdd/`'
        ) {{ $t('pages.admin.button3') }}
        b-button.mb-3.button.w-100(:to='`/${$i18n.locale}/admin/familyAdd/`') {{ $t('pages.admin.button4') }}
        b-button.mb-3.button.w-100(
          :to='`/${$i18n.locale}/admin/allergensAdd/`'
        ) {{ $t('pages.admin.button5') }}
    b-row
      b-col(
        :offset-lg='filters ? "0" : "2"'
        :offset-xl='filters ? "2" : "2"'
        sm='16'
        :md='filters ? "18" : "16"'
        :lg='filters ? "18" : "14"'
        xl='16'
      )
        b-form-input.input(
          v-model='filterSearch'
          :placeholder='$t("pages.admin.placeholder1")'
        )
      b-col.mt-3.mt-sm-0(
        sm='8'
        :md='filters ? "6" : "8"'
        lg='6'
        xl='4'
      )
        b-button.button.w-100(variant='secondary' @click='filters = !filters') {{ $t('pages.filters.button1') }}
    b-row
      b-col.mt-3(v-if='filters' :offset-xl='filters ? "2" : "0"' xl='4')
        filters
      b-col.mt-3(
        :offset-lg='filters ? "0" : "2"'
        :lg='filters ? "24" : "20"'
        :xl='filters ? "16" : "20"'
      )
        //- div(v-if='itemSelected.length > 0')
        //-   b-button.mb-3(variant='outline-danger' @click='handleDelete') {{ $t('pages.admin.button3') }}
        .p-3.content.text-secondary
          .m-3
            b-table(
              hover
              borderless
              responsive
              table-variant='secondary'
              :current-page='currentPage'
              :perPage='perPage'
              :items='products'
              :fields='fields'
              :totalProducts='totalProducts'
              @pageChange='handleChangePage'
            )
              template(#head(onMenu)='data')
                p {{ $t('pages.admin.products.table.statut') }}
              template(#cell(onMenu)='data')
                b-form-checkbox(switch v-model='data.item.onMenu')
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
              :per-page='perPage'
              align='right'
              @change='handleChangePage'
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
      //- b-col.pb-3.text-center(sm='8' :md='filters ? "6" : "8"' lg='6')
      //-   b-button.button.w-100(:to='`/${$i18n.locale}/admin/promoAdd/`') {{ $t('pages.admin.button2') }}
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
        b-button.button.w-100(:to='`/${$i18n.locale}/admin/promosAdd/`') {{ $t('pages.admin.button2') }}
    b-row
      b-col.mt-3(v-if='filters' lg='4')
        filters
      b-col.mt-3(:offset-lg='filters ? "0" : "2"' lg='20')
        //- div(v-if='itemSelected.length > 0')
        //-   b-button.mb-3(variant='outline-danger' @click='handleDelete') {{ $t('pages.admin.button3') }}
        .p-3.content.text-secondary
          .m-2
            b-table(
              hover
              borderless
              responsive
              :perPage='perPage'
              :current-page='currentPage'
              table-variant='secondary'
              :items='promos'
              :fields='fieldsPromo'
              :current='currentPage'
              @pageChange='handleChangePage'
            )
              //- template(#head(x)='data')
              //-   b-form-checkbox#checkbox-header(
              //-     name='checkbox-header'
              //-     @change='selectAllTableItems($event)'
              //-   )
              //- template(#cell(x)='data')
              //-   b-form-checkbox(
              //-     :checked='selectedAllItems'
              //-     @input='selectTableItem($event, data.name)'
              //-   )
              template(#cell(details)='data')
                font-awesome-icon.mt-1(
                  :icon='["fa", "eye"]'
                  @click='openDetailsPromo(data.item)'
                )
            b-pagination(
              pills='pills'
              size='sm'
              v-model='currentPage'
              :total-rows='totalPromos'
              :per-page='perPage'
              @pageChange='handleChangePage'
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
      b-button.button.w-100(:to='`/${$i18n.locale}/admin/stockAdd/`') {{ $t('pages.admin.button6') }}
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
      //- div(v-if='itemSelected.length > 0')
      //-   b-button.mb-3(variant='outline-danger' @click='handleDelete') {{ $t('pages.admin.button3') }}
      .p-3.content.text-secondary
        .m-2
          b-table(
            hover
            borderless
            responsive
            perPage='5'
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
            per-page='5'
            aria-controls='my-table'
            align='right'
          )
  // MODAL DETAILS PRODUCT
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    hide-header-close
    v-if='viewDetails'
    v-model='viewDetails'
    right
  )
    template(#modal-title)
      b-container
        b-img(
          thumbnail
          body-bg-variant='darkRed'
          :src='getLink(currentProduct.id)'
        ) 
    template(#modal-footer)
      //- div
      //-   font-awesome-icon(:icon='["fas", "minus"]')
      b-button.mx-auto.w-48.button(@click='viewDetails = false') {{ $t('pages.admin.button7') }}
      b-button.mx-auto.w-48.button(
        @click='goToUrl(`/${$i18n.locale}/admin/productsEdit/`)'
      ) {{ $t('pages.admin.button6') }}
    div
      h4.text-secondary.text-center.title {{ currentProduct.name }}
      .text-modal 
        p {{ currentProduct.description }}
    .border-top.pb-3
      h6.pt-3.title.text-secondary {{ $t('pages.admin.title4') }}
      .text-modal
        span {{ currentProduct.currentPrice }}€
    .border-top.pb-3
      h6.pt-3.text-secondary.title {{ $t('pages.admin.title5') }}
      .pl-3.text-modal(
        v-for='(ingredient, index) in currentProduct.ingredients'
        :key='index'
      )
        li
          ul.m-0.p-0 {{ ingredient }}
    .border-top
      h6.pt-3.text-secondary.title {{ $t('pages.admin.title6') }}
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
    hide-header-close
    v-if='viewDetailsPromo'
    v-model='viewDetailsPromo'
    right
  )
    template(#modal-title)
      h4.pb-3.text-secondary.text-center.title {{ $t('pages.admin.promos.modal.title1') }}
      b-img(thumbnail body-bg-variant='darkRed' src='/img/promos.png')
    template(#modal-footer)
      b-button.mx-auto.button.w-48(@click='viewDetailsPromo = false') {{ $t('pages.admin.promos.modal.button1') }}
      b-button.mx-auto.button.w-48(
        @click='goToUrl(`/${$i18n.locale}/admin/promosAdd/`)'
      ) {{ $t('pages.admin.promos.modal.button2') }}
    div
      h6.text-secondary.title {{ $t('pages.admin.promos.modal.title2') }}
      .pt-2.text-modal 
        p.text-modal {{ currentPromo.description }}
    .border-top.pb-3
      h6.pt-3.title.text-secondary {{ $t('pages.admin.promos.modal.title3') }}
      .text-modal
        p {{ currentPromo.amount + ' %' }}
    .border-top.pb-3
      h6.pt-3.title.text-secondary {{ $t('pages.admin.promos.modal.title4') }}
      .text-modal
        p.text-modal {{ currentPromo.startDate }}
    .border-top.pb-3
      h6.pt-3.title.text-secondary {{ $t('pages.admin.promos.modal.title5') }}
      .text-modal
        p.text-modal {{ currentPromo.endDate }}
  // MODAL EDITING STOCK
  b-modal(
    body-bg-variant='gray'
    header-bg-variant='gray'
    footer-bg-variant='gray'
    hide-header-close
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
      b-button.w-48(variant='outline-danger' @click='deleteProduct()') {{ $t('pages.admin.alert.button1') }}
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

  perPage: number = 8;
  currentPage: number = 1;
  totalProducts: number = 0;
  totalPromos: number = 0;

  allergens: Allergens[] = [];
  products: Product[] = [];
  promos: Promo[] = [];
  currentProduct: Product | null = null;
  currentPromo: Promo | null = null;
  currentStock: Stock | null = null;

  fields = [
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
    {
      key: 'onMenu',
      sortable: false,
    },
  ];

  fieldsPromo = [
    {
      key: 'description',
      sortable: false,
    },
    {
      key: 'amount',
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
    this.updateData();
  }

  getLink(productId: number) {
    const link: string =
      'http://localhost:8080/products/' + productId + '/image';
    return link;
  }

  updateData() {
    this.getBurgers();
    this.getPromos();
  }

  async getBurgers() {
    const response = await API.productList();

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

  async getPromos() {
    console.log('GET PTOMOS');

    const response = await API.getPromoList();

    if (response.status !== 200) {
      return;
    }

    const responsePromo = await API.getPromoTranslationList();
    if (responsePromo.status !== 200) {
      return;
    }
    const promoTab: any = responsePromo.data;

    console.log('RESPONSEPROMO', promoTab);
    this.promos = responsePromo.data;

    for (let i = 0; i < responsePromo.data.length; i++) {
      for (let j = 0; j < response.data.length; j++) {
        // console.log('Response ID', response.data[j].id);
        // console.log('Response Promotion ID', response.data[j].promotionId);
        // console.log('ResponsePROMO  ID', responsePromo.data[i].promotionId);
        // console.log(
        //   'ResponsePROMO Promotion ID',
        //   responsePromo.data[i].promotionId
        // );

        if (response.data[j].id === responsePromo.data[i].promotionId) {
          this.promos[i].amount = response.data[j].amount;
          this.promos[i].startDate = response.data[j].startDate;
          this.promos[i].endDate = response.data[j].endDate;
        }
      }
    }
    console.log('PROMOS', this.promos);
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

  goToUrl(url: string) {
    this.$router.push(url);
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
