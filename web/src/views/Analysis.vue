<template>
  <div class="analysis-page">
    <!-- 导航栏 -->
    <header class="header">
      <div class="container">
        <div class="logo">
          <span class="logo-icon">🌱</span>
          <span class="logo-text">植物病虫害AI识别</span>
        </div>
        <nav class="nav">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/analysis" class="nav-link active">在线识别</router-link>
          <router-link to="/about" class="nav-link">关于我们</router-link>
        </nav>
      </div>
    </header>

    <div class="main-content">
      <div class="container">
        <h1 class="page-title">在线识别</h1>
        
        <div class="content-grid">
          <!-- 左侧：上传区域 -->
          <div class="upload-section">
            <el-card class="upload-card" shadow="hover">
              <template #header>
                <div class="card-header">
                  <span class="card-title">📸 上传植物图片</span>
                </div>
              </template>
              
              <!-- 图片上传 -->
              <div class="upload-area" v-if="!imageUrl">
                <el-upload
                  class="image-uploader"
                  :show-file-list="false"
                  :before-upload="beforeUpload"
                  :on-change="handleFileChange"
                  :auto-upload="false"
                  drag
                >
                  <div class="upload-placeholder">
                    <el-icon class="upload-icon"><Upload /></el-icon>
                    <div class="upload-text">
                      <p class="upload-title">点击或拖拽图片到这里</p>
                      <p class="upload-hint">支持 JPG、PNG、WEBP 格式，大小不超过 10MB</p>
                    </div>
                  </div>
                </el-upload>
              </div>
              
              <!-- 图片预览 -->
              <div class="image-preview" v-else>
                <img :src="imageUrl" alt="预览图" />
                <div class="preview-actions">
                  <el-button type="danger" size="small" @click="removeImage">
                    <el-icon><Delete /></el-icon>
                    <span>重新选择</span>
                  </el-button>
                </div>
              </div>
              
              <!-- 模型选择 -->
              <div class="model-selector">
                <label class="selector-label">选择AI模型：</label>
                <el-select v-model="selectedModel" placeholder="请选择模型" style="width: 100%">
                  <el-option label="QWEN3 (通义千问)" value="qwen3" />
                  <el-option label="GPT-4 Vision" value="gpt4" />
                  <el-option label="Claude 3" value="claude" />
                </el-select>
              </div>
              
              <!-- 分析按钮 -->
              <el-button 
                type="success" 
                size="large" 
                :loading="analyzing"
                :disabled="!imageFile || analyzing"
                @click="analyzeImage"
                class="analyze-btn"
              >
                <el-icon v-if="!analyzing"><Search /></el-icon>
                <span>{{ analyzing ? '分析中...' : '开始分析' }}</span>
              </el-button>
            </el-card>
          </div>
          
          <!-- 右侧：结果展示 -->
          <div class="result-section">
            <el-card class="result-card" shadow="hover" v-if="result">
              <template #header>
                <div class="card-header">
                  <span class="card-title">📊 分析结果</span>
                </div>
              </template>
              
              <!-- 植物信息 -->
              <div class="plant-info" v-if="result.plantName">
                <div class="info-icon">🌿</div>
                <div class="info-content">
                  <span class="info-label">识别植物</span>
                  <span class="info-value">{{ result.plantName }}</span>
                </div>
              </div>
              
              <!-- 虫蛀风险 -->
              <div class="risk-section">
                <h3 class="section-title">
                  <span class="title-icon">🐛</span>
                  虫蛀风险评估
                </h3>
                <div class="risk-level">
                  <el-progress 
                    :percentage="(result.wormRiskLevel || 0) * 25" 
                    :color="getRiskColor(result.wormRiskLevel)"
                    :stroke-width="20"
                  />
                  <span class="risk-text">{{ getRiskText(result.wormRiskLevel) }}</span>
                </div>
              </div>
              
              <!-- 蚜虫检测 -->
              <div class="aphid-section">
                <h3 class="section-title">
                  <span class="title-icon">🦗</span>
                  蚜虫检测
                </h3>
                <el-alert
                  :title="result.hasAphid ? '检测到蚜虫' : '未检测到蚜虫'"
                  :type="result.hasAphid ? 'error' : 'success'"
                  :closable="false"
                  show-icon
                >
                  <template v-if="result.hasAphid">
                    <p>数量估计：{{ result.aphidCount || '未知' }}</p>
                  </template>
                </el-alert>
              </div>
              
              <!-- 详细分析 -->
              <div class="analysis-section" v-if="result.detailedAnalysis">
                <h3 class="section-title">
                  <span class="title-icon">📋</span>
                  详细分析
                </h3>
                <div class="analysis-content">
                  <p>{{ result.detailedAnalysis }}</p>
                </div>
              </div>
              
              <!-- 防治建议 -->
              <div class="suggestion-section" v-if="result.suggestion">
                <h3 class="section-title">
                  <span class="title-icon">💊</span>
                  防治建议
                </h3>
                <div class="suggestion-content">
                  <p>{{ result.suggestion }}</p>
                </div>
              </div>
              
              <!-- 模型信息 -->
              <div class="model-info">
                <el-tag type="info" size="small">
                  分析模型：{{ result.modelUsed || '未知' }}
                </el-tag>
              </div>
            </el-card>
            
            <!-- 空状态 -->
            <el-card class="empty-card" shadow="hover" v-else>
              <el-empty description="上传图片后将在此显示分析结果">
                <template #image>
                  <div class="empty-icon">📊</div>
                </template>
              </el-empty>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Upload, Delete, Search } from '@element-plus/icons-vue'
import { uploadAndAnalyze } from '@/api/analysis'

const imageFile = ref(null)
const imageUrl = ref('')
const selectedModel = ref('qwen3')
const analyzing = ref(false)
const result = ref(null)

// 文件选择前验证
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt10M = file.size / 1024 / 1024 < 10

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt10M) {
    ElMessage.error('图片大小不能超过 10MB!')
    return false
  }
  return true
}

// 处理文件变化
const handleFileChange = (file) => {
  if (beforeUpload(file.raw)) {
    imageFile.value = file.raw
    imageUrl.value = URL.createObjectURL(file.raw)
  }
}

// 移除图片
const removeImage = () => {
  imageFile.value = null
  imageUrl.value = ''
  result.value = null
}

// 分析图片
const analyzeImage = async () => {
  if (!imageFile.value) {
    ElMessage.warning('请先上传图片')
    return
  }
  
  analyzing.value = true
  
  try {
    const res = await uploadAndAnalyze(imageFile.value, selectedModel.value)
    result.value = res
    
    if (res.success) {
      ElMessage.success('分析完成')
    } else {
      ElMessage.error(res.errorMessage || '分析失败')
    }
  } catch (error) {
    console.error('分析失败', error)
    ElMessage.error(error.message || '分析失败，请稍后重试')
  } finally {
    analyzing.value = false
  }
}

// 获取风险等级文本
const getRiskText = (level) => {
  const texts = ['无风险', '低风险', '中风险', '高风险']
  return texts[level] || '未知'
}

// 获取风险等级颜色
const getRiskColor = (level) => {
  const colors = ['#67C23A', '#E6A23C', '#F56C6C', '#F56C6C']
  return colors[level] || '#909399'
}
</script>

<style scoped>
.analysis-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%);
}

/* 复用首页的header样式 */
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
}

.logo-icon {
  font-size: 32px;
}

.nav {
  display: flex;
  gap: 30px;
}

.nav-link {
  text-decoration: none;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary-color);
  background: rgba(76, 175, 80, 0.1);
}

/* 主内容 */
.main-content {
  padding: 40px 20px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  font-size: 40px;
  color: var(--text-primary);
  margin-bottom: 40px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.upload-card,
.result-card,
.empty-card {
  height: fit-content;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
}

/* 上传区域 */
.upload-area {
  margin-bottom: 20px;
}

.image-uploader :deep(.el-upload) {
  width: 100%;
}

.image-uploader :deep(.el-upload-dragger) {
  width: 100%;
  height: 300px;
  border: 2px dashed var(--primary-color);
  border-radius: 12px;
  background: #F5F5F5;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.upload-icon {
  font-size: 60px;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.upload-title {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.upload-hint {
  font-size: 14px;
  color: var(--text-muted);
}

/* 图片预览 */
.image-preview {
  position: relative;
  margin-bottom: 20px;
}

.image-preview img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 12px;
}

.preview-actions {
  margin-top: 15px;
  text-align: center;
}

/* 模型选择 */
.model-selector {
  margin-bottom: 20px;
}

.selector-label {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 10px;
}

/* 分析按钮 */
.analyze-btn {
  width: 100%;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
}

/* 结果展示 */
.plant-info {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
  border-radius: 12px;
  margin-bottom: 20px;
}

.info-icon {
  font-size: 50px;
  margin-right: 20px;
}

.info-content {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 14px;
  color: #66BB6A;
  margin-bottom: 5px;
}

.info-value {
  font-size: 24px;
  font-weight: bold;
  color: #2E7D32;
}

.risk-section,
.aphid-section,
.analysis-section,
.suggestion-section {
  margin-bottom: 25px;
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 15px;
}

.title-icon {
  font-size: 24px;
  margin-right: 10px;
}

.risk-level {
  margin-top: 10px;
}

.risk-text {
  display: block;
  margin-top: 10px;
  font-size: 16px;
  color: var(--text-secondary);
  text-align: right;
}

.analysis-content,
.suggestion-content {
  padding: 15px;
  background: #F5F5F5;
  border-radius: 8px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.suggestion-content {
  background: #FFF3E0;
}

.model-info {
  margin-top: 20px;
  text-align: center;
}

.empty-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.empty-icon {
  font-size: 100px;
}

/* 响应式设计 */
@media (max-width: 968px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
