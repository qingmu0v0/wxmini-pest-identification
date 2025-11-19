<template>
  <view class="custom-card" :class="[cardClass, { 'card-clickable': clickable }]" @click="onClick">
    <view class="card-header" v-if="$slots.header || title">
      <slot name="header">
        <view class="default-header">
          <view class="header-icon" v-if="icon">
            <wd-icon :name="icon" size="24px" :color="iconColor || 'var(--primary-600)'"></wd-icon>
          </view>
          <text class="header-title">{{ title }}</text>
          <view class="header-extra" v-if="$slots.extra">
            <slot name="extra"></slot>
          </view>
        </view>
      </slot>
    </view>
    
    <view class="card-body">
      <slot></slot>
    </view>
    
    <view class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'CustomCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value: string) => ['default', 'outlined', 'elevated', 'filled'].includes(value)
    },
    padding: {
      type: String,
      default: 'medium',
      validator: (value: string) => ['small', 'medium', 'large'].includes(value)
    },
    clickable: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: true
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const cardClass = computed(() => {
      return [
        `card-${props.variant}`,
        `card-padding-${props.padding}`,
        { 'card-shadow': props.shadow }
      ]
    })
    
    const onClick = () => {
      if (props.clickable) {
        emit('click')
      }
    }
    
    return {
      cardClass,
      onClick
    }
  }
})
</script>

<style lang="scss" scoped>
.custom-card {
  background-color: white;
  border-radius: 24rpx;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-clickable {
  cursor: pointer;
}

.card-clickable:active {
  transform: scale(0.98);
}

.card-shadow {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.card-default {
  background-color: white;
}

.card-outlined {
  background-color: white;
  border: 2px solid var(--secondary-200);
}

.card-elevated {
  background-color: white;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
}

.card-filled {
  background-color: var(--secondary-50);
}

.card-padding-small {
  padding: 24rpx;
}

.card-padding-medium {
  padding: 40rpx;
}

.card-padding-large {
  padding: 56rpx;
}

.card-header {
  margin-bottom: 32rpx;
}

.default-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: var(--primary-100);
}

.header-title {
  font-size: 32rpx;
  font-weight: 600;
  color: var(--secondary-800);
  flex: 1;
}

.header-extra {
  display: flex;
  align-items: center;
}

.card-body {
  flex: 1;
}

.card-footer {
  margin-top: 32rpx;
  padding-top: 24rpx;
  border-top: 1px solid var(--secondary-100);
}
</style>