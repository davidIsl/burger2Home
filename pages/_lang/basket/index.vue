<template lang="pug">
b-container.p-4.bg-gray(fluid)
  b-row
    b-col.mt-2(md='18')
      h3.p-1.text-secondary.title-line {{ $t('pages.basket.title1') }}
    //- b-col.mt-2(md='6')
    //-   h3.p-1.text-secondary.title-line {{ $t('pages.basket.title2') }}
  b-row
    b-col.mt-3(md='18')
      .p-3.content
        b-table(
          hover
          borderless
          responsive
          head-row-variant='darkRed'
          table-variant='secondary'
          :items='basket'
          :fields='fieldsBasket'
        )
          //- template(#head(x)='data')
          //-   b-form-checkbox#checkbox-header(name='checkbox-header')
          //- template(#cell(x)='data')
          //-   b-form-checkbox(v-model='itemSelected')
          template(#cell(image)='data')
            b-img(:src='data.item.image' width='40' height='40')
          template(#cell(trash)='data')
            font-awesome-icon(:icon='["fa", "trash"]')
        b-pagination(
          pills='pills'
          size='sm'
          v-model='currentPage'
          :total-rows='totalRows'
          :per-page='perPage'
          align='right'
        )
    b-col.mt-3(md='6')
      .py-2.content
        p.mb-1.pb-2.text-center.border-bottom Montant Total: 63€
        .p-3
          b-button.mb-2.w-100.button(@click='goToUrl()') {{ $t('pages.basket.button1') }}
          b-button.mb-2.w-100.button(
            @click='goToUrl("/" + $i18n.locale + "/account/")'
          ) {{ $t('pages.basket.button2') }}
          b-button.mb-2.w-100.button(
            @click='goToUrl("/" + $i18n.locale + "/account/register/")'
          ) {{ $t('pages.basket.button3') }}
          b-button.w-100.button(
            @click='goToUrl("/" + $i18n.locale + "/account/register/")'
          ) {{ $t('pages.basket.button4') }}
  .content.p-3.mt-3
    b-row.pt-3
      b-col.mx-auto(lg='22')
        h3.title-line.pb-2.text-secondary {{ $t('pages.basket.title2') }}
    b-row.pt-3
      b-col(offset-lg='1' md='12' lg='10')
        b-form-group(:label='$t("pages.basket.label1")' label-for='addresses')
          b-form-select#addresses.input-form(
            v-model='$v.addresses.$model'
            :class='{ "is-invalid": $v.addresses.$error, "is-valid": !$v.addresses.$invalid }'
            :placeholder='$t("pages.basket.placeholder1")'
            :options='add'
            @blur='$v.addresses.$touch()'
          )
            .input-error(v-if='$v.addresses.$error')
              font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
              | {{ $t('pages.errors.required') }}
    b-row.pt-2
      b-col.mx-auto(md='12' lg='10')
        b-form-group(:label='$t("pages.basket.label2")' label-for='address')
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
            type='text'
            name='number'
            @blur='$v.number.$touch()'
          )
          .input-error(v-if='$v.number.$error')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.errors.required') }}
      b-col.mx-auto(md='6' lg='4')
        b-form-group(:label='$t("pages.basket.label4")' label-for='extension')
          b-form-input#extension.input-form(
            v-model='$v.extension.$model'
            :class='{ "is-invalid": $v.extension.$error, "is-valid": !$v.extension.$invalid }'
            :placeholder='$t("pages.basket.placeholder4")'
            type='text'
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
            type='text'
            name='zip'
            @blur='$v.zip.$touch()'
          )
          .input-error(v-if='$v.zip.$error')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.errors.required') }}
      b-col.mx-auto(md='12' lg='10')
        b-form-group(:label='$t("pages.basket.label6")' label-for='city-input')
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
</template>
<script lang="ts">
import { mixins, Component } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';
import { Basket, Product, SelectOption } from '@/utils/utils';

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

  add: SelectOption[] = [];
  filters: boolean = false;
  filterSearch: string = '';

  currentBasket: Basket | null = null;
  products: Product[] | null = null;

  fieldsBasket = [
    {
      key: 'image',
      sortable: false,
    },
    {
      key: 'name',
      sortable: true,
    },
    {
      key: 'totalPrice',
      sortable: false,
    },
    {
      key: 'quantity',
      sortable: false,
    },
    {
      key: 'trash',
      sortable: false,
    },
  ];

  // allergens: Allergens[] = [
  //   {
  //     name: 'Gluten',
  //   },
  //   {
  //     name: 'Oeufs',
  //   },
  //   {
  //     name: 'Poissons',
  //   },
  //   {
  //     name: 'Soja',
  //   },
  //   {
  //     name: 'Arachides',
  //   },
  // ];

  // products: Product[] = [
  //   {
  //     name: 'Le classico',
  //     image: '/img/produits/classico.jpg',
  //     description:
  //       'Viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 10.5,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'Smokey Bacon',
  //     image: '/img/produits/smokey-bacon.jpg',
  //     description:
  //       'Viande de Boeuf hachée, tranches de bacon, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 11,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'Habibi',
  //     image: '../../img/produits/habibi.jpg',
  //     description:
  //       "Viande d'agneau hachée, laitue iceberg, houmous, concombre mariné, sauce tomate épicée",
  //     price: 11.5,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'Double Decker',
  //     image: '../../img/produits/double-dekker.jpg',
  //     description:
  //       'Double Hamburger de viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 13,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'El Sombrero',
  //     image: '../../img/produits/el-sombrero.jpg',
  //     description:
  //       'Viande de poulet hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, salsa verde, oignons rouges, guacamole et crème aigre',
  //     price: 12,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'Le classico',
  //     image: '../../img/produits/classico.jpg',
  //     description:
  //       'Viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 10.5,
  //     allergens: [this.allergens[0], this.allergens[5], this.allergens[2]],
  //   },
  //   {
  //     name: 'Smokey Bacon',
  //     image: '/img/produits/smokey-bacon.jpg',
  //     description:
  //       'Viande de Boeuf hachée, tranches de bacon, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 11,
  //     allergens: [this.allergens[0], this.allergens[4], this.allergens[2]],
  //   },
  //   {
  //     name: 'Habibi',
  //     image: '../../img/produits/habibi.jpg',
  //     description:
  //       "Viande d'agneau hachée, laitue iceberg, houmous, concombre mariné, sauce tomate épicée",
  //     price: 11.5,
  //     allergens: [this.allergens[0], this.allergens[3], this.allergens[2]],
  //   },
  //   {
  //     name: 'Double Decker',
  //     image: '../../img/produits/double-dekker.jpg',
  //     description:
  //       'Double Hamburger de viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
  //     price: 13,
  //     allergens: [this.allergens[0], this.allergens[3]],
  //   },
  //   {
  //     name: 'El Sombrero',
  //     image: '../../img/produits/el-sombrero.jpg',
  //     description:
  //       'Viande de poulet hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, salsa verde, oignons rouges, guacamole et crème aigre',
  //     price: 12,
  //     allergens: [this.allergens[0], this.allergens[1], this.allergens[2]],
  //   },
  // ];

  // basket: Basket[] = [
  //   {
  //     products: this.products[0],
  //     image: this.products[0].image,
  //     name: this.products[0].name,
  //     quantity: 2,
  //     totalPrice: this.products[0].price,
  //   },
  //   {
  //     products: this.products[1],
  //     image: this.products[1].image,
  //     name: this.products[1].name,
  //     quantity: 2,
  //     totalPrice: this.products[1].price,
  //   },
  //   {
  //     products: this.products[2],
  //     image: this.products[2].image,
  //     name: this.products[2].name,
  //     quantity: 1,
  //     totalPrice: this.products[2].price,
  //   },
  //   {
  //     products: this.products[4],
  //     image: this.products[4].image,
  //     name: this.products[4].name,
  //     quantity: 3,
  //     totalPrice: this.products[4].price,
  //   },
  //   {
  //     products: this.products[3],
  //     image: this.products[3].image,
  //     name: this.products[3].name,
  //     quantity: 1,
  //     totalPrice: this.products[3].price,
  //   },
  // ];

  goToUrl(url: string) {
    this.$router.push(url);
  }
}
</script>
<style scoped lang="scss"></style>
