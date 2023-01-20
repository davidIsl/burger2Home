<template lang="pug">
b-container.p-4.bg-gray(fluid)
  b-row
    b-col.mt-2.mx-auto(offset-md='1')
      h3.p-1.text-secondary.title-line {{ $t('pages.basket.title1') }}
  b-row
    b-col.mt-3.mx-auto(offset-md='1' md='18')
      .p-3.content
        b-table(
          hover
          borderless
          responsive
          head-row-variant='darkRed'
          table-variant='gray'
          :current-page='currentPage'
          :perPage='perPage'
          :items='$store.state.baskets.basketLine'
          :fields='fieldsBasket'
        )
          template(#head(product.imageName)='data')
            span {{ $t('pages.basket.table.image') }}
          template(#head(product.name)='data')
            span {{ $t('pages.basket.table.name') }}
          template(#head(product.actualPrice)='data')
            span {{ $t('pages.basket.table.price') }}
          template(#head(amount)='data')
            span {{ $t('pages.basket.table.amount') }}
          template(#head(trash)='data')
            span {{ $t('pages.basket.table.trash') }}

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
          :total-rows='$store.state.baskets.basketLine.length'
          :per-page='perPage'
          align='right'
        )
    b-col.mt-3(md='6' lg='4')
      .py-2.content
        p.mb-1.pb-2.text-center.border-bottom.title.text-secondary {{ $t('pages.basket.text1') }} {{ this.$store.state.baskets.totalPrice }}€
        .p-3
          b-button.mb-2.w-100.button(
            v-if='stepOrder === stepOrderType.NONE'
            @click='createOrder'
          ) {{ $t('pages.basket.button1') }}
          b-button.mb-2.w-100.button(
            @click='goToUrl("/" + $i18n.locale + "/account/")'
          ) {{ $t('pages.basket.button2') }}
          b-button.mb-2.w-100.button(
            @click='goToUrl("/" + $i18n.locale + "/account/register/")'
          ) {{ $t('pages.basket.button3') }}

  b-row
    b-col(
      v-if='stepOrder === stepOrderType.STEP1'
      offset-lg='1'
      offset='0'
      md='18'
    )
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
                v-model='addresses'
                :placeholder='$t("pages.basket.placeholder1")'
                :options='add'
                selected='0'
                @change='handleChangeAddress'
              )

          b-col(offset-lg='2' md='12' lg='10')
            b-form-group(:label='$t("pages.basket.label7")' label-for='note')
              b-form-input#note.input-form(
                v-model='$v.note.$model'
                :class='{ "is-invalid": $v.note.$error, "is-valid": !$v.note.$invalid }'
                :placeholder='$t("pages.basket.placeholder7")'
                type='text'
                name='note'
                @blur='$v.note.$touch()'
              )
              .input-error(v-if='$v.note.$error')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.required') }}
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
                :disabled='isReadOnly'
                name='address'
                @blur='$v.address.$touch()'
              )
              .input-error(v-if='$v.address.$error && $v.address.maxLength')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.required') }}
              .input-error(v-if='!$v.address.maxLength')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.MaxLength') }}
          b-col.mx-auto(md='12' lg='10')
            b-form-group(:label='$t("pages.basket.label3")' label-for='number')
              b-form-input#number.input-form(
                v-model='$v.number.$model'
                :class='{ "is-invalid": $v.number.$error, "is-valid": !$v.number.$invalid }'
                :placeholder='$t("pages.basket.placeholder3")'
                type='number'
                :disabled='isReadOnly'
                min=0
                name='number'
                @blur='$v.number.$touch()'
              )
              .input-error(v-if='$v.number.$error')
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
                :disabled='isReadOnly'
                name='zip'
                @blur='$v.zip.$touch()'
              )
              .input-error(v-if='$v.zip.$error && $v.zip.zipRegex')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.required') }}
              .input-error(v-if='!$v.zip.zipRegex')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.zipcode') }}
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
                :disabled='isReadOnly'
                name='city'
                @blur='$v.city.$touch()'
              )
              .input-error(v-if='$v.city.$error')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.required') }}
        b-row
          b-col.mx-auto(md='12' lg='10')
            b-form-group(:label='$t("pages.basket.label8")' label-for='label')
              b-form-input#label.input-form(
                v-model='$v.label.$model'
                :class='{ "is-invalid": $v.label.$error, "is-valid": !$v.label.$invalid }'
                :placeholder='$t("pages.basket.placeholder8")'
                type='text'
                :disabled='isReadOnly'
                name='label'
                @blur='$v.label.$touch()'
              )
              .input-error(v-if='$v.label.$error')
                font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
                | {{ $t('pages.errors.required') }}
          b-col.mx-auto(md='12' lg='10')
            b-form-group(
              :label='$t("pages.basket.label4")'
              label-for='extension'
            )
              b-form-input#extension.input-form(
                v-model='extension'
                :placeholder='$t("pages.basket.placeholder4")'
                type='number'
                :disabled='isReadOnly'
                name='extension'
              )

        b-row
          b-col.mx-auto(md='6')
            b-button.w-100.button(@click='nextStep') {{ $t('pages.basket.button4') }}
  b-row.mt-3
    b-col.p-0(v-if='stepOrder === stepOrderType.STEP2' offset-md='1' md='18')
      stripePay(@handleChangeStripe='handleChangeStripe')
  b-row.mt-3
    b-col(offset-lg='1' offset='0' md='18')
      .p-5.content(v-if='submitOrder !== submitOrderType.NONE')
        alert(
          :show='submitOrder === submitOrderType.ERROR || submitOrder === submitOrderType.SUCCESS'
          :variant='submitOrder === submitOrderType.ERROR ? "error" : "success"'
          :icon='submitOrder === submitOrderType.ERROR ? ["fa", "exclamation-triangle"] : ["fa", "check-circle"]'
        )
          h6.m-0.mb-2.text-center {{ errorMsg }}
</template>
<script lang="ts">
import { mixins, Component } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required, maxLength, helpers } from 'vuelidate/lib/validators';
import {
  Basket,
  formatDate,
  Product,
  SelectOption,
  stepOrderType,
  submitOrderType,
} from '@/utils/utils';
import { API } from '~/utils/javaBack';
import stripePay from '@/components/stripe/stripePay.vue';
import alert from '@/components/global/alert.vue';

const zipRegex = helpers.regex('zipRegex', /^(?:(?:[1-9])(?:\d{3}))$/);

@Component({
  components: { alert, stripePay },
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) addresses: string = '0';
  @Validate({ required, maxLength: maxLength(45) }) address: string = '';
  @Validate({ required, maxLength: maxLength(45) }) city: string = '';
  @Validate({ required, zipRegex }) zip: number = 0;
  @Validate({ required }) number: number = 0;
  @Validate({ required }) label: string = '';
  @Validate({ maxLength: maxLength(255) }) note: string = '';
  extension: number = 0;
  isReadOnly: boolean = false;

  add: SelectOption[] = [];
  filters: boolean = false;
  filterSearch: string = '';

  currentPage: number = 1;
  perPage: number = 8;
  totalRows: number = 0;
  currentBasket: Basket | null = null;
  products: Product[] | null = null;

  errorMsg: string = '';
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
    // this.getAddressByUser(this.$store.state.users.currentUser.id);
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
    this.add.push({
      value: 0,
      text: 'Please, Select an Address',
    });

    if (this.add.length === 1) {
      this.submitOrder = submitOrderType.ERROR;
      this.errorMsg = this.$tc('pages.basket.errors.address');
      setTimeout(() => {
        this.submitOrder = submitOrderType.NONE;
        this.errorMsg = '';
      }, 4000);
    }
  }

  async handleChangeAddress() {
    const responseAddress = await API.getAddressById(parseInt(this.addresses));

    if (responseAddress.status !== 200) {
      return;
    }

    this.isReadOnly = true;
    this.address = responseAddress.data.street;
    this.number = responseAddress.data.number;
    this.zip = responseAddress.data.zipcode;
    this.city = responseAddress.data.city;
    this.label = responseAddress.data.label;

    if (responseAddress.data.extension !== null) {
      this.extension = responseAddress.data.extension;
    }
  }

  incrementQuantity(productId: number) {
    this.$store.commit('baskets/incrementAmount', productId);
    this.$store.dispatch(
      'baskets/saveBasket',
      this.$store.state.users.currentUser.id
    );
  }

  decrementQuantity(productId: number) {
    this.$store.commit('baskets/decrementAmount', productId);
    this.$store.dispatch(
      'baskets/saveBasket',
      this.$store.state.users.currentUser.id
    );

    for (const line of this.$store.state.baskets.basketLine) {
      if (line.productId === productId) {
        if (line.amount <= 0) {
          this.$store.commit('baskets/removeBasketLine', productId);
        }
      }
    }
  }

  removeProduct(productId: number) {
    this.$store.commit('baskets/removeBasketLine', productId);
    this.$store.dispatch(
      'baskets/saveBasket',
      this.$store.state.users.currentUser.id
    );
  }

  getLink(productId: number) {
    const link: string =
      'http://localhost:8080/products/' + productId + '/image';
    return link;
  }

  async handleChangeStripe(paymentMethod: any) {
    const responseOrders = await API.getAllOrdersByUserId(
      this.$store.state.users.currentUser.id
    );

    if (responseOrders.status !== 200) {
      return;
    }

    let existingOrders;
    let value: number = 0;

    for (const line of responseOrders.data) {
      if (line.status === 'waiting_for_payment') {
        if (
          line.orderLines.length === this.$store.state.baskets.basketLine.length
        ) {
          for (let i = 0; i < line.orderLines.length; i++) {
            for (
              let j = 0;
              j < this.$store.state.baskets.basketLine.length;
              j++
            ) {
              if (
                line.orderLines[i].productId ===
                  this.$store.state.baskets.basketLine[j].productId &&
                line.orderLines[i].amount ===
                  this.$store.state.baskets.basketLine[j].amount
              ) {
                value++;
              }
              if (value === line.orderLines.length) {
                existingOrders = line;
              }
            }
          }
        }
      }
    }

    let order;
    let addId;

    if (this.addresses === '0') {
      const responseAddress = await API.addAddress(
        this.$store.state.users.currentUser.id,
        this.city,
        this.zip,
        this.address,
        this.number,
        this.label,
        this.extension
      );

      if (responseAddress.status !== 200) {
        return;
      }

      addId = responseAddress.data.id;
    } else {
      addId = parseInt(this.addresses);
    }

    if (!existingOrders) {
      const response = await API.addOrder(
        this.$store.state.users.basketId,
        addId
      );

      if (response.status !== 200) {
        return;
      }

      order = response.data;
    } else {
      order = existingOrders;
    }

    // PAYMENT
    try {
      const responseConfirmPayment = await API.confirmPayment(
        order.id,
        paymentMethod.id
      );

      if (responseConfirmPayment.status !== 200) {
        return;
      }
    } catch (error) {
      this.submitOrder = submitOrderType.ERROR;
      this.errorMsg = this.$tc('pages.basket.stripe.funds');
      setTimeout(() => {
        this.submitOrder = submitOrderType.NONE;
        this.errorMsg = '';
        this.stepOrder = stepOrderType.NONE;
      }, 4000);
      return;
    }

    // CONFIRM SHIPMENT
    const responseConfirmeShipment = await API.confirmShipment(order.id);

    if (responseConfirmeShipment.status !== 200) {
      return;
    }

    // RESET STORE BASKET & DELETE BASKET LINES IN DB
    this.$store.commit('baskets/resetBasket');
    this.deleteBasket();
    this.stepOrder = stepOrderType.NONE;
    this.submitOrder = submitOrderType.SUCCESS;
    this.errorMsg = this.$tc('pages.basket.success.order');
    setTimeout(() => {
      this.submitOrder = submitOrderType.NONE;
      this.errorMsg = '';
    }, 4000);
  }

  async deleteBasket() {
    if (this.$store.state.users.currentUser === null) {
      return;
    }

    const responseBasket = await API.getBasketByUserId(
      this.$store.state.users.currentUser.id
    );

    if (responseBasket.status !== 200) {
      return;
    }

    const lastUpdated = formatDate(new Date().toString());

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

    for (let i = 0; i < responseBasketLines.data.length; i++) {
      const responseRemoveExistingLines = await API.removeBasketLine(
        responseBasketLines.data[i].id as number
      );
      if (responseRemoveExistingLines.status !== 200) {
        return;
      }
    }
  }

  createOrder() {
    if (this.$store.state.users.currentUser === null) {
      this.submitOrder = submitOrderType.ERROR;
      this.errorMsg = this.$tc('pages.basket.errors.notLog');
      setTimeout(() => {
        this.submitOrder = submitOrderType.NONE;
        this.errorMsg = '';
      }, 4000);

      return;
    }

    if (this.$store.state.baskets.basketLine.length <= 0) {
      this.submitOrder = submitOrderType.ERROR;
      this.errorMsg = this.$tc('pages.basket.errors.emptyBasket');
      setTimeout(() => {
        this.submitOrder = submitOrderType.NONE;
        this.errorMsg = '';
      }, 4000);

      return;
    }
    this.getAddressByUser(this.$store.state.users.currentUser.id);
    this.stepOrder = stepOrderType.STEP1;
  }

  nextStep() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitOrder = submitOrderType.ERROR;
      this.errorMsg = this.$tc('pages.basket.errors.fields');
      setTimeout(() => {
        this.submitOrder = submitOrderType.NONE;
        this.errorMsg = '';
      }, 4000);
      return;
    }
    this.stepOrder = stepOrderType.STEP2;
  }

  goToUrl(url: string) {
    this.$router.push(url);
  }
}
</script>
<style scoped lang="scss"></style>
