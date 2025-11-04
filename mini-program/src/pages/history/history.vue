<template>
  <view class="container">
    <wd-card title="识别历史" custom-class="history-card">
      <view v-if="historyList.length === 0" class="empty-history">
        <wd-icon name="info-circle" size="40px" color="#999"></wd-icon>
        <text class="empty-text">暂无识别历史</text>
      </view>
      <view v-else class="history-list">
        <wd-cell v-for="(item, index) in historyList" :key="index" clickable @click="viewResult(item)" custom-class="history-cell">
          <view class="history-item">
            <image :src="item.imagePath" mode="aspectFill" class="history-image"></image>
            <view class="history-content">
              <text class="history-title">{{ item.analysisResult.plantName || '未知对象' }}</text>
              <view class="history-subtitle">
                <wd-tag :type="item.analysisResult.identificationType === 'plant' ? 'success' : 'danger'" size="small">
                  {{ item.analysisResult.identificationType === 'plant' ? '植物' : '害虫' }}
                </wd-tag>
                <text class="confidence-text">置信度: {{ (item.analysisResult.confidence * 100).toFixed(1) }}%</text>
              </view>
              <text class="history-time">{{ formatTime(item.timestamp) }}</text>
            </view>
          </view>
        </wd-cell>
      </view>
    </wd-card>
    
    <view class="footer">
      <text>青木 © 2025</text>
      <view class="contact-info">
        <view class="contact-item" @click="copyEmail">
          <wd-icon name="mail" size="16px" color="#4caf50"></wd-icon>
          <text class="email">qingmu0v0@outlook.com</text>
        </view>
        <view class="contact-item" @click="openWebsite">
          <wd-icon name="link" size="16px" color="#4caf50"></wd-icon>
          <text class="website">qingmu.cloud</text>
        </view>
      </view>
      <text class="icp-number">鄂ICP备2025089336号</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { formatTime } from '../../utils/util'; // 假设有一个util文件用于格式化时间

const historyList = ref<any[]>([]);

// uni-app页面生命周期钩子
onShow(() => {
  loadHistory();
});

// 分享功能
onShareAppMessage(() => {
  return {
    title: 'AI植物虫害识别 - 我的识别历史',
    path: '/pages/index/index',
    imageUrl: '/static/share-image.png'
  };
});

// 分享到朋友圈
onShareTimeline(() => {
  return {
    title: 'AI植物虫害识别 - 精准识别，守护丰收',
    query: '',
    imageUrl: '/static/share-image.png'
  };
});

const loadHistory = () => {
  try {
    const history = uni.getStorageSync('recognitionHistory');
    historyList.value = history ? JSON.parse(history) : [];
    // 确保最新的记录在最前面
    historyList.value.reverse();
  } catch (e) {
    console.error('Failed to load recognition history', e);
  }
};

const viewResult = (item: any) => {
  uni.navigateTo({
    url: '/pages/result/result?image=' + encodeURIComponent(item.imagePath) + '&analysisResult=' + encodeURIComponent(JSON.stringify(item.analysisResult)),
  });
};

// 复制邮箱地址
const copyEmail = () => {
  uni.setClipboardData({
    data: 'qingmu0v0@outlook.com',
    success: () => {
      uni.showToast({
        title: '邮箱已复制',
        icon: 'success',
        duration: 2000
      });
    }
  });
};

// 打开官网
const openWebsite = () => {
  uni.showModal({
    title: '提示',
    content: '即将跳转到青木官网',
    success: (res) => {
      if (res.confirm) {
        // 在小程序中可以使用web-view或者复制链接让用户在浏览器中打开
        uni.setClipboardData({
          data: 'https://qingmu.cloud',
          success: () => {
            uni.showToast({
              title: '网址已复制，请在浏览器中打开',
              icon: 'none',
              duration: 3000
            });
          }
        });
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
  background-color: #f7f8fa;
  min-height: 100vh;
}

:deep(.history-card) {
  width: 90%;
  --wd-card-border-radius: 20rpx;
  --wd-card-box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.05);
}

.history-list {
  width: 100%;
}

:deep(.history-cell) {
  margin-bottom: 10rpx;
  border-radius: 10rpx;
  background-color: #fff;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
}

.empty-history {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60rpx 0;
  .empty-text {
    margin-top: 20rpx;
    font-size: 28rpx;
    color: #999;
  }
}

.history-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  .history-image {
    width: 120rpx;
    height: 120rpx;
    border-radius: 10rpx;
    margin-right: 20rpx;
  }
  .history-content {
    display: flex;
    flex-direction: column;
    .history-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
    }
    .history-subtitle {
      display: flex;
      align-items: center;
      margin-top: 8rpx;
    }

    .confidence-text {
      margin-left: 16rpx;
      font-size: 24rpx;
      color: #666;
    }

    .history-time {
      font-size: 24rpx;
      color: #999;
      margin-top: 10rpx;
    }
  }
}

.footer {
    margin-top: 40rpx;
    font-size: 24rpx;
    color: #888;
    text-align: center;
    width: 100%;
    
    .contact-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20rpx;
      margin-top: 10rpx;
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 10rpx;
        
        .email, .website {
          color: #4caf50;
          text-decoration: underline;
        }
      }
    }
    
    .icp-number {
      font-size: 20rpx;
      color: #999;
      margin-top: 10rpx;
    }
  }
</style>