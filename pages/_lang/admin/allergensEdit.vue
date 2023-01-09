<template lang="pug">
// b-container.p-sm-5.pb-3.pb-sm-0.bg-gray(fluid)
//   b-row
//     b-col
//       .title-line
//         h1.p-3.title.text-center.text-secondary {{ $t('pages.admin.allergens.edit.title') }}
//   b-row
//     b-col(
//       :offset-lg='filters ? "2" : "2"'
//       sm='16'
//       :md='filters ? "18" : "16"'
//       :lg='filters ? "18" : "14"'
//     )
//       h3.py-3.title.text-secondary {{ $t('pages.admin.allergens.edit.title4') }}
//   b-row.mt-3
//     b-col(
//       :offset-lg='filters ? "2" : "2"'
//       sm='16'
//       :md='filters ? "18" : "16"'
//       :lg='filters ? "16" : "14"'
//     )
//       b-form-input.input(
//         v-model='filterSearch'
//         :placeholder='$t("pages.admin.allergens.edit.placeholder3")'
//       )
//     b-col.mt-3.mt-sm-0(
//       sm='8'
//       :md='filters ? "6" : "8"'
//       :lg='filters ? "4" : "6"'
//     )
//       b-button.button.w-100(variant='secondary' @click='filters = !filters') {{ $t('pages.filters.button1') }}
//   b-row
//     b-col.mt-3(v-if='filters' :offset-lg='filters ? "2" : "2"' lg='4')
//       filters
//     b-col.mt-3(:offset-lg='filters ? "0" : "2"' :lg='filters ? "16" : "20"')
//       .p-3.content.text-secondary
//         .m-2
//           b-table(
//             hover
//             borderless
//             responsive
//             table-variant='secondary'
//             :current-page='currentPage'
//             :perPage='perPage'
//             :items='allergens'
//             :fields='fields'
//             :totalAllergens='totalAllergens'
//             @pageChange='handleChangePage'
//           )
//             //- template(#head(x)='data')
//             //-   b-form-checkbox#checkbox-header(
//             //-     name='checkbox-header'
//             //-     @change='selectAllTableItems($event)'
//             //-   )
//             //- template(#cell(x)='data')
//             //-   b-form-checkbox(
//             //-     :checked='selectedAllItems'
//             //-     @input='selectTableItem($event, data.item.id)'
//             //-   )
//             template(#cell(details)='data')
//               font-awesome-icon.mt-1(
//                 :icon='["fa", "pencil-alt"]'
//                 @click='openDetails(data.item)'
//               )
//             template(#cell(trash)='data')
//               font-awesome-icon.mt-1(
//                 :icon='["fa", "trash"]'
//                 @click='handleDelete(data.item.allergenId)'
//               )
//           b-pagination(
//             pills='pills'
//             size='sm'
//             v-model='currentPage'
//             :total-rows='totalAllergens'
//             :per-page='perPage'
//             align='right'
//             @change='handleChangePage'
//           )
//   b-row.pt-5
//     b-col(
//       :offset-lg='filters ? "6" : "2"'
//       :md='filters ? "18" : "16"'
//       :lg='filters ? "16" : "20"'
//     )
//       h3.py-3.text-secondary.title {{ $t('pages.admin.allergens.edit.title1') }}
//   b-row
//     b-col(:offset-lg='filters ? "6" : "2"' sm='24' :lg='filters ? "16" : "20"')
//       // form(ref='form' @submit.stop.prevent='onSubmit')
//       .p-4.content
//         b-row
//           b-col.mx-auto(md='12' xl='9')
//             h5.text-secondary.title {{ $t('pages.admin.allergens.edit.title2') }}
//             b-form-group.pt-3.text-primary(
//               :label='$t("pages.admin.allergens.edit.label")'
//               label-for='language1'
//             )
//               b-form-select#language1.input-form(
//                 v-model='$v.language1.$model'
//                 :class='{ "is-invalid": $v.language1.$error, "is-valid": !$v.language1.$invalid }'
//                 :placeholder='$t("pages.admin.allergens.edit.placeholder")'
//                 :options='langs'
//                 v-on:focus='resetAlertMsg'
//                 @blur='$v.language1.$touch()'
//               )
//               .input-error(v-if='$v.language1.$error')
//                 font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
//                 | {{ $t('pages.errors.required') }}
//             b-form-group.pt-0.pt-md-3.text-primary(
//               :label='$t("pages.admin.allergens.edit.label1")'
//               label-for='name'
//             )
//               b-form-input#name.input-form(
//                 v-model='$v.name.$model'
//                 :class='{ "is-invalid": $v.name.$error, "is-valid": !$v.name.$invalid }'
//                 :placeholder='$t("pages.admin.allergens.edit.placeholder1")'
//                 type='text'
//                 name='name'
//                 formatter='resetAlertMsg'
//                 @blur='$v.name.$touch()'
//               )
//               .input-error(v-if='$v.name.$error')
//                 font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
//                 | {{ $t('pages.errors.required') }}
//           b-col.mx-auto.pt-3.pt-md-0(md='12' xl='9')
//             h5.text-secondary.title {{ $t('pages.admin.allergens.edit.title3') }}
//             b-form-group.pt-3.text-primary(
//               :label='$t("pages.admin.allergens.edit.label")'
//               label-for='language2'
//             )
//               b-form-select#language2.input-form(
//                 v-model='$v.language2.$model'
//                 :class='{ "is-invalid": $v.language2.$error, "is-valid": !$v.language2.$invalid }'
//                 :placeholder='$t("pages.admin.allergens.edit.placeholder")'
//                 :options='langs'
//                 @blur='$v.language2.$touch()'
//               )
//               .input-error(v-if='$v.language2.$error')
//                 font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
//                 | {{ $t('pages.errors.required') }}
//             b-form-group.pt-0.pt-md-3.text-primary(
//               :label='$t("pages.admin.allergens.edit.label2")'
//               label-for='frenchName'
//             )
//               b-form-input#frenchName.input-form(
//                 v-model='$v.frenchName.$model'
//                 :class='{ "is-invalid": $v.frenchName.$error, "is-valid": !$v.frenchName.$invalid }'
//                 :placeholder='$t("pages.admin.allergens.edit.placeholder2")'
//                 type='text'
//                 name='frenchName'
//                 @blur='$v.frenchName.$touch()'
//               )
//               .input-error(v-if='$v.frenchName.$error')
//                 font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
//                 | {{ $t('pages.errors.required') }}
//         b-row
//           b-col.mx-auto(sm='12' lg='6')
//             .flex.text-center
//               b-button.mt-3.button.w-100(
//                 variant='secondary'
//                 @click='updateAllergen'
//               ) {{ $t('pages.admin.allergens.edit.button1') }}
//         b-row.mt-3(align-h='center')
//           b-col.p-0(cols='22')
//             b-container.p-0
//               alert(
//                 :show='submitProductAdd === submitProductAddType.ERROR || submitProductAdd === submitProductAddType.SUCCESS'
//                 :variant='submitProductAdd === submitProductAddType.ERROR ? "error" : "success"'
//                 :icon='submitProductAdd === submitProductAddType.ERROR ? ["fa", "exclamation-triangle"] : ["fa", "check-circle"]'
//               )
//                 h6.m-0.mb-2.text-center {{ errorMsg }}
//   // DELETE MODAL
//   b-modal(
//     body-bg-variant='gray'
//     header-bg-variant='gray'
//     footer-bg-variant='gray'
//     v-model='deleteAlert'
//     centered
//   )
//     template(#modal-title)
//       div {{ $t('pages.admin.allergens.alert.title1') }}
//     .d-flex.align-items-center.gap-1
//       div
//         .modal-error
//           font-awesome-icon(:icon='["fa", "exclamation-triangle"]')
//       h5 {{ $t('pages.admin.allergens.alert.text1') }}
//     template(#modal-footer)
//       b-button.w-48(
//         variant='outline-danger'
//         @click='deleteAllergen(currentAllergen.id)'
//       ) {{ $t('pages.admin.allergens.alert.button1') }}
//       b-button.w-48(variant='primary' @click='deleteAlert = false') {{ $t('pages.admin.allergens.alert.button2') }}
//
</template>
//
<script lang="ts">
// import { Component, mixins, Watch } from 'nuxt-property-decorator';
// import { validationMixin } from 'vuelidate';
// import { Validate } from 'vuelidate-property-decorators';
// import { required } from 'vuelidate/lib/validators';
// import alert from '@/components/global/alert.vue';
// import filters from '@/components/global/filters.vue';

// import { Allergens, SelectOption, submitProductAddType } from '@/utils/utils';
// import { API } from '@/utils/javaBack';

// @Component({
//   components: { alert, filters },
// })
// export default class extends mixins(validationMixin) {
//   @Validate({ required }) name: string = '';
//   @Validate({ required }) language1: string = '';
//   @Validate({ required }) language2: string = '';
//   @Validate({ required }) frenchName: string = '';

//   langs: SelectOption[] = [];
//   allergens: Allergens[] = [];
//   allergensTranslations: Allergens[] = [];
//   currentAllergen: Allergens | null = null;
//   currentAllergenId: number = 0;

//   submitProductAddType = submitProductAddType;
//   submitProductAdd = submitProductAddType.NONE;
//   errorMsg: string = '';

//   filters: boolean = false;
//   filterSearch: string = '';
//   viewDetails: boolean = false;

//   currentPage: number = 1;
//   perPage: number = 8;
//   totalAllergens: number = 0;

//   itemSelected: number[] = [];
//   selectedAllItems: boolean = false;
//   deleteAlert: boolean = false;

//   fields = [
//     {
//       key: 'x',
//       sortable: false,
//     },
//     {
//       key: 'allergenId',
//       sortable: true,
//     },
//     {
//       key: 'id',
//       sortable: true,
//     },
//     {
//       key: 'language.name',
//       sortable: true,
//     },
//     {
//       key: 'name',
//       sortable: true,
//     },
//     {
//       key: 'details',
//       sortable: false,
//     },
//     {
//       key: 'trash',
//       sortable: false,
//     },
//   ];

//   mounted() {
//     this.updateData();
//   }

//   async getLanguages() {
//     const response = await API.languagesList();

//     if (response.status !== 200) {
//       return null;
//     }

//     this.langs = response.data.map((lang) => ({
//       value: lang.id,
//       text: lang.name,
//     }));
//     console.log('LANGUAGE:', this.langs);
//   }

//   async getAllergens() {
//     const response = await API.allergensList();

//     if (response.status !== 200) {
//       this.submitProductAdd = submitProductAddType.ERROR;
//       this.errorMsg = this.$tc('pages.admin.allergens.errors.getAllergens');
//       return;
//     }

//     this.allergens = response.data;
//     this.totalAllergens = response.data.length;
//     console.log('AZLLERGENS:', this.allergens);
//   }

//   async getAllergenTranslationById(id: number) {
//     const response = await API.getAllergensTranslationById(id);

//     if (response.status !== 200) {
//       this.submitProductAdd = submitProductAddType.ERROR;
//       this.errorMsg = this.$tc('pages.admin.allergens.errors.getAllergens');
//       return;
//     }

//     this.allergensTranslations = response.data;
//     console.log('DATA:', this.allergensTranslations);
//   }

//   async deleteAllergen(id: number) {
//     const response = await API.deleteAllergen(id);

//     if (response.status !== 200) {
//       this.submitProductAdd = submitProductAddType.ERROR;
//       this.errorMsg = this.$tc('pages.admin.allergens.errors.delete');
//       return;
//     }

//     this.deleteAlert = false;
//     this.submitProductAdd = submitProductAddType.SUCCESS;
//     this.errorMsg = this.$tc('pages.admin.allergens.success.delete');
//     this.getAllergens();
//   }

//   updateData() {
//     this.getLanguages();
//     this.getAllergens();
//     this.currentAllergenId = parseInt(this.$route.query.allergen as string);
//     this.getAllergenTranslationById(this.currentAllergenId);
//     console.log('CURRENT', this.allergensTranslations);

//     // this.loadData();
//     // console.log('ROUTE', this.currentAllergenId);
//   }

//   checkLang(): boolean {
//     console.log('LANG1', this.language1);

//     if (this.language1.toString() === '2') {
//       this.submitProductAdd = submitProductAddType.ERROR;
//       this.errorMsg = this.$tc('pages.admin.allergens.errors.lang1');
//       return false;
//     }

//     if (this.language2.toString() === '1') {
//       this.submitProductAdd = submitProductAddType.ERROR;
//       this.errorMsg = this.$tc('pages.admin.allergens.errors.lang2');
//       return false;
//     }
//     return true;
//   }

//   @Watch('focus')
//   resetAlertMsg() {
//     this.errorMsg = '';
//     this.submitProductAdd = submitProductAddType.NONE;
//   }

//   async updateAllergen() {
//     if (!this.checkLang()) {
//       return null;
//     }
//     this.$v.$touch();
//     if (this.$v.$invalid) {
//       this.submitProductAdd = submitProductAddType.ERROR;
//       this.errorMsg = this.$tc('pages.admin.allergens.errors.fields');
//       return;
//     }

//     const responseCreateAllergen = await API.addAllergen();

//     if (responseCreateAllergen.status !== 200) {
//       this.submitProductAdd = submitProductAddType.ERROR;
//       this.errorMsg = this.$tc('pages.admin.allergens.errors.create');
//       return;
//     }

//     const englishId = parseInt(this.language1);

//     const responseEnglishLang = await API.getLanguageById(englishId);

//     if (responseEnglishLang.status !== 200) {
//       this.submitProductAdd = submitProductAddType.ERROR;
//       this.errorMsg = this.$tc('pages.admin.allergens.errors.getLanguage');
//       return;
//     }

//     const englishLang = responseEnglishLang.data;

//     const responseCreateEnglishTranslation = await API.addAllergenTranslation(
//       this.name,
//       englishLang,
//       responseCreateAllergen.data.id
//     );

//     if (responseCreateEnglishTranslation.status !== 200) {
//       this.submitProductAdd = submitProductAddType.ERROR;
//       this.errorMsg = this.$tc(
//         'pages.admin.allergens.errors.createTranslation'
//       );
//       return;
//     }

//     const frenchId = parseInt(this.language2);

//     const responseFrenchLang = await API.getLanguageById(frenchId);

//     if (responseFrenchLang.status !== 200) {
//       this.submitProductAdd = submitProductAddType.ERROR;
//       this.errorMsg = this.$tc('pages.admin.allergens.errors.getLanguage');
//       return;
//     }
//     const frenchLang = responseFrenchLang.data;

//     const responseCreateFrenchTranslation = await API.addAllergenTranslation(
//       this.frenchName,
//       frenchLang,
//       responseCreateAllergen.data.id
//     );

//     if (responseCreateFrenchTranslation.status !== 200) {
//       this.submitProductAdd = submitProductAddType.ERROR;
//       this.errorMsg = this.$tc(
//         'pages.admin.allergens.errors.createTranslation'
//       );
//       return; // ERROR DOES NOT DISPLAYED ... ERROR PAGE NOT ALERT !!!
//     }

//     this.getAllergens();
//     this.submitProductAdd = submitProductAddType.SUCCESS;
//     this.errorMsg = this.$tc('pages.admin.allergens.success.create');
//     // this.resetData();
//     // window.location.reload();
//   }

//   loadData() {
//     this.language1 = this.allergensTranslations[0].language.name;
//     this.language2 = this.allergensTranslations[1].language.name;
//     this.name = this.allergensTranslations[0].name;
//     this.frenchName = this.allergensTranslations[1].name;
//     // this.$v.$reset();
//   }

//   handleChangePage(e: number) {
//     this.currentPage = e;
//   }

//   async handleDelete(id: number) {
//     this.deleteAlert = true;

//     console.log('ID:', id);

//     const response = await API.getAllergenById(id);

//     if (response.status !== 200) {
//       return;
//     }

//     this.currentAllergen = response.data;
//   }
// }
//
</script>

<style scoped></style>
