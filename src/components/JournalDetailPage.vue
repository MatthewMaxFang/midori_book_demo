<template>
  <div class="journal-detail-page">
    <!-- 状态栏 -->
    <div class="status-bar">
      <span class="time">14:23</span>
      <div class="status-right">
        <div class="signal-icon">
          <div class="signal-bar"></div>
          <div class="signal-bar"></div>
          <div class="signal-bar"></div>
          <div class="signal-bar"></div>
        </div>
        <div class="battery-icon">
          <div class="battery-body">
            <div class="battery-level"></div>
          </div>
          <div class="battery-tip"></div>
          <span class="battery-text">97</span>
        </div>
      </div>
    </div>

    <!-- 自定义导航栏 -->
    <div class="custom-nav" v-if="!isEditMode">
      <button class="nav-back-btn" @click="goBack">
        <img src="../assets/back_arrow.svg" alt="返回" class="back-icon" />
      </button>
      <h1 class="nav-title">{{ isOthersJournal ? '手帐详情' : '手帐详情' }}</h1>
      <div class="nav-placeholder"></div>
    </div>

    <!-- 编辑模式导航栏 -->
    <div class="edit-nav" v-if="isEditMode">
      <button class="nav-back-btn" @click="exitEditMode">
        <img src="../assets/back_arrow.svg" alt="返回" class="back-icon" />
      </button>
      <h1 class="nav-title">自定义手帐</h1>
      <button class="save-btn" @click="saveEditedJournal">保存</button>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content" v-if="!isEditMode">
      <div v-if="journalData" class="journal-content">
        <!-- 海报展示区 -->
        <div class="poster-container" @wheel="handleDetailPosterWheel">
          <div class="poster-wrapper">
            <img 
              :src="getCurrentPosterImage()" 
              :alt="journalData.songTitle"
              class="poster-image"
              :style="{
                transform: `scale(${detailPosterScale || 1}) translate(${detailPosterOffsetX || 0}px, ${detailPosterOffsetY || 0}px)`,
                cursor: isDraggingDetailPoster ? 'grabbing' : 'grab'
              }"
              @load="onPosterLoaded"
              @error="onPosterError"
              @mousedown="startDetailPosterDrag"
              @touchstart="startDetailPosterDrag"
              @dragstart.prevent
            />
            
            <!-- 只有在没有编辑后图片时才显示悬浮元素 -->
            <div 
              v-if="!journalData.editedPosterPath"
              v-for="element in (journalData.editElements || [])" 
              :key="element.id"
              class="detail-edit-element"
              :style="{
                left: element.x + 'px',
                top: element.y + 'px',
                transform: `scale(${element.scale || 1}) rotate(${element.rotation || 0}deg)`,
                color: element.color || '#fff',
                fontSize: element.fontSize + 'px',
                fontFamily: element.fontFamily || 'inherit',
                textShadow: element.type === 'text' ? '2px 2px 4px rgba(0,0,0,0.8)' : 'none'
              }"
            >
              <div v-if="element.type === 'text'" class="detail-text-element">
                {{ element.content }}
        </div>
              <div v-if="element.type === 'sticker'" class="detail-sticker-element">
                <img 
                  :src="element.content" 
                  :alt="'贴纸'"
                  class="detail-sticker-image"
                  :style="{
                    width: (element.width || 80) + 'px',
                    height: (element.height || 80) + 'px'
                  }"
                />
        </div>
      </div>
            
            <!-- 海报信息叠加层 - 只在原始状态且没有编辑元素时显示 -->
            <div class="poster-overlay" v-if="!journalData.editedPosterPath && (!journalData.editElements || journalData.editElements.length === 0)">
              <div class="poster-info">
                <h2 class="poster-title">{{ journalData.songTitle }}</h2>
                <p class="poster-artist">{{ journalData.artist }}</p>
                <div class="poster-date">{{ journalData.collectedAt }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 如果没有数据 -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <div class="book-icon">📖</div>
        </div>
        <div class="empty-content">
          <h3 class="empty-title">未找到手帐详情</h3>
          <p class="empty-desc">请返回手帐列表重新选择</p>
        </div>
      </div>
    </div>

    <!-- 编辑模式内容区 -->
    <div class="edit-content" v-if="isEditMode">

      <!-- 编辑画布 -->
      <div class="edit-canvas" ref="editCanvas" @click.self="handleCanvasClick" @touchend.self="handleCanvasTouch">
        <!-- 海报背景层 -->
        <div 
          class="canvas-poster-background"
          @wheel="handlePosterWheel"
          @mousedown="startPosterDrag"
          @touchstart="startPosterDrag"
          @click.self="handleBackgroundClick"
        >
          <img 
            :src="getCurrentPosterImage()" 
            :alt="editData.songTitle"
            class="canvas-poster-image"
            :style="{
              transform: `scale(${posterScale}) translate(${posterOffsetX}px, ${posterOffsetY}px)`,
              cursor: isPosterDragging ? 'grabbing' : 'grab'
            }"
            @load="onCanvasPosterLoaded"
            @dragstart.prevent
            @mousedown.stop="startPosterDrag"
            @touchstart.stop="startPosterDrag"
          />
        </div>
        
        <!-- 元素容器层 - 跟随海报变换 -->
        <div 
          class="elements-container"
          :style="{
            transform: `scale(${posterScale}) translate(${posterOffsetX}px, ${posterOffsetY}px)`
          }"
        >
          <!-- 用户添加的元素层 -->
          <div 
            v-for="element in editElements" 
            :key="element.id"
            :data-element-id="element.id"
            class="edit-element"
            :class="{ 
              selected: selectedElement === element.id,
              'element-text': element.type === 'text',
              'element-sticker': element.type === 'sticker'
            }"
            :style="{
              left: element.x + 'px',
              top: element.y + 'px',
              transform: `scale(${element.scale || 1}) rotate(${element.rotation || 0}deg)`,
              color: element.color || '#fff',
              fontSize: element.fontSize + 'px',
              fontFamily: element.fontFamily || 'inherit',
              textShadow: element.type === 'text' ? '2px 2px 4px rgba(0,0,0,0.8)' : 'none',
              opacity: element.opacity || 1
            }"
            @click.stop="selectElement(element.id)"
            @mousedown="startDrag(element.id, $event)"
            @touchstart="startDrag(element.id, $event)"
          >
          <div v-if="element.type === 'text'" class="text-element">
            {{ element.content }}
          </div>
          <div v-if="element.type === 'sticker'" class="sticker-element">
            <img 
              :src="element.content" 
              :alt="'贴纸'"
              class="sticker-image"
              :style="{
                width: (element.width || 80) + 'px',
                height: (element.height || 80) + 'px'
              }"
            />
          </div>
          
          <!-- 选中状态的控制点 -->
          <div v-if="selectedElement === element.id" class="element-controls">
            <!-- 缩放控制点 -->
            <div class="control-point resize-point" 
                 @mousedown.stop="startResize(element.id, $event)"
                 @touchstart.stop="startResize(element.id, $event)">
              <img src="../assets/resize.svg" alt="resize" class="control-icon" />
            </div>
            <!-- 旋转控制点 -->
            <div class="control-point rotate-point" 
                 @mousedown.stop="startRotate(element.id, $event)"
                 @touchstart.stop="startRotate(element.id, $event)">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
              </svg>
            </div>
            <!-- 删除控制点 -->
            <div class="control-point delete-point" @click.stop="deleteElement(element.id)">×</div>
          </div>
        </div>
        </div> <!-- elements-container 结束 -->
      </div>

      <!-- 现代化编辑工具栏 -->
      <div class="modern-toolbar">
        <!-- 工具分组 -->
        <div class="toolbar-section">
          <div class="toolbar-left">
            <!-- 文字工具 -->
            <div class="tool-group">
              <div class="tool-buttons">
                <button 
                  class="tool-btn" 
                  :class="{ active: mainTab === 'text' && textSubTab === 'custom' }"
                  @click="mainTab = 'text'; textSubTab = 'custom'"
                >
                  文字
                </button>
                <button 
                  class="tool-btn" 
                  :class="{ active: mainTab === 'sticker' }"
                  @click="mainTab = 'sticker'"
                >
                  贴纸
                </button>
              </div>
            </div>
          </div>
          
          <div class="toolbar-right">
            <button class="done-btn" @click="selectedElement = null">
              完成
            </button>
          </div>
        </div>

        <!-- 现代化内容面板 -->
        <div class="modern-content-panel" v-if="mainTab === 'text' || mainTab === 'sticker'">
          <!-- 文本工具内容 -->
          <div v-if="mainTab === 'text'" class="content-section">
            <!-- 文本输入和模板选择 -->
            <div class="text-input-section">
              <div class="input-wrapper">
                <input 
                  v-model="newTextContent" 
                  type="text" 
                  placeholder="输入文字或选择文案..."
                  class="styled-input"
                  @keypress.enter="addTextElementAtCenter"
                />
                <select 
                  class="template-select"
                  @change="handleTemplateSelect($event)"
                >
                  <option value="">文案</option>
                  <option 
                    v-for="template in textTemplates" 
                    :key="template"
                    :value="template"
                  >
                    {{ template }}
                  </option>
                </select>
                <button 
                  v-if="newTextContent.trim()"
                  class="add-btn"
                  @click="addTextElementAtCenter"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- 贴纸工具内容 -->
          <div v-if="mainTab === 'sticker'" class="content-section">
            <div class="sticker-grid">
              <div 
                v-for="stickerPath in availableStickers" 
                :key="stickerPath"
                class="sticker-card"
                @click="addStickerElement(stickerPath)"
              >
                <img 
                  :src="stickerPath" 
                  :alt="'贴纸'"
                  class="sticker-image"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 现代化控制面板 -->
        <div class="modern-controls" v-if="mainTab === 'text'">
          <div class="style-controls">
            <!-- 颜色控制 -->
            <div class="control-section">
              <div class="section-title">颜色</div>
              <div class="color-palette">
                <div 
                  v-for="color in availableColors" 
                  :key="color"
                  class="color-dot"
                  :class="{ active: currentColor === color }"
                  :style="{ backgroundColor: color }"
                  @click="setCurrentColor(color)"
                ></div>
              </div>
            </div>

            <!-- 字体控制 -->
            <div class="control-section">
              <div class="section-title">字体</div>
              <div class="font-control">
                <select 
                  v-model="currentFontFamily"
                  @change="updateSelectedElementFont"
                  class="font-select"
                >
                  <option 
                    v-for="font in availableFonts" 
                    :key="font.value"
                    :value="font.value"
                  >
                    {{ font.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- 大小和透明度控制 - 合并在一行 -->
            <div class="control-section">
              <div class="section-title">大小 / 透明度</div>
              <div class="size-opacity-combined">
                <div class="size-control">
                  <button class="size-btn" @click="decreaseFontSize">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 13H5v-2h14v2z"/>
                    </svg>
                  </button>
                  <span class="size-value">{{ currentFontSize }}</span>
                  <button class="size-btn" @click="increaseFontSize">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </button>
                </div>
                <div class="opacity-control">
                  <input 
                    type="range" 
                    min="0.3" 
                    max="1" 
                    step="0.1"
                    v-model="currentOpacity"
                    @input="updateSelectedElementOpacity"
                    class="opacity-slider"
                  />
                  <span class="opacity-value">{{ Math.round(currentOpacity * 100) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div class="bottom-actions" v-if="!isEditMode">
      <!-- 其他用户的手帐 - 显示作者信息和点赞按钮 -->
      <div v-if="isOthersJournal" class="others-journal-actions">
        <div class="author-section">
          <div class="author-info">
            <div class="author-avatar">
              <img :src="authorAvatar" :alt="authorName" />
            </div>
            <div class="author-details">
              <div class="author-name">{{ authorName }}</div>
              <div class="publish-time">{{ journalData?.createdAt || journalData?.collectedAt }}</div>
            </div>
          </div>
          <div class="journal-stats">
            <span class="stat-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              {{ viewCount }}
            </span>
            <span class="stat-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {{ likeCount }}
            </span>
          </div>
        </div>
        <button 
          class="like-fab" 
          :class="{ liked: isLiked }"
          @click="toggleLike"
        >
          <svg viewBox="0 0 24 24" :fill="isLiked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      
      <!-- 自己的手帐 - 显示编辑按钮 -->
      <div v-else class="my-journal-actions">
        <button class="modern-btn secondary" @click="reExtract">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
          <span>重新摘抄</span>
        </button>
        <button class="modern-btn primary" @click="enterEditMode">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
          </svg>
          <span>编辑海报</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JournalDetailPage',
  data() {
    return {
      recordId: null,
      journalData: null,
      isEditMode: false,
      
      // 其他用户手帐相关
      isOthersJournal: false,
      authorName: '',
      authorAvatar: '',
      likeCount: 0,
      viewCount: 0,
      isLiked: false,
      
      // 编辑相关数据
      editData: null,
      editElements: [],
      selectedElement: null,
      selectedTool: null,
      
      // 新工具栏数据
      mainTab: 'text',
      textSubTab: 'custom',
      newTextContent: '',
      availableStickers: [
        '/src/assets/stickers/sticker_1.png',
        '/src/assets/stickers/sticker_2.png',
        '/src/assets/stickers/sticker_3.png',
        '/src/assets/stickers/sticker_4.png',
        '/src/assets/stickers/sticker_5.png',
        '/src/assets/stickers/sticker_6.png',
        '/src/assets/stickers/sticker_7.png'
      ],
      availableColors: ['#000000', '#ffffff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce'],
      availableFonts: [
        { name: '默认字体', value: 'inherit' },
        { name: '苹方', value: 'PingFang SC, -apple-system, BlinkMacSystemFont' },
        { name: '思源黑体', value: 'Source Han Sans SC, Noto Sans CJK SC' },
        { name: '华文黑体', value: 'STHeiti, SimHei' },
        { name: '华文楷体', value: 'STKaiti, KaiTi' },
        { name: '华文宋体', value: 'STSong, SimSun' },
        { name: '微软雅黑', value: '"Microsoft YaHei", sans-serif' },
        { name: '楷体', value: 'KaiTi, STKaiti' }
      ],
      currentFontSize: 16,
      currentFontFamily: 'inherit',
      currentColor: '#ffffff',
      currentOpacity: 1,
      defaultTextTemplates: [
        '今日份心情',
        '听歌的夜晚',
        '那些年的青春',
        '此刻的心情',
        '深夜听歌有感',
        '岁月如歌',
        '音乐治愈一切',
        '时光倒流',
        '记录美好时光',
        '愿岁月不老',
        '青春不散场',
        '音乐是最好的陪伴'
      ],
      
      // 拖拽相关
      isDragging: false,
      isResizing: false,
      isRotating: false,
      dragStartX: 0,
      dragStartY: 0,
      dragStartElementX: 0,
      dragStartElementY: 0,
      
      // 编辑模式海报缩放相关
      posterScale: 1,
      isPosterDragging: false,
      posterDragStartX: 0,
      posterDragStartY: 0,
      posterOffsetX: 0,
      posterOffsetY: 0,
      
      // 详情页海报缩放相关
      detailPosterScale: 1,
      isDraggingDetailPoster: false,
      detailPosterDragStartX: 0,
      detailPosterDragStartY: 0,
      detailPosterOffsetX: 0,
      detailPosterOffsetY: 0,
      
      // 示例数据
      sampleData: {
        id: 1640000000000,
        lyrics: [
          { index: 2, text: '我怀念的是无话不说' },
          { index: 3, text: '我怀念的是一起作梦' }
        ],
        songTitle: '我怀念的',
        artist: '孙燕姿',
        mood: '听到这句歌词的时候，突然想起了大学时代的室友，那种无话不说的感觉真的很珍贵。现在各自忙碌，很久没有深入交流了。',
        collectedAt: '2024-01-15',
        timestamp: 1640000000000
      }
    }
  },

  computed: {
    // 合并用户歌词和预设文案模板
    textTemplates() {
      const userLyrics = [];
      
      // 从当前编辑的数据或详情数据中获取歌词
      const data = this.editData || this.journalData;
      if (data && data.lyrics && Array.isArray(data.lyrics)) {
        data.lyrics.forEach(lyric => {
          if (lyric.text && lyric.text.trim()) {
            userLyrics.push(lyric.text.trim());
          }
        });
      }
      
      // 将用户歌词放在前面，然后是预设模板
      return [...userLyrics, ...this.defaultTextTemplates];
    }
  },
  
  mounted() {
    this.recordId = this.$route.query.id
    this.isOthersJournal = this.$route.query.isOthers === 'true'
    this.authorName = this.$route.query.author || ''
    this.authorAvatar = this.$route.query.authorAvatar || ''
    
    this.loadJournalData()
    
    // 确保示例数据也在localStorage中（如果不存在的话）
    this.ensureSampleDataInStorage()
    
    // 添加全局事件监听（包括触控板支持）
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('touchmove', this.handleMouseMove, { passive: false })
    document.addEventListener('touchend', this.handleMouseUp)
  },
  
  beforeUnmount() {
    // 移除全局事件监听
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
    document.removeEventListener('touchmove', this.handleMouseMove)
    document.removeEventListener('touchend', this.handleMouseUp)
  },
  
  methods: {
    loadJournalData() {
      if (this.isOthersJournal) {
        // 处理其他用户的手帐数据
        this.loadOthersJournalData()
      } else if (this.recordId) {
        // 从localStorage加载自己的数据
        const records = JSON.parse(localStorage.getItem('lyricMoodRecords') || '[]')
        this.journalData = records.find(r => r.id == this.recordId)
        
        // 如果没找到，使用示例数据
        if (!this.journalData) {
          this.journalData = this.sampleData
        }
      } else {
        // 使用示例数据
        this.journalData = this.sampleData
      }
    },

    // 加载其他用户的手帐数据
    loadOthersJournalData() {
      // 模拟其他用户的手帐数据
      const othersJournalData = {
        zone_1: {
          id: 'zone_1',
          songTitle: '青春回忆录',
          artist: '音乐少女小雨',
          lyrics: [
            { index: 1, text: '青春是一首永不落幕的歌' },
            { index: 2, text: '每一个音符都是美好的回忆' }
          ],
          mood: '收录了我青春时期最喜欢的歌曲片段，每一句歌词都承载着那些美好的回忆。',
          collectedAt: '2024-01-20',
          createdAt: '2024-01-20',
          timestamp: Date.now() - 86400000 * 5
        },
        zone_2: {
          id: 'zone_2',
          songTitle: '夜空中最亮的星',
          artist: '逃跑计划',
          lyrics: [
            { index: 1, text: '夜空中最亮的星' },
            { index: 2, text: '能否听清' },
            { index: 3, text: '那仰望的人心底的孤独和叹息' }
          ],
          mood: '每当迷茫的时候，这首歌总能给我力量，就像夜空中最亮的那颗星。',
          collectedAt: '2024-01-18',
          createdAt: '2024-01-18',
          timestamp: Date.now() - 86400000 * 7
        },
        zone_3: {
          id: 'zone_3',
          songTitle: '时光倒流',
          artist: '怀旧音乐人',
          lyrics: [
            { index: 1, text: '如果时光能够倒流' },
            { index: 2, text: '我想回到那个夏天' }
          ],
          mood: '如果时光能够倒流，我想回到那个夏天，回到我们一起听歌的日子。',
          collectedAt: '2024-01-15',
          createdAt: '2024-01-15',
          timestamp: Date.now() - 86400000 * 10
        },
        zone_4: {
          id: 'zone_4',
          songTitle: '情感日记',
          artist: '文艺青年阿明',
          lyrics: [
            { index: 1, text: '用音乐记录生活' },
            { index: 2, text: '每一首歌都是一段故事' }
          ],
          mood: '用音乐记录生活中的点点滴滴，每一首歌都是一段故事。',
          collectedAt: '2024-01-12',
          createdAt: '2024-01-12',
          timestamp: Date.now() - 86400000 * 13
        },
        zone_5: {
          id: 'zone_5',
          songTitle: '雨天的思念',
          artist: '雨中漫步',
          lyrics: [
            { index: 1, text: '雨天总是容易让人想起过去' },
            { index: 2, text: '这首歌陪伴我度过了许多个雨夜' }
          ],
          mood: '雨天总是容易让人想起过去，这首歌陪伴我度过了许多个雨夜。',
          collectedAt: '2024-01-10',
          createdAt: '2024-01-10',
          timestamp: Date.now() - 86400000 * 15
        },
        zone_6: {
          id: 'zone_6',
          songTitle: '梦想的翅膀',
          artist: '追梦人小李',
          lyrics: [
            { index: 1, text: '每个人都有梦想' },
            { index: 2, text: '只要坚持就能飞翔' }
          ],
          mood: '每个人都有梦想，这首歌让我相信，只要坚持就能飞翔。',
          collectedAt: '2024-01-08',
          createdAt: '2024-01-08',
          timestamp: Date.now() - 86400000 * 17
        }
      }

      // 根据recordId获取对应的数据
      this.journalData = othersJournalData[this.recordId] || othersJournalData.zone_1

      // 设置点赞和浏览数据
      const statsData = {
        zone_1: { likes: 128, views: 456, isLiked: false },
        zone_2: { likes: 89, views: 234, isLiked: false },
        zone_3: { likes: 156, views: 389, isLiked: false },
        zone_4: { likes: 203, views: 567, isLiked: false },
        zone_5: { likes: 67, views: 178, isLiked: false },
        zone_6: { likes: 94, views: 267, isLiked: false }
      }

      const stats = statsData[this.recordId] || statsData.zone_1
      this.likeCount = stats.likes
      this.viewCount = stats.views
      this.isLiked = stats.isLiked

      // 增加浏览量
      this.viewCount += 1
    },

    // 确保示例数据在localStorage中（但不覆盖已有数据）
    ensureSampleDataInStorage() {
      // 这个方法现在不需要做任何事情，因为示例数据直接在LyricBookPage中定义
      // 用户编辑的数据会保存到localStorage，示例数据保持独立
      // 示例数据保持独立，不写入localStorage
    },
    
    goBack() {
      this.$router.go(-1)
    },
    
    formatTimestamp(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    // 获取当前海报图片
    getCurrentPosterImage() {
      if (!this.journalData) return '/src/assets/midori/cover_common.jpg';
      
      // 编辑模式下始终使用原始模板图
      if (this.isEditMode) {
        return this.getPosterByIndex(this.journalData.id);
      }
      
      // 详情模式下，如果有自定义编辑的海报，优先使用
      if (this.journalData.editedPosterPath) {
        // 尝试从localStorage获取base64图片
        const editedImages = JSON.parse(localStorage.getItem('editedImages') || '{}');
        if (editedImages[this.journalData.editedPosterPath]) {
          return editedImages[this.journalData.editedPosterPath];
        }
        // 如果localStorage中没有，回退到原始图片
        return this.getPosterByIndex(this.journalData.id);
      }
      
      // 否则根据数据ID选择海报
      return this.getPosterByIndex(this.journalData.id);
    },

    // 根据ID获取海报（与LyricBookPage保持一致）
    getPosterByIndex(id) {
      // 示例数据的固定ID，使用对应的图片
      const exampleImageMap = {
        1640000000000: '/src/assets/midori/cover_1.jpg',
        1640100000000: '/src/assets/midori/cover_2.jpg', 
        1640200000000: '/src/assets/midori/cover_3.jpg'
      }
      
      // 如果是示例数据，使用对应的图片
      if (exampleImageMap[id]) {
        return exampleImageMap[id];
      }
      
      // 新创建的记录使用默认模板
      return '/src/assets/midori/cover_common.jpg';
    },

    // 海报加载完成
    onPosterLoaded() {
      // 海报加载完成
    },

    // 海报加载错误
    onPosterError() {
      // 海报加载失败，使用默认图片
    },

    // 画布海报加载完成
    onCanvasPosterLoaded() {
      // 编辑画布海报加载完成
    },
    
    // 底部操作按钮方法
    reExtract() {
      // TODO: 实现重新摘抄功能
      alert('重新摘抄功能开发中...')
    },
    
    // 点赞功能
    toggleLike() {
      this.isLiked = !this.isLiked
      if (this.isLiked) {
        this.likeCount++
        this.showToast('已点赞')
      } else {
        this.likeCount--
        this.showToast('已取消点赞')
      }
      
      // TODO: 在实际应用中，这里应该调用API更新点赞状态
      console.log('点赞状态:', this.isLiked, '点赞数:', this.likeCount)
    },
    
    enterEditMode() {
      this.isEditMode = true
      this.editData = { ...this.journalData }
      
      // 加载之前保存的编辑元素
      this.editElements = this.journalData.editElements ? [...this.journalData.editElements] : []
      
      // 恢复海报的缩放和位置
      this.posterScale = this.journalData.posterScale || 1
      this.posterOffsetX = this.journalData.posterOffsetX || 0
      this.posterOffsetY = this.journalData.posterOffsetY || 0
      
      this.selectedElement = null
      this.selectedTool = null
    },
    
    exitEditMode() {
      this.isEditMode = false
      this.selectedTool = null
      this.selectedElement = null
    },
    
    async saveEditedJournal() {
      try {
        // 生成编辑后的海报路径
        const editedPosterPath = await this.generateEditedPoster();
        
        // 保存编辑后的手帐
        const editedJournal = {
          ...this.editData,
          editElements: [...this.editElements],
          editedPosterPath: editedPosterPath,
          lastEditTime: Date.now(),
          posterScale: this.posterScale,
          posterOffsetX: this.posterOffsetX,
          posterOffsetY: this.posterOffsetY
        }
        
        // 更新localStorage中的数据
        let records = JSON.parse(localStorage.getItem('lyricMoodRecords') || '[]')
        const index = records.findIndex(r => r.id === editedJournal.id)
        
        if (index !== -1) {
          // 更新现有记录
          records[index] = editedJournal
        } else {
          // 如果没找到，添加到数组开头
          records.unshift(editedJournal)
        }
        
        localStorage.setItem('lyricMoodRecords', JSON.stringify(records))
        
        // 更新当前显示的数据
        this.journalData = { ...editedJournal }
        
        // 保存完成
        
        // 退出编辑模式
        this.exitEditMode()
        
        // 显示保存成功提示
        this.showToast('手帐保存成功！')
        
        // 保存成功
      } catch (error) {
        console.error('保存失败:', error)
        this.showToast('保存失败，请重试')
      }
    },

    // 生成编辑后的海报（Canvas合成并保存为base64）
    async generateEditedPoster() {
      try {
        const timestamp = Date.now();
        const editedPath = `/src/assets/midori/edited/journal_${this.editData.id}_${timestamp}.png`;
        
        // 获取编辑画布的实际尺寸作为参考
        const editCanvas = this.$refs.editCanvas;
        if (!editCanvas) {
          throw new Error('编辑画布未找到');
        }
        
        const canvasRect = editCanvas.getBoundingClientRect();
        const editCanvasWidth = canvasRect.width;
        const editCanvasHeight = canvasRect.height;
        
        // 创建高分辨率Canvas，但保持比例
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 设置Canvas尺寸，保持与编辑区域相同的宽高比
        const scale = 2; // 2倍分辨率提升画质
        canvas.width = editCanvasWidth * scale;
        canvas.height = editCanvasHeight * scale;
        
        // 加载原始海报图片
        const originalImage = new Image();
        originalImage.crossOrigin = 'anonymous';
        
        const dataUrl = await new Promise((resolve, reject) => {
          originalImage.onload = async () => {
            try {
              // 不绘制背景，保持透明
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              // 计算海报在编辑画布中的实际显示尺寸
              const imgAspectRatio = originalImage.width / originalImage.height;
              const canvasAspectRatio = canvas.width / canvas.height;
              
              let baseWidth, baseHeight, baseX, baseY;
              
              if (imgAspectRatio > canvasAspectRatio) {
                // 图片更宽，以画布宽度为准
                baseWidth = canvas.width;
                baseHeight = baseWidth / imgAspectRatio;
                baseX = 0;
                baseY = (canvas.height - baseHeight) / 2;
              } else {
                // 图片更高，以画布高度为准
                baseHeight = canvas.height;
                baseWidth = baseHeight * imgAspectRatio;
                baseX = (canvas.width - baseWidth) / 2;
                baseY = 0;
              }
              
              // 先绘制海报，应用用户的缩放和偏移
              ctx.save();
              // 移动到基准位置
              ctx.translate(baseX, baseY);
              // 模拟transform-origin: center center的海报变换
              ctx.translate(baseWidth / 2, baseHeight / 2);
              ctx.scale(this.posterScale, this.posterScale);
              ctx.translate(this.posterOffsetX, this.posterOffsetY);
              ctx.translate(-baseWidth / 2, -baseHeight / 2);
              // 绘制海报
              ctx.drawImage(originalImage, 0, 0, baseWidth, baseHeight);
              ctx.restore();
              
              // 绘制所有编辑元素，使用相同的变换但元素有自己的坐标
              await this.drawEditElementsToCanvas(ctx, scale, baseX, baseY, baseWidth, baseHeight);
              
              // 转换为PNG保持透明度
              const dataUrl = canvas.toDataURL('image/png');
              resolve(dataUrl);
            } catch (error) {
              reject(error);
            }
          };
          originalImage.onerror = reject;
          
          // 加载原始海报图片，确保使用原始模板
          const posterSrc = this.getPosterByIndex(this.editData.id);
          originalImage.src = posterSrc;
        });
        
        // 将base64数据保存到localStorage（模拟文件保存）
        const editedImages = JSON.parse(localStorage.getItem('editedImages') || '{}');
        editedImages[editedPath] = dataUrl;
        localStorage.setItem('editedImages', JSON.stringify(editedImages));
        
        // 生成缩略图（用于列表显示）
        const thumbnailCanvas = document.createElement('canvas');
        const thumbnailCtx = thumbnailCanvas.getContext('2d');
        
        // 保持原图的宽高比
        const thumbnailScale = 0.3; // 缩略图比例
        thumbnailCanvas.width = canvas.width * thumbnailScale;
        thumbnailCanvas.height = canvas.height * thumbnailScale;
        
        // 将高分辨率图片缩放到缩略图尺寸
        const tempImg = new Image();
        await new Promise((resolve) => {
          tempImg.onload = () => {
            thumbnailCtx.drawImage(tempImg, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
            const thumbnailDataUrl = thumbnailCanvas.toDataURL('image/png');
            
            // 保存缩略图
            const thumbnailPath = editedPath.replace('.png', '_thumb.png');
            editedImages[thumbnailPath] = thumbnailDataUrl;
            localStorage.setItem('editedImages', JSON.stringify(editedImages));
            resolve();
          };
          tempImg.src = dataUrl;
        });
        
        // Canvas合成完成，生成编辑后的海报
        
        // 注意：由于前端限制，图片以base64格式保存在localStorage中
        // 在生产环境中，应该发送到后端服务器保存实际文件
        
        return editedPath;
      } catch (error) {
        console.error('保存海报失败:', error);
        return null;
      }
    },

    // 在Canvas上绘制编辑元素
    async drawEditElementsToCanvas(ctx, scale, baseX, baseY, baseWidth, baseHeight) {
      for (const element of this.editElements) {
        ctx.save();
        
        // 完全模拟CSS变换：transform-origin: center center; transform: scale(posterScale) translate(posterOffsetX px, posterOffsetY px)
        // CSS语义：围绕中心点进行scale，然后translate
        
        // 1. 移动到画布基准位置  
        ctx.translate(baseX, baseY);
        
        // 2. 模拟transform-origin: center center
        // 先移动到容器中心
        ctx.translate(baseWidth / 2, baseHeight / 2);
        
        // 3. 应用变换（围绕中心点）
        ctx.scale(this.posterScale, this.posterScale);
        ctx.translate(this.posterOffsetX, this.posterOffsetY);
        
        // 4. 移回到左上角坐标系
        ctx.translate(-baseWidth / 2, -baseHeight / 2);
        
        // 5. 应用元素自己的位置和变换
        ctx.translate(element.x, element.y);
        ctx.scale(element.scale || 1, element.scale || 1);
        ctx.rotate((element.rotation || 0) * Math.PI / 180);
        ctx.globalAlpha = element.opacity || 1;
        
        if (element.type === 'text') {
          // 绘制文本元素
          ctx.fillStyle = element.color || '#ffffff';
          const fontSize = (element.fontSize || 16);
          ctx.font = `${fontSize}px ${element.fontFamily || 'PingFang SC, -apple-system, BlinkMacSystemFont, sans-serif'}`;
          
          // 添加文本阴影
          ctx.shadowColor = 'rgba(0,0,0,0.8)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
          
          ctx.fillText(element.content, 0, 0);
        } else if (element.type === 'sticker') {
          // 绘制贴纸元素
          await new Promise((resolve) => {
            const stickerImage = new Image();
            stickerImage.crossOrigin = 'anonymous';
            stickerImage.onload = () => {
              const width = (element.width || 80);
              const height = (element.height || 80);
              ctx.drawImage(
                stickerImage, 
                -width / 2, 
                -height / 2,
                width, 
                height
              );
              resolve();
            };
            stickerImage.onerror = resolve; // 如果加载失败就跳过
            stickerImage.src = element.content;
          });
        }
        
        ctx.restore();
      }
    },

    // 下载图片文件到用户本地
    downloadImageFile(dataUrl, filename) {
      try {
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 图片已下载到用户的下载文件夹
      } catch (error) {
        console.error('下载图片失败:', error);
      }
    },
    
    // 工具选择
    selectTool(tool) {
      this.selectedTool = this.selectedTool === tool ? null : tool
      this.selectedElement = null
    },
    
    // 画布点击
    handleCanvasClick(event) {
      if (this.selectedTool === 'text' && this.newTextContent.trim()) {
        this.addTextElementAtPosition(event.offsetX, event.offsetY)
      } else {
        this.selectedElement = null
      }
    },

    // 画布触摸结束（触控板支持）
    handleCanvasTouch(event) {
      // 防止重复触发click事件
      if (event.target === event.currentTarget) {
        event.preventDefault()
        this.selectedElement = null
      }
    },

    // 背景点击处理
    handleBackgroundClick(event) {
      // 如果没有拖拽操作，取消选择
      if (!this.isPosterDragging) {
        this.selectedElement = null
      }
    },
    
    // 添加文本元素
    addTextElement() {
      if (!this.newTextContent.trim()) return
      
      const element = {
        id: Date.now(),
        type: 'text',
        content: this.newTextContent,
        x: 100,
        y: 100,
        scale: 1,
        rotation: 0,
        color: this.currentColor,
        fontSize: parseInt(this.currentFontSize),
        fontFamily: this.currentFontFamily,
        opacity: parseFloat(this.currentOpacity)
      }
      
      this.editElements.push(element)
      this.newTextContent = ''
      this.selectedElement = element.id
    },
    
    addTextElementAtPosition(x, y) {
      if (!this.newTextContent.trim()) return
      
      // 将画布坐标转换为海报相对坐标
      const adjustedX = (x - this.posterOffsetX) / this.posterScale - 50
      const adjustedY = (y - this.posterOffsetY) / this.posterScale - 10
      
      const element = {
        id: Date.now(),
        type: 'text',
        content: this.newTextContent,
        x: adjustedX,
        y: adjustedY,
        scale: 1,
        rotation: 0,
        color: this.currentColor,
        fontSize: parseInt(this.currentFontSize),
        fontFamily: this.currentFontFamily,
        opacity: parseFloat(this.currentOpacity)
      }
      
      this.editElements.push(element)
      this.newTextContent = ''
      this.selectedElement = element.id
    },
    
    // 添加贴纸元素
    addStickerElement(stickerPath) {
      // 将画布坐标转换为海报相对坐标
      const adjustedX = (150 - this.posterOffsetX) / this.posterScale
      const adjustedY = (150 - this.posterOffsetY) / this.posterScale
      
      const element = {
        id: Date.now(),
        type: 'sticker',
        content: stickerPath, // 现在是图片路径
        x: adjustedX,
        y: adjustedY,
        scale: 1,
        rotation: 0,
        width: 80,  // 默认宽度
        height: 80  // 默认高度
      }
      
      this.editElements.push(element)
      this.selectedElement = element.id
    },
    
    // 选择元素
    selectElement(elementId) {
      this.selectedElement = elementId
      const element = this.editElements.find(e => e.id === elementId)
      if (element) {
        this.currentFontSize = element.fontSize || 16
        this.currentFontFamily = element.fontFamily || 'inherit'
        this.currentColor = element.color || '#ffffff'
        this.currentOpacity = element.opacity || 1
      }
    },
    
    // 删除元素
    deleteElement(elementId) {
      const index = this.editElements.findIndex(e => e.id === elementId)
      if (index !== -1) {
        this.editElements.splice(index, 1)
        this.selectedElement = null
      }
    },
    
    // 设置当前文本颜色（用于新文本，并更新选中元素）
    setCurrentColor(color) {
      this.currentColor = color;
      // 如果有选中的元素，实时更新它的颜色
      if (this.selectedElement) {
        const element = this.editElements.find(e => e.id === this.selectedElement);
        if (element && element.type === 'text') {
          element.color = color;
        }
      }
    },

    // 添加文本到画布中心
    addTextElementAtCenter() {
      if (!this.newTextContent.trim()) return;
      
      const canvasRect = this.$refs.editCanvas.getBoundingClientRect();
      const centerX = canvasRect.width / 2;
      const centerY = canvasRect.height / 2;
      
      this.addTextElementAtPosition(centerX, centerY);
    },

    // 添加文本模版
    addTextTemplate(template) {
      this.newTextContent = template;
      this.addTextElementAtCenter();
    },

    // 处理模板选择
    handleTemplateSelect(event) {
      const template = event.target.value;
      if (template) {
        this.newTextContent = template;
        this.addTextElementAtCenter();
        event.target.value = ''; // 重置选择框
      }
    },

    // 增加字号
    increaseFontSize() {
      this.currentFontSize = Math.min(48, this.currentFontSize + 2);
      this.updateSelectedElementFontSize();
    },

    // 减少字号
    decreaseFontSize() {
      this.currentFontSize = Math.max(12, this.currentFontSize - 2);
      this.updateSelectedElementFontSize();
    },

    // 更新选中元素的字号
    updateSelectedElementFontSize() {
      if (this.selectedElement) {
        const element = this.editElements.find(e => e.id === this.selectedElement);
        if (element && element.type === 'text') {
          element.fontSize = this.currentFontSize;
        }
      }
    },

    // 更新选中元素的透明度
    updateSelectedElementOpacity() {
      if (this.selectedElement) {
        const element = this.editElements.find(e => e.id === this.selectedElement);
        if (element) {
          element.opacity = parseFloat(this.currentOpacity);
        }
      }
    },

    // 更新选中元素的字体
    updateSelectedElementFont() {
      if (this.selectedElement) {
        const element = this.editElements.find(e => e.id === this.selectedElement);
        if (element && element.type === 'text') {
          element.fontFamily = this.currentFontFamily;
        }
      }
    },

    // 海报缩放处理 - 优化灵敏度
    handlePosterWheel(event) {
      event.preventDefault();
      // 增加灵敏度，更流畅的缩放体验
      const delta = event.deltaY * -0.002;
      const newScale = Math.max(0.3, Math.min(5, this.posterScale + delta));
      this.posterScale = newScale;
    },

    // 获取统一的事件坐标 - 支持mouse和touch
    getEventCoords(event) {
      if (event.touches && event.touches[0]) {
        return {
          clientX: event.touches[0].clientX,
          clientY: event.touches[0].clientY
        };
      }
      return {
        clientX: event.clientX,
        clientY: event.clientY
      };
    },

    // 开始拖拽海报
    startPosterDrag(event) {
      event.preventDefault();
      this.isPosterDragging = true;
      
      const coords = this.getEventCoords(event);
      this.posterDragStartX = coords.clientX;
      this.posterDragStartY = coords.clientY;
      
      // 添加到全局事件监听（包括touch事件）
      document.addEventListener('mousemove', this.handlePosterMouseMove);
      document.addEventListener('mouseup', this.handlePosterMouseUp);
      document.addEventListener('touchmove', this.handlePosterMouseMove);
      document.addEventListener('touchend', this.handlePosterMouseUp);
    },

    // 海报拖拽移动
    handlePosterMouseMove(event) {
      if (!this.isPosterDragging) return;
      
      event.preventDefault();
      const coords = this.getEventCoords(event);
      const deltaX = (coords.clientX - this.posterDragStartX) / this.posterScale;
      const deltaY = (coords.clientY - this.posterDragStartY) / this.posterScale;
      
      this.posterOffsetX += deltaX;
      this.posterOffsetY += deltaY;
      
      this.posterDragStartX = coords.clientX;
      this.posterDragStartY = coords.clientY;
    },

    // 海报拖拽结束
    handlePosterMouseUp() {
      if (this.isPosterDragging) {
        this.isPosterDragging = false;
        document.removeEventListener('mousemove', this.handlePosterMouseMove);
        document.removeEventListener('mouseup', this.handlePosterMouseUp);
        document.removeEventListener('touchmove', this.handlePosterMouseMove);
        document.removeEventListener('touchend', this.handlePosterMouseUp);
      }
    },

    // 详情页海报缩放处理 - 优化灵敏度
    handleDetailPosterWheel(event) {
      event.preventDefault();
      // 增加灵敏度，更流畅的缩放体验
      const delta = event.deltaY * -0.002;
      const newScale = Math.max(0.3, Math.min(5, this.detailPosterScale + delta));
      this.detailPosterScale = newScale;
    },

    // 开始拖拽详情页海报
    startDetailPosterDrag(event) {
      event.preventDefault();
      this.isDraggingDetailPoster = true;
      
      const coords = this.getEventCoords(event);
      this.detailPosterDragStartX = coords.clientX;
      this.detailPosterDragStartY = coords.clientY;
      
      // 添加到全局事件监听（包括触控板）
      document.addEventListener('mousemove', this.handleDetailPosterMouseMove);
      document.addEventListener('mouseup', this.handleDetailPosterMouseUp);
      document.addEventListener('touchmove', this.handleDetailPosterMouseMove);
      document.addEventListener('touchend', this.handleDetailPosterMouseUp);
    },

    // 详情页海报拖拽移动
    handleDetailPosterMouseMove(event) {
      if (!this.isDraggingDetailPoster) return;
      
      event.preventDefault();
      const coords = this.getEventCoords(event);
      const deltaX = (coords.clientX - this.detailPosterDragStartX) / this.detailPosterScale;
      const deltaY = (coords.clientY - this.detailPosterDragStartY) / this.detailPosterScale;
      
      this.detailPosterOffsetX += deltaX;
      this.detailPosterOffsetY += deltaY;
      
      this.detailPosterDragStartX = coords.clientX;
      this.detailPosterDragStartY = coords.clientY;
    },

    // 详情页海报拖拽结束
    handleDetailPosterMouseUp() {
      if (this.isDraggingDetailPoster) {
        this.isDraggingDetailPoster = false;
        document.removeEventListener('mousemove', this.handleDetailPosterMouseMove);
        document.removeEventListener('mouseup', this.handleDetailPosterMouseUp);
        document.removeEventListener('touchmove', this.handleDetailPosterMouseMove);
        document.removeEventListener('touchend', this.handleDetailPosterMouseUp);
      }
    },
    
    // 开始拖拽
    startDrag(elementId, event) {
      // 如果点击的是控制点，不处理拖拽
      if (event.target.classList.contains('control-point') || 
          event.target.closest('.control-point')) return
      
      this.isDragging = true
      this.selectedElement = elementId
      
      const coords = this.getEventCoords(event)
      this.dragStartX = coords.clientX
      this.dragStartY = coords.clientY
      
      const element = this.editElements.find(e => e.id === elementId)
      if (element) {
        this.dragStartElementX = element.x
        this.dragStartElementY = element.y
      }
      
      // 阻止事件冒泡到海报层
      event.preventDefault()
      event.stopPropagation()
    },
    
    // 开始调整大小
    startResize(elementId, event) {
      this.isResizing = true
      this.selectedElement = elementId
      
      const coords = this.getEventCoords(event)
      this.dragStartX = coords.clientX
      this.dragStartY = coords.clientY
      
      const element = this.editElements.find(e => e.id === elementId)
      if (element) {
        this.dragStartScale = element.scale || 1
      }
      
      event.preventDefault()
      event.stopPropagation()
    },
    
    // 开始旋转
    startRotate(elementId, event) {
      this.isRotating = true
      this.selectedElement = elementId
      
      const coords = this.getEventCoords(event)
      this.dragStartX = coords.clientX
      this.dragStartY = coords.clientY
      
      const element = this.editElements.find(e => e.id === elementId)
      const elementDiv = document.querySelector(`[data-element-id="${elementId}"]`)
      
      if (elementDiv) {
        const elementRect = elementDiv.getBoundingClientRect()
        const centerX = elementRect.left + elementRect.width / 2
        const centerY = elementRect.top + elementRect.height / 2
        
        this.rotateStartAngle = Math.atan2(coords.clientY - centerY, coords.clientX - centerX)
        this.rotateStartRotation = element?.rotation || 0
      }
      
      event.preventDefault()
      event.stopPropagation()
    },
    
    // 鼠标移动处理
    handleMouseMove(event) {
      const coords = this.getEventCoords(event)
      
      if (this.isDragging && this.selectedElement) {
        const deltaX = coords.clientX - this.dragStartX
        const deltaY = coords.clientY - this.dragStartY
        
        const element = this.editElements.find(e => e.id === this.selectedElement)
        if (element) {
          element.x = this.dragStartElementX + deltaX
          element.y = this.dragStartElementY + deltaY
        }
      } else if (this.isResizing && this.selectedElement) {
        const deltaX = coords.clientX - this.dragStartX
        const deltaY = coords.clientY - this.dragStartY
        
        // 改进的缩放算法：基于距离计算缩放比例
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const direction = (deltaX + deltaY) > 0 ? 1 : -1
        const scaleChange = (distance * direction) / 150 // 调整缩放灵敏度
        const newScale = Math.max(0.1, Math.min(3, this.dragStartScale + scaleChange))
        
        const element = this.editElements.find(e => e.id === this.selectedElement)
        if (element) {
          element.scale = newScale
        }
      } else if (this.isRotating && this.selectedElement) {
        const element = this.editElements.find(e => e.id === this.selectedElement)
        if (element) {
          // 改进的旋转计算：基于角度变化
          const elementRect = document.querySelector(`[data-element-id="${this.selectedElement}"]`)?.getBoundingClientRect()
          if (elementRect) {
            const centerX = elementRect.left + elementRect.width / 2
            const centerY = elementRect.top + elementRect.height / 2
            
            const currentAngle = Math.atan2(coords.clientY - centerY, coords.clientX - centerX)
            const angleDiff = (currentAngle - this.rotateStartAngle) * (180 / Math.PI)
            const newRotation = this.rotateStartRotation + angleDiff
            
            element.rotation = newRotation % 360
          } else {
            // 备用简化计算
            const deltaX = coords.clientX - this.dragStartX
            const rotation = this.rotateStartRotation + deltaX * 0.5
            element.rotation = rotation % 360
          }
        }
      }
    },
    
    // 鼠标释放处理
    handleMouseUp() {
      this.isDragging = false
      this.isResizing = false
      this.isRotating = false
    },
    
    // 显示提示消息
    showToast(message) {
      // 简单的提示实现
      const toast = document.createElement('div')
      toast.className = 'toast-message'
      toast.textContent = message
      toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 24px;
        z-index: 10000;
        font-size: 14px;
      `
      
      document.body.appendChild(toast)
      
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 2000)
    }
  }
}
</script>

<style scoped>
.journal-detail-page {
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #f5f0e8 0%, #f0e4d0 50%, #e8d5c4 100%);
  position: relative;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
}

/* 状态栏 */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  z-index: 100;
}

.status-right {
  display: flex;
  gap: 8px;
  align-items: center;
}

/* 信号图标 */
.signal-icon {
  display: flex;
  gap: 1px;
  align-items: flex-end;
  height: 12px;
}

.signal-bar {
  width: 2px;
  background: #333;
  border-radius: 1px;
}

.signal-bar:nth-child(1) { height: 3px; }
.signal-bar:nth-child(2) { height: 5px; }
.signal-bar:nth-child(3) { height: 7px; }
.signal-bar:nth-child(4) { height: 9px; }

/* 电池图标 */
.battery-icon {
  display: flex;
  align-items: center;
  gap: 3px;
}

.battery-body {
  width: 20px;
  height: 10px;
  border: 1px solid #333;
  border-radius: 2px;
  position: relative;
  background: white;
}

.battery-level {
  width: 90%;
  height: 100%;
  background: #4CAF50;
  border-radius: 1px;
}

.battery-tip {
  width: 1px;
  height: 4px;
  background: #333;
  border-radius: 0 1px 1px 0;
}

.battery-text {
  font-size: 12px;
  margin-left: 2px;
}

/* 导航栏 */
.custom-nav, .edit-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 100;
}

.nav-back-btn {
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #333;
}

.nav-back-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.back-icon {
  width: 18px;
  height: 18px;
  opacity: 0.8;
}

.nav-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  letter-spacing: -0.3px;
}

.nav-placeholder {
  width: 32px;
  height: 32px;
}

.save-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-btn:hover {
  background: #45a049;
}

/* 主要内容区 */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* 手帐内容 */
.journal-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* 海报展示区 */
.poster-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  min-height: 0;
  background: #f8f9fa;
  background-image: 
    radial-gradient(circle, #e9ecef 1px, transparent 1px);
  background-size: 20px 20px;
}

.poster-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.poster-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  transition: transform 0.3s ease;
  touch-action: pan-x pan-y; /* 允许基本触摸手势，但阻止缩放等 */
}

.poster-image:hover {
  transform: scale(1.02);
}

.poster-image:active {
  cursor: grabbing;
}

/* 海报信息叠加层 */
.poster-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    transparent 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  padding: 40px 24px 24px;
  color: white;
}

.poster-info {
  text-align: left;
}

.poster-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  letter-spacing: -0.4px;
}

.poster-artist {
  font-size: 16px;
  margin: 0 0 12px 0;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  font-weight: 500;
}

.poster-date {
  font-size: 14px;
  opacity: 0.8;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

/* 详情页编辑元素样式 */
.detail-edit-element {
  position: absolute;
  z-index: 10;
  pointer-events: none;
}

.detail-text-element {
  user-select: none;
  white-space: nowrap;
  font-weight: 500;
}

.detail-sticker-element {
  user-select: none;
}

.detail-sticker-image {
  object-fit: contain;
  pointer-events: none;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  padding: 60px 20px;
}

.empty-icon {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.book-icon {
  font-size: 48px;
  opacity: 0.8;
}

.empty-content {
  max-width: 300px;
}

.empty-title {
  font-size: 22px;
  color: #333;
  margin: 0 0 12px 0;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.empty-desc {
  font-size: 15px;
  color: #8b7355;
  line-height: 1.6;
  margin: 0;
  opacity: 0.8;
}

/* 现代化底部操作按钮 */
.bottom-actions {
  display: flex;
  gap: 12px;
  padding: 20px;
  background: white;
  border-top: 1px solid #f0f0f0;
  padding-bottom: calc(20px + env(safe-area-inset-bottom, 0));
}

.modern-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: -0.3px;
}

.modern-btn.secondary {
  background: #f8f9fa;
  color: #666;
}

.modern-btn.secondary:hover {
  background: #e9ecef;
  border-color: #d6d9dc;
  transform: translateY(-1px);
}

.modern-btn.primary {
  background: #007AFF;
  color: white;
  border-color: #007AFF;
}

.modern-btn.primary:hover {
  background: #0056CC;
  border-color: #0056CC;
  transform: translateY(-1px);
}

.modern-btn .btn-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* 编辑模式样式 */
.edit-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 超紧凑工具栏 */
.modern-toolbar {
  background: #ffffff;
  border-top: 1px solid #e5e5e5;
  padding: 4px 8px;
}

.toolbar-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0;
  margin-bottom: 4px;
}

.toolbar-left {
  display: flex;
  justify-content: center;
  flex: 1;
}

.toolbar-right {
  display: flex;
  align-items: center;
}

.done-btn {
  padding: 4px 8px;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.done-btn:hover {
  background: #0056b3;
}

.tool-group {
  display: flex;
  align-items: center;
}

.group-title {
  display: none; /* 隐藏标题，更紧凑 */
}

.group-icon {
  display: none; /* 隐藏图标 */
}

.tool-buttons {
  display: flex;
  gap: 1px;
  background: #f0f0f0;
  border-radius: 6px;
  padding: 2px;
}

.tool-btn {
  padding: 6px 12px;
  background: transparent;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.15s ease;
  min-width: 50px;
}

.tool-btn:hover {
  color: #333;
}

.tool-btn.active {
  background: #007AFF;
  color: white;
}

/* 超紧凑内容面板 */
.modern-content-panel {
  background: white;
  border-top: 1px solid #f0f0f0;
  margin: 0;
  overflow: hidden;
}

.content-section {
  padding: 4px 8px;
}

/* 超紧凑文字输入区域 */
.text-input-section {
  margin-bottom: 3px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f8f9fa;
  border-radius: 4px;
  padding: 2px;
}

.styled-input {
  flex: 1;
  padding: 4px 6px;
  border: none;
  background: transparent;
  font-size: 12px;
  color: #333;
  outline: none;
}

.styled-input::placeholder {
  color: #999;
}

.template-select {
  padding: 4px 6px;
  border: none;
  background: white;
  border-radius: 4px;
  font-size: 11px;
  color: #333;
  cursor: pointer;
  outline: none;
  max-width: 60px;
}

.add-btn {
  width: 20px;
  height: 20px;
  background: #007AFF;
  border: none;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.add-btn:hover {
  background: #0056b3;
}

.add-btn svg {
  width: 10px;
  height: 10px;
}

/* 紧凑模板网格 */
.template-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.template-card {
  background: #f0f0f0;
  border-radius: 4px;
  padding: 8px 6px;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;
}

.template-card:hover {
  background: #007AFF;
  border-color: #007AFF;
}

.template-card:hover .template-text {
  color: white;
}

.template-text {
  color: #333;
  font-size: 11px;
  font-weight: 500;
}

/* 紧凑贴纸网格 */
.sticker-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
}

.sticker-card {
  aspect-ratio: 1;
  background: #f8f9fa;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;
}

.sticker-card:hover {
  background: #e5e5ea;
  border-color: #007AFF;
}

.sticker-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 超紧凑控制面板 */
.modern-controls {
  background: white;
  border-top: 1px solid #f0f0f0;
  margin: 0;
  padding: 4px 8px;
}

.style-controls {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.control-section {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.section-title {
  font-size: 10px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 超紧凑颜色选择器 */
.color-palette {
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
}

.color-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  position: relative;
}

.color-dot:hover {
  transform: scale(1.05);
}

.color-dot.active {
  border-color: #007AFF;
}

.color-dot.active::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 8px;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* 字体控制器 */
.font-control {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 4px;
  padding: 2px;
}

.font-select {
  flex: 1;
  padding: 4px 6px;
  border: none;
  background: white;
  border-radius: 3px;
  font-size: 11px;
  color: #333;
  cursor: pointer;
  outline: none;
}

.font-select:hover {
  background: #f0f0f0;
}

/* 大小和透明度合并控制器 */
.size-opacity-combined {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8f9fa;
  border-radius: 4px;
  padding: 3px;
}

/* 超紧凑大小控制器 */
.size-control {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
}

.size-btn {
  width: 20px;
  height: 20px;
  background: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007AFF;
  transition: all 0.15s ease;
}

.size-btn:hover {
  background: #e5e5ea;
}

.size-btn svg {
  width: 10px;
  height: 10px;
}

.size-value {
  font-size: 11px;
  font-weight: 600;
  color: #333;
  min-width: 16px;
  text-align: center;
}

/* 超紧凑透明度控制器 */
.opacity-control {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.opacity-slider {
  flex: 1;
  height: 2px;
  border-radius: 1px;
  background: #e5e5ea;
  outline: none;
  cursor: pointer;
  appearance: none;
}

.opacity-slider::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #007AFF;
  cursor: pointer;
  transition: all 0.15s ease;
}

.opacity-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.opacity-value {
  font-size: 10px;
  font-weight: 600;
  color: #007AFF;
  min-width: 24px;
  text-align: center;
}

/* 编辑画布 */
.edit-canvas {
  flex: 1;
  position: relative;
  overflow: hidden;
  cursor: crosshair;
}

/* 海报背景层 */
.canvas-poster-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f8f9fa;
  background-image: 
    radial-gradient(circle, #e9ecef 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 1;
  overflow: hidden;
}

.canvas-poster-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: grab;
  user-select: none;
  transition: transform 0.1s ease;
  touch-action: pan-x pan-y; /* 允许基本触摸手势，但阻止缩放等 */
}

.canvas-poster-image:active {
  cursor: grabbing;
}

/* 元素容器 - 跟随海报变换 */
.elements-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  transform-origin: center center;
  pointer-events: none; /* 允许点击穿透到海报 */
}

/* 编辑元素 */
.edit-element {
  position: absolute;
  cursor: move;
  z-index: 10;
  min-width: 20px;
  min-height: 20px;
  pointer-events: all; /* 恢复点击事件 */
}

.edit-element.selected {
  z-index: 20;
}

.text-element, .sticker-element {
  user-select: none;
  white-space: nowrap;
}

.text-element {
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 元素控制点 */
.element-controls {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px dashed #667eea;
  border-radius: 4px;
  pointer-events: none;
}

.control-point {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #667eea;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.resize-point {
  bottom: -8px;
  right: -8px;
  cursor: se-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #007AFF;
}

.resize-point .control-icon {
  width: 12px;
  height: 12px;
  filter: invert(1);
}

.rotate-point {
  top: -8px;
  right: -8px;
  cursor: grab;
  background: #ff6b6b;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rotate-point svg {
  width: 10px;
  height: 10px;
  color: white;
}

.delete-point {
  top: -8px;
  left: -8px;
  background: #ff6b6b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
  font-weight: bold;
}

/* 旧样式已替换为现代化设计 */

/* 文本模版 */
.text-templates {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 160px;
  overflow-y: auto;
}

.text-template-item {
  padding: 12px 16px;
  background: #f8f9fa;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.text-template-item:hover {
  background: #e9ecef;
  border-color: #007AFF;
}

/* 贴纸内容 */
.modern-sticker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 12px;
  max-height: 160px;
  overflow-y: auto;
}

.modern-sticker-item {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  background: #f8f9fa;
}

.modern-sticker-item:hover {
  background: #e9ecef;
  transform: scale(1.05);
  border-color: #007AFF;
}

.modern-sticker-preview {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

/* 旧控制面板样式已删除，使用现代化设计 */

/* 响应式设计 */
@media (max-width: 480px) {
  .main-content {
    padding: 0;
  }
  
  .poster-container {
    padding: 16px;
  }
  
  .poster-overlay {
    padding: 24px 16px 16px;
  }
  
  .poster-title {
    font-size: 20px;
  }
  
  .poster-artist {
    font-size: 14px;
  }
  
  .poster-date {
    font-size: 12px;
  }
  
  .bottom-actions {
    padding: 16px;
    gap: 8px;
  }
  
  .action-btn {
    padding: 14px 16px;
    font-size: 15px;
  }
  
  .edit-toolbar {
    padding: 10px 16px;
    gap: 4px;
  }
  
  .tool-btn {
    padding: 10px 6px;
    max-width: 70px;
  }
  
  .tool-icon {
    font-size: 16px;
  }
  
  .tool-label {
    font-size: 11px;
  }
  
  .tool-panel {
    padding: 12px 16px;
  }
  
  .canvas-poster-image {
    max-width: 95%;
    max-height: 95%;
  }
}
</style>