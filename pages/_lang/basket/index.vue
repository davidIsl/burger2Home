<template lang="pug">
b-container.p-4.bg-gray(fluid)
  b-row
    b-col.mt-2.mx-auto(offset-md='1')
      h3.p-1.text-secondary.title-line {{ $t('pages.basket.title1') }}
    //- b-col.mt-2(md='6')
    //-   h3.p-1.text-secondary.title-line {{ $t('pages.basket.title2') }}
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
          :total-rows='$store.state.baskets.basketLine.length'
          :per-page='perPage'
          align='right'
        )
    b-col.mt-3(md='6' lg='4')
      .py-2.content
        p.mb-1.pb-2.text-center.border-bottom.title.text-secondary {{ $t('pages.basket.text1') }} {{ this.$store.state.baskets.totalPrice }}€
        .p-3
          //- b-button.mb-2.w-100.button(@click='saveBasket') Save Basket
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
                //- .input-error(v-if='$v.addresses.$error')
                //-   font-awesome-icon.mr-2(
                //-     :icon='["fa", "exclamation-triangle"]'
                //-   )
                //-   | {{ $t('pages.errors.required') }}
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
    b-col(v-if='stepOrder === stepOrderType.STEP2' md='19')
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
  // quantityToOrder: number[] = [1, 2, 3, 4, 5];
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
    console.log('ADD', this.add);

    if (this.add.length === 1) {
      this.submitOrder = submitOrderType.ERROR;
      this.errorMsg = this.$tc('pages.basket.errors.address');
      setTimeout(() => {
        this.submitOrder = submitOrderType.NONE;
        this.errorMsg = '';
      }, 4000);
      // return this.$router.push(`/${this.$i18n.locale}/account/profile`);
    }
  }

  async handleChangeAddress() {
    console.log('ADDRESS', this.addresses);
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

    console.log('READ ONLY', responseAddress.data);
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
    console.log('QUANTITE PANIER', this.$store.state.baskets.quantity);

    for (const line of this.$store.state.baskets.basketLine) {
      if (line.productId === productId) {
        if (line.amount <= 0) {
          console.log('inferieur a ZERO');
          this.$store.commit('baskets/removeBasketLine', productId);
        }
      }
    }
    // if (this.$store.state.baskets.basketLine[0].amount <= 0) {
    // }
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
    // let isSameOrder: boolean = false;
    let value: number = 0;

    for (const line of responseOrders.data) {
      if (line.status === 'waiting_for_payment') {
        console.log('WAITING');

        if (
          line.orderLines.length === this.$store.state.baskets.basketLine.length
        ) {
          console.log('LENGTH');
          for (let i = 0; i < line.orderLines.length; i++) {
            for (
              let j = 0;
              j < this.$store.state.baskets.basketLine.length;
              j++
            ) {
              // console.log('PRODUCT LOOP ORDER', line.orderLines[i].productId);
              // console.log('QUANTITY LOOP ORDER', line.orderLines[i].amount);
              // console.log(
              //   'PRODUCT LOOP STORE',
              //   this.$store.state.baskets.basketLine[j].productId
              // );
              // console.log(
              //   'QUANTITY LOOP STORE',
              //   this.$store.state.baskets.basketLine[j].amount
              // );

              if (
                line.orderLines[i].productId ===
                  this.$store.state.baskets.basketLine[j].productId &&
                line.orderLines[i].amount ===
                  this.$store.state.baskets.basketLine[j].amount
              ) {
                value++;
                // console.log('VALUES', value);
              }
              if (value === line.orderLines.length) {
                existingOrders = line;
              }
            }
          }
        }
      }
      console.log('EXISTIBNG ORDERS ', existingOrders);
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
      console.log('ADRESSES IF', this.addresses);
    } else {
      console.log('ADRESSES ELSE', this.addresses);
      addId = parseInt(this.addresses);
    }

    if (!existingOrders) {
      console.log('CREATED ORDER');

      const response = await API.addOrder(
        this.$store.state.users.basketId,
        addId
      );

      if (response.status !== 200) {
        return;
      }

      order = response.data;
    } else {
      console.log('FIND ORDER');

      order = existingOrders;
    }

    // PAYMENT
    try {
      const responseConfirmPayment = await API.confirmPayment(
        order.id,
        paymentMethod.id
      );

      if (responseConfirmPayment.status !== 200) {
        console.log('ERROR CONFIRM PAYMENT');
        return;
      }
    } catch (error) {
      this.submitOrder = submitOrderType.ERROR;
      this.errorMsg = this.$tc('pages.basket.stripe.funds');
      setTimeout(() => {
        this.submitOrder = submitOrderType.NONE;
        this.errorMsg = '';
      }, 4000);
      return;
    }

    // if (responseConfirmPayment.status === 500) {
    //   this.submitOrder = submitOrderType.ERROR;
    //   this.errorMsg = this.$tc('pages.basket.stripe.insufficantsFunds');
    // }

    // CONFIRM SHIPMENT
    const responseConfirmeShipment = await API.confirmShipment(order.id);

    if (responseConfirmeShipment.status !== 200) {
      console.log('ERRROR CONFIRM SHIPMENT');

      return;
    }

    // RESET STORE BASKET & DELETE BASKET LINES IN DB
    this.$store.commit('baskets/resetBasket');
    this.deleteBasket();
    console.log('ORDER FINISH');
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
      console.log('PAS CONNECTE');

      return;
    }

    const responseBasket = await API.getBasketByUserId(
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
  }

  // async saveBasket() {
  //   if (this.$store.state.users.currentUser === null) {
  //     console.log('PAS CONNECTE');

  //     return;
  //   }

  //   const responseBasket = await API.getBasketByUserId(
  //     this.$store.state.users.currentUser.id
  //   );

  //   if (responseBasket.status !== 200) {
  //     return;
  //   }

  //   const lastUpdated = formatDate(new Date().toString());
  //   console.log('STORE BL:', this.$store.state.baskets.basketLine);

  //   // const basketLines: any = this.$store.state.baskets.basketLine.map(
  //   //   (line: any) => ({
  //   //     id: line.id,
  //   //     basketId: line.basketId,
  //   //     productId: line.productId,
  //   //     amount: line.amount,
  //   //   })
  //   // );

  //   const responseUpdateBasket = await API.updateBasket(
  //     responseBasket.data.id,
  //     lastUpdated,
  //     responseBasket.data.userId
  //   );

  //   if (responseUpdateBasket.status !== 200) {
  //     return;
  //   }

  //   const responseBasketLines = await API.getBasketLinesByBasketId(
  //     responseBasket.data.id
  //   );

  //   if (responseBasketLines.status !== 200) {
  //     return;
  //   }

  //   console.log('LINES', responseBasketLines.data);

  //   for (let i = 0; i < responseBasketLines.data.length; i++) {
  //     const responseRemoveExistingLines = await API.removeBasketLine(
  //       responseBasketLines.data[i].id as number
  //     );
  //     if (responseRemoveExistingLines.status !== 200) {
  //       return;
  //     }
  //   }

  //   for (let i = 0; i < this.$store.state.baskets.basketLine.length; i++) {
  //     const responseCreateBasketLine = await API.addBasketLine(
  //       responseBasket.data.id,
  //       this.$store.state.baskets.basketLine[i].productId,
  //       this.$store.state.baskets.basketLine[i].amount
  //     );

  //     if (responseCreateBasketLine.status !== 200) {
  //       return;
  //     }
  //   }
  //   console.log('UPDATED BASKET OK');

  //   // this.$store.commit('baskets/resetBasket');

  //   // const responseAdress = await API.get;
  // }

  createOrder() {
    if (this.$store.state.users.currentUser === null) {
      this.submitOrder = submitOrderType.ERROR;
      this.errorMsg = this.$tc('pages.basket.errors.notLog');
      setTimeout(() => {
        this.submitOrder = submitOrderType.NONE;
        this.errorMsg = '';
      }, 4000);
      console.log('PAS CONNECTE');

      return;
    }

    if (this.$store.state.baskets.basketLine.length <= 0) {
      this.submitOrder = submitOrderType.ERROR;
      this.errorMsg = this.$tc('pages.basket.errors.emptyBasket');
      setTimeout(() => {
        this.submitOrder = submitOrderType.NONE;
        this.errorMsg = '';
      }, 4000);
      console.log('PANIUER VIDE');

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

  // async payOrder() {
  //   const response = await API.addOrder();
  // }

  goToUrl(url: string) {
    this.$router.push(url);
  }
}
</script>
<style scoped lang="scss"></style>
