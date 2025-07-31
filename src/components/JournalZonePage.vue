<template>
  <div class="journal-zone-page">
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
    <div class="custom-nav">
      <button class="nav-back-btn" @click="goBack">
        <img src="../assets/back_arrow.svg" alt="返回" class="back-icon" />
      </button>
      <h1 class="nav-title">手帐专区</h1>
      <button class="nav-search-btn">
        <div class="search-icon"></div>
      </button>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <div class="coming-soon">
        <div class="coming-soon-icon">
          <div class="construction-icon">🚧</div>
        </div>
        <div class="coming-soon-content">
          <h3 class="coming-soon-title">手帐专区即将上线</h3>
          <p class="coming-soon-desc">我们正在为您准备精彩的手帐专区内容，敬请期待！</p>
        </div>
      </div>
    </div>

    <!-- 底部Tab栏 -->
    <div class="bottom-tabs">
      <div class="tab-item active">
        <div class="tab-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="tab-label">手帐专区</span>
      </div>
      <div class="tab-item" @click="goToMyJournals">
        <div class="tab-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="tab-label">我的</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JournalZonePage',
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    goToMyJournals() {
      this.$router.push('/lyricbook')
    }
  }
}
</script>

<style scoped>
.journal-zone-page {
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

/* 自定义导航栏 */
.custom-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-back-btn, .nav-search-btn {
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

.nav-back-btn:hover, .nav-search-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.back-icon {
  width: 18px;
  height: 18px;
  opacity: 0.8;
}

.search-icon {
  width: 16px;
  height: 16px;
  border: 2px solid #666;
  border-radius: 50%;
  position: relative;
}

.search-icon::after {
  content: '';
  position: absolute;
  top: 12px;
  left: 12px;
  width: 6px;
  height: 2px;
  background: #666;
  border-radius: 1px;
  transform: rotate(45deg);
}

.nav-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  letter-spacing: -0.3px;
}

/* 主要内容区 */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 即将上线状态 */
.coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  max-width: 400px;
}

.coming-soon-icon {
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
  transition: all 0.3s ease;
}

.construction-icon {
  font-size: 48px;
  opacity: 0.8;
}

.coming-soon-content {
  max-width: 300px;
}

.coming-soon-title {
  font-size: 22px;
  color: #333;
  margin: 0 0 12px 0;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.coming-soon-desc {
  font-size: 15px;
  color: #8b7355;
  line-height: 1.6;
  margin: 0;
  opacity: 0.8;
}

/* 底部Tab栏样式 */
.bottom-tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
  position: relative;
  z-index: 10;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #8b7355;
}

.tab-item.active {
  color: #d4b896;
}

.tab-item:hover {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
}

.tab-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-icon svg {
  width: 20px;
  height: 20px;
  stroke-width: 1.5;
}

.tab-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.tab-item.active .tab-label {
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .main-content {
    padding: 16px;
  }
  
  .coming-soon-icon {
    width: 100px;
    height: 100px;
    margin-bottom: 24px;
  }
  
  .construction-icon {
    font-size: 40px;
  }
  
  .coming-soon-title {
    font-size: 20px;
  }
  
  .coming-soon-desc {
    font-size: 14px;
  }
}
</style>