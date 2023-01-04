<template lang="pug">
b-container.p-5.bg-gray(fluid)
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
        h2.text-secondary {{ $t('pages.admin.products.edit.title1') }}
      b-col.pb-3.text-center(
        sm='8'
        :md='filters ? "6" : "8"'
        lg='6'
        xl='4'
      )
        b-button.button.w-100(:to='`/${$i18n.locale}/admin/productsAdd/`') {{ $t('pages.products.edit.button1') }}
    //- b-row
    //-   b-col(
    //-     offset-sm='16'
    //-     :offset-md='filters ? "18" : "16"'
    //-     offset-xl='18'
    //-     sm='8'
    //-     :md='filters ? "6" : "8"'
    //-     lg='6'
    //-     xl='4'
    //-   )
    //-     b-button.mb-3.button.w-100(
    //-       :to='`/${$i18n.locale}/admin/ingredientsAdd/`'
    //-     ) {{ $t('pages.admin.button3') }}
    //-     b-button.mb-3.button.w-100(:to='`/${$i18n.locale}/admin/familyAdd/`') {{ $t('pages.admin.button4') }}
    //-     b-button.mb-3.button.w-100(
    //-       :to='`/${$i18n.locale}/admin/allergensAdd/`'
    //-     ) {{ $t('pages.admin.button5') }}
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
          :placeholder='$t("pages.admin.products.edit.placeholder1")'
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
              head-row-variant='darkRed'
              table-variant='gray'
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
                b-form-checkbox(
                  switch
                  v-model='data.item.onMenu'
                  @click='handleOnMenu(data.item.id, data.item.onMenu)'
                )
              template(#cell(image)='data')
                b-img(:src='getLink(data.item.id)' width='50' height='50')
              template(#cell(details)='data')
                font-awesome-icon.mt-1(
                  :icon='["fa", "pencil-alt"]'
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
  b-row
    b-col
      h3.p-3.text-center.text-secondary {{ $t('pages.admin.products.edit.title1') }}
  b-row
    b-col.mx-auto
      form(ref='form' @submit.stop.prevent='onSubmit')
        b-row
          b-col.pb-3
            .p-5.content
              b-row
                b-col
                  h5.text-secondary.title {{ $t('pages.admin.products.edit.title2') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.products.edit.label1")'
                    label-for='language1'
                  )
                    b-form-select#language1.input-form(
                      v-model='$v.language1.$model'
                      :class='{ "is-invalid": $v.language1.$error, "is-valid": !$v.language1.$invalid }'
                      :placeholder='$t("pages.admin.products.edit.placeholder1")'
                      :options='langs'
                      @blur='$v.language1.$touch()'
                    )
                    .input-error(v-if='$v.language1.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.edit.label1")'
                    label-for='name'
                  )
                    b-form-input#name.input-form(
                      v-model='$v.name.$model'
                      :class='{ "is-invalid": $v.name.$error, "is-valid": !$v.name.$invalid }'
                      :placeholder='$t("pages.admin.edit.placeholder1")'
                      type='text'
                      name='name'
                      @blur='$v.name.$touch()'
                    )
                    .input-error(v-if='$v.name.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.edit.label2")'
                    label-for='description'
                  )
                    b-form-textarea#description.input-area(
                      v-model='$v.description.$model'
                      :class='{ "is-invalid": $v.description.$error, "is-valid": !$v.description.$invalid }'
                      :placeholder='$t("pages.admin.products.edit.placeholder2")'
                      name='description'
                      @blur='$v.description.$touch()'
                    )
                    .input-error(v-if='$v.description.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                b-col
                  h5.text-secondary.title {{ $t('pages.admin.products.edit.title2') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.products.edit.label1")'
                    label-for='language2'
                  )
                    b-form-select#language2.input-form(
                      v-model='$v.language2.$model'
                      :class='{ "is-invalid": $v.language2.$error, "is-valid": !$v.language2.$invalid }'
                      :placeholder='$t("pages.admin.products.edit.placeholder1")'
                      :options='langs'
                      @blur='$v.language2.$touch()'
                    )
                    .input-error(v-if='$v.language2.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.products.edit.label1")'
                    label-for='frenchName'
                  )
                    b-form-input#frenchName.input-form(
                      v-model='$v.frenchName.$model'
                      :class='{ "is-invalid": $v.frenchName.$error, "is-valid": !$v.frenchName.$invalid }'
                      :placeholder='$t("pages.admin.products.edit.placeholder1")'
                      type='text'
                      name='frenchName'
                      @blur='$v.frenchName.$touch()'
                    )
                    .input-error(v-if='$v.frenchName.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.products.edit.label2")'
                    label-for='frenchDescription'
                  )
                    b-form-textarea#frenchDescription.input-area(
                      v-model='$v.frenchDescription.$model'
                      :class='{ "is-invalid": $v.frenchDescription.$error, "is-valid": !$v.frenchDescription.$invalid }'
                      :placeholder='$t("pages.admin.products.edit.placeholder2")'
                      name='frenchDescription'
                      @blur='$v.frenchDescription.$touch()'
                    )
                    .input-error(v-if='$v.frenchDescription.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
              b-row
                b-col
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.products.edit.label3")'
                    label-for='price'
                  )
                    b-form-input#price.input-form(
                      v-model='$v.price.$model'
                      :class='{ "is-invalid": $v.price.$error, "is-valid": !$v.price.$invalid }'
                      :placeholder='$t("pages.admin.products.edit.placeholder3")'
                      type='number'
                      step='0.5'
                      name='price'
                      @blur='$v.price.$touch()'
                    )
                    .input-error(v-if='$v.price.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                  b-form-group.m-0(
                    :label='$t("pages.admin.products.edit.label4")'
                    label-for='ingredients'
                  )
                    b-row
                      b-col
                        multiselect#ingredients(
                          v-model='$v.ingredient.$model'
                          :options='ingredients'
                          :multiple='true'
                          :placeholder='$t("pages.admin.products.edit.multiselect.placeholer4")'
                          :selectLabel='$t("pages.admin.products.edit.multiselect.label5")'
                          :selectedLabel='$t("pages.admin.products.edit.multiselect.label6")'
                          :deselectLabel='$t("pages.admin.products.edit.multiselect.label7")'
                          :searchable='true'
                          :class='{ "is-invalid": $v.ingredient.$error }'
                          label='name'
                          track-by='name'
                          @blur='$v.ingredient.$touch()'
                        )
                        .input-error.my-2(v-if='$v.ingredient.$error')
                          font-awesome-icon.mr-2(
                            :icon='["fa", "exclamation-triangle"]'
                          )
                          | {{ $t('pages.errors.required') }}
                    b-row
                      b-col.mx-auto(sm='12')
                        .flex.text-center
                          b-button.mt-3.button.w-100(
                            :to='`/${$i18n.locale}/admin/ingredientsAdd/`'
                          ) {{ $t('pages.admin.products.edit.button3') }}
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.products.edit.label8")'
                    label-for='productFamily'
                  )
                    b-row
                      b-col
                        multiselect#productFamily(
                          v-model='$v.productFamily.$model'
                          :options='families'
                          :multiple='true'
                          :placeholder='$t("pages.admin.products.edit.multiselect.placeholer")'
                          :selectLabel='$t("pages.admin.products.edit.multiselect.label")'
                          :selectedLabel='$t("pages.admin.products.edit.multiselect.label")'
                          :deselectLabel='$t("pages.admin.products.edit.multiselect.label")'
                          :searchable='true'
                          :class='{ "is-invalid": $v.productFamily.$error }'
                          label='name'
                          track-by='name'
                          @blur='$v.productFamily.$touch()'
                        )
                        .input-error(v-if='$v.productFamily.$error')
                          font-awesome-icon.mr-2(
                            :icon='["fa", "exclamation-triangle"]'
                          )
                          | {{ $t('pages.errors.required') }}
                    b-row
                      b-col.mx-auto(sm='12')
                        .flex.text-center
                          b-button.mt-3.button.w-100 {{ $t('pages.admin.products.edit.button4') }}
                b-col
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.products.edit.label9")'
                    label-for='imageName'
                  )
                    input(
                      name='image'
                      :value='imageName'
                      accept='imageUrl/jpg, imageUrl/jpeg, imageUrl/png'
                      type='file'
                      ref='fileInput'
                    )

                    //- uploadAvatar(
                    //-   :preview='$v.imageName.$model'
                    //-   :error='$v.imageName.$error'
                    //-   ref='fileInput'
                    //-   @change='$v.imageName.$model = $event'
                    //- )
                    //- .input-error.my-2(v-if='$v.imageName.$error')
                    //-   font-awesome-icon.mr-2(
                    //-     :icon='["fa", "exclamation-triangle"]'
                    //-   )
                    //-   | {{ $t('pages.errors.required') }}

                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.admin.products.edit.label10")'
                    label-for='onMenu'
                  )
                    b-form-checkbox#onMenu.checkBox(
                      v-model='onMenu'
                      name='onMenu-button'
                      switch
                      size='lg'
                    )
              .flex.text-center
                b-button.button(variant='secondary' @click='updateProduct') {{ $t('pages.admin.products.edit.button1') }}
              b-row.mt-5(align-h='center')
                b-col.p-0(cols='22')
                  b-container.p-0
                    alert(
                      :show='submitProductAdd === submitProductAddType.ERROR || submitProductAdd === submitProductAddType.SUCCESS'
                      :variant='submitProductAdd === submitProductAddType.ERROR ? "error" : "success"'
                      :icon='submitProductAdd === submitProductAddType.ERROR ? ["fa", "exclamation-triangle"] : ["fa", "check-circle"]'
                    )
                      h6.m-0.mb-2.text-center {{ errorMsg }}
  //- // MODAL DETAILS PRODUCT
  //- b-modal(
  //-   body-bg-variant='gray'
  //-   header-bg-variant='gray'
  //-   footer-bg-variant='gray'
  //-   v-if='viewDetails'
  //-   v-model='viewDetails'
  //-   right
  //- )
  //-   template(#modal-title)
  //-     b-container
  //-       b-img(
  //-         thumbnail
  //-         body-bg-variant='darkRed'
  //-         :src='getLink(currentProduct.id)'
  //-       ) 
  //-   template(#modal-footer)
  //-     //- div
  //-     //-   font-awesome-icon(:icon='["fas", "minus"]')
  //-     b-button.w-48.button(@click='viewDetails = false') {{ $t('pages.admin.products.edit.modal.button7') }}
  //-     b-button.w-48.button(
  //-       @click='goToUrl(`/${$i18n.locale}/admin/productsEdit/`)'
  //-     ) {{ $t('pages.admin.products.edit.modal.button6') }}
  //-   div
  //-     h4.text-secondary.text-center.title {{ currentProduct.name }}
  //-     .text-modal 
  //-       p {{ currentProduct.description }}
  //-   .border-top.pb-3
  //-     h6.pt-3.title.text-secondary {{ $t('pages.admin.products.edit.modal.title4') }}
  //-     .text-modal
  //-       span {{ currentProduct.currentPrice }}€
  //-   .border-top.pb-3
  //-     h6.pt-3.text-secondary.title {{ $t('pages.admin.products.edit.modal.title5') }}
  //-     .pl-3.text-modal(
  //-       v-for='(ingredient, index) in currentProduct.ingredients'
  //-       :key='index'
  //-     )
  //-       li
  //-         ul.m-0.p-0 {{ ingredient }}
  //-   .border-top
  //-     h6.pt-3.text-secondary.title {{ $t('pages.admin.products.edit.modal.title6') }}
  //-     .pl-3.text-modal(
  //-       v-for='(allergen, index) in currentProduct.allergens'
  //-       :key='index'
  //-     )
  //-       li
  //-         ul.m-0.p-0 {{ allergen }}
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';

import uploadAvatar from '@/components/global/uploadAvatar.vue';
import alert from '@/components/global/alert.vue';

import {
  Families,
  Ingredients,
  Product,
  SelectOption,
  submitProductAddType,
} from '@/utils/utils';
import { API } from '~/utils/javaBack';

@Component({
  components: { alert, uploadAvatar },
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) language1: string = '';
  @Validate({ required }) name: string = '';
  @Validate({ required }) description: string = '';
  @Validate({ required }) language2: string = '';
  @Validate({ required }) frenchName: string = '';
  @Validate({ required }) frenchDescription: string = '';
  @Validate({ required }) price: number = 0;
  @Validate({ required }) ingredient: Ingredients[] = [];
  @Validate({ required }) productFamily: Families[] = [];
  imageName: any = '';

  onMenu: boolean = false;
  viewDetails: boolean = false;

  filters: boolean = false;
  filterSearch: string = '';
  maxSize: number = 10;

  submitProductAddType = submitProductAddType;
  submitProductAdd = submitProductAddType.NONE;

  errorMsg: string = '';

  perPage: number = 8;
  currentPage: number = 1;
  totalProducts: number = 0;

  langs: SelectOption[] = [];
  products: Product[] = [];
  currentProduct: Product[] = [];
  productId: number = 0;
  translationEnId: number = 0;
  translationFrId: number = 0;
  // currentFrTranslation: Product[] = [];

  ingredients: Ingredients[] = [];
  ingredientsId: any[] = [];
  families: Families[] = [];
  familiesId: any[] = [];
  error?: boolean = false;

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

  mounted() {
    this.updateData();
  }

  updateData() {
    this.getLanguages();
    this.getBurgers();
    this.getIngredients();
    this.getFamilies();
  }

  checkLang(lang1: string, lang2: string): boolean {
    if (lang1.toString() === '2') {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.products.errors.lang1');
      return false;
    }

    if (lang2.toString() === '1') {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.products.errors.lang2');
      return false;
    }
    return true;
  }

  getLink(productId: number) {
    const link: string =
      'http://localhost:8080/products/' + productId + '/image';
    return link;
  }

  async getLanguages() {
    const response = await API.languagesList();

    if (response.status !== 200) {
      return null;
    }

    this.langs = response.data.map((lang) => ({
      value: lang.id,
      text: lang.name,
    }));
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
  }

  async getIngredients() {
    const response = await API.ingredientsListByLang(this.$i18n.locale);

    if (response.status !== 200) {
      return null;
    }

    this.ingredients = response.data;
  }

  async getFamilies() {
    const response = await API.familiesListByLang(this.$i18n.locale);

    if (response.status !== 200) {
      return;
    }

    this.families = response.data;
  }

  async getProductInfosToUpdate(id: number) {
    const response = await API.getProductSummaryById(id);

    if (response.status !== 200) {
      return;
    }

    console.log('RESPONSE', response.data);

    this.currentProduct = response.data;
    console.log('Current', this.currentProduct);

    // SET THE EDIT FIELDS WITH THE CURRENT PRODUCT TO UPDATE IT
    this.language1 = this.langs[0].value.toString();
    this.language2 = this.langs[1].value.toString();
    this.name = response.data.name;
    this.description = response.data.description;
    this.price = response.data.currentPrice;
    this.onMenu = response.data.onMenu;

    // GET FR TRANSLATION TO UPDATE
    const responseFrTranslation = await API.getProductTranslationById(id);

    if (responseFrTranslation.status !== 200) {
      return;
    }

    this.translationEnId = responseFrTranslation.data[0].id;
    this.translationFrId = responseFrTranslation.data[1].id;

    this.frenchName = responseFrTranslation.data[1].name;
    this.frenchDescription = responseFrTranslation.data[1].description;

    // GET INGREDIENT ID WITH GET PRODUCT TO SET INGREDIENTS FIELDS

    const responseGetProductIngredients = await API.getProductById(id);

    if (responseGetProductIngredients.status !== 200) {
      return;
    }
    console.log(
      'LENGTH',
      responseGetProductIngredients.data.ingredients.length
    );

    for (
      let index = 0;
      index < responseGetProductIngredients.data.ingredients.length;
      index++
    ) {
      const id = responseGetProductIngredients.data.ingredients[index].id;

      const responseIngredientTranslation =
        await API.getIngredientsTranslationById(id);

      if (responseIngredientTranslation.status !== 200) {
        return;
      }
      console.log('INGREDIENTS', responseIngredientTranslation.data);

      if (this.$i18n.locale === 'en') {
        this.ingredient.push(responseIngredientTranslation.data[0]);
        console.log('ENG');
      }
      if (this.$i18n.locale === 'fr') {
        this.ingredient.push(responseIngredientTranslation.data[1]);
        console.log('FR');
      }
    }
    console.log('THIS INGREDEINTS', this.ingredient);

    // Get FAmily To SET EDIT FIELDS
    console.log('FAMILYU LENGTH', response.data.productFamilies.length);

    for (let index = 0; index < response.data.productFamilies.length; index++) {
      const responseGetFamilyTranslation = await API.getFamilyTranslationById(
        response.data.productFamilies[index]
      );

      if (responseGetFamilyTranslation.status !== 200) {
        return;
      }

      if (this.$i18n.locale === 'en') {
        this.productFamily.push(responseGetFamilyTranslation.data[0]);
        console.log('ENG');
      }
      if (this.$i18n.locale === 'fr') {
        this.productFamily.push(responseGetFamilyTranslation.data[1]);
        console.log('FR');
      }
      console.log('FAMILYTRANSLATION', responseGetFamilyTranslation);
    }

    // this.ingredient = responseGetProductIngredients.data.ingredients;
    // this.imageName = await API.getImages(id);
    // this.productFamily = this.currentProduct[0].

    // this.frenchName = this.currentProduct[1].name;
    // this.frenchDescription = this.currentProduct[1].description;
  }

  openDetails(product: Product) {
    // this.viewDetails = true;
    this.ingredient = [];
    this.productFamily = [];
    this.productId = product.id;
    this.getProductInfosToUpdate(product.id);
  }

  checkMaxSize(file: File): boolean {
    return file.size / 1048576 <= this.maxSize;
  }

  handleChangePage(e: number) {
    this.currentPage = e;
    // this.getBurgers();
  }

  async handleOnMenu(id: number, onMenu: boolean) {
    const response = await API.getProductById(id);

    if (response.status !== 200) {
      return;
    }

    const updateOnMenu = await API.updateProducts(
      id,
      response.data.image,
      response.data.ingredients,
      response.data.productFamilies,
      onMenu
    );

    if (updateOnMenu.status !== 200) {
      return;
    }

    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.products.edit.success.onMenu');
  }

  async updateProduct() {
    if (!this.checkLang(this.language1, this.language2)) {
      return;
    }

    this.$v.$touch();

    if (this.$v.$invalid) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.products.errors.fields');
      return;
    }

    console.log('INGREDIENTS:', this.ingredient);

    /* CONFIGURE INGREDIENTS AND FAMILY TABLE TO SEND TO BACK */
    this.ingredientsId = this.ingredient.map((ing) => ({
      id: ing.ingredientId,
      allergens: ing.allergens,
    }));

    this.familiesId = this.productFamily.map((family) => ({
      id: family.productFamilyId,
    }));

    /** UPDATE PRODUCT */
    const responseUpdateProduct = await API.updateProducts(
      this.productId,
      this.imageName,
      this.ingredientsId,
      this.familiesId,
      this.onMenu
    );

    if (responseUpdateProduct.status !== 200) {
      return;
    }

    /** GET ENGLISH LANGUAGE */
    const englishId = parseInt(this.language1);

    const responseEnglishLang = await API.getLanguageById(englishId);

    if (responseEnglishLang.status !== 200) {
      // this.submitProductAdd = submitProductAddType.ERROR;
      // this.errorMsg = this.$tc('pages.admin.ingredients.errors.getLanguage');
      return;
    }

    const englishLang = responseEnglishLang.data;

    /** UPDATE ENGLISH TRANSLATION */
    const responseUpdateProductTranslationEn =
      await API.updateProductTranslation(
        this.translationEnId,
        this.description,
        this.name,
        englishLang,
        this.productId
      );

    if (responseUpdateProductTranslationEn.status !== 200) {
      return;
    }

    /** GET FRENCH LANGUAGE */
    const frenchId = parseInt(this.language2);

    const responseFrenchLang = await API.getLanguageById(frenchId);

    if (responseFrenchLang.status !== 200) {
      // this.submitProductAdd = submitProductAddType.ERROR;
      // this.errorMsg = this.$tc('pages.admin.ingredients.errors.getLanguage');
      return;
    }

    const frenchLang = responseFrenchLang.data;

    /** UPDATE FRENCH TRANSLATION */
    const responseUpdateProductTranslationFr =
      await API.updateProductTranslation(
        this.translationFrId,
        this.frenchDescription,
        this.frenchName,
        frenchLang,
        this.productId
      );

    if (responseUpdateProductTranslationFr.status !== 200) {
      return;
    }

    /** SET NEW PRICE */

    const currentPrice: any = {
      amount: this.price,
    };

    const responseUpdatePrice = await API.setProductPrice(
      this.productId,
      currentPrice
    );

    if (responseUpdatePrice.status !== 200) {
      return;
    }

    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.products.edit.success');
    this.updateData();
    console.log('UPDATED PRODUCT');
    // console.log('FILE', this.image.size);
  }
}
</script>
