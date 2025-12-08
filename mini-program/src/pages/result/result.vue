<template>
  <view class="page-container">
    <!-- 顶部背景图与装饰 -->
    <view class="header-bg">
      <image :src="imagePath" mode="aspectFill" class="bg-image"></image>
      <view class="bg-overlay"></view>
      <view class="bg-mask"></view>
    </view>

    <!-- 自定义导航栏 -->
    <view class="navbar">
      <view class="nav-left" @click="goBack">
        <view class="nav-btn glass">
          <wd-icon name="arrow-left" size="20px" color="#ffffff"></wd-icon>
        </view>
      </view>
      <text class="nav-title">识别报告</text>
      <view class="nav-right" @click="shareResult">
        <view class="nav-btn glass">
          <wd-icon name="share" size="20px" color="#ffffff"></wd-icon>
        </view>
      </view>
    </view>

    <scroll-view scroll-y class="main-scroll" :show-scrollbar="false">
      <view class="content-wrapper">
        <!-- 核心结果卡片 -->
        <view class="main-card animate-slide-up">
          <!-- 置信度徽章 -->
          <view class="confidence-badge">
            <view class="ring-chart">
              <view class="ring-fill" :style="{ '--percent': (analysisResult?.confidence || 0) * 100 }"></view>
            </view>
            <text class="score">{{ ((analysisResult?.confidence || 0) * 100).toFixed(0) }}</text>
            <text class="unit">%</text>
            <text class="label">置信度</text>
          </view>

          <!-- 名称与分类 -->
          <view class="title-section">
            <view class="main-title-row">
              <text class="plant-name">{{ displayName }}</text>
              <view v-if="analysisResult?.identificationType === 'pest'" class="pest-tag">
                <wd-icon name="warn-bold" size="14px" color="#ffffff"></wd-icon>
                <text>害虫</text>
              </view>
            </view>
            
            <view class="sub-info">
              <text v-if="displaySubName" class="latin-name">{{ displaySubName }}</text>
            </view>

            <view class="tags-row">
              <view class="tag type" :class="analysisResult?.identificationType">
                {{ analysisResult?.identificationType === 'plant' ? '植物' : '动物/害虫' }}
              </view>
              <view class="tag" v-if="analysisResult?.detectedPests && analysisResult.detectedPests.length > 0">
                发现: {{ analysisResult.detectedPests.join(', ') }}
              </view>
            </view>
          </view>

          <view class="divider"></view>

          <!-- 诊断状态 -->
          <view class="status-grid">
            <view class="status-item">
              <text class="label">健康状况</text>
              <view class="value-row">
                <view class="dot" :class="isHealthy ? 'success' : 'warning'"></view>
                <text class="value">{{ isHealthy ? '健康' : '异常' }}</text>
              </view>
            </view>
            <view class="status-item">
              <text class="label">风险等级</text>
              <view class="risk-bar-wrapper">
                <view class="risk-bar">
                  <view class="risk-fill" :class="riskLevelClass" style="width: 100%"></view>
                </view>
                <text class="value" :class="riskLevelClass">{{ riskLevelText }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 详细信息板块 -->
        <view class="info-section animate-slide-up delay-100" v-if="hasDetailInfo">
          <view class="section-title">
            <view class="icon-box">
              <wd-icon name="info-circle" size="18px" color="#ffffff"></wd-icon>
            </view>
            <text>详细分析</text>
          </view>
          
          <view class="info-card">
            <view class="info-block">
              <text class="block-content">{{ displayedDetailedAnalysis }}</text>
            </view>
          </view>
        </view>

        <!-- 防治建议板块 -->
        <view class="info-section animate-slide-up delay-200" v-if="formattedSuggestions.length > 0">
          <view class="section-title">
            <view class="icon-box green">
              <wd-icon name="check" size="18px" color="#ffffff"></wd-icon>
            </view>
            <text>防治建议</text>
          </view>
          
          <view class="info-card suggestion-card">
            <view 
              class="suggestion-item" 
              v-for="(suggestion, index) in formattedSuggestions" 
              :key="index"
            >
              <view class="step-indicator">
                <view class="line" v-if="index !== 0"></view>
                <view class="circle">{{ index + 1 }}</view>
                <view class="line" v-if="index !== formattedSuggestions.length - 1"></view>
              </view>
              <view class="suggestion-content">
                <text>{{ suggestion }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 底部占位 -->
        <view style="height: 100px;"></view>
      </view>
    </scroll-view>

    <!-- 底部悬浮操作栏 -->
    <view class="bottom-bar animate-slide-up delay-300">
      <view class="action-btn secondary" @click="retakePhoto">
        <wd-icon name="camera" size="20px"></wd-icon>
        <text>重拍</text>
      </view>
      <view class="action-btn primary" @click="saveResult">
        <wd-icon name="save" size="20px"></wd-icon>
        <text>保存记录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';

const imagePath = ref<string | null>(null);
const analysisResult = ref<any>(null);

const displayName = computed(() => {
  if (!analysisResult.value) return '识别中...';
  if (analysisResult.value.identificationType === 'pest' && analysisResult.value.pestName) {
     return analysisResult.value.pestName;
  }
  return analysisResult.value.plantName || '未知对象';
});

const displaySubName = computed(() => {
   if (!analysisResult.value) return '';
   if (analysisResult.value.identificationType === 'pest' && analysisResult.value.plantName) {
       return `寄主植物：${analysisResult.value.plantName}`;
   }
   return '';
});

const hasDetailInfo = computed(() => {
  return analysisResult.value && !!analysisResult.value.detailedAnalysis;
});

const formattedSuggestions = computed(() => {
  if (!analysisResult.value || !analysisResult.value.suggestion) return [];
  return analysisResult.value.suggestion
    .split('\n')
    .map((s: string) => s.trim())
    .filter((s: string) => s.length > 0)
    .map((s: string) => s.replace(/^\d+\.\s*/, '')); // Remove "1. " prefix if present
});

const displayedDetailedAnalysis = computed(() => {
  if (!analysisResult.value?.detailedAnalysis) return '';
  
  const analysis = analysisResult.value.detailedAnalysis;
  
  // Handle nested JSON string case
  if (typeof analysis === 'string') {
    const trimmed = analysis.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        // If parsed successfully and has content/description fields, use them
        if (typeof parsed === 'object' && parsed !== null) {
          return parsed.content || parsed.description || parsed.detailedAnalysis || analysis;
        }
      } catch (e) {
        // Parse error, treat as plain string
      }
    }
  }
  
  return analysis;
});

const isHealthy = computed(() => {
    if (!analysisResult.value) return true;
    return !analysisResult.value.hasWormDamage && analysisResult.value.wormRiskLevel === 0;
});

const riskLevelText = computed(() => {
    if (!analysisResult.value) return '未知';
    const level = analysisResult.value.wormRiskLevel;
    if (level === 0) return '健康';
    if (level === 1) return '低风险';
    if (level === 2) return '中风险';
    if (level >= 3) return '高风险';
    return '未知';
});

const riskLevelClass = computed(() => {
    if (!analysisResult.value) return 'normal';
    const level = analysisResult.value.wormRiskLevel;
    if (level === 0) return 'low';
    if (level === 1) return 'low';
    if (level === 2) return 'medium';
    if (level >= 3) return 'high';
    return 'normal';
});

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

// 分享配置
onShareAppMessage(() => ({
  title: `我识别了${displayName.value}，快来试试吧！`,
  path: '/pages/index/index',
  imageUrl: imagePath.value || '/static/share-image.png'
}));

onShareTimeline(() => ({
  title: `AI植物虫害识别 - ${displayName.value}`,
  query: '',
  imageUrl: imagePath.value || '/static/share-image.png'
}));

const goBack = () => uni.navigateBack();

const shareResult = () => {
  uni.showToast({
    title: '请点击右上角菜单分享',
    icon: 'none'
  });
};

const retakePhoto = () => {
  uni.reLaunch({
    url: '/pages/index/index'
  });
};

const saveResult = () => {
  if (!analysisResult.value || !imagePath.value) return;
  
  try {
    const key = 'recognitionHistory';
    let historyData = uni.getStorageSync(key);
    let history = historyData ? JSON.parse(historyData) : [];
    
    const isDuplicate = history.length > 0 && history[history.length - 1].imagePath === imagePath.value;
    
    if (!isDuplicate) {
        const newRecord = {
          id: Date.now().toString(), // Add explicit ID
          imagePath: imagePath.value,
          analysisResult: analysisResult.value,
          timestamp: Date.now(),
        };
        history.push(newRecord);
        uni.setStorageSync(key, JSON.stringify(history));
         uni.showToast({
          title: '已保存至历史',
          icon: 'success'
        });
    } else {
         uni.showToast({
          title: '记录已存在',
          icon: 'none'
        });
    }
  } catch (e) {
    uni.showToast({
      title: '保存失败',
      icon: 'none'
    });
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  height: 100vh;
  background-color: var(--secondary-50);
  display: flex;
  flex-direction: column;
  position: relative;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 350px;
  z-index: 0;
  
  .bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .bg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 50%, rgba(245, 255, 245, 1) 100%);
  }

  .bg-mask {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to top, var(--secondary-50), transparent);
  }
}

.navbar {
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-2) var(--spacing-4);
  padding-top: calc(var(--status-bar-height) + 16px);
  
  .nav-title {
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }
  
  .nav-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
    transition: all 0.2s;
    
    &.glass {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    
    &:active {
      transform: scale(0.95);
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.main-scroll {
  flex: 1;
  height: 0;
  position: relative;
  z-index: 10;
}

.content-wrapper {
  padding: var(--spacing-4);
  padding-top: 180px; // Push content down to show image
}

.main-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-5);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  position: relative;
  margin-bottom: var(--spacing-4);
  
  .confidence-badge {
    position: absolute;
    top: -30px;
    right: 20px;
    width: 70px;
    height: 70px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 20;
    
    .score {
      font-size: 20px;
      font-weight: 800;
      color: var(--primary-600);
      line-height: 1;
    }
    
    .unit {
      font-size: 10px;
      color: var(--primary-400);
      position: absolute;
      top: 18px;
      right: 12px;
    }
    
    .label {
      font-size: 9px;
      color: var(--secondary-400);
      margin-top: 2px;
    }
  }

  .title-section {
    margin-bottom: var(--spacing-4);
    
    .main-title-row {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      margin-bottom: var(--spacing-1);
      
      .plant-name {
        font-size: 28px;
        font-weight: 800;
        color: var(--secondary-900);
      }
      
      .pest-tag {
        background: var(--danger-500);
        color: white;
        padding: 2px 8px;
        border-radius: var(--radius-full);
        font-size: 10px;
        display: flex;
        align-items: center;
        gap: 2px;
        font-weight: bold;
      }
    }
    
    .sub-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-bottom: var(--spacing-3);
      
      .latin-name {
        font-family: serif;
        font-style: italic;
        color: var(--secondary-500);
        font-size: 14px;
      }
      
      .alias {
        color: var(--secondary-400);
        font-size: 12px;
      }
    }
    
    .tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-2);
      
      .tag {
        background: var(--secondary-100);
        color: var(--secondary-600);
        font-size: 11px;
        padding: 2px 8px;
        border-radius: var(--radius-md);
        
        &.type.pest {
          background: var(--accent-50);
          color: var(--accent-700);
          border: 1px solid var(--accent-200);
        }
        
        &.type.plant {
          background: var(--primary-50);
          color: var(--primary-700);
          border: 1px solid var(--primary-200);
        }
      }
    }
  }
  
  .divider {
    height: 1px;
    background: var(--secondary-100);
    margin: var(--spacing-4) 0;
  }
  
  .status-grid {
    display: flex;
    gap: var(--spacing-4);
    
    .status-item {
      flex: 1;
      
      .label {
        font-size: 12px;
        color: var(--secondary-400);
        display: block;
        margin-bottom: 6px;
      }
      
      .value-row {
        display: flex;
        align-items: center;
        gap: 6px;
        
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          
          &.success { background: var(--success-500); box-shadow: 0 0 0 3px var(--success-100); }
          &.warning { background: var(--warning-500); box-shadow: 0 0 0 3px var(--warning-100); }
        }
        
        .value {
          font-size: 15px;
          font-weight: bold;
          color: var(--secondary-900);
        }
      }
      
      .risk-bar-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
        
        .risk-bar {
          flex: 1;
          height: 6px;
          background: var(--secondary-100);
          border-radius: var(--radius-full);
          overflow: hidden;
          
          .risk-fill {
            height: 100%;
            border-radius: var(--radius-full);
            
            &.high { background: var(--danger-500); }
            &.medium { background: var(--warning-500); }
            &.low { background: var(--success-500); }
            &.normal { background: var(--secondary-400); }
          }
        }
        
        .value {
          font-size: 12px;
          font-weight: bold;
          
          &.high { color: var(--danger-600); }
          &.medium { color: var(--warning-600); }
          &.low { color: var(--success-600); }
        }
      }
    }
  }
}

.info-section {
  margin-bottom: var(--spacing-4);
  
  .section-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-3);
    padding-left: var(--spacing-2);
    
    .icon-box {
      width: 28px;
      height: 28px;
      background: var(--primary-500);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(34, 197, 94, 0.3);
      
      &.green { background: var(--success-500); box-shadow: 0 2px 6px rgba(34, 197, 94, 0.3); }
    }
    
    text {
      font-size: 16px;
      font-weight: bold;
      color: var(--secondary-800);
    }
  }
  
  .info-card {
    background: white;
    border-radius: var(--radius-lg);
    padding: var(--spacing-4);
    box-shadow: var(--shadow-sm);
    
    .info-block {
      margin-bottom: var(--spacing-4);
      
      &:last-child { margin-bottom: 0; }
      
      .block-label {
        font-size: 13px;
        color: var(--primary-700);
        font-weight: bold;
        display: block;
        margin-bottom: 4px;
        position: relative;
        padding-left: 8px;
        
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 4px;
          bottom: 4px;
          width: 3px;
          background: var(--primary-300);
          border-radius: var(--radius-full);
        }
      }
      
      .block-content {
        font-size: 14px;
        color: var(--secondary-600);
        line-height: 1.6;
        text-align: justify;
      }
    }
    
    &.suggestion-card {
      padding: 0;
      overflow: hidden;
      
      .suggestion-item {
        display: flex;
        padding: var(--spacing-4);
        border-bottom: 1px solid var(--secondary-50);
        
        &:last-child { border-bottom: none; }
        
        .step-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: var(--spacing-3);
          width: 24px;
          
          .circle {
            width: 24px;
            height: 24px;
            background: var(--success-50);
            color: var(--success-600);
            border: 1px solid var(--success-200);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            z-index: 1;
          }
          
          .line {
            width: 1px;
            background: var(--secondary-100);
            flex: 1;
            min-height: 10px;
          }
        }
        
        .suggestion-content {
          flex: 1;
          font-size: 14px;
          color: var(--secondary-700);
          line-height: 1.6;
          padding-top: 2px;
        }
      }
    }
  }
}

.bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: var(--spacing-3) var(--spacing-6);
  padding-bottom: calc(var(--spacing-3) + env(safe-area-inset-bottom));
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-4);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
  z-index: 100;
  box-sizing: border-box;
  border-top: 1px solid rgba(0,0,0,0.05);
  
  .action-btn {
    height: 48px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.2s;
    
    &.secondary {
      background: white;
      color: var(--secondary-600);
      border: 1px solid var(--secondary-200);
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      
      &:active {
        background: var(--secondary-50);
        transform: scale(0.98);
      }
    }
    
    &.primary {
      background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
      color: white;
      box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
      border: 1px solid rgba(255,255,255,0.2);
      
      &:active {
        transform: scale(0.98);
        box-shadow: 0 2px 6px rgba(34, 197, 94, 0.4);
      }
    }
  }
}

// Animations
.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(30px);
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

@keyframes slideUp {
  to { opacity: 1; transform: translateY(0); }
}
</style>
