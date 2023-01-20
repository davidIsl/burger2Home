<template lang="pug">
label.cursor-pointer.uploadavatar(:for='"avatar-input-" + id')
  .position-relative.uploadavatar-container
    img.w-100.h-100.object-cover(
      :src='preview'
      :ref='"avatar-input-preview-" + id'
      alt='avatar'
    )
    .uploadavatar-overlay
      font-awesome-icon.fa-3x(:icon='["fa", "camera"]')
  input.d-none(
    type='file'
    :accept='accept'
    :id='"avatar-input-" + id'
    @change='handleChange'
  )
  p.mb-0.input-error(v-if='fileTooBig')
    font-awesome-icon.mr-1(:icon='["fa", "exclamation-triangle"]')
    | {{ $t('error.fileTooBig') }}
  p.mb-0.input-error(v-if='fileNotValid')
    font-awesome-icon.mr-1(:icon='["fa", "exclamation-triangle"]')
    | {{ $t('error.fileNotValid') }}
  p.mb-0.input-error(v-if='error')
    font-awesome-icon.mr-1(:icon='["fa", "exclamation-triangle"]')
    | {{ $t('error.required') }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class extends Vue {
  @Prop({ default: '1' }) id!: string | number;
  @Prop({ default: 'image/jpg,image/png,image/jpeg' }) accept!: string;
  @Prop({ default: 'https://picsum.photos/200/300' }) preview!: string;
  @Prop({ default: 1 }) maxSize!: number;
  @Prop({ default: false }) error!: boolean;

  fileTooBig: boolean = false;
  fileNotValid: boolean = false;
  acceptedFiles: string[] = [];

  mounted() {
    const tabAcceptedFile: string[] = this.accept.split(',');

    this.acceptedFiles = tabAcceptedFile.map((accept) => {
      return accept.split('/')[1].toUpperCase();
    });
  }

  handleChange(e: InputEvent) {
    this.fileTooBig = false;
    this.fileNotValid = false;

    const fileList = (e.target as HTMLInputElement).files as FileList;
    const file = fileList.item(0);

    if (!this.checkFileExt(file!)) {
      this.fileNotValid = true;
      return;
    }
    if (!this.checkMaxSize(file!)) {
      this.fileTooBig = true;
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      this.$emit('change', url);
    };
    reader.readAsDataURL(file as Blob);

    // const formData = new FormData();

    // formData.append('image', file as File);
    // console.log('IMAGE', file);
    // console.log('FD', formData);

    this.$emit('upload', file?.name);
  }

  checkFileExt(file: File): boolean {
    const fileExtensions = file.name.split('.');
    const fileExtension = fileExtensions[fileExtensions.length - 1];

    return this.acceptedFiles.includes(fileExtension.toUpperCase());
  }

  checkMaxSize(file: File): boolean {
    return file.size / 1048576 <= this.maxSize;
  }
}
</script>

<style lang="scss" scoped>
.uploadavatar {
  &-overlay {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    color: var(--secondary);
    border-radius: inherit;
  }
  &-container {
    border-radius: 10%;
    width: 10rem;
    height: 10rem;
    img {
      border-radius: inherit;
    }
  }
  &:hover {
    .uploadavatar-overlay {
      opacity: 1;
    }
  }
}
</style>
