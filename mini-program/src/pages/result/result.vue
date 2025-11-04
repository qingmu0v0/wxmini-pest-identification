<template>
  <view class="container">
    <wd-card custom-class="result-card" v-if="imagePath">
      <view class="image-display">
        <image :src="imagePath" mode="aspectFit" class="uploaded-image"></image>
      </view>
    </wd-card>

    <wd-card title="识别结果" custom-class="result-card" v-if="analysisResult">
      <view class="result-item">
        <text class="label">识别对象：</text>
        <text class="value">{{ analysisResult.plantName || '未知' }}</text>
      </view>
      <view class="result-item">
        <text class="label">识别类型：</text>
        <wd-tag :type="analysisResult.identificationType === 'plant' ? 'success' : 'danger'" size="large">
          {{ analysisResult.identificationType === 'plant' ? '植物' : '害虫' }}
        </wd-tag>
      </view>
      <view class="result-item" v-if="analysisResult.identificationType === 'pest' && analysisResult.pestName">
        <text class="label">害虫名称：</text>
        <text class="value">{{ analysisResult.pestName }}</text>
      </view>
      <view class="result-item">
        <text class="label">置信度：</text>
        <wd-tag :type="getConfidenceTagType(analysisResult.confidence)" size="large">{{ (analysisResult.confidence * 100).toFixed(2) }}%</wd-tag>
      </view>
      <view class="result-item" v-if="analysisResult.hasWormDamage !== null">
        <text class="label">虫蛀风险：</text>
        <wd-tag :type="getWormRiskTagType(analysisResult.wormRiskLevel)" size="large">{{ getWormRiskText(analysisResult.wormRiskLevel) }}</wd-tag>
      </view>
      <view class="result-item" v-if="analysisResult.hasAphid !== null">
        <text class="label">蚜虫检测：</text>
        <wd-tag :type="analysisResult.hasAphid ? 'warning' : 'success'" size="large">
          {{ analysisResult.hasAphid ? '检测到蚜虫' : '未检测到蚜虫' }}
        </wd-tag>
      </view>
      <view class="result-item" v-if="analysisResult.hasAphid && analysisResult.aphidCount">
        <text class="label">蚜虫数量：</text>
        <text class="value">{{ analysisResult.aphidCount }}</text>
      </view>
      <view class="result-item" v-if="analysisResult.hasAphid && analysisResult.aphidSpecies">
        <text class="label">蚜虫种类：</text>
        <text class="value">{{ analysisResult.aphidSpecies }}</text>
      </view>
      <view class="result-item">
        <text class="label">描述：</text>
        <text class="value">{{ analysisResult.detailedAnalysis || '暂无描述' }}</text>
      </view>
      <view class="result-item">
        <text class="label">建议：</text>
        <text class="value">{{ analysisResult.suggestion || '暂无建议' }}</text>
      </view>
    </wd-card>

    <wd-button type="success" block size="large" custom-class="back-button" @click="goBack">
      返回首页
    </wd-button>
    
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
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';

const imagePath = ref<string | null>(null);
const analysisResult = ref<any>(null);

onLoad((options) => {
  if (options && options.image) {
    imagePath.value = decodeURIComponent(options.image);
  }
  if (options && options.analysisResult) {
    try {
      analysisResult.value = JSON.parse(decodeURIComponent(options.analysisResult));
      console.log('Analysis Result:', analysisResult.value);
    } catch (e) {
      console.error('Failed to parse analysis result', e);
    }
  }
});

// 分享功能
onShareAppMessage(() => {
  return {
    title: `我识别了${analysisResult.value?.plantName || '植物病虫害'}，快来试试吧！`,
    path: '/pages/index/index',
    imageUrl: imagePath.value || '/static/share-image.png'
  };
});

// 分享到朋友圈
onShareTimeline(() => {
  return {
    title: `AI植物虫害识别 - 我识别了${analysisResult.value?.plantName || '植物病虫害'}`,
    query: '',
    imageUrl: imagePath.value || '/static/share-image.png'
  };
});

const goBack = () => {
  uni.navigateBack();
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

// 获取置信度标签类型
const getConfidenceTagType = (confidence) => {
  if (confidence >= 0.8) return 'success'
  if (confidence >= 0.6) return 'warning'
  return 'danger'
};

// 获取虫害风险标签类型
const getWormRiskTagType = (riskLevel) => {
  switch (riskLevel) {
    case 'high': return 'danger'
    case 'medium': return 'warning'
    case 'low': return 'success'
    default: return 'primary'
  }
};

// 获取虫害风险文本
const getWormRiskText = (riskLevel) => {
  switch (riskLevel) {
    case 'high': return '高风险'
    case 'medium': return '中等风险'
    case 'low': return '低风险'
    default: return '未知'
  }
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

:deep(.result-card) {
  width: 90%;
  margin-bottom: 40rpx;
  --wd-card-border-radius: 20rpx;
  --wd-card-box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.05);

  .image-display {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20rpx;
    .uploaded-image {
      width: 100%;
      max-height: 400rpx;
      border-radius: 10rpx;
    }
  }

  .result-item {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    font-size: 30rpx;
    .label {
      font-weight: bold;
      color: #333;
      margin-right: 10rpx;
    }
    .value {
      color: #666;
      flex: 1;
    }
  }
}

:deep(.back-button) {
  width: 90%;
  --wd-button-large-height: 90rpx;
  --wd-button-border-radius: 50rpx;
  font-size: 32rpx;
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
