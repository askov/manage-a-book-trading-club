<template>
  <div :class="avatarClassList"
       v-b-tooltip.hover
       :title="hoverTitle"
       @click="handleAvatarClick">
    <img v-if="avatar"
         :src="avatar"
         alt="user-avatar">
    <input v-if="editable"
           type="file"
           ref="file"
           style="display: none"
           @change="onImageChange">
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import uvService from '@/services/uploadValidator.service';

  export default Vue.extend({
    name: 'UserAvatar',
    props: {
      avatar: String,
      size: String,
      title: String,
      editable: Boolean,
    },
    computed: {
      avatarClassList(): string[] {
        const acl = ['avatar-wrapper', 'shadow'];
        if (!this.avatar) {
          acl.push('avatar-placeholder');
        }
        if (this.size === 'small') {
          acl.push('avatar-wrapper--small');
        }
        if (this.size === 'middle') {
          acl.push('avatar-wrapper--middle');
        }
        return acl;
      },
      hoverTitle(): string {
        return this.title || 'Click to select your avatar';
      },
    },
    methods: {
      handleAvatarClick() {
        if (this.editable) {
          (this.$refs.file as HTMLElement).click();
        }
      },
      onImageChange(event: any) {
        const selectedImage = event.target.files[0];
        if (uvService.validateAvatar(selectedImage).error) {
          this.$root.$emit(
            'image-change-unacceptable',
            uvService.validateAvatar(selectedImage).error
          );
        } else {
          const fd = new FormData();
          fd.append('avatar', selectedImage, selectedImage.name);
          this.$root.$emit('image-change-acceptable', fd);
        }
      },
    },
  });

</script>

<style scoped
       lang="scss">
  .avatar-wrapper {
    display: inline-block;
    cursor: pointer;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &--small {
      width: 30px;
      height: 30px;
      display: inline-block;
    }

    &--middle {
      width: 60px;
      height: 60px;
      display: inline-block;
    }

    &--placeholder {
      background: url('../../assets/avatar_placeholder.svg') no-repeat center;
      background-size: 100% auto;
    }
  }

  .avatar-placeholder {
    background: url('../../assets/avatar_placeholder.svg') no-repeat center;
    background-size: 100%;
  }

</style>
