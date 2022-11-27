<template lang="pug">
b-alert.rounded-0.alert.text-left.text-black(
  :show='show'
  fade
  variant='light'
  :dismissible='dismissible'
  :class='`bl-${variant}`'
  @dismissed='onDismissed'
)
  .alert-content(fluid)
    b-spinner(v-if='variant === variantTypes.PENDING' small variant='warning')
    font-awesome-icon.mr-2(:icon='icon' v-else)
    div
      slot
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component, Prop } from 'nuxt-property-decorator';

enum variantTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  PRIMARY = 'primary',
}

@Component
export default class extends Vue {
  variantTypes = variantTypes;
  @Prop({}) show!: boolean;
  @Prop({}) variant!: variantTypes;
  @Prop({ default: false }) dismissible?: boolean;
  @Prop({ default: () => ['fa', 'check-circle'] })
  icon?: string[];

  onDismissed() {
    this.$emit('dismissed');
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/bt-custom.scss';

.alert {
  border-color: white;
  border-left-width: 0.25rem;
  border-left-color: var(--fadedColor);
  &-content {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
}

.bl-primary {
  border-color: var(--primaryColorLight);
  border-left-color: var(--primaryColor);
  background: var(--primaryColorLight);
  color: var(--primaryColorDark) !important;
}

.bl-success {
  border-color: var(--successColorLight);
  border-left-color: var(--successColor);
  background: var(--successColorLight);
  color: var(--successColorDark) !important;
}

.bl-error {
  border-color: var(--colorError) !important;
  border-left-color: var(--errorColor);
  background: var(--errorColorLight);
  color: var(--errorColorDark) !important;
}

.bl-warning,
.bl-pending {
  border-color: var(--warningColorLight);
  border-left-color: var(--warningColor);
  background: var(--warningColorLight);
  color: rgb(146, 64, 14) !important;
}

.bl-info {
  border-color: var(--infoColorLight);
  border-left-color: var(--infoColor);
  background: var(--infoColorLight);
  color: var(--infoColorText) !important;
}

.text-link {
  color: rgb(185, 99, 50);
  font-weight: 600;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    text-decoration-color: rgb(146, 64, 14);
  }
}
</style>
