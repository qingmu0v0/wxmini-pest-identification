<template>
  <view class="custom-tag" :class="[tagClass, { 'tag-clickable': clickable }]" @click="onClick">
    <view class="tag-content">
      <wd-icon 
        v-if="icon" 
        :name="icon" 
        size="14px" 
        :color="iconColor || 'currentColor'"
        class="tag-icon"
      ></wd-icon>
      <text class="tag-text" v-if="$slots.default || text">
        <slot>{{ text }}</slot>
      </text>
      <wd-icon 
        v-if="closable" 
        name="close" 
        size="14px" 
        :color="iconColor || 'currentColor'"
        class="tag-close"
        @click.stop="onClose"
      ></wd-icon>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'CustomTag',
  props: {
    text: {
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
      default: 'filled',
      validator: (value: string) => ['filled', 'outlined', 'light'].includes(value)
    },
    color: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'success', 'warning', 'danger', 'info'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => ['small', 'medium', 'large'].includes(value)
    },
    rounded: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click', 'close'],
  setup(props, { emit }) {
    const tagClass = computed(() => {
      return [
        `tag-${props.variant}`,
        `tag-color-${props.color}`,
        `tag-size-${props.size}`,
        { 'tag-rounded': props.rounded }
      ]
    })
    
    const onClick = () => {
      if (props.clickable) {
        emit('click')
      }
    }
    
    const onClose = () => {
      emit('close')
    }
    
    return {
      tagClass,
      onClick,
      onClose
    }
  }
})
</script>

<style lang="scss" scoped>
.custom-tag {
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
}

.tag-clickable {
  cursor: pointer;
}

.tag-clickable:active {
  transform: scale(0.95);
}

.tag-rounded {
  border-radius: 50rpx;
}

.tag-content {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.tag-text {
  font-weight: 500;
  white-space: nowrap;
}

.tag-icon {
  flex-shrink: 0;
}

.tag-close {
  margin-left: 4rpx;
  flex-shrink: 0;
}

/* 标签尺寸 */
.tag-size-small {
  padding: 8rpx 16rpx;
}

.tag-size-small .tag-text {
  font-size: 24rpx;
}

.tag-size-medium {
  padding: 12rpx 20rpx;
}

.tag-size-medium .tag-text {
  font-size: 28rpx;
}

.tag-size-large {
  padding: 16rpx 24rpx;
}

.tag-size-large .tag-text {
  font-size: 32rpx;
}

/* 标签变体 */
.tag-filled {
  &.tag-color-primary {
    background-color: var(--primary-100);
    color: var(--primary-700);
  }
  
  &.tag-color-secondary {
    background-color: var(--secondary-100);
    color: var(--secondary-700);
  }
  
  &.tag-color-success {
    background-color: var(--success-100);
    color: var(--success-700);
  }
  
  &.tag-color-warning {
    background-color: var(--warning-100);
    color: var(--warning-700);
  }
  
  &.tag-color-danger {
    background-color: var(--danger-100);
    color: var(--danger-700);
  }
  
  &.tag-color-info {
    background-color: var(--info-100);
    color: var(--info-700);
  }
}

.tag-outlined {
  background-color: transparent;
  
  &.tag-color-primary {
    color: var(--primary-600);
    border: 2px solid var(--primary-200);
  }
  
  &.tag-color-secondary {
    color: var(--secondary-600);
    border: 2px solid var(--secondary-200);
  }
  
  &.tag-color-success {
    color: var(--success-600);
    border: 2px solid var(--success-200);
  }
  
  &.tag-color-warning {
    color: var(--warning-600);
    border: 2px solid var(--warning-200);
  }
  
  &.tag-color-danger {
    color: var(--danger-600);
    border: 2px solid var(--danger-200);
  }
  
  &.tag-color-info {
    color: var(--info-600);
    border: 2px solid var(--info-200);
  }
}

.tag-light {
  &.tag-color-primary {
    background-color: rgba(59, 130, 246, 0.1);
    color: var(--primary-600);
  }
  
  &.tag-color-secondary {
    background-color: rgba(107, 114, 128, 0.1);
    color: var(--secondary-600);
  }
  
  &.tag-color-success {
    background-color: rgba(34, 197, 94, 0.1);
    color: var(--success-600);
  }
  
  &.tag-color-warning {
    background-color: rgba(250, 204, 21, 0.1);
    color: var(--warning-600);
  }
  
  &.tag-color-danger {
    background-color: rgba(239, 68, 68, 0.1);
    color: var(--danger-600);
  }
  
  &.tag-color-info {
    background-color: rgba(6, 182, 212, 0.1);
    color: var(--info-600);
  }
}
</style>