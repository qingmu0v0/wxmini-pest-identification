<template>
  <button 
    class="custom-button" 
    :class="[buttonClass, { 'button-loading': loading }]" 
    :disabled="disabled || loading"
    @click="onClick"
  >
    <view class="button-content">
      <wd-icon 
        v-if="loading" 
        name="loading" 
        size="18px" 
        color="currentColor"
        class="loading-icon"
      ></wd-icon>
      <wd-icon 
        v-else-if="icon" 
        :name="icon" 
        size="18px" 
        color="currentColor"
        :class="{ 'button-icon-right': iconPosition === 'right' }"
      ></wd-icon>
      <text class="button-text" v-if="$slots.default || text">
        <slot>{{ text }}</slot>
      </text>
    </view>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'CustomButton',
  props: {
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator: (value: string) => ['left', 'right'].includes(value)
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => ['small', 'medium', 'large'].includes(value)
    },
    block: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const buttonClass = computed(() => {
      return [
        `button-${props.variant}`,
        `button-size-${props.size}`,
        { 'button-block': props.block },
        { 'button-rounded': props.rounded }
      ]
    })
    
    const onClick = () => {
      if (!props.disabled && !props.loading) {
        emit('click')
      }
    }
    
    return {
      buttonClass,
      onClick
    }
  }
})
</script>

<style lang="scss" scoped>
.custom-button {
  border: none;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 16rpx;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.custom-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button-block {
  width: 100%;
}

.button-rounded {
  border-radius: 50rpx;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
}

.button-text {
  font-size: 32rpx;
}

.loading-icon {
  animation: spin 1s linear infinite;
}

.button-icon-right {
  order: 2;
  margin-left: 12rpx;
  margin-right: 0;
}

/* 按钮尺寸 */
.button-size-small {
  padding: 16rpx 32rpx;
  min-height: 64rpx;
}

.button-size-small .button-text {
  font-size: 28rpx;
}

.button-size-medium {
  padding: 24rpx 40rpx;
  min-height: 80rpx;
}

.button-size-medium .button-text {
  font-size: 32rpx;
}

.button-size-large {
  padding: 32rpx 48rpx;
  min-height: 96rpx;
}

.button-size-large .button-text {
  font-size: 36rpx;
}

/* 按钮变体 */
.button-primary {
  background-color: var(--primary-600);
  color: white;
}

.button-primary:active {
  background-color: var(--primary-700);
  transform: scale(0.98);
}

.button-secondary {
  background-color: white;
  color: var(--primary-600);
  border: 2px solid var(--primary-200);
}

.button-secondary:active {
  background-color: var(--primary-50);
  transform: scale(0.98);
}

.button-outline {
  background-color: transparent;
  color: var(--primary-600);
  border: 2px solid var(--primary-600);
}

.button-outline:active {
  background-color: var(--primary-50);
  transform: scale(0.98);
}

.button-ghost {
  background-color: transparent;
  color: var(--primary-600);
}

.button-ghost:active {
  background-color: var(--primary-50);
  transform: scale(0.98);
}

.button-danger {
  background-color: var(--danger-600);
  color: white;
}

.button-danger:active {
  background-color: var(--danger-700);
  transform: scale(0.98);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>