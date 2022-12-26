<template lang="pug">
b-container.p-3.bg-gray(fluid)
  b-row
    b-col
      h3.p-3.text-center.text-secondary {{ $t('pages.admin.add.title1') }}
  b-row
    b-col.mx-auto(md='16' lg='12' xl='10')
      form(ref='form' @submit.stop.prevent='onSubmit')
        b-row
          b-col.pb-3
            b-container.p-4.content
              .div.p-0(v-if='stepProductAdd === stepProductAddType.STEP1')
                h5.text-secondary.title {{ $t('pages.admin.add.title2') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.add.label")'
                  label-for='language1'
                )
                  b-form-select#language1.input-form(
                    v-model='$v.language1.$model'
                    :class='{ "is-invalid": $v.language1.$error, "is-valid": !$v.language1.$invalid }'
                    :placeholder='$t("pages.admin.add.placeholder")'
                    :options='langs'
                    @blur='$v.language1.$touch()'
                  )
                  .input-error(v-if='$v.language1.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.add.label1")'
                  label-for='name'
                )
                  b-form-input#name.input-form(
                    v-model='$v.name.$model'
                    :class='{ "is-invalid": $v.name.$error, "is-valid": !$v.name.$invalid }'
                    :placeholder='$t("pages.admin.add.placeholder1")'
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
                  :label='$t("pages.admin.add.label2")'
                  label-for='description'
                )
                  b-form-textarea#description.input-area(
                    v-model='$v.description.$model'
                    :class='{ "is-invalid": $v.description.$error, "is-valid": !$v.description.$invalid }'
                    :placeholder='$t("pages.admin.add.placeholder2")'
                    name='description'
                    @blur='$v.description.$touch()'
                  )
                  .input-error(v-if='$v.description.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
              .div.p-0(v-if='stepProductAdd === stepProductAddType.STEP2')
                h5.text-secondary.title {{ $t('pages.admin.add.title3') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.add.label")'
                  label-for='language2'
                )
                  b-form-select#language2.input-form(
                    v-model='$v.language2.$model'
                    :class='{ "is-invalid": $v.language2.$error, "is-valid": !$v.language2.$invalid }'
                    :placeholder='$t("pages.admin.add.placeholder")'
                    :options='langs'
                    @blur='$v.language2.$touch()'
                  )
                  .input-error(v-if='$v.language2.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.add.label1")'
                  label-for='frenchName'
                )
                  b-form-input#frenchName.input-form(
                    v-model='$v.frenchName.$model'
                    :class='{ "is-invalid": $v.frenchName.$error, "is-valid": !$v.frenchName.$invalid }'
                    :placeholder='$t("pages.admin.add.placeholder1")'
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
                  :label='$t("pages.admin.add.label2")'
                  label-for='frenchDescription'
                )
                  b-form-textarea#frenchDescription.input-area(
                    v-model='$v.frenchDescription.$model'
                    :class='{ "is-invalid": $v.frenchDescription.$error, "is-valid": !$v.frenchDescription.$invalid }'
                    :placeholder='$t("pages.admin.add.placeholder2")'
                    name='frenchDescription'
                    @blur='$v.frenchDescription.$touch()'
                  )
                  .input-error(v-if='$v.frenchDescription.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
              .flex.text-center(
                v-if='stepProductAdd === stepProductAddType.STEP1 || stepProductAdd === stepProductAddType.STEP2'
              )
                b-button.button(variant='secondary' @click='nextStep') {{ $t('pages.admin.add.button2') }}
              .div.p-0(v-if='stepProductAdd === stepProductAddType.STEP3')
                h5.text-secondary.title {{ $t('pages.admin.add.title4') }}
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.add.label3")'
                  label-for='price'
                )
                  b-form-input#price.input-form(
                    v-model='$v.price.$model'
                    :class='{ "is-invalid": $v.price.$error, "is-valid": !$v.price.$invalid }'
                    :placeholder='$t("pages.admin.add.placeholder3")'
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
                  :label='$t("pages.admin.add.label4")'
                  label-for='ingredients'
                )
                  multiselect#ingredients(
                    v-model='$v.ingredient.$model'
                    :options='ingredients'
                    :multiple='true'
                    :selectLabel='$t("pages.admin.selectLabel")'
                    :selectedLabel='$t("pages.admin.selectedLabel")'
                    :deselectLabel='$t("pages.admin.deselectLabel")'
                    :searchable='false'
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
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.add.label5")'
                  label-for='productFamily'
                )
                  multiselect#productFamily(
                    v-model='$v.productFamily.$model'
                    :options='families'
                    :multiple='true'
                    :selectLabel='$t("pages.admin.selectLabel")'
                    :selectedLabel='$t("pages.admin.selectedLabel")'
                    :deselectLabel='$t("pages.admin.deselectLabel")'
                    :searchable='false'
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
                b-form-group.pt-3.text-primary(
                  :label='$t("pages.admin.add.label6")'
                  label-for='imageName'
                )
                  //- input(
                  //-   :value='imageName'
                  //-   accept='imageUrl/jpg, imageUrl/jpeg, imageUrl/png'
                  //-   type='file'
                  //- )

                  uploadAvatar(
                    :preview='$v.imageName.$model'
                    :error='$v.imageName.$error'
                    ref='fileInput'
                    @change='$v.imageName.$model = $event'
                  )
                  .input-error.my-2(v-if='$v.imageName.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                .flex.text-center
                  b-button.button(variant='secondary' @click='onSubmit') {{ $t('pages.admin.add.button1') }}
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
import { required } from 'vuelidate/lib/validators';
import uploadAvatar from '@/components/global/uploadAvatar.vue';
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
  components: { alert, uploadAvatar },
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) name: string = '';
  @Validate({ required }) description: string = '';
  @Validate({ required }) price: number = 0;
  @Validate({ required }) ingredient: Ingredients[] = [];
  @Validate({ required }) imageName: string = '';
  @Validate({ required }) language1: string = '';
  @Validate({ required }) language2: string = '';
  @Validate({ required }) frenchName: string = '';
  @Validate({ required }) frenchDescription: string = '';
  @Validate({ required }) productFamily: Families[] = [];

  ingredients: Ingredients[] = [];
  ingredientsId: any[] = [];
  langs: SelectOption[] = [];
  productFamilies: any[] = [];
  families: Families[] = [];

  stepProductAddType = stepProductAddType;
  stepProductAdd = stepProductAddType.STEP1;
  submitProductAddType = submitProductAddType;
  submitProductAdd = submitProductAddType.NONE;

  // imageUrl: any = '';
  maxSize: number = 10;

  errorMsg: string = '';
  error?: boolean = false;

  mounted() {
    this.updateData();
  }

  checkMaxSize(file: File): boolean {
    return file.size / 1048576 <= this.maxSize;
  }

  async upload(productId: number, imageName: FormData) {
    const response = await API.uploadImage(productId, imageName);

    if (response.status !== 200) {
      return null;
    }
  }

  async getIngredients() {
    const response = await API.ingredientsList(this.$i18n.locale);

    if (response.status !== 200) {
      return null;
    }

    this.ingredients = response.data;
    console.log('INGREDIENTS:', this.ingredients);
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
    console.log('LANGUAGE:', this.langs);
  }

  updateData() {
    this.getIngredients();
    this.getLanguages();
    this.getFamilies();
  }

  async getFamilies() {
    const response = await API.familiesList(this.$i18n.locale);

    if (response.status !== 200) {
      return;
    }

    this.families = response.data;
    console.log('FAMILY', this.families);
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
        return;
      }
      this.stepProductAdd = stepProductAddType.STEP2;
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
        console.log('HELLO');

        return;
      }
      if (this.checkLang()) {
        this.stepProductAdd = stepProductAddType.STEP3;
      }
    }
  }

  checkLang(): boolean {
    if (this.submitProductAdd === submitProductAddType.ERROR) {
      this.submitProductAdd = submitProductAddType.NONE;
    }
    if (this.language1 !== '' && this.language1 === this.language2) {
      this.submitProductAdd = submitProductAddType.ERROR;
      this.errorMsg = this.$tc('pages.admin.add.errors');
      return false;
    }
    return true;
  }

  async onSubmit() {
    this.$v.$touch();
    console.log('ADD PRODUCT');

    this.ingredientsId = this.ingredient.map((ingredient) => ({
      id: ingredient.ingredientId,
    }));

    this.productFamilies = this.productFamily.map((family) => ({
      id: family.productFamilyId,
    }));

    const responseCreateProduct = await API.addProducts(
      this.ingredientsId,
      this.productFamilies,
      true
    );

    if (responseCreateProduct.status !== 200) {
      return null;
    }

    const englishLang: any = {
      id: 1,
    };

    const responseCreateProductEnTranslation = await API.addProductsTranslation(
      this.description,
      this.name,
      englishLang,
      responseCreateProduct.data.id
    );

    if (responseCreateProductEnTranslation.status !== 200) {
      return null;
    }

    const frenchLang: any = {
      id: 2,
    };

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
    const responsePrice = await API.setProductPrice(currentPrice);

    if (responsePrice.status !== 200) {
      return null;
    }

    this.submitProductAdd = submitProductAddType.SUCCESS;
    this.errorMsg = this.$tc('pages.admin.add.success');
    // const fileInput = this.$refs.fileInput as HTMLInputElement;
    // const file = fileInput.files[0];

    // console.log('FILE', file);
    // const formData = new FormData();
    // formData.append('image', file);
    // console.log('FILE', formData);

    // const responseUploadImg = await API.uploadImage(
    //   responseCreateProduct.data.id,
    //   formData
    // );

    // if (responseUploadImg.status !== 200) {
    //   return null;
    // }
  }
}
</script>
