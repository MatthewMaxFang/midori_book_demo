<template>
  <div class="journal-edit-page">
    <!-- 状态栏 -->
    <div class="status-bar">
      <span class="time">13:44</span>
      <div class="status-right">
        <div class="signal-icon">
          <div class="signal-bar"></div>
          <div class="signal-bar"></div>
          <div class="signal-bar"></div>
          <div class="signal-bar"></div>
        </div>
        <div class="wifi-icon">📶</div>
        <div class="battery-icon">
          <div class="battery-body">
            <div class="battery-level"></div>
          </div>
          <div class="battery-tip"></div>
        </div>
        <span class="battery-text">83</span>
      </div>
    </div>

    <!-- 顶部导航栏 -->
    <div class="header">
      <button class="back-btn" @click="goBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
      <button class="save-btn" @click="saveJournal">保存</button>
    </div>

    <!-- 主要编辑区域 -->
    <div class="edit-area">
      <div class="journal-canvas" :style="{ backgroundImage: `url(${currentTemplate.background})` }">
        <!-- 歌词文本显示区域 -->
        <!-- <div class="lyrics-text" :style="currentTemplate.textStyle">
          <div v-for="(lyric, index) in lyricsData" :key="index" class="lyric-line">
            {{ lyric.text }}
          </div>
          <div class="signature">
            ——{{ songTitle }}<br>
            {{ artist }}
          </div>
        </div> -->

        <!-- 装饰元素（玫瑰花图案等） -->
        <div class="decoration-elements">
          <!-- 这里可以添加装饰性的SVG或图片元素 -->
        </div>
      </div>
    </div>

    <!-- 底部模板选择区域 -->
    <div class="bottom-panel">
      <!-- AI模版选项 -->
      <div class="template-section">
        <!-- 其他模板选项 -->
        <div class="template-options">
          <div class="template-item template-option ai-template-item"
            :class="{ 'has-generated': hasAIGenerated, 'active': currentTemplateIndex === -1 }"
            @click="handleAITemplateClick" @mouseenter="showRegenerateBtn = true"
            @mouseleave="showRegenerateBtn = false">
            <!-- 未生成时显示AI图标和文字 -->
            <template v-if="!hasAIGenerated">
              <div class="template-icon">AI</div>
              <span class="template-label">模版</span>
            </template>
            <!-- 已生成时显示生成的图片 -->
            <template v-else>
              <img :src="generatedImage" alt="AI生成的模板" class="ai-generated-image">
              <!-- hover时显示重新生成按钮 -->
              <div v-if="showRegenerateBtn" class="regenerate-overlay" @click.stop="regenerateTemplate">
                <div class="regenerate-icon">🔄</div>
              </div>
            </template>
          </div>
          <div v-for="(template, index) in templates" :key="index" class="template-option"
            :class="{ active: currentTemplateIndex === index && currentTemplateIndex !== -1 }"
            @click="selectTemplate(index)">
            <img :src="template.thumbnail" :alt="template.name" class="template-thumbnail">
          </div>
        </div>
      </div>

      <!-- 底部功能按钮 -->
      <div class="bottom-actions">
        <div class="action-item">
          <div class="action-icon" style="background: #ff6b6b;">📱</div>
          <span class="action-label">发布到社区</span>
        </div>
        <div class="action-item">
          <div class="action-icon" style="background: #4ecdc4;">⬇️</div>
          <span class="action-label">保存本地</span>
        </div>
        <div class="action-item">
          <div class="action-icon" style="background: #45b7d1;">💬</div>
          <span class="action-label">微信</span>
        </div>
        <div class="action-item">
          <div class="action-icon" style="background: #96ceb4;">🔄</div>
          <span class="action-label">朋友圈</span>
        </div>
        <div class="action-item">
          <div class="action-icon" style="background: #feca57;">📝</div>
          <span class="action-label">小红书</span>
        </div>
        <div class="action-item">
          <div class="action-icon" style="background: #ff9ff3;">📱</div>
          <span class="action-label">QQ</span>
        </div>
      </div>
    </div>

    <!-- AI模板编辑弹窗 -->
    <div v-if="showAIModal" class="modal-overlay" @click="closeAIModal">
      <div class="ai-modal" @click.stop>
        <div class="modal-header">
          <h3>AI生成手帐模版</h3>
          <button class="close-btn" @click="closeAIModal">×</button>
        </div>
        <div class="modal-content">
          <div class="prompt-section">
            <label>提示词</label>
            <textarea v-model="aiPrompt" class="prompt-input" placeholder="请输入生成描述..." rows="4"></textarea>
          </div>
          <button class="generate-btn" @click="generateAITemplate">一键AI生成</button>
        </div>
      </div>
    </div>

    <!-- 生成中动画弹窗 -->
    <div v-if="showGeneratingModal" class="modal-overlay">
      <div class="generating-modal">
        <div class="loading-animation">
          <div class="loading-spinner"></div>
        </div>
        <h3>AI生成中...</h3>
        <p>请稍候，正在为您生成专属手帐模版</p>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'JournalEditPage',
  data() {
    return {
      // 当前选中的模板索引
      currentTemplateIndex: 0,
      // 歌词数据
      lyricsData: [],
      // 歌曲信息
      songTitle: '',
      artist: '',
      // AI模板相关状态
      showAIModal: false,
      showGeneratingModal: false,
      hasAIGenerated: false,
      showRegenerateBtn: false,
      aiPrompt: '清新治愈风电子手帐，日式插画配简约文字，浅粉、浅绿、米白调，带肌理。初夏背景，有绿球花、汽水瓶、手帐轻盈，古风朱红后读读本，猫咪、西瓜预告，图字体呈现。',
      generatedImage: '/src/assets/midori/cover_2.jpg',
      currentAITemplate: null,
      // 模板配置
      templates: [
        {
          name: '通用模板',
          background: '/src/assets/midori/cover_5.png',
          thumbnail: '/src/assets/midori/cover_5.png',
          textStyle: {
            position: 'absolute',
            top: '20%',
            left: '10%',
            right: '10%',
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#333333',
            fontFamily: '黑体, SimHei, sans-serif',
            textAlign: 'left'
          }
        },
        {
          name: '复古牛皮纸',
          background: '/src/assets/midori/cover_1.jpg',
          thumbnail: '/src/assets/midori/cover_1.jpg',
          textStyle: {
            position: 'absolute',
            top: '20%',
            left: '10%',
            right: '10%',
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#8B4513',
            fontFamily: '楷体, KaiTi, serif',
            textAlign: 'left'
          }
        },
        {
          name: '清新简约',
          background: '/src/assets/midori/cover_2.jpg',
          thumbnail: '/src/assets/midori/cover_2.jpg',
          textStyle: {
            position: 'absolute',
            top: '25%',
            left: '15%',
            right: '15%',
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#2C3E50',
            fontFamily: '微软雅黑, Microsoft YaHei, sans-serif',
            textAlign: 'center'
          }
        },
        {
          name: '文艺风格',
          background: '/src/assets/midori/cover_3.jpg',
          thumbnail: '/src/assets/midori/cover_3.jpg',
          textStyle: {
            position: 'absolute',
            top: '30%',
            left: '12%',
            right: '12%',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#34495E',
            fontFamily: '宋体, SimSun, serif',
            textAlign: 'justify'
          }
        },
      ]
    }
  },
  computed: {
    /**
     * 获取当前选中的模板配置
     * @returns {Object} 当前模板对象
     */
    currentTemplate() {
      // 如果当前选中的是AI模板（索引为-1），返回AI模板
      if (this.currentTemplateIndex === -1 && this.currentAITemplate) {
        return this.currentAITemplate
      }
      return this.templates[this.currentTemplateIndex] || this.templates[0]
    }
  },
  mounted() {
    /**
     * 组件挂载时初始化数据
     * 从路由参数中获取歌词和歌曲信息
     */
    this.initializeData()
  },
  methods: {
    /**
     * 初始化页面数据
     * 从路由查询参数中获取歌词数据
     */
    initializeData() {
      const { lyrics, songTitle, artist } = this.$route.query

      if (lyrics) {
        try {
          this.lyricsData = JSON.parse(lyrics)
        } catch (error) {
          console.error('解析歌词数据失败:', error)
          this.lyricsData = []
        }
      }

      this.songTitle = songTitle || '未知歌曲'
      this.artist = artist || '未知歌手'
    },

    /**
     * 选择模板
     * @param {number} index - 模板索引
     */
    selectTemplate(index) {
      this.currentTemplateIndex = index
    },

    /**
     * 返回上一页
     */
    goBack() {
      this.$router.go(-1)
    },

    /**
     * 保存手帐
     * 将编辑好的手帐保存到本地存储
     */
    saveJournal() {
      const journalData = {
        id: Date.now(),
        lyrics: this.lyricsData,
        songTitle: this.songTitle,
        artist: this.artist,
        template: this.currentTemplate,
        createdAt: new Date().toLocaleDateString('zh-CN'),
        timestamp: Date.now(),
        currIdx: this.currentTemplateIndex
      }

      // 保存到本地存储
      const existingJournals = JSON.parse(localStorage.getItem('lyricMoodRecords') || '[]')
      existingJournals.unshift(journalData)
      localStorage.setItem('lyricMoodRecords', JSON.stringify(existingJournals))

      // 跳转到手帐列表页面
      this.$router.push('/lyricbook')
    },

    /**
     * 处理AI模板点击事件
     * 如果未生成过，打开编辑弹窗；如果已生成，选中AI模板或重新生成
     */
    handleAITemplateClick() {
      if (!this.hasAIGenerated) {
        this.openAITemplateModal()
      } else {
        // 如果已经生成过，直接选中AI模板
        this.useAITemplate()
      }
    },

    /**
     * 打开AI模板编辑弹窗
     */
    openAITemplateModal() {
      this.showAIModal = true
    },

    /**
     * 使用AI生成的模板
     * 直接应用AI生成的背景到当前手帐，不添加到模板列表
     */
    useAITemplate() {
      // 创建AI模板配置
      const aiTemplate = {
        name: 'AI生成模板',
        background: this.generatedImage,
        thumbnail: this.generatedImage,
        textStyle: {
          position: 'absolute',
          top: '20%',
          left: '10%',
          right: '10%',
          fontSize: '16px',
          lineHeight: '1.8',
          color: '#333333',
          fontFamily: '微软雅黑, Microsoft YaHei, sans-serif',
          textAlign: 'left'
        }
      }

      // 直接将AI模板设置为当前模板，不添加到templates数组
      this.currentAITemplate = aiTemplate
      // 设置一个特殊的索引值来标识当前使用的是AI模板
      this.currentTemplateIndex = -1
    },

    /**
     * 关闭AI模板编辑弹窗
     */
    closeAIModal() {
      this.showAIModal = false
    },

    /**
     * 生成AI模板
     */
    generateAITemplate() {
      // 关闭编辑弹窗
      this.showAIModal = false
      // 显示生成中动画
      this.showGeneratingModal = true

      // 模拟5秒生成时间
      setTimeout(() => {
        this.showGeneratingModal = false
        this.hasAIGenerated = true
        this.useAITemplate()
      }, 5000)
    },



    /**
     * 重新生成模板
     * 重新打开编辑弹窗让用户修改提示词
     */
    regenerateTemplate() {
      this.openAITemplateModal()
    }
  }
}
</script>

<style scoped>
.journal-edit-page {
  width: 100%;
  height: 100vh;
  background: #1a1a1a;
  position: relative;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
}

/* 状态栏样式 */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: #1a1a1a;
}

.status-right {
  display: flex;
  gap: 8px;
  align-items: center;
}

.signal-icon {
  display: flex;
  gap: 1px;
  align-items: flex-end;
  height: 12px;
}

.signal-bar {
  width: 2px;
  background: white;
  border-radius: 1px;
}

.signal-bar:nth-child(1) {
  height: 3px;
}

.signal-bar:nth-child(2) {
  height: 5px;
}

.signal-bar:nth-child(3) {
  height: 7px;
}

.signal-bar:nth-child(4) {
  height: 9px;
}

.wifi-icon {
  font-size: 12px;
}

.battery-icon {
  display: flex;
  align-items: center;
  gap: 1px;
}

.battery-body {
  width: 20px;
  height: 10px;
  border: 1px solid white;
  border-radius: 2px;
  position: relative;
  background: transparent;
}

.battery-level {
  width: 83%;
  height: 100%;
  background: white;
  border-radius: 1px;
}

.battery-tip {
  width: 1px;
  height: 4px;
  background: white;
  border-radius: 0 1px 1px 0;
}

.battery-text {
  font-size: 12px;
  margin-left: 2px;
}

/* 顶部导航栏 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #1a1a1a;
}

.back-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.save-btn {
  background: #00d4aa;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

/* 主要编辑区域 */
.edit-area {
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1a1a1a;
  overflow-y: auto;
}

.journal-canvas {
  width: 360px;
  min-height: 520px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.lyrics-text {
  width: calc(100% - 80px);
  max-height: calc(100% - 120px);
  overflow: hidden;
}

.lyric-line {
  margin-bottom: 8px;
  word-wrap: break-word;
}

.signature {
  margin-top: 20px;
  text-align: right;
  font-style: italic;
  opacity: 0.8;
}

/* 底部面板 */
.bottom-panel {
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 20px;
  max-height: 240px;
  overflow-y: auto;
}

.template-options {
  margin-bottom: 10px;
}

/* AI模板特殊样式 */
.ai-template-item {
  position: relative;
  width: 60px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
  background: #c2e4f3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.ai-template-item.has-generated {
  background: transparent;
}

.template-icon {
  width: 32px;
  height: 32px;
  background: #007AFF;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.template-label {
  font-size: 12px;
  color: #333;
  margin-top: 4px;
}

.ai-generated-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.regenerate-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.regenerate-icon {
  font-size: 20px;
  color: white;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.template-options {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
}

.template-option {
  flex-shrink: 0;
  width: 60px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.template-option.active {
  border-color: #007AFF;
}

.template-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 底部功能按钮 */
.bottom-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  overflow-x: auto;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  cursor: pointer;
}

.action-icon {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.action-label {
  font-size: 10px;
  color: #666;
  text-align: center;
  white-space: nowrap;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

/* AI编辑弹窗 */
.ai-modal {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  padding: 20px;
}

.prompt-section {
  margin-bottom: 20px;
}

.prompt-section label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.5;
}

.prompt-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
}

.prompt-input:focus {
  outline: none;
  border-color: #007AFF;
  box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.1);
}

.generate-btn {
  width: 100%;
  background: linear-gradient(135deg, #007AFF, #5856D6);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.generate-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
}

/* 生成中弹窗 */
.generating-modal {
  background: white;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.loading-animation {
  margin-bottom: 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007AFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.generating-modal h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.generating-modal p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}



/* 响应式设计 */
@media (max-width: 480px) {
  .journal-canvas {
    width: 360px;
  }

  .edit-area {
    padding: 15px;
  }

  .bottom-panel {
    padding: 15px;
  }

  .ai-modal {
    width: 95%;
    margin: 0 10px;
  }

  .modal-content {
    padding: 15px;
  }

  .generating-modal {
    padding: 30px 20px;
  }
}
</style>