<template lang="pug">
div
  b-table(
    show-empty
    :head-variant='$colorMode.preference'
    :foot-variant='$colorMode.preference'
    :table-variant='$colorMode.preference'
    :small='tableSmall'
    :striped='tableStriped'
    :bordered='tableBordered'
    :hover='tableHover'
    :foot-clone='tableFootClone'
    :responsive='tableResponsive'
    :sticky-header='tableStickyHeader'
    :fixed='tableFixed'
    :borderless='tableBorderless'
    :no-border-collapse='tableNoBorderCollapse'
    :outlined='tableOutlined'
    :per-page='perPage'
    :current-page='currentPage'
    :items='items'
    :fields='fields'
  )
    template(v-slot:empty)
      .w-100.text-center
        span {{ $t('noItems') }}
    slot(v-for='(_, name) in $slots' :name='name' :slot='name')
    template(
      v-for='(_, name) in $scopedSlots'
      :slot='name'
      slot-scope='slotData'
    )
      slot(:name='name' v-bind='slotData')
  b-pagination(
    :pills='paginatioPills'
    v-model='currentPage'
    :size='paginationSize'
    :align='paginationAlign'
    :total-rows='totalRows'
    :per-page='perPage'
    aria-controls='my-table'
  )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class extends Vue {
  // Table
  @Prop({ default: true }) tableSmall?: boolean;
  @Prop({ default: true }) tableStriped?: boolean;
  @Prop({ default: true }) tableBordered?: boolean;
  @Prop({ default: true }) tableHover?: boolean;
  @Prop({ default: true }) tableFootClone?: boolean;
  @Prop({ default: true }) tableResponsive?: boolean;
  @Prop({ default: false }) tableStickyHeader?: boolean;
  @Prop({ default: false }) tableFixed?: boolean;
  @Prop({ default: false }) tableBorderless?: boolean;
  @Prop({ default: false }) tableNoBorderCollapse?: boolean;
  @Prop({ default: false }) tableOutlined?: boolean;
  // Pagination
  @Prop({ default: 10 }) perPage?: number;
  @Prop({ default: false }) paginatioPills?: boolean;
  @Prop({ default: 'md' }) paginationSize?: string;
  @Prop({ default: 'center' }) paginationAlign?: string;
  // Data
  @Prop() readonly fields!: Array<string | number>;
  @Prop() readonly items!: Array<string | number>;

  // Init Table Pagination
  currentPage = 1;

  // Init totalRows
  get totalRows(): number {
    return this.items.length;
  }
}
</script>
<style lang="scss" scoped></style>
