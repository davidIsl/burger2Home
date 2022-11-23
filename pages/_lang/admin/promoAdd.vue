<template lang="pug">
b-container.p-3.bg-gray(fluid)
  b-row
    b-col
      h3.p-3.text-center.text-secondary {{ $t('pages.admin.promoAdd.title1') }}
  b-row
    b-col.mx-auto(md='16' lg='12' xl='10')
      form(ref='form' @submit.stop.prevent='onSubmit')
        b-row
          b-col.pb-3
            b-container.p-4.content
              b-form-group.pt-3.text-primary(
                :label='$t("pages.admin.promoAdd.label1")'
                label-for='name'
              )
                b-form-input#name.input-form(
                  v-model='$v.name.$model'
                  :class='{ "is-invalid": $v.name.$error, "is-valid": !$v.name.$invalid }'
                  :placeholder='$t("pages.admin.promoAdd.placeholder1")'
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
                :label='$t("pages.admin.promoAdd.label2")'
                label-for='description'
              )
                b-form-textarea#description.input-area(
                  v-model='$v.description.$model'
                  :class='{ "is-invalid": $v.description.$error, "is-valid": !$v.description.$invalid }'
                  :placeholder='$t("pages.admin.promoAdd.placeholder2")'
                  name='description'
                  @blur='$v.description.$touch()'
                )
                .input-error(v-if='$v.description.$error')
                  font-awesome-icon.mr-2(
                    :icon='["fa", "exclamation-triangle"]'
                  )
                  | {{ $t('pages.errors.required') }}
              b-form-group.pt-3.text-primary(
                :label='$t("pages.admin.promoAdd.label3")'
                label-for='discount'
              )
                b-form-input#discount.input-form(
                  v-model='$v.discount.$model'
                  :class='{ "is-invalid": $v.discount.$error, "is-valid": !$v.discount.$invalid }'
                  :placeholder='$t("pages.admin.promoAdd.placeholder3")'
                  type='number'
                  step='0.5'
                  name='discount'
                  @blur='$v.discount.$touch()'
                )
                .input-error(v-if='$v.discount.$error')
                  font-awesome-icon.mr-2(
                    :icon='["fa", "exclamation-triangle"]'
                  )
                  | {{ $t('pages.errors.required') }}
              b-form-group.m-0(
                :label='$t("pages.admin.promoAdd.label4")'
                label-for='startDate'
              )
                b-form-input#startDate.input-form(
                  v-model='$v.startDate.$model'
                  :class='{ "is-invalid": $v.startDate.$error, "is-valid": !$v.startDate.$invalid }'
                  :placeholder='$t("pages.admin.promoAdd.placeholder4")'
                  type='date'
                  name='startDate'
                  @blur='$v.startDate.$touch()'
                )
                .input-error.my-2(v-if='$v.startDate.$error')
                  font-awesome-icon.mr-2(
                    :icon='["fa", "exclamation-triangle"]'
                  )
                  | {{ $t('pages.errors.required') }}
              b-form-group.pt-3.text-primary(
                :label='$t("pages.admin.promoAdd.label5")'
                label-for='endDate'
              )
                b-form-input#endDate.input-form(
                  v-model='$v.endDate.$model'
                  :class='{ "is-invalid": $v.endDate.$error, "is-valid": !$v.endDate.$invalid }'
                  :placeholder='$t("pages.admin.promoAdd.placeholder5")'
                  type='date'
                  name='endDate'
                  @blur='$v.endDate.$touch()'
                )
                .input-error.my-2(v-if='$v.endDate.$error')
                  font-awesome-icon.mr-2(
                    :icon='["fa", "exclamation-triangle"]'
                  )
                  | {{ $t('pages.errors.required') }}
                //- .input-error.my-2(v-if='!image')
                //-   font-awesome-icon.mr-2(
                //-     :icon='["fa", "exclamation-triangle"]'
                //-   )
                //-   | {{ $t('pages.errors.required') }}
              .flex.text-center
                b-button.button(variant='secondary' @click='onSubmit') {{ $t('pages.admin.promoAdd.button1') }}
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';

// import { SelectOption } from '@/utils/utils';

@Component({
  components: {},
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) name: string = '';
  @Validate({ required }) description: string = '';
  @Validate({ required }) discount: number | null = null;
  @Validate({ required }) startDate: Date | null = null;
  @Validate({ required }) endDate: Date | null = null;

  error?: boolean = false;

  mounted() {}

  onSubmit() {
    this.$v.$touch();
    console.log('ADD PROMO');
  }
}
</script>
