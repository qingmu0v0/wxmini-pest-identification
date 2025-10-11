<template>
  <view class="container">
    <view class="header">
      <text class="title">历史记录</text>
      <button class="clear-btn" @click="clearHistory" v-if="historyList.length > 0">
        清空
      </button>
    </view>
    
    <!-- 历史记录列表 -->
    <view class="history-list" v-if="historyList.length > 0">
      <view 
        class="history-item" 
        v-for="item in historyList" 
        :key="item.id"
        @click="viewDetail(item)"
      >
        <image :src="item.imageUrl" class="item-image" mode="aspectFill"></image>
        <view class="item-content">
          <text class="item-plant">{{ item.result.plantName || '未识别' }}</text>
          <text class="item-time">{{ item.time }}</text>
          <view class="item-tags">
            <text 
              class="tag" 
              :class="item.result.hasWormDamage ? 'tag-danger' : 'tag-safe'"
            >
              {{ item.result.hasWormDamage ? '有虫蛀' : '无虫蛀' }}
            </text>
            <text 
              class="tag" 
              :class="item.result.hasAphid ? 'tag-warning' : 'tag-safe'"
            >
              {{ item.result.hasAphid ? '有蚜虫' : '无蚜虫' }}
            </text>
          </view>
        </view>
        <text class="arrow">›</text>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty-state" v-else>
      <text class="empty-icon">📋</text>
      <text class="empty-text">暂无历史记录</text>
      <button class="btn btn-primary" @click="goToIndex">
        开始识别
      </button>
    </view>
  </view>
</template>

<script>
import { STORAGE_KEYS } from '../../utils/config.js'

export default {
  data() {
    return {
      historyList: []
    }
  },
  
  onShow() {
    this.loadHistory()
  },
  
  methods: {
    // 加载历史记录
    loadHistory() {
      try {
        const history = uni.getStorageSync(STORAGE_KEYS.HISTORY) || []
        this.historyList = history
      } catch (error) {
        console.error('加载历史记录失败', error)
        this.historyList = []
      }
    },
    
    // 查看详情
    viewDetail(item) {
      uni.navigateTo({
        url: '/pages/result/result?data=' + encodeURIComponent(JSON.stringify(item.result))
      })
    },
    
    // 清空历史记录
    clearHistory() {
      uni.showModal({
        title: '提示',
        content: '确定要清空所有历史记录吗？',
        success: (res) => {
          if (res.confirm) {
            uni.removeStorageSync(STORAGE_KEYS.HISTORY)
            this.historyList = []
            uni.showToast({
              title: '已清空',
              icon: 'success'
            })
          }
        }
      })
    },
    
    // 前往首页
    goToIndex() {
      uni.switchTab({
        url: '/pages/index/index'
      })
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%);
  padding: 20rpx;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #2E7D32;
}

.clear-btn {
  padding: 10rpx 30rpx;
  font-size: 26rpx;
  color: #F44336;
  background: transparent;
  border: 2rpx solid #F44336;
  border-radius: 30rpx;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.history-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

.item-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 10rpx;
  margin-right: 20rpx;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-plant {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.item-time {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 15rpx;
}

.item-tags {
  display: flex;
  gap: 10rpx;
}

.tag {
  padding: 5rpx 15rpx;
  border-radius: 15rpx;
  font-size: 22rpx;
}

.tag-safe {
  background: #E8F5E9;
  color: #4CAF50;
}

.tag-danger {
  background: #FFEBEE;
  color: #F44336;
}

.tag-warning {
  background: #FFF3E0;
  color: #FF9800;
}

.arrow {
  font-size: 50rpx;
  color: #ccc;
  margin-left: 10rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 20rpx;
}

.empty-text {
  font-size: 30rpx;
  color: #999;
  margin-bottom: 40rpx;
}

.btn {
  padding: 20rpx 60rpx;
  border-radius: 45rpx;
  font-size: 32rpx;
  font-weight: bold;
  border: none;
  box-shadow: 0 8rpx 16rpx rgba(0,0,0,0.1);
}

.btn-primary {
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: #fff;
}
</style>
