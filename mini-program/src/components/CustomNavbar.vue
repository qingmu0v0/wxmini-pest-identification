<template>
  <view class="custom-navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <view class="navbar-content">
      <!-- 左侧按钮 -->
      <view class="nav-left" @click="onLeftClick" v-if="showLeft">
        <view class="nav-button">
          <wd-icon :name="leftIcon" size="20px" color="var(--secondary-600)"></wd-icon>
        </view>
      </view>
      
      <!-- 中间标题 -->
      <view class="nav-center">
        <text class="navbar-title">{{ title }}</text>
      </view>
      
      <!-- 右侧按钮 -->
      <view class="nav-right" @click="onRightClick" v-if="showRight">
        <view class="nav-button">
          <wd-icon :name="rightIcon" size="20px" color="var(--secondary-600)"></wd-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'CustomNavbar',
  props: {
    title: {
      type: String,
      default: ''
    },
    showLeft: {
      type: Boolean,
      default: true
    },
    showRight: {
      type: Boolean,
      default: false
    },
    leftIcon: {
      type: String,
      default: 'arrow-left'
    },
    rightIcon: {
      type: String,
      default: 'share'
    },
    scrollEffect: {
      type: Boolean,
      default: false
    }
  },
  emits: ['left-click', 'right-click'],
  setup(props, { emit }) {
    const isScrolled = ref(false)
    
    const onLeftClick = () => {
      emit('left-click')
    }
    
    const onRightClick = () => {
      emit('right-click')
    }
    
    // 监听页面滚动
    let pageScrollHandler: (() => void) | null = null
    
    if (props.scrollEffect) {
      pageScrollHandler = () => {
        const pages = getCurrentPages()
        const currentPage = pages[pages.length - 1]
        if (currentPage && typeof currentPage.$el === 'object') {
          const scrollTop = currentPage.$el?.scrollTop || 0
          isScrolled.value = scrollTop > 10
        }
      }
    }
    
    onMounted(() => {
      if (props.scrollEffect && pageScrollHandler) {
        uni.onPageScroll(pageScrollHandler)
      }
    })
    
    onUnmounted(() => {
      if (props.scrollEffect && pageScrollHandler) {
        uni.offPageScroll(pageScrollHandler)
      }
    })
    
    return {
      isScrolled,
      onLeftClick,
      onRightClick
    }
  }
})
</script>

<style lang="scss" scoped>
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--secondary-200);
  padding: 0 20rpx;
  height: 88rpx;
  transition: all 0.3s ease;
}

.navbar-scrolled {
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 750rpx;
  margin: 0 auto;
}

.nav-left, .nav-right {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: var(--secondary-100);
  transition: all 0.3s ease;
}

.nav-button:active {
  background-color: var(--secondary-200);
  transform: scale(0.95);
}

.navbar-title {
  font-size: 36rpx;
  font-weight: 600;
  color: var(--secondary-800);
  text-align: center;
  max-width: 400rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>