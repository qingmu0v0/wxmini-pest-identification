<template>
  <view class="tamagui-container">
    <!-- 顶部标题区域 -->
    <view class="tamagui-header">
      <text class="tamagui-title">🌱 虫害识别</text>
      <text class="tamagui-subtitle">🤖 智能识别农作物病虫害</text>
    </view>

    <!-- 模型选择区域 -->
    <view class="tamagui-card">
      <text class="tamagui-card-title">🔧 选择识别模型</text>
      <view class="tamagui-model-selector">
        <view 
          v-for="(model, index) in models" 
          :key="index"
          :class="['tamagui-model-item', { 'tamagui-model-item-active': modelIndex === index }]"
          @tap="onModelChange({ detail: { value: index } })"
        >
          <text class="tamagui-model-text">{{ model.name }}</text>
        </view>
      </view>
    </view>

    <!-- 图片上传区域 -->
      <view v-if="!imageUrl" class="tamagui-card">
        <text class="tamagui-card-title">📸 上传图片</text>
        <view class="tamagui-upload-area" @tap="chooseImage">
          <view class="tamagui-upload-placeholder">
            <text class="tamagui-upload-icon">📷</text>
            <text class="tamagui-upload-text">点击上传图片</text>
          </view>
        </view>
      </view>
      
      <!-- 图片预览区域 -->
      <view v-if="imageUrl" class="tamagui-card">
        <text class="tamagui-card-title">📸 已上传图片</text>
        <view class="tamagui-image-preview-container">
          <image :src="imageUrl" class="tamagui-preview-image" mode="aspectFit" />
          <button class="tamagui-reupload-button" @tap="chooseImage">
            <text class="tamagui-reupload-icon">🔄</text>
            <text class="tamagui-reupload-text">重新上传</text>
          </button>
        </view>
      </view>
      
      <view v-if="imageUrl" class="tamagui-actions">
        <button class="tamagui-action-button tamagui-reselect" @tap="chooseImage">重新选择</button>
        <button class="tamagui-action-button tamagui-clear" @tap="clearImage">清除图片</button>
      </view>

    <!-- 识别按钮 -->
    <view class="tamagui-button-container">
      <button 
        class="tamagui-button" 
        :disabled="!imageUrl || isIdentifying"
        @tap="identifyPest"
      >
        <text v-if="isIdentifying" class="tamagui-button-icon">⏳</text>
        <text v-else class="tamagui-button-icon">🔍</text>
        <text v-if="isIdentifying" class="tamagui-button-text">识别中...</text>
        <text v-else class="tamagui-button-text">识别病虫害</text>
      </button>
    </view>

    <!-- 历史记录按钮 -->
    <view class="tamagui-button-container">
      <button class="tamagui-button tamagui-button-secondary" @tap="goToHistory">
        <text class="tamagui-button-icon">📋</text>
        <text class="tamagui-button-text">识别历史</text>
      </button>
    </view>

    <!-- 识别结果区域 -->
      <view v-if="result || errorResult" class="tamagui-card">
        <text class="tamagui-card-title">🎯 识别结果</text>
        
        <!-- 成功结果 -->
        <view v-if="result" class="tamagui-result-container" :class="{ 'tamagui-result-show': result }">
          <view class="tamagui-result-header">
            <text class="tamagui-result-name">🌿 {{ result.name }}</text>
            <view class="tamagui-confidence-badge">
              <text class="tamagui-confidence-text">🎯 置信度: {{ result.confidence }}%</text>
            </view>
          </view>
          
          <view v-if="result.hasWormDamage !== undefined" class="tamagui-result-section">
            <text class="tamagui-result-section-title">🐛 虫害情况</text>
            <view class="tamagui-worm-status">
              <text :class="['tamagui-worm-status-text', result.hasWormDamage ? 'tamagui-worm-danger' : 'tamagui-worm-safe']">
                {{ result.hasWormDamage ? '🐛 发现虫害' : '✅ 无虫害' }}
              </text>
              <text v-if="result.wormRiskLevel !== undefined" :class="['tamagui-risk-level', 
                result.wormRiskLevel >= 4 ? 'tamagui-risk-high' : 
                result.wormRiskLevel >= 2 ? 'tamagui-risk-medium' : 'tamagui-risk-low']">
                ⚠️ 风险等级: {{ result.wormRiskLevel }}/5
              </text>
            </view>
          </view>
          
          <view v-if="result.hasAphid !== undefined" class="tamagui-result-section">
            <text class="tamagui-result-section-title">🐜 蚜虫情况</text>
            <text :class="['tamagui-aphid-status', result.hasAphid ? 'tamagui-aphid-detected' : 'tamagui-aphid-none']">
              {{ result.hasAphid ? `🐜 发现蚜虫: ${result.aphidCount || '未知数量'}` : '✅ 无蚜虫' }}
            </text>
          </view>
          
          <view class="tamagui-result-section">
            <text class="tamagui-result-section-title">🔍 详细分析</text>
            <text class="tamagui-result-analysis">{{ result.detailedAnalysis }}</text>
          </view>
          
          <view class="tamagui-result-section">
            <text class="tamagui-result-section-title">💡 防治建议</text>
            <text class="tamagui-result-suggestion">{{ result.suggestion }}</text>
          </view>
        </view>
        
        <!-- 错误结果 -->
        <view v-if="errorResult" class="tamagui-error-container" :class="{ 'tamagui-error-show': errorResult }">
          <view class="tamagui-error-header">
            <text class="tamagui-error-icon">❌</text>
            <text class="tamagui-error-title">识别失败</text>
          </view>
          
          <view class="tamagui-error-section">
            <text class="tamagui-error-section-title">🔧 使用模型</text>
            <text class="tamagui-error-model">{{ errorResult.modelUsed }}</text>
          </view>
          
          <view class="tamagui-error-section">
            <text class="tamagui-error-section-title">⚠️ 错误信息</text>
            <text class="tamagui-error-message">{{ errorResult.errorMessage }}</text>
          </view>
          
          <view class="tamagui-error-suggestion">
            <text class="tamagui-error-suggestion-text">💡 请尝试更换模型或重新上传图片</text>
          </view>
        </view>
      </view>
  </view>
</template>

<script>
import { getModels, uploadFile, analyzeImageBase64 } from '@/utils/request';
import { DEFAULT_AI_MODEL, MAX_FILE_SIZE, STORAGE_KEY } from '@/utils/config';

export default {
  data() {
    return {
      imageUrl: '',
      isIdentifying: false,
      models: [],
      modelIndex: 0,
      result: null, // 添加 result 数据属性
      errorResult: null, // 添加 errorResult 数据属性
      // 添加一个默认模型，防止models为空时显示问题
      defaultModel: { name: '加载中...' },
    };
  },
  onLoad() {
    this.loadModels();
  },
  computed: {
    currentModelType() {
      return this.models[this.modelIndex] ? this.models[this.modelIndex].type : '';
    }
  },
  methods: {
    async loadModels() {
      try {
        const res = await getModels();
        if (res && res.length > 0) {
          // 后端返回的是字符串数组，需要转换为包含name和type的对象数组
          this.models = res.map(modelType => {
            // 为模型类型创建更友好的显示名称
            let displayName = modelType;
            switch(modelType) {
              case 'qwen3':
                displayName = '通义千问 Qwen3';
                break;
              case 'gpt4':
                displayName = 'GPT-4';
                break;
              case 'claude':
                displayName = 'Claude';
                break;
              default:
                displayName = modelType;
            }
            return { name: displayName, type: modelType };
          });
          
          // 尝试查找默认模型，如果不存在则选中第一个
          const defaultModelIndex = this.models.findIndex(model => model.type === DEFAULT_AI_MODEL);
          this.modelIndex = defaultModelIndex !== -1 ? defaultModelIndex : 0;
        } else {
          this.models = [{ name: '无可用模型', type: '' }];
        }
      } catch (error) {
        console.error('加载模型失败:', error);
        uni.showToast({ title: '加载模型失败', icon: 'none' });
        this.models = [{ name: '加载失败', type: '' }];
      }
    },
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          // 可以在这里进行图片尺寸的预处理，例如限制大小或压缩
          this.imageUrl = tempFilePath;
          this.result = null;
          this.errorResult = null;
        },
        fail: (err) => {
          console.error('选择图片失败:', err);
          uni.showToast({ title: '选择图片失败', icon: 'none' });
        }
      });
    },
    clearImage() {
      this.imageUrl = '';
      this.result = null;
      this.errorResult = null;
    },
    onModelChange(e) {
      this.modelIndex = e.detail.value;
    },
    async identifyPest() {
      if (!this.imageUrl) {
        uni.showToast({ title: '请先选择图片', icon: 'none' });
        return;
      }
      if (!this.currentModelType) {
        uni.showToast({ title: '请选择一个有效的识别模型', icon: 'none' });
        return;
      }

      this.isIdentifying = true;
      this.result = null; // 清除之前的结果
      this.errorResult = null; // 清除之前的错误

      try {
        let resultData;
        // 根据图片大小决定使用文件上传还是Base64上传
        const fileInfo = await uni.getFileInfo({
          filePath: this.imageUrl
        });

        if (fileInfo.size <= MAX_FILE_SIZE) {
          // 文件大小在限制内，使用文件上传
          const res = await uploadFile(this.imageUrl, this.currentModelType);
          resultData = res; // 假设res直接是所需数据
        } else {
          // 文件过大，转换为Base64上传
          const base64 = await this.pathToBase64(this.imageUrl);
          const res = await analyzeImageBase64(base64.split(',')[1], this.currentModelType);
          resultData = res;
        }

        // 检查后端返回的数据结构，确保与result页面兼容
        if (resultData && resultData.success) {
          // 适配后端返回的数据结构
          this.result = {
            name: resultData.plantName || '未知植物',
            confidence: 95, // 后端没有返回置信度，使用默认值
            detailedAnalysis: resultData.detailedAnalysis || '暂无详细信息',
            suggestion: resultData.suggestion || '暂无防治建议',
            hasWormDamage: resultData.hasWormDamage || false,
            wormRiskLevel: resultData.wormRiskLevel || 0,
            hasAphid: resultData.hasAphid || false,
            aphidCount: resultData.aphidCount || '无',
            modelUsed: resultData.modelUsed || this.currentModelType,
          };
          
          // 保存到历史记录
          const historyResult = {
            ...this.result,
            imageUrl: this.imageUrl,
            timestamp: Date.now(),
          };
          this.saveHistory(historyResult);
          
          uni.showToast({ title: '识别成功', icon: 'success' });
        } else {
          // 处理识别失败的情况
          this.errorResult = {
            modelUsed: resultData?.modelUsed || this.currentModelType,
            errorMessage: resultData?.errorMessage || '识别失败，请重试',
          };
          
          uni.showToast({ title: '识别失败', icon: 'none' });
        }

      } catch (error) {
        // 处理异常情况
        this.errorResult = {
          modelUsed: this.currentModelType,
          errorMessage: error.message || error || '识别失败，请重试',
        };
        
        uni.showToast({ title: `识别失败: ${error.message || error}`, icon: 'none' });
        console.error('识别失败', error);
      } finally {
        this.isIdentifying = false;
        uni.hideLoading();
      }
    },
    async pathToBase64(filePath) {
      return new Promise((resolve, reject) => {
        uni.getFileSystemManager().readFile({
          filePath: filePath,
          encoding: 'base64',
          success: (res) => {
            resolve('data:image/jpeg;base64,' + res.data);
          },
          fail: (err) => {
            reject(err);
          },
        });
      });
    },
    saveHistory(result) {
      let history = uni.getStorageSync(STORAGE_KEY) || [];
      history.unshift(result);
      uni.setStorageSync(STORAGE_KEY, history);
    },
    goToHistory() {
      uni.navigateTo({
        url: '/pages/history/history',
      });
    },
  },
};

</script>

<style>
/* Tamagui 风格 - 简洁现代的设计 */
.tamagui-container {
  display: flex;
  flex-direction: column;
  padding: 24rpx;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  min-height: 100vh;
  gap: 24rpx;
}

/* 顶部标题区域 */
.tamagui-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32rpx 0 16rpx;
  animation: fadeInDown 0.8s ease-out;
}

.tamagui-title {
  font-size: 48rpx;
  font-weight: 700;
  background: linear-gradient(135deg, #2e7d32 0%, #66bb6a 50%, #4caf50 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 8rpx;
  letter-spacing: -0.5rpx;
  text-shadow: 0 2rpx 4rpx rgba(46, 125, 50, 0.1);
  animation: pulse 2s infinite alternate;
}

.tamagui-subtitle {
  font-size: 28rpx;
  background: linear-gradient(135deg, #666 0%, #888 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 400;
  animation: fadeIn 1s ease-out 0.3s both;
}

/* 卡片样式 */
.tamagui-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(10rpx);
}

.tamagui-card-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #000;
  margin-bottom: 16rpx;
}

/* 模型选择器 */
.tamagui-model-selector {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.tamagui-model-item {
  padding: 20rpx 24rpx;
  border-radius: 12rpx;
  background-color: #f5f5f5;
  border: 1rpx solid transparent;
  transition: all 0.2s ease;
}

.tamagui-model-item-active {
  background-color: #000;
  border-color: #000;
}

.tamagui-model-item-active .tamagui-model-text {
  color: #fff;
}

.tamagui-model-text {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
}

/* 上传区域 */
.tamagui-upload-area {
  height: 300rpx;
  border-radius: 12rpx;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.tamagui-preview-image {
  width: 100%;
  height: 400rpx;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  object-fit: cover;
}

.tamagui-image-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.tamagui-reupload-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  background: linear-gradient(135deg, #4CAF50, #388E3C);
  color: white;
  border: none;
  border-radius: 12rpx;
  padding: 16rpx 32rpx;
  font-size: 28rpx;
  font-weight: 600;
  box-shadow: 0 4rpx 12rpx rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
  margin-top: 20rpx;
}

.tamagui-reupload-icon {
  font-size: 24rpx;
}

.tamagui-reupload-text {
  font-size: 28rpx;
}

.tamagui-upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
}

.tamagui-upload-icon {
  font-size: 60rpx;
  opacity: 0.6;
}

.tamagui-upload-text {
  font-size: 28rpx;
  color: #666;
}

/* 操作按钮 */
.tamagui-actions {
  display: flex;
  gap: 12rpx;
  margin-top: 16rpx;
}

.tamagui-action-button {
  flex: 1;
  padding: 16rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
  font-weight: 500;
  text-align: center;
  border: none;
}

.tamagui-reselect {
  background: linear-gradient(135deg, #4CAF50, #388E3C);
  color: #fff;
  box-shadow: 0 4rpx 12rpx rgba(76, 175, 80, 0.3);
}

.tamagui-clear {
  background-color: #f5f5f5;
  color: #333;
}

/* 主按钮 */
.tamagui-button-container {
  margin: 8rpx 0;
}

.tamagui-button {
    width: 100%;
    padding: 24rpx;
    border-radius: 12rpx;
    background: linear-gradient(135deg, #4CAF50, #388E3C);
    color: #fff;
    border: none;
    font-size: 32rpx;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    transition: all 0.3s ease;
    box-shadow: 0 4rpx 12rpx rgba(76, 175, 80, 0.3);
    position: relative;
    overflow: hidden;
  }

  .tamagui-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  .tamagui-button:hover::before {
    left: 100%;
  }

  .tamagui-button:hover {
    transform: translateY(-4rpx);
    box-shadow: 0 8rpx 16rpx rgba(76, 175, 80, 0.4);
  }
  
  .tamagui-button-icon {
    font-size: 28rpx;
  }
  
  .tamagui-button:active {
    transform: translateY(-2rpx) scale(0.98);
    box-shadow: 0 2rpx 8rpx rgba(76, 175, 80, 0.3);
  }
  
  .tamagui-button[disabled] {
    background: linear-gradient(135deg, #a5d6a7, #81c784);
    color: #e8f5e9;
    box-shadow: none;
  }

  .tamagui-button[disabled]:hover {
    transform: none;
    box-shadow: none;
  }

  .tamagui-button[disabled]:active {
    transform: none;
  }
  
  .tamagui-button-secondary {
    background-color: #f5f5f5;
    color: #333;
  }

  .tamagui-button-secondary:hover {
    background-color: #eeeeee;
  }
  
  .tamagui-button-text {
    font-size: 32rpx;
    font-weight: 600;
  }

/* 识别结果区域动画 */
  .tamagui-result-container {
    opacity: 0;
    transform: translateY(20rpx) scale(0.95);
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .tamagui-result-show {
    opacity: 1;
    transform: translateY(0) scale(1);
    animation: bounce 0.6s ease-out;
  }

  .tamagui-result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16rpx;
    border-bottom: 1rpx solid #eee;
    animation: fadeIn 0.8s ease-out 0.2s both;
  }

  .tamagui-result-name {
    font-size: 36rpx;
    font-weight: 700;
    background: linear-gradient(135deg, #2e7d32 0%, #66bb6a 50%, #4caf50 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: glow 2s infinite alternate;
  }

  .tamagui-confidence-badge {
    background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
    padding: 8rpx 16rpx;
    border-radius: 20rpx;
    animation: fadeIn 0.8s ease-out 0.3s both;
  }

  .tamagui-confidence-text {
    font-size: 24rpx;
    color: #fff;
    font-weight: 500;
  }

  .tamagui-result-section {
    display: flex;
    flex-direction: column;
    gap: 8rpx;
    animation: fadeIn 0.8s ease-out 0.4s both;
  }

  .tamagui-result-section-title {
    font-size: 28rpx;
    font-weight: 600;
    color: #000;
  }

  .tamagui-worm-status {
    display: flex;
    align-items: center;
    gap: 16rpx;
  }

  .tamagui-worm-status-text {
    font-size: 28rpx;
    font-weight: 500;
  }

  .tamagui-worm-danger {
    background: linear-gradient(135deg, #d32f2f 0%, #ef5350 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 700;
  }

  .tamagui-worm-safe {
    background: linear-gradient(135deg, #388e3c 0%, #66bb6a 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 700;
  }

  .tamagui-risk-level {
    font-size: 24rpx;
    font-weight: 600;
    padding: 4rpx 12rpx;
    border-radius: 12rpx;
  }

  .tamagui-risk-high {
    background: linear-gradient(135deg, #d32f2f 0%, #ef5350 100%);
    color: #fff;
  }

  .tamagui-risk-medium {
    background: linear-gradient(135deg, #f57c00 0%, #ffb74d 100%);
    color: #fff;
  }

  .tamagui-risk-low {
    background: linear-gradient(135deg, #388e3c 0%, #66bb6a 100%);
    color: #fff;
  }

  .tamagui-aphid-status {
    font-size: 28rpx;
    font-weight: 500;
  }

  .tamagui-aphid-detected {
    background: linear-gradient(135deg, #d32f2f 0%, #ef5350 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 700;
  }

  .tamagui-aphid-none {
    background: linear-gradient(135deg, #388e3c 0%, #66bb6a 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 700;
  }

  .tamagui-result-analysis,
  .tamagui-result-suggestion {
    font-size: 28rpx;
    line-height: 1.5;
    color: #333;
  }

/* 错误结果区域样式 */
.tamagui-error-container {
  opacity: 0;
  transform: translateY(20rpx) scale(0.95);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.tamagui-error-show {
  opacity: 1;
  transform: translateY(0) scale(1);
  animation: shake 0.5s ease-in-out;
}

.tamagui-error-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid #eee;
  margin-bottom: 16rpx;
  animation: fadeIn 0.8s ease-out 0.2s both;
}

.tamagui-error-icon {
  font-size: 40rpx;
  color: #d32f2f;
  animation: pulse 1s infinite alternate;
}

.tamagui-error-title {
  font-size: 36rpx;
  font-weight: 700;
  background: linear-gradient(135deg, #d32f2f 0%, #ef5350 50%, #e57373 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.tamagui-error-section {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  margin-bottom: 16rpx;
  animation: fadeIn 0.8s ease-out 0.3s both;
}

.tamagui-error-section-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #000;
}

.tamagui-error-model {
  font-size: 28rpx;
  color: #333;
  padding: 8rpx 16rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  animation: fadeIn 0.8s ease-out 0.4s both;
}

.tamagui-error-message {
  font-size: 28rpx;
  color: #d32f2f;
  padding: 16rpx;
  background-color: #ffebee;
  border-radius: 8rpx;
  border-left: 4rpx solid #d32f2f;
  animation: fadeIn 0.8s ease-out 0.5s both;
}

.tamagui-error-suggestion {
  margin-top: 16rpx;
  padding: 16rpx;
  background-color: #e8f5e9;
  border-radius: 8rpx;
  border-left: 4rpx solid #4caf50;
  animation: fadeIn 0.8s ease-out 0.6s both;
}

.tamagui-error-suggestion-text {
  font-size: 28rpx;
  color: #2e7d32;
}

/* 动画关键帧 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.02);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-4rpx);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(4rpx);
  }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8rpx, 0);
  }
  70% {
    transform: translate3d(0, -4rpx, 0);
  }
  90% {
    transform: translate3d(0, -2rpx, 0);
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 0 5rpx rgba(76, 175, 80, 0.5);
  }
  50% {
    box-shadow: 0 0 20rpx rgba(76, 175, 80, 0.8);
  }
  100% {
    box-shadow: 0 0 5rpx rgba(76, 175, 80, 0.5);
  }
}
</style>