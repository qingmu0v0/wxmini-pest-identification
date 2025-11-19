<template>
  <view class="custom-loading" :class="[loadingClass]">
    <view class="loading-container">
      <view class="loading-spinner" :style="{ width: size, height: size }">
        <view 
          class="spinner-circle" 
          :style="{ 
            width: size, 
            height: size,
            borderTopColor: color,
            borderRightColor: color
          }"
        ></view>
      </view>
      <text class="loading-text" v-if="text">{{ text }}</text>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'CustomLoading',
  props: {
    text: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '60rpx'
    },
    color: {
      type: String,
      default: 'var(--primary-600)'
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value: string) => ['default', 'overlay', 'inline'].includes(value)
    }
  },
  setup(props) {
    const loadingClass = computed(() => {
      return `loading-${props.variant}`
    })
    
    return {
      loadingClass
    }
  }
})
</script>

<style lang="scss" scoped>
.custom-loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24rpx;
}

.loading-spinner {
  position: relative;
  display: inline-block;
}

.spinner-circle {
  border-radius: 50%;
  border: 4rpx solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--primary-600);
  border-right-color: var(--primary-600);
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 28rpx;
  color: var(--secondary-600);
  text-align: center;
}

/* 加载变体 */
.loading-default {
  padding: 40rpx;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
}

.loading-inline {
  padding: 20rpx;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>