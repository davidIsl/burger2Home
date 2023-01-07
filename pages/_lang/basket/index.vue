<template lang="pug">
b-container.p-4.bg-gray(fluid)
  b-row
    b-col.mt-2(offset-md='2' md='16')
      h3.p-1.text-secondary.title-line {{ $t('pages.basket.title1') }}
    //- b-col.mt-2(md='6')
    //-   h3.p-1.text-secondary.title-line {{ $t('pages.basket.title2') }}
  b-row
    b-col.mt-3(offset-md='2' md='16')
      .p-3.content
        b-table(
          hover
          borderless
          responsive
          head-row-variant='darkRed'
          table-variant='gray'
          :items='$store.state.baskets.basketLine'
          :fields='fieldsBasket'
        )
          template(#head(product.imageName)='data')
            span {{ $t('pages.basket.table.image') }}
          //- template(#cell(amount)='data')
          //-   b-form-select(
          //-     v-model='$store.state.baskets.basketLine.amount'
          //-     :options='quantityToOrder'
          //-   )
          template(#cell(product.imageName)='data')
            b-img(:src='getLink(data.item.productId)' width='50' height='50')
          template(#cell(trash)='data')
            font-awesome-icon(
              :icon='["fa", "trash"]'
              @click='removeProduct(data.item.productId)'
            )
          template(#cell(amount)='data')
            b-button.mr-2(
              size='sm'
              variant='primary'
              @click='decrementQuantity(data.item.productId)'
            )
              font-awesome-icon(:icon='["fa", "minus"]')
            span {{ data.item.amount }}
            b-button.ml-2(
              size='sm'
              variant='primary'
              @click='incrementQuantity(data.item.productId)'
            )
              font-awesome-icon(:icon='["fa", "plus"]')
        b-pagination(
          pills='pills'
          size='sm'
          v-model='currentPage'
          :total-rows='totalRows'
          :per-page='perPage'
          align='right'
        )
    b-col.mt-3(md='4')
      .py-2.content
        p.mb-1.pb-2.text-center.border-bottom Montant Total: 63€
        .p-3
          b-button.mb-2.w-100.button(@click='saveBasket') Save Basket
          b-button.mb-2.w-100.button(@click='createOrder') {{ $t('pages.basket.button1') }}
          b-button.mb-2.w-100.button(
            @click='goToUrl("/" + $i18n.locale + "/account/")'
          ) {{ $t('pages.basket.button2') }}
          b-button.mb-2.w-100.button(
            @click='goToUrl("/" + $i18n.locale + "/account/register/")'
          ) {{ $t('pages.basket.button3') }}

  b-row
    b-col.mx-auto(v-if='stepOrder === stepOrderType.STEP1' md='20')
      .content.p-3.mt-3
        b-row.pt-3
          b-col.mx-auto(md='22')
            h3.title-line.pb-2.text-secondary {{ $t('pages.basket.title2') }}
        b-row.pt-3
          b-col(offset-lg='1' md='12' lg='10')
            b-form-group(
              :label='$t("pages.basket.label1")'
              label-for='addresses'
            )
              b-form-select#addresses.input-form(
                v-model='$v.addresses.$model'
                :class='{ "is-invalid": $v.addresses.$error, "is-valid": !$v.addresses.$invalid }'
                :placeholder='$t("pages.basket.placeholder1")'
                :options='add'
                @blur='$v.addresses.$touch()'
                @change='handleChangeAddress'
              )
                .input-error(v-if='$v.addresses.$error')
                  font-awesome-icon.mr-2(
                    :icon='["fa", "exclamation-triangle"]'
                  )
                  | {{ $t('pages.errors.required') }}
          b-col(offset-md='2' md='12' lg='10')
            b-form-group(:label='$t("pages.basket.label7")' label-for='note')
              b-form-input#note.input-form(
                v-model='note'
                :placeholder='$t("pages.basket.placeholder7")'
                type='text'
                :readonly='isReadOnly'
                name='address'
              )
        b-row.pt-2
          b-col.mx-auto(md='12' lg='10')
            b-form-group(
              :label='$t("pages.basket.label2")'
              label-for='address'
            )
              b-form-input#address.input-form(
                v-model='$v.address.$model'
                :class='{ "is-invalid": $v.address.$error, "is-valid": !$v.address.$invalid }'
                :placeholder='$t("pages.basket.placeholder1")'
                type='text'
                name='address'
                @blur='$v.address.$touch()'
              )
              .input-error(v-if='$v.address.$error')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.required') }}
          b-col.mx-auto(md='6' lg='4')
            b-form-group(:label='$t("pages.basket.label3")' label-for='number')
              b-form-input#number.input-form(
                v-model='$v.number.$model'
                :class='{ "is-invalid": $v.number.$error, "is-valid": !$v.number.$invalid }'
                :placeholder='$t("pages.basket.placeholder3")'
                type='number'
                name='number'
                @blur='$v.number.$touch()'
              )
              .input-error(v-if='$v.number.$error')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.required') }}
          b-col.mx-auto(md='6' lg='4')
            b-form-group(
              :label='$t("pages.basket.label4")'
              label-for='extension'
            )
              b-form-input#extension.input-form(
                v-model='$v.extension.$model'
                :class='{ "is-invalid": $v.extension.$error, "is-valid": !$v.extension.$invalid }'
                :placeholder='$t("pages.basket.placeholder4")'
                type='number'
                name='extension'
                @blur='$v.extension.$touch()'
              )
              .input-error(v-if='$v.extension.$error')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.required') }}
        b-row
          b-col.mx-auto(md='12' lg='10')
            b-form-group(:label='$t("pages.basket.label5")' label-for='zip')
              b-form-input#zip.input-form(
                v-model='$v.zip.$model'
                :class='{ "is-invalid": $v.zip.$error, "is-valid": !$v.zip.$invalid }'
                :placeholder='$t("pages.basket.placeholder5")'
                type='number'
                name='zip'
                @blur='$v.zip.$touch()'
              )
              .input-error(v-if='$v.zip.$error')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.required') }}
          b-col.mx-auto(md='12' lg='10')
            b-form-group(
              :label='$t("pages.basket.label6")'
              label-for='city-input'
            )
              b-form-input#city-input.input-form(
                v-model='$v.city.$model'
                :class='{ "is-invalid": $v.city.$error, "is-valid": !$v.city.$invalid }'
                :placeholder='$t("pages.basket.placeholder6")'
                type='text'
                name='city'
                @blur='$v.city.$touch()'
              )
              .input-error(v-if='$v.city.$error')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.required') }}
        b-row
          b-col.mx-auto(md='6')
            b-button.w-100.button(
              @click='goToUrl("/" + $i18n.locale + "/account/register/")'
            ) {{ $t('pages.basket.button4') }}
</template>
<script lang="ts">
import { mixins, Component } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';
import {
  Basket,
  BasketLine,
  formatDate,
  Product,
  SelectOption,
  stepOrderType,
  submitOrderType,
} from '@/utils/utils';
import { API } from '~/utils/javaBack';

@Component({
  components: {},
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) addresses: string = '';
  @Validate({ required }) address: string = '';
  @Validate({ required }) city: string = '';
  @Validate({ required }) zip: string = '';
  @Validate({ required }) number: number = 0;
  @Validate({ required }) extension: number = 0;
  note: string = '';
  // isReadOnly: boolean = false;

  add: SelectOption[] = [];
  // quantityToOrder: number[] = [1, 2, 3, 4, 5];
  filters: boolean = false;
  filterSearch: string = '';

  currentPage: number = 1;
  perPage: number = 8;
  totalRows: number = 0;
  currentBasket: Basket | null = null;
  products: Product[] | null = null;

  stepOrderType = stepOrderType;
  stepOrder = stepOrderType.NONE;
  submitOrderType = submitOrderType;
  submitOrder = submitOrderType.NONE;

  fieldsBasket = [
    {
      key: 'product.imageName',
      sortable: false,
    },
    {
      key: 'product.name',
      sortable: true,
    },
    {
      key: 'product.actualPrice',
      sortable: false,
    },
    {
      key: 'amount',
      sortable: false,
    },
    {
      key: 'trash',
      sortable: false,
    },
  ];

  mounted() {
    // this.getProducts();
    // this.getUser(2);
    // console.log('BASKET:!', this.$store.state.baskets.basketLine);
    this.getAddressByUser(1);
    console.log('ADD', this.addresses);
  }

  // async getProducts() {
  //   for (let i = 0; i < this.$store.state.baskets.basketLine.length; i++) {
  //     const response = await API.getProductSumByLangAndId(
  //       this.$i18n.locale,
  //       this.$store.state.baskets.basketLine[i].productId
  //     );

  //     if (response.status !== 200) {
  //       return null;
  //     }
  //     //
  //     this.$store.commit('baskets/addProduct', response.data)
  //   }
  // }

  isReadOnly(): boolean {
    if (this.addresses === '') {
      console.log('TRUE');

      return true;
    }
    return false;
  }

  async getAddressByUser(userId: number) {
    const responseAddress = await API.getAddressByUser(userId);

    if (responseAddress.status !== 200) {
      return;
    }

    this.add = responseAddress.data.map((address) => ({
      value: address.id,
      text: address.label,
    }));
  }

  async handleChangeAddress() {
    console.log('ADDRESS', this.addresses);
    const responseAddress = await API.getAddressById(parseInt(this.addresses));

    if (responseAddress.status !== 200) {
      return;
    }

    // this.isReadOnly = true;
    this.address = responseAddress.data.street;
    this.number = responseAddress.data.number;
    this.zip = responseAddress.data.zipcode;
    this.city = responseAddress.data.city;

    if (responseAddress.data.extension !== null) {
      this.extension = responseAddress.data.extension;
    }

    console.log('READ ONLY', responseAddress.data);
  }

  incrementQuantity(productId: number) {
    this.$store.commit('baskets/incrementAmount', productId);
  }

  decrementQuantity(productId: number) {
    this.$store.commit('baskets/decrementAmount', productId);
  }

  removeProduct(bLines: BasketLine) {
    this.$store.commit('baskets/removeBasketLine', bLines);
  }

  getLink(productId: number) {
    const link: string =
      'http://localhost:8080/products/' + productId + '/image';
    return link;
  }

  async saveBasket() {
    if (this.$store.state.users.currentUser === null) {
      console.log('PAS CONNECTE');

      return;
    }

    const responseBasket = await API.getBasketByUser(
      this.$store.state.users.currentUser.id
    );

    if (responseBasket.status !== 200) {
      return;
    }

    const lastUpdated = formatDate(new Date().toString());
    console.log('STORE BL:', this.$store.state.baskets.basketLine);

    // const basketLines: any = this.$store.state.baskets.basketLine.map(
    //   (line: any) => ({
    //     id: line.id,
    //     basketId: line.basketId,
    //     productId: line.productId,
    //     amount: line.amount,
    //   })
    // );

    const responseUpdateBasket = await API.updateBasket(
      responseBasket.data.id,
      lastUpdated,
      responseBasket.data.userId
    );

    if (responseUpdateBasket.status !== 200) {
      return;
    }

    const responseBasketLines = await API.getBasketLinesByBasketId(
      responseBasket.data.id
    );

    if (responseBasketLines.status !== 200) {
      return;
    }

    console.log('LINES', responseBasketLines.data);

    for (let i = 0; i < responseBasketLines.data.length; i++) {
      const responseRemoveExistingLines = await API.removeBasketLine(
        responseBasketLines.data[i].id as number
      );
      if (responseRemoveExistingLines.status !== 200) {
        return;
      }
    }

    for (let i = 0; i < this.$store.state.baskets.basketLine.length; i++) {
      const responseCreateBasketLine = await API.addBasketLine(
        responseBasket.data.id,
        this.$store.state.baskets.basketLine[i].productId,
        this.$store.state.baskets.basketLine[i].amount
      );

      if (responseCreateBasketLine.status !== 200) {
        return;
      }
    }
    console.log('UPDATED BASKET OK');

    this.$store.commit('baskets/resetBasket');

    // const responseAdress = await API.get;
  }

  createOrder() {
    if (this.$store.state.users.currentUser === null) {
      console.log('PAS CONNECTE');

      return;
    }

    this.stepOrder = stepOrderType.STEP1;
  }

  goToUrl(url: string) {
    this.$router.push(url);
  }
}
</script>
<style scoped lang="scss"></style>
