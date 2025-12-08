<template>
  <view>
    <web-view :src="url"></web-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const url = ref('');

onLoad((options) => {
  if (options && options.url) {
    url.value = decodeURIComponent(options.url);
  }
});
</script>

<style>
</style>