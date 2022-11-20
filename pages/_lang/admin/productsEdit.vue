<template lang="pug">
b-container.p-3.bg-gray(fluid)
  b-row
    b-col
      h3.p-3.text-center.text-secondary {{ $t('pages.admin.edit.title1') }}
  b-row
    b-col.mx-auto(md='16' lg='12' xl='10')
      form(ref='form' @submit.stop.prevent='onSubmit')
        b-row
          b-col.pb-3
            b-container.p-4.content
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
                  :placeholder='$t("pages.admin.edit.placeholder2")'
                  name='description'
                  @blur='$v.description.$touch()'
                )
                .input-error(v-if='$v.description.$error')
                  font-awesome-icon.mr-2(
                    :icon='["fa", "exclamation-triangle"]'
                  )
                  | {{ $t('pages.errors.required') }}
              b-form-group.pt-3.text-primary(
                :label='$t("pages.admin.edit.label3")'
                label-for='price'
              )
                b-form-input#price.input-form(
                  v-model='$v.price.$model'
                  :class='{ "is-invalid": $v.price.$error, "is-valid": !$v.price.$invalid }'
                  :placeholder='$t("pages.admin.edit.placeholder3")'
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
                :label='$t("pages.admin.edit.label4")'
                label-for='ingredients'
              )
                multiselect#ingredients(
                  v-model='$v.ingredients.$model'
                  :options='ingredients'
                  :multiple='true'
                  :selectLabel='$t("pages.admin.selectLabel")'
                  :selectedLabel='$t("pages.admin.selectedLabel")'
                  :deselectLabel='$t("pages.admin.deselectLabel")'
                  :searchable='false'
                  :class='{ "is-invalid": $v.ingredients.$error }'
                  label='text'
                  track-by='text'
                  @blur='$v.ingredients.$touch()'
                )
                .input-error.my-2(v-if='$v.ingredients.$error')
                  font-awesome-icon.mr-2(
                    :icon='["fa", "exclamation-triangle"]'
                  )
                  | {{ $t('pages.errors.required') }}
              b-form-group.pt-3.text-primary(
                :label='$t("pages.admin.edit.label5")'
                label-for='image'
              )
                input(
                  :value='image'
                  accept='image/jpg, image/jpeg, image/png'
                  type='file'
                  required
                )
                //- .input-error.my-2(v-if='!image')
                //-   font-awesome-icon.mr-2(
                //-     :icon='["fa", "exclamation-triangle"]'
                //-   )
                //-   | {{ $t('pages.errors.required') }}
              .flex.text-center
                b-button.button(variant='secondary' @click='onSubmit') {{ $t('pages.admin.edit.button1') }}
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';

import { SelectOption } from '@/utils/utils';

@Component({
  components: {},
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) name: string = '';
  @Validate({ required }) description: string = '';
  @Validate({ required }) price: number = 0;
  @Validate({ required }) ingredients: SelectOption[] = [];
  image: any = '';
  maxSize: number = 10;

  error?: boolean = false;

  mounted() {
    this.ingredients = [
      {
        text: 'Beef',
      },
      {
        text: 'Chicken',
      },
      {
        text: 'Onions',
      },
      {
        text: 'Fish',
      },
      {
        text: 'Tomato',
      },
      {
        text: 'Salad',
      },
      {
        text: 'Bacon',
      },
      {
        text: 'Cheese',
      },
      {
        text: 'Pickles',
      },
    ];
  }

  checkMaxSize(file: File): boolean {
    return file.size / 1048576 <= this.maxSize;
  }

  onSubmit() {
    this.$v.$touch();
    console.log('ADD PRODUCT');
    console.log('FILE', this.image.size);
  }
}
</script>
