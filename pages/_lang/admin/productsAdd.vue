<template lang="pug">
b-container.p-5.bg-gray(fluid)
  b-row
    b-col
      h3.p-3.text-center.text-secondary {{ $t('pages.admin.products.add.title1') }}
  b-row
    b-col.mx-auto(md='16' lg='12' xl='10')
      form(ref='form' @submit.stop.prevent='onSubmit')
        b-row.mb-1
          b-col.pb-3
            b-container.p-4.content.mb-5
              .div.p-0(v-if='stepProductAdd === stepProductAddType.STEP1')
                h5.text-secondary.title {{ $t('pages.admin.products.add.title2') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.products.add.label1")'
                  label-for='language1'
                )
                  b-form-select#language1.input-form(
                    v-model='$v.language1.$model'
                    :class='{ "is-invalid": $v.language1.$error, "is-valid": !$v.language1.$invalid }'
                    :placeholder='$t("pages.admin.products.add.placeholder1")'
                    :options='langs'
                    @blur='$v.language1.$touch()'
                  )
                  .input-error(v-if='$v.language1.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.products.add.label2")'
                  label-for='name'
                )
                  b-form-input#name.input-form(
                    v-model='$v.name.$model'
                    :class='{ "is-invalid": $v.name.$error, "is-valid": !$v.name.$invalid }'
                    :placeholder='$t("pages.admin.products.add.placeholder2")'
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
                  :label='$t("pages.admin.products.add.label3")'
                  label-for='description'
                )
                  b-form-textarea#description.input-area(
                    v-model='$v.description.$model'
                    :class='{ "is-invalid": $v.description.$error, "is-valid": !$v.description.$invalid }'
                    :placeholder='$t("pages.admin.products.add.placeholder3")'
                    name='description'
                    @blur='$v.description.$touch()'
                  )
                  .input-error(v-if='$v.description.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
              .div.p-0(v-if='stepProductAdd === stepProductAddType.STEP2')
                h5.text-secondary.title {{ $t('pages.admin.products.add.title3') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.products.add.label1")'
                  label-for='language2'
                )
                  b-form-select#language2.input-form(
                    v-model='$v.language2.$model'
                    :class='{ "is-invalid": $v.language2.$error, "is-valid": !$v.language2.$invalid }'
                    :placeholder='$t("pages.admin.products.add.placeholder1")'
                    :options='langs'
                    @blur='$v.language2.$touch()'
                  )
                  .input-error(v-if='$v.language2.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.products.add.label2")'
                  label-for='frenchName'
                )
                  b-form-input#frenchName.input-form(
                    v-model='$v.frenchName.$model'
                    :class='{ "is-invalid": $v.frenchName.$error, "is-valid": !$v.frenchName.$invalid }'
                    :placeholder='$t("pages.admin.products.add.placeholder2")'
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
                  :label='$t("pages.admin.products.add.label3")'
                  label-for='frenchDescription'
                )
                  b-form-textarea#frenchDescription.input-area(
                    v-model='$v.frenchDescription.$model'
                    :class='{ "is-invalid": $v.frenchDescription.$error, "is-valid": !$v.frenchDescription.$invalid }'
                    :placeholder='$t("pages.admin.products.add.placeholder3")'
                    name='frenchDescription'
                    @blur='$v.frenchDescription.$touch()'
                  )
                  .input-error(v-if='$v.frenchDescription.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
              .div.p-0(v-if='stepProductAdd === stepProductAddType.STEP3')
                h5.text-secondary.title {{ $t('pages.admin.products.add.title4') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.products.add.label4")'
                  label-for='price'
                )
                  b-form-input#price.input-form(
                    v-model='$v.price.$model'
                    :class='{ "is-invalid": $v.price.$error, "is-valid": !$v.price.$invalid }'
                    :placeholder='$t("pages.admin.products.add.placeholder4")'
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
                  :label='$t("pages.admin.products.add.label5")'
                  label-for='ingredients'
                )
                  b-row
                    b-col
                      multiselect#ingredients(
                        v-model='$v.ingredient.$model'
                        :options='ingredients'
                        :multiple='true'
                        :placeholder='$t("pages.admin.products.add.multiselect.placeholder1")'
                        :selectLabel='$t("pages.admin.products.add.multiselect.label1")'
                        :selectedLabel='$t("pages.admin.products.add.multiselect.label2")'
                        :deselectLabel='$t("pages.admin.products.add.multiselect.label3")'
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
                        ) {{ $t('pages.admin.products.add.button3') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.products.add.label6")'
                  label-for='productFamily'
                )
                  b-row
                    b-col
                      multiselect#productFamily(
                        v-model='$v.productFamily.$model'
                        :options='families'
                        :multiple='true'
                        :placeholder='$t("pages.admin.products.add.multiselect.placeholder2")'
                        :selectLabel='$t("pages.admin.products.add.multiselect.label4")'
                        :selectedLabel='$t("pages.admin.products.add.multiselect.label5")'
                        :deselectLabel='$t("pages.admin.products.add.multiselect.label3")'
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
                        b-button.mt-3.button.w-100 {{ $t('pages.admin.products.add.button4') }}
                b-row
                  b-col
                    //- b-form-group.pt-3.text-primary(
                    //-   :label='$t("pages.admin.products.add.label7")'
                    //-   label-for='imageName'
                    //- )
                    //-   //- input(
                    //-   //-   name='image'
                    //-   //-   :value='imageName'
                    //-   //-   accept='imageUrl/jpg, imageUrl/jpeg, imageUrl/png'
                    //-   //-   type='file'
                    //-   //-   ref='fileInput'
                    //-   //- )

                    //-   uploadImage(
                    //-     :preview='$v.imageName.$model'
                    //-     :error='$v.imageName.$error'
                    //-     ref='fileInput'
                    //-     @change='$v.imageName.$model = $event'
                    //-   )
                    //-   .input-error.my-2(v-if='$v.imageName.$error')
                    //-     font-awesome-icon.mr-2(
                    //-       :icon='["fa", "exclamation-triangle"]'
                    //-     )
                    //-     | {{ $t('pages.errors.required') }}
                    b-form-group.pt-3.text-primary(
                      :label='$t("pages.admin.products.add.label8")'
                      label-for='familyType'
                    )
                    b-form-select#familyType.input-form(
                      v-model='$v.familyType.$model'
                      :class='{ "is-invalid": $v.familyType.$error, "is-valid": !$v.familyType.$invalid }'
                      :placeholder='$t("pages.admin.products.add.placeholder8")'
                      :options='familyTypes'
                      @blur='$v.familyType.$touch()'
                    )
                    .input-error(v-if='$v.familyType.$error')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
              b-row
                b-col.mx-auto(
                  v-if='stepProductAdd === stepProductAddType.STEP2 || stepProductAdd === stepProductAddType.STEP3'
                  sm='12'
                )
                  b-button.mt-3.button.w-100(
                    variant='secondary'
                    @click='previousStep'
                  ) {{ $t('pages.admin.products.add.button5') }}

                b-col.mx-auto(
                  v-if='stepProductAdd === stepProductAddType.STEP1 || stepProductAdd === stepProductAddType.STEP2'
                  sm='12'
                )
                  b-button.mt-3.button.w-100(
                    variant='secondary'
                    @click='nextStep'
                  ) {{ $t('pages.admin.products.add.button2') }}
                //- b-row
                b-col.mx-auto(
                  v-if='stepProductAdd === stepProductAddType.STEP3'
                  sm='12'
                )
                  b-button.mt-3.button.w-100(
                    variant='secondary'
                    @click='createProduct'
                  ) {{ $t('pages.admin.products.add.button1') }}
              b-row.mt-5(align-h='center')
                b-col.p-0(cols='22')
                  b-container.p-0
                    alert(
                      :show='submitProductAdd === submitProductAddType.ERROR || submitProductAdd === submitProductAddType.SUCCESS'
                      :variant='submitProductAdd === submitProductAddType.ERROR ? "error" : "success"'
                      :icon='submitProductAdd === submitProductAddType.ERROR ? ["fa", "exclamation-triangle"] : ["fa", "check-circle"]'
                    )
                      h6.m-0.mb-2.text-center {{ errorMsg }}
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { minValue, required } from 'vuelidate/lib/validators';
import uploadImage from '@/components/global/uploadImage.vue';
import alert from '@/components/global/alert.vue';

import {
  Families,
  Ingredients,
  SelectOption,
  stepProductAddType,
  submitProductAddType,
} from '@/utils/utils';
import { API } from '@/utils/javaBack';

@Component({
  components: { alert, uploadImage },
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) name: string = '';
  @Validate({ required }) description: string = '';
  @Validate({ required, minValue: minValue(0) }) price: number = 0;
  @Validate({ required }) ingredient: Ingredients[] = [];
  @Validate({ required }) language1: string = '1';
  @Validate({ required }) language2: string = '2';
  @Validate({ required }) frenchName: string = '';
  @Validate({ required }) frenchDescription: string = '';
  @Validate({ required }) productFamily: Families[] = [];
  @Validate({ required }) ingredientName: string = '';
  @Validate({ required }) ingredientDescription: string = '';
  @Validate({ required }) familyType: string = '0';

  imageName: string = '';
  ingredients: Ingredients[] = [];
  ingredientsId: any[] = [];
  langs: SelectOption[] = [];
  productFamilies: any[] = [];
  families: Families[] = [];
  familyTypes: SelectOption[] = [];

  stepProductAddType = stepProductAddType;
  stepProductAdd = stepProductAddType.STEP1;
  submitProductAddType = submitProductAddType;
  submitProductAdd = submitProductAddType.NONE;

  // imageUrl: any = '';
  maxSize: number = 10;

  errorMsg: string = '';
  error?: boolean = false;

  mounted() {
    if (this.$store.state.users.currentUser.role.name !== 'admin') {
      return this.$router.push(`/${this.$i18n.locale}/error`);
    }

    this.updateData();
  }

  checkMaxSize(file: File): boolean {
    return file.size / 1048576 <= this.maxSize;
  }

  // async upload(productId: number, imageName: FormData) {
  //   const response = await API.uploadImage(productId, imageName);

  //   if (response.status !== 200) {
  //     return null;
  //   }
  // }

  async getIngredients() {
    const response = await API.ingredientsListByLang(this.$i18n.locale);

    if (response.status !== 200) {
      return null;
    }

    this.ingredients = response.data;
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

  async getFamilyTypes() {
    const response = await API.getTypesList();

    if (response.status !== 200) {
      return;
    }

    const filterType = response.data.filter(
      (type) => type.language.abbreviation?.toLowerCase() === this.$i18n.locale
    );

    this.familyTypes = filterType.map((type) => ({
      value: type.typeId,
      text: type.name[0].toUpperCase() + type.name.slice(1),
    }));
    this.familyTypes.push({
      value: 0,
      text: this.$tc('pages.admin.products.add.label9'),
    });
  }

  updateData() {
    this.getIngredients();
    this.getLanguages();
    this.getFamilies();
    this.getFamilyTypes();
  }

  async getFamilies() {
    const response = await API.familiesListByLang(this.$i18n.locale);

    if (response.status !== 200) {
      return;
    }

    this.families = response.data;
  }

  nextStep() {
    if (this.stepProductAdd === stepProductAddType.STEP1) {
      this.$v.language1.$touch();
      this.$v.name.$touch();
      this.$v.description.$touch();
      if (
        this.$v.language1.$invalid ||
        this.$v.name.$invalid ||
        this.$v.description.$invalid
      ) {
        this.submitProductAdd = submitProductAddType.ERROR;
        this.errorMsg = this.$tc('pages.admin.products.errors.fields');
        setTimeout(() => {
          this.submitProductAdd = submitProductAddType.NONE;
          this.errorMsg = '';
        }, 4000);
        return;
      }
      if (!this.checkLang(this.language1, this.language2)) {
        return;
      }
      this.submitProductAdd = submitProductAddType.NONE;
      this.stepProductAdd = stepProductAddType.STEP2;
      setTimeout(() => {
        this.submitProductAdd = submitProductAddType.NONE;
        this.errorMsg = '';
      }, 4000);
      return;
    }

    if (this.stepProductAdd === stepProductAddType.STEP2) {
      this.$v.language2.$touch();
      this.$v.frenchName.$touch();
      this.$v.frenchDescription.$touch();
      if (
        this.$v.language2.$invalid ||
        this.$v.frenchName.$invalid ||
        this.$v.frenchDescription.$invalid
      ) {
        this.submitProductAdd = submitProductAddType.ERROR;
        this.errorMsg = this.$tc('pages.admin.products.errors.fields');
        setTimeout(() => {
          this.submitProductAdd = submitProductAddType.NONE;
          this.errorMsg = '';
        }, 4000);

        return;
      }

      // this.submitProductAdd = submitProductAddType.NONE;
    }
    if (this.checkLang(this.language1, this.language2)) {
      this.stepProductAdd = stepProductAddType.STEP3;
    }
  }

  previousStep() {
    if (this.stepProductAdd === stepProductAddType.STEP2) {
      this.stepProductAdd = stepProductAddType.STEP1;
    }
    if (this.stepProductAdd === stepProductAddType.STEP3) {
      this.stepProductAdd = stepProductAddType.STEP2;
    }
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

  async createProduct() {
    this.$v.price.$touch();
    this.$v.ingredient.$touch();
    this.$v.productFamily.$touch();
    // this.$v.imageName.$touch();
    this.$v.familyType.$touch();

    if (
      this.$v.price.$invalid ||
      this.$v.ingredient.$invalid ||
      this.$v.productFamily.$invalid ||
      // this.$v.imageName.$invalid ||
      this.$v.familyType.$invalid
    ) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.products.errors.fields');
      setTimeout(() => {
        this.submitProductAdd = submitProductAddType.NONE;
        this.errorMsg = '';
      }, 4000);
      return;
    }

    if (this.familyType === '0') {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.products.errors.type');
      setTimeout(() => {
        this.submitProductAdd = submitProductAddType.NONE;
        this.errorMsg = '';
      }, 4000);
      return;
    }

    this.ingredientsId = this.ingredient.map((ingredient) => ({
      id: ingredient.ingredientId,
    }));

    this.productFamilies = this.productFamily.map((family) => ({
      id: family.productFamilyId,
    }));

    const responseCreateProduct = await API.addProducts(
      this.ingredientsId,
      this.productFamilies,
      parseInt(this.familyType),
      true
    );

    if (responseCreateProduct.status !== 200) {
      return null;
    }

    const englishId = parseInt(this.language1);

    const responseEnglishLang = await API.getLanguageById(englishId);

    if (responseEnglishLang.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.add.errors.getLanguage');
      return;
    }

    const englishLang = responseEnglishLang.data;

    const responseCreateProductEnTranslation = await API.addProductsTranslation(
      this.description,
      this.name,
      englishLang,
      responseCreateProduct.data.id
    );

    if (responseCreateProductEnTranslation.status !== 200) {
      return null;
    }

    const frenchId = parseInt(this.language2);

    const responseFrenchLang = await API.getLanguageById(frenchId);

    if (responseFrenchLang.status !== 200) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.add.errors.getLanguage');
      return;
    }
    const frenchLang = responseFrenchLang.data;

    const responseCreateProductFrTranslation = await API.addProductsTranslation(
      this.frenchDescription,
      this.frenchName,
      frenchLang,
      responseCreateProduct.data.id
    );

    if (responseCreateProductFrTranslation.status !== 200) {
      return null;
    }

    const currentPrice: any = {
      amount: this.price,
    };
    const responsePrice = await API.setProductPrice(
      responseCreateProduct.data.id,
      currentPrice
    );

    if (responsePrice.status !== 200) {
      return null;
    }

    // const fileInput = (this.$refs.fileInput as HTMLInputElement)
    //   .files as FileList;
    // // //   .files as FileList;
    // const file = fileInput.item(0) as File;

    // console.log('FILE', fileInput);22
    // const formData = new FormData();
    // console.log('B4 FORMDATA', this.imageName);

    // formData.append('image', this.imageName);
    // console.log('AFTER FORMADATA', formData);

    // console.log('FILE', formData);

    // const responseUploadImg = await API.uploadImage(
    //   responseCreateProduct.data.id,
    //   formData
    // );

    // if (responseUploadImg.status !== 200) {
    //   return null;
    // }
    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.products.success.create');
    setTimeout(() => {
      this.submitProductAdd = submitProductAddType.NONE;
      this.errorMsg = '';
    }, 4000);
  }
}
</script>
<style scoped>
.checkBox:checked {
  color: var(--secondary);
}
</style>
