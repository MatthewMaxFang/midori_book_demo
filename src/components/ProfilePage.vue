<template>
  <div class="profile-page">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="time">14:23</div>
      <div class="status-icons">
        <div class="wifi-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M926.634667 294.912a32 32 0 1 1-39.936 50.005333C780.512 260.128 649.824 213.333333 512.053333 213.333333c-137.813333 0-268.544 46.826667-374.752 131.669334a32 32 0 1 1-39.936-50.005334C214.784 201.194667 359.562667 149.333333 512.053333 149.333333c152.437333 0 297.173333 51.818667 414.581334 145.578667z m-235.413334 298.133333a32 32 0 0 1-38.442666 51.178667A233.418667 233.418667 0 0 0 512.021333 597.333333c-51.541333 0-100.48 16.629333-140.8 46.912a32 32 0 1 1-38.442666-51.157333A297.408 297.408 0 0 1 512.021333 533.333333c65.504 0 127.893333 21.184 179.2 59.722667z m128-149.344a32 32 0 0 1-38.442666 51.168C703.829333 437.066667 610.378667 405.333333 512.032 405.333333c-98.368 0-191.850667 31.754667-268.8 89.578667a32 32 0 1 1-38.453333-51.157333C292.736 377.664 399.669333 341.333333 512.032 341.333333c112.32 0 219.242667 36.309333 307.189333 102.368zM512 853.333333a64 64 0 1 1 0-128 64 64 0 0 1 0 128z" fill="#000000"/>
          </svg>
        </div>
        <div class="battery">
          <div class="battery-icon"></div>
          <span class="battery-text">97</span>
        </div>
      </div>
    </div>

    <!-- 顶部导航 -->
    <div class="top-nav">
      <div class="nav-title">我的</div>
      <div class="nav-icons">
        <div class="message-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M892.3 770.7H114.4c-22.5 0-40.8-17.8-40.8-39.8V259.7L503 501l370.1-217v-37.7H125.7c-5.5 6-13.4 9.8-22.1 9.8-16.6 0-30-13.4-30-30 0-21.9 18.3-39.8 40.8-39.8h777.9c22.5 0 40.8 17.8 40.8 39.8v92.3L503.7 570.2 133.6 362.3v348.4h739.5V389.1c0-16.6 13.4-30 30-30s30 13.4 30 30v341.8c0 22-18.3 39.8-40.8 39.8z" fill="#1D1D1D"/>
          </svg>
        </div>
        <div class="settings-icon">
          <svg viewBox="0 0 1084 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M1072.147851 406.226367c-6.331285-33.456782-26.762037-55.073399-52.047135-55.073399-0.323417 0-0.651455 0.003081-0.830105 0.009241l-4.655674 0c-73.124722 0-132.618162-59.491899-132.618162-132.618162 0-23.731152 11.447443-50.336101 11.546009-50.565574 13.104573-29.498767 3.023185-65.672257-23.427755-84.127081l-1.601687-1.127342-134.400039-74.661726-1.700252-0.745401c-8.753836-3.805547-18.334698-5.735272-28.479231-5.735272-20.789593 0-41.235746 8.344174-54.683758 22.306575-14.741683 15.216028-65.622973 58.649474-104.721083 58.649474-39.450789 0-90.633935-44.286652-105.438762-59.784516-13.518857-14.247316-34.128258-22.753199-55.127302-22.753199-9.945862 0-19.354234 1.861961-27.958682 5.531982l-1.746455 0.74078-139.141957 76.431283-1.643269 1.139662c-26.537186 18.437884-36.675557 54.579032-23.584845 84.062398 0.115506 0.264895 11.579891 26.725075 11.579891 50.634877 0 73.126262-59.491899 132.618162-132.618162 132.618162l-4.581749 0c-0.318797-0.00616-0.636055-0.01078-0.951772-0.01078-25.260456 0-45.672728 21.618157-52.002472 55.0811-0.462025 2.453354-11.313456 60.622322-11.313456 106.117939 0 45.494078 10.85143 103.659965 11.314996 106.119479 6.334365 33.458322 26.758957 55.076479 52.036353 55.076479 0.320337 0 0.651455-0.00616 0.842426-0.012321l4.655674 0c73.126262 0 132.618162 59.491899 132.618162 132.616622 0 23.760413-11.444363 50.333021-11.546009 50.565574-13.093793 29.474125-3.041666 65.646075 23.395414 84.151722l1.569346 1.093459 131.838879 73.726895 1.675611 0.7377c8.750757 3.84251 18.305437 5.790715 28.397607 5.790715 21.082208 0 41.676209-8.706094 55.0888-23.290689 18.724339-20.347588 69.527086-62.362616 107.04815-62.362616 40.625872 0 92.72537 47.100385 107.759669 63.583903 13.441852 14.831008 34.176001 23.689571 55.470741 23.695731l0.00616 0c9.895039 0 19.27877-1.883523 27.893999-5.598205l1.711034-0.73924 136.659342-75.531873 1.617088-1.128882c26.492523-18.456365 36.601633-54.600594 23.538642-84.016195-0.115506-0.267974-11.595291-27.082374-11.595291-50.67646 0-73.124722 59.49344-132.616622 132.618162-132.616622l4.517066-0.00154c0.300316 0.00616 0.599092 0.009241 0.899409 0.009241 25.331299-0.00154 45.785153-21.619697 52.107197-55.054918 0.112426-0.589852 11.325776-59.507301 11.325776-106.14104C1083.464388 466.640776 1072.609877 408.67356 1072.147851 406.226367zM377.486862 945.656142l-115.32764-64.487932c5.082277-13.052211 15.437801-43.51815 15.437801-75.017486 0-109.382917-84.176364-199.816642-192.587488-208.134635-2.647404-15.427021-8.873963-54.967133-8.873963-85.667166 0-30.65691 6.223479-70.232445 8.869343-85.671786 108.415744-8.311832 192.592108-98.745557 192.592108-208.134635 0-31.416171-10.300081-61.797405-15.371577-74.854236l122.721583-67.40331c0.003081 0 0.00462 0.00154 0.007701 0.00154 4.423121 4.518606 22.121764 22.080182 46.558275 39.493911 39.929754 28.46229 77.952885 42.894416 113.014434 42.894416 34.716571 0 72.437845-14.151831 112.115025-42.06431 24.282503-17.07953 41.896442-34.302288 46.308782-38.74543 0.009241-0.00154 0.018481-0.00462 0.026182-0.00616l118.301542 65.726159c-5.077657 13.055291-15.416239 43.499669-15.416239 74.958962 0 109.389077 84.174824 199.822802 192.590568 208.134635 2.645865 15.462442 8.872423 55.107281 8.872423 85.671786 0 30.687711-6.223479 70.241685-8.869343 85.673326C890.042174 606.334084 805.86427 696.767809 805.86427 806.158426c0 31.450053 10.317022 61.851309 15.393138 74.903519l-119.783103 66.198965c-5.168521-5.490399-22.603811-23.363073-46.740005-41.288109-40.701336-30.224145-79.662378-45.549521-115.800446-45.549521-35.79155 0-74.458435 15.038919-114.927219 44.694774C400.22004 922.554885 382.666163 940.255068 377.486862 945.656142zM731.271848 511.646647c0-105.803762-86.081448-191.88059-191.888289-191.88059-105.803762 0-191.88059 86.076827-191.88059 191.88059 0 105.803762 86.076827 191.882129 191.88059 191.882129C645.19194 703.528777 731.271848 617.450409 731.271848 511.646647zM539.383558 395.903184c63.825696 0 115.751164 51.922387 115.751164 115.743463 0 63.825696-51.925468 115.751164-115.751164 115.751164-63.821076 0-115.743463-51.925468-115.743463-115.751164C423.640095 447.824031 475.562482 395.903184 539.383558 395.903184z" fill="#272636"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- 搜索区域 -->
    <div class="search-section">
      <div class="search-box">
        <div class="hourglass-icon animated-hourglass">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M327.68 196.608h375.808L592.896 375.808l69.632 43.008 148.48-241.664-34.816-62.464H247.808l-33.792 64.512 253.952 350.208 226.304 297.984H320.512L430.08 649.216l-69.632-43.008-147.456 240.64 34.816 62.464h528.384l32.768-65.536L534.528 481.28z" fill="#437DFF"/>
            <path d="M513.024 229.376h-78.848l78.848 93.184 77.824-93.184zM513.024 794.624h-78.848l78.848-93.184 77.824 93.184z" fill="#63F7DE"/>
          </svg>
        </div>
        <div class="search-text">
          <span class="primary-text">年轮</span>
          <span class="secondary-text">正在热搜</span>
        </div>
        <div class="search-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M841.3 910c-15.6 0-31.1-6.1-42.7-18.3L611.2 694c-22.3-23.6-21.3-60.7 2.2-83.1 23.6-22.3 60.8-21.3 83.1 2.2l187.4 197.7c22.3 23.6 21.3 60.7-2.2 83.1-11.4 10.8-25.9 16.1-40.4 16.1z" fill="#BDD2EF"/>
            <path d="M450.4 760.7c-3 0-5.9 0-8.9-0.1-86-2.3-166-38-225.2-100.4-59.2-62.5-90.5-144.2-88.2-230.2 2.3-86 38-166 100.4-225.2 62.5-59.2 144.2-90.5 230.2-88.2 86 2.3 166 38 225.2 100.4 59.2 62.5 90.5 144.2 88.2 230.2-2.3 86-38 166-100.4 225.2-60.3 57.1-138.6 88.3-221.3 88.3z m-0.4-548.2c-58.1 0-113 21.9-155.3 62-43.8 41.5-68.8 97.6-70.5 158-1.6 60.3 20.4 117.7 61.9 161.5s97.6 68.8 158 70.5c60.3 1.6 117.7-20.4 161.5-61.9s68.8-97.6 70.5-158c1.6-60.3-20.3-117.7-61.9-161.5-41.5-43.8-97.6-68.8-158-70.5-2.1 0-4.1-0.1-6.2-0.1z" fill="#2867CE"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- VIP推广卡片 -->
    <div class="vip-card">
      <div class="vip-content">
        <div class="vip-text">
          <div class="greeting">hi~陈大壮</div>
          <div class="vip-offer">
            <span class="vip-title">青春专享VIP仅</span>
            <span class="price">8元/月</span>
          </div>
        </div>
        <div class="vip-character"></div>
        <button class="vip-button">立即开通</button>
      </div>
      <div class="close-btn">×</div>
    </div>

    <!-- 用户信息区域 -->
    <div class="user-section">
      <div class="user-main-info">
        <div class="user-info">
          <div class="user-avatar">
            <img src="../assets/avatars/avatar_2.jpg" alt="user" />
            <div class="online-status"></div>
          </div>
          <div class="user-details">
            <div class="username">
              陈大壮
              <svg class="username-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path d="M637.5424 672.768a24.65792 24.65792 0 0 0 34.816 0l143.5648-143.5648s0-0.2048 0.2048-0.2048c2.2528-2.2528 3.8912-4.9152 5.12-7.7824 2.4576-5.9392 2.4576-12.6976 0-18.8416-1.2288-2.8672-3.072-5.5296-5.12-7.7824 0 0 0-0.2048-0.2048-0.2048l-143.1552-143.1552a24.59648 24.59648 0 1 0-34.816 34.816l101.1712 101.1712h-327.68c-13.5168 0-24.576 11.0592-24.576 24.576s11.0592 24.576 24.576 24.576H739.328l-101.7856 101.7856c-9.4208 9.4208-9.4208 24.9856 0 34.6112z" fill="#666"/>
                <path d="M833.536 327.68v-81.92c0-70.0416-56.9344-126.976-126.976-126.976h-409.6c-70.0416 0-126.976 56.9344-126.976 126.976v532.48c0 70.0416 56.9344 126.976 126.976 126.976h409.6c70.0416 0 126.976-56.9344 126.976-126.976v-81.92c0-13.5168-11.0592-24.576-24.576-24.576s-24.576 11.0592-24.576 24.576v81.92c0 43.008-34.816 77.824-77.824 77.824h-409.6c-43.008 0-77.824-34.816-77.824-77.824V245.76c0-43.008 34.816-77.824 77.824-77.824h409.6c43.008 0 77.824 34.816 77.824 77.824v81.92c0 13.5168 11.0592 24.576 24.576 24.576s24.576-11.0592 24.576-24.576z" fill="#666"/>
              </svg>
            </div>
            <div class="user-badges">
              <span class="svip-badge">👑 SVIP4</span>
              <span class="follow-badge">🏆 25勋章</span>
            </div>
          </div>
        </div>
        <div class="follow-count">
          <div class="count">15</div>
          <div class="label">关注</div>
        </div>
      </div>
      
      <!-- 功能按钮 -->
      <div class="feature-buttons-inline">
        <span class="feature-tag">提现</span>
        <span class="feature-tag">会员</span>
        <span class="feature-tag">装扮</span>
        <span class="feature-tag">日签</span>
      </div>
    </div>

    <!-- 统计数据 -->
    <div class="stats-section">
      <div class="stat-item clickable" @click="goToLyricBook">
        <div class="stat-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M266.24 61.44h491.52a122.88 122.88 0 0 1 122.88 122.88v675.84a102.4 102.4 0 0 1-102.4 102.4H245.76a102.4 102.4 0 0 1-102.4-102.4V184.32a122.88 122.88 0 0 1 122.88-122.88z" fill="#131415"/>
            <path d="M819.2 778.24v81.92l-0.1024 3.072A40.96 40.96 0 0 1 778.24 901.12H245.76l-3.072-0.1024A40.96 40.96 0 0 1 204.8 860.16v-40.96l0.1024-3.072A40.96 40.96 0 0 1 245.76 778.24h573.44zM665.6 184.32a30.72 30.72 0 0 1 0 61.44h-307.2a30.72 30.72 0 0 1 0-61.44h307.2z" fill="#131415"/>
          </svg>
        </div>
        <div class="stat-label">歌词</div>
        <div class="stat-count">95</div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">
          <svg viewBox="0 0 1025 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M511.025153 298.231808C342.912001-8.685568-0.024575 60.407808 1.0e-06 420.441088c0 236.827648 511.250432 500.31616 511.250432 500.31616s511.195136-265.982976 511.195136-511.199232C1022.444545 48.62464 687.645697 0.400384 511.025153 298.231808z" fill="#231815"/>
          </svg>
        </div>
        <div class="stat-label">收藏</div>
        <div class="stat-count">95</div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M597.333333 64a85.333333 85.333333 0 0 1 85.333334 85.333333v384h171.093333a64 64 0 0 1 42.133333 112.149334L554.453333 944.448a64 64 0 0 1-84.266666 0.021333L128.256 645.504A64 64 0 0 1 170.410667 533.333333H341.333333V149.333333a85.333333 85.333333 0 0 1 85.333334-85.333333h170.666666z" fill="#131415"/>
          </svg>
        </div>
        <div class="stat-label">本地</div>
        <div class="stat-count">历史 9</div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M512 0A512 512 0 1 0 1024 512 512 512 0 0 0 512 0zM292.864 310.8864a218.862933 218.862933 0 0 1 437.6576 0v204.8a218.862933 218.862933 0 0 1-437.6576 0v-204.8z m532.48 321.809067a333.482667 333.482667 0 0 1-72.226133 110.7968A339.421867 339.421867 0 0 1 643.345067 819.2a323.720533 323.720533 0 0 1-81.442134 23.074133v37.2736a50.039467 50.039467 0 0 1-100.1472 0v-38.434133a351.505067 351.505067 0 0 1-85.1968-24.1664 330.3424 330.3424 0 0 1-108.544-74.205867A321.467733 321.467733 0 0 1 198.8608 634.88a348.16 348.16 0 0 1-23.005867-135.3728 32.5632 32.5632 0 0 1 65.1264 1.570133 285.969067 285.969067 0 0 0 18.432 110.728534 256.341333 256.341333 0 0 0 55.364267 86.493866 266.24 266.24 0 0 0 87.313067 59.665067 291.84 291.84 0 0 0 113.800533 23.005867 268.014933 268.014933 0 0 0 189.986133-81.92 271.018667 271.018667 0 0 0 58.709334-89.7024 252.177067 252.177067 0 0 0 17.544533-107.9296 32.631467 32.631467 0 0 1 65.1264-3.549867 314.9824 314.9824 0 0 1-21.981867 134.826667z" fill="#515151"/>
          </svg>
        </div>
        <div class="stat-label">有声</div>
        <div class="stat-count">95</div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M796.16 220.16c-9.728-93.696-88.576-166.912-184.832-166.912H412.672c-95.744 0-175.104 73.216-184.832 166.4-52.224 5.632-93.184 44.032-93.184 91.136v71.168L134.144 455.68V866.816c0 50.688 47.616 91.648 105.984 91.648h541.696c58.368 0 105.984-40.96 105.984-91.648V310.784c0-46.592-39.936-84.48-91.648-90.624zM412.672 94.208h198.656c73.216 0 133.632 54.272 143.36 124.928H269.312c9.728-70.656 70.144-124.928 143.36-124.928z" fill="#131415"/>
            <path d="M349.184 443.904m-36.352 0a36.352 36.352 0 1 0 72.704 0 36.352 36.352 0 1 0-72.704 0Z" fill="#FFFFFF"/>
            <path d="M265.216 724.992c-5.632 0-11.264-2.56-15.36-6.656-7.68-8.192-6.656-21.504 1.536-28.672l160.256-142.848c8.192-7.168 19.968-6.656 27.648 0.512l88.576 85.504 156.672-174.592c4.608-5.12 11.776-7.68 18.432-6.656 6.656 1.024 12.8 5.632 15.36 11.776l93.184 209.92c4.608 10.24 0 22.528-10.24 27.136-10.24 4.608-22.528 0-27.136-10.24l-80.384-181.248-148.992 166.912c-3.584 4.096-8.704 6.656-14.336 6.656-5.632 0-10.752-2.048-14.848-5.632l-90.112-87.04-145.92 130.048c-4.608 3.584-9.728 5.12-14.336 5.12z" fill="#FFFFFF"/>
          </svg>
        </div>
        <div class="stat-label">已购</div>
        <div class="stat-count">7</div>
      </div>
    </div>

    <!-- 最近播放 -->
    <div class="recent-section">
      <div class="section-header">
        <span>最近播放</span>
        <div class="arrow-right">></div>
      </div>
      <div class="recent-list">
        <div class="recent-item">
          <img src="../assets/cover.jpg" alt="song" />
          <div class="song-title">已播歌曲 873</div>
        </div>
        <div class="recent-item">
          <img src="../assets/avatars/avatar_3.jpg" alt="song" />
          <div class="song-title">在月球里想念春天</div>
        </div>
        <div class="recent-item">
          <img src="../assets/avatars/avatar_4.jpg" alt="song" />
          <div class="song-title">华语精选｜那...</div>
        </div>
        <div class="recent-item">
          <img src="../assets/avatars/avatar_5.jpg" alt="song" />
          <div class="song-title">【国语】日...</div>
        </div>
      </div>
    </div>

    <!-- 歌单区域 -->
    <div class="playlist-section">
      <div class="playlist-tabs">
        <div class="tab active">
          <span>自建歌单</span>
          <span class="tab-count">3</span>
        </div>
        <div class="tab">
          <span>收藏歌单</span>
          <span class="tab-count">4</span>
        </div>
        <div class="tab-actions">
          <div class="add-btn">+</div>
          <div class="sort-btn">⟲</div>
          <div class="more-btn">></div>
        </div>
      </div>
    </div>

    <!-- 当前播放 -->
    <div class="current-playing">
      <div class="playing-info">
        <div class="playing-icon">🎵</div>
        <span class="playing-text">已解锁魔法音色 AI帮你唱</span>
        <div class="close-playing">×</div>
      </div>
      <div class="now-playing" @click="goToPlayer">
        <img src="../assets/cover.jpg" alt="current song" class="current-cover" />
        <div class="song-info">
          <div class="song-name">我怀念的 - 孙燕姿</div>
          <div class="vip-tag">VIP</div>
        </div>
        <div class="play-controls">
          <div class="heart-btn" @click.stop>♡</div>
          <div class="play-btn" @click.stop>▶</div>
          <div class="list-btn" @click.stop>≡</div>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <div class="bottom-nav">
      <div class="nav-item">
        <div class="nav-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M805.695 973.009c-1.963 0-3.541-0.054-4.672-0.111L203.268 972.898c-40.042 0-63.091-16.865-75.375-31.013-26.919-31.003-24.757-73.037-23.543-84.7l0-359.53 64 0 0 363.913-0.302 1.883c-0.761 6.401-0.833 26.277 8.289 36.609 1.93 2.186 7.803 8.838 26.932 8.838l600.308 0 0.75 0.082c2.153 0.076 22.315 0.434 34.996-11.557 8.454-7.994 12.74-21.212 12.74-39.288L852.063 497.379l64 0 0 360.756c0 45.871-18.247 72.371-33.555 86.525C854.974 970.12 820.092 973.008 805.695 973.009zM136.349 527.688 38 527.688c-13.291 0-25.197-8.214-29.916-20.639-4.718-12.425-1.266-26.472 8.674-35.294l472.219-419.09c12.02-10.668 30.087-10.766 42.223-0.227l478.781 415.791c9.955 8.646 13.588 22.513 9.151 34.929s-16.035 20.84-29.216 21.219l-104.938 3.012c-0.313 0.01-0.624 0.014-0.936 0.014-17.247 0-31.471-13.729-31.97-31.082-0.507-17.666 13.403-32.398 31.069-32.905l22.931-0.658L510.448 119.179 122.266 463.688l14.083 0c17.673 0 32 14.327 32 32S154.022 527.688 136.349 527.688zM403 941.201c-14.912 0-27-12.088-27-27L376 688.355c0.002-4.866 1.234-24.9 20.021-43.995 22.8-23.173 61.458-34.923 114.901-34.923 52.638 0 90.876 11.911 113.652 35.403 19.225 19.828 20.464 40.706 20.426 46.244l0 222.25c0 14.912-12.088 27-27 27s-27-12.088-27-27L591 691.402c-0.179-1.167-1.308-6.104-8.017-11.541-7.569-6.134-26.997-16.424-72.062-16.424-52.272 0-70.848 13.145-76.408 18.795-2.73 2.775-3.876 5.136-4.357 6.627-0.073 0.225-0.123 0.411-0.157 0.549l0 224.793C430 929.113 417.912 941.201 403 941.201z" fill="#272636"/>
          </svg>
        </div>
        <span>首页</span>
      </div>
      <div class="nav-item">
        <div class="nav-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M823.402985 943.761194h-611.343284c-84.059701 0-152.835821-68.776119-152.83582-152.835821v-439.402985c0-84.059701 68.776119-152.835821 152.83582-152.835821h611.343284c84.059701 0 152.835821 68.776119 152.835821 152.835821v439.402985c0 84.059701-68.776119 152.835821-152.835821 152.835821z m-611.343284-668.656716c-42.029851 0-76.41791 34.38806-76.41791 76.41791v439.402985c0 42.029851 34.38806 76.41791 76.41791 76.417911h611.343284c42.029851 0 76.41791-34.38806 76.417911-76.417911v-439.402985c0-42.029851-34.38806-76.41791-76.417911-76.41791h-611.343284z" fill="#040000"/>
            <path d="M620.895522 269.373134c-5.731343 0-11.462687-1.910448-17.194029-5.731343-13.373134-9.552239-15.283582-26.746269-7.641792-40.119403l95.522389-133.731343c9.552239-13.373134 26.746269-15.283582 40.119403-7.641791 13.373134 9.552239 15.283582 26.746269 7.641791 40.119403l-95.522388 133.731343c-3.820896 7.641791-13.373134 13.373134-22.925374 13.373134zM414.567164 269.373134c-9.552239 0-17.19403-3.820896-22.925373-11.462686l-95.522388-133.731344c-9.552239-13.373134-5.731343-30.567164 7.641791-40.119403s30.567164-7.641791 40.119403 5.731344l95.522388 133.731343c9.552239 13.373134 5.731343 30.567164-7.641791 40.119403-5.731343 3.820896-11.462687 5.731343-17.19403 5.731343z" fill="#040000"/>
            <path d="M447.044776 743.164179c-5.731343 0-11.462687-1.910448-15.283582-3.820895-11.462687-5.731343-19.104478-21.014925-19.104478-38.208956V441.313433c0-17.19403 7.641791-30.567164 19.104478-38.208955 11.462687-5.731343 26.746269-3.820896 42.029851 5.731343l177.671642 124.179104c13.373134 9.552239 21.014925 22.925373 21.014925 38.208956s-7.641791 28.656716-21.014925 38.208955l-177.671642 124.179104c-7.641791 7.641791-17.19403 9.552239-26.746269 9.552239z m3.820896-303.761194v265.552239h1.910447l177.671642-124.179105c3.820896-1.910448 5.731343-3.820896 5.731343-5.731343 0-1.910448-1.910448-3.820896-5.731343-5.731343L450.865672 439.402985c1.910448 0 0 0 0 0z" fill="#040000"/>
          </svg>
        </div>
        <span>直播</span>
      </div>
      <div class="nav-item">
        <div class="nav-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M928 886.4l-160-160c128-150.4 120-377.6-20.8-520C596.8 56 353.6 56 204.8 206.4c-72 72-112 169.6-112 272s40 198.4 112 272c72 72 169.6 112 272 112 91.2 0 179.2-32 248-91.2l160 160c12.8 12.8 32 12.8 44.8 0 11.2-12.8 11.2-32-1.6-44.8zM249.6 705.6c-60.8-60.8-94.4-140.8-94.4-225.6s33.6-166.4 94.4-225.6c62.4-62.4 144-92.8 225.6-92.8s163.2 30.4 225.6 92.8c124.8 124.8 124.8 328 0 452.8C640 768 560 801.6 475.2 801.6c-84.8-3.2-164.8-35.2-225.6-96z" fill="#333333"/>
          </svg>
        </div>
        <span>搜索</span>
      </div>
      <div class="nav-item">
        <div class="nav-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M938.653867 796.422827 471.951423 796.422827 199.092054 1023.744008 220.05498 796.422827 85.346133 796.422827C53.915965 796.422827 28.45895 770.965813 28.45895 739.564089L28.45895 56.889457C28.45895 25.487733 53.915965 0.002276 85.346133 0.002276L938.653867 0.002276C970.055591 0.002276 995.54105 25.487733 995.54105 56.889457L995.54105 739.564089C995.54105 770.965813 970.055591 796.422827 938.653867 796.422827ZM938.653867 56.889457 85.346133 56.889457 85.346133 739.564089 280.412281 739.564089 255.495695 910.367853 454.686163 739.564089 938.653867 739.564089 938.653867 56.889457ZM284.735707 458.854287 335.848841 433.994589C369.184728 497.253135 435.515184 540.430507 512 540.430507 592.922016 540.430507 662.40971 492.076402 693.555442 422.75937L744.668576 447.647513C704.250232 535.879533 615.392454 597.317689 512 597.317689 413.016303 597.317689 327.344207 541.056266 284.735707 458.854287Z" fill="#272636"/>
          </svg>
        </div>
        <span>社区</span>
      </div>
      <div class="nav-item active">
        <div class="nav-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M961.72259555 1029.29749333H59.94723555c-18.64135111 0-37.28270222-9.32067555-48.93354666-23.30168888-11.65084445-16.31118222-16.31118222-34.95253333-11.65084444-53.59388445 46.60337778-237.67722667 240.00739555-414.77006222 473.02428444-433.41141333 78.06065778 0 162.52928 9.90321778 246.99790222 44.27320888 24.46677333 9.90321778 32.62236445 16.31118222 46.60337778 23.3016889 135.14979555 76.89557333 228.35655111 209.7152 258.64874666 365.83651555 4.66033778 18.64135111 0 37.28270222-13.98101333 53.59388445-11.65084445 13.98101333-30.29219555 23.30168889-48.93354667 23.30168888z" fill="#333303"/>
            <path d="M61.11232 991.43224889c-7.57304889 0-14.56355555-2.91271111-18.64135111-8.15559111-0.58254222-0.58254222-0.58254222-1.16508445-1.16508444-1.74762667-5.82542222-5.82542222-6.40796445-15.72864-5.24288-21.55406222 43.10812445-221.36604445 224.27875555-387.39057778 440.98446222-403.11921778h17.47626666c104.27505778 0 204.47232 32.62236445 253.40586667 63.49710222C876.08888889 697.24842667 961.72259555 817.83466667 988.51953778 959.97496889c1.16508445 8.15559111-0.58254222 15.72864-6.40796445 23.30168889-4.07779555 5.24288-11.06830222 8.15559111-18.64135111 8.15559111H61.11232z" fill="#333303"/>
            <path d="M494.52373333 570.83676445c101.36234667 0 198.64689778 31.45728 245.83281778 61.16693333h0.58254222c124.66403555 73.98286222 207.38503111 191.07384889 233.01688889 329.71889777 0.58254222 2.91271111 0.58254222 6.99050667-4.07779555 12.23338667-0.58254222 1.16508445-3.49525333 2.33016889-6.99050667 2.33016889H61.11232c-3.49525333 0-6.40796445-1.16508445-6.99050667-2.33016889-0.58254222-1.16508445-1.74762667-2.33016889-2.91271111-2.91271111-1.16508445-1.16508445-2.33016889-4.66033778-1.16508444-8.73813333 41.94304-214.95808 217.28824889-375.73973333 427.58599111-391.46837333 5.24288 0.58254222 11.06830222 0 16.89372444 0m0-29.12711112c-5.82542222 0-12.23338667 0-18.05880888 0.58254222C252.76871111 558.60337778 66.3552 728.70570667 22.08199111 957.06225778c-2.33016889 11.65084445 0 25.63185778 9.32067556 34.95253333 6.99050667 9.32067555 18.64135111 13.98101333 30.29219555 13.98101334H963.47022222c11.65084445 0 23.30168889-4.66033778 30.29219556-13.98101334 6.99050667-9.32067555 11.65084445-20.97152 9.32067555-34.95253333-27.96202667-149.13080889-116.50844445-271.46467555-246.99790222-349.52533333-49.51608889-30.87473778-150.87843555-65.82727111-261.56145778-65.82727112zM512 539.96202667c-146.80064 0-267.96942222-121.16878222-267.96942222-267.96942222S365.19936 4.02318222 512 4.02318222s267.96942222 121.16878222 267.96942222 267.96942223S658.80064 539.96202667 512 539.96202667z" fill="#333303"/>
            <path d="M512 502.09678222c-126.99420445 0-230.10417778-103.10997333-230.10417778-230.10417777S385.00579555 41.88842667 512 41.88842667s230.10417778 103.10997333 230.10417778 230.10417778-103.10997333 230.10417778-230.10417778 230.10417777z" fill="#333303"/>
            <path d="M512 56.45198222c118.83861333 0 215.54062222 96.70200889 215.54062222 215.54062223S630.83861333 487.53322667 512 487.53322667s-215.54062222-96.70200889-215.54062222-215.54062222 96.70200889-215.54062222 215.54062222-215.54062223m0-29.12711111c-135.14979555 0-244.66773333 109.51793778-244.66773333 244.66773334s109.51793778 244.66773333 244.66773333 244.66773333 244.66773333-109.51793778 244.66773333-244.66773333S647.14979555 27.32487111 512 27.32487111z" fill="#333303"/>
          </svg>
        </div>
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      // 可以添加响应式数据
    }
  },
  methods: {
    // 跳转到歌词本页面
    goToLyricBook() {
      this.$router.push('/lyricbook')
    },
    
    // 跳转到播放器页面
    goToPlayer() {
      this.$router.push('/player')
    }
  }
}
</script>

<style scoped>
.profile-page {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #f5f5f5 0%, #ffffff 30%);
  overflow-y: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

/* 状态栏 */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  background: transparent;
  color: #000;
  font-weight: 600;
  font-size: 16px;
}

.time {
  font-size: 16px;
  font-weight: 600;
  color: #000;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wifi-icon {
  width: 18px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wifi-icon svg {
  width: 100%;
  height: 100%;
}

.battery {
  display: flex;
  align-items: center;
  gap: 4px;
}

.battery-icon {
  width: 20px;
  height: 10px;
  border: 1px solid #34c759;
  border-radius: 2px;
  background: linear-gradient(to right, #34c759 0%, #34c759 97%, transparent 97%);
  position: relative;
}

.battery-icon::after {
  content: '';
  position: absolute;
  right: -3px;
  top: 2px;
  width: 2px;
  height: 6px;
  background: #34c759;
  border-radius: 0 1px 1px 0;
}

.battery-text {
  font-size: 14px;
  font-weight: 600;
  color: #000;
}

/* 顶部导航 */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.nav-title {
  font-size: 18px;
  font-weight: 600;
  color: #000;
  border-bottom: 2px solid #00c853;
  padding-bottom: 2px;
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 15px;
}

.message-icon, .settings-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.message-icon svg, .settings-icon svg {
  width: 100%;
  height: 100%;
}

/* 搜索区域 */
.search-section {
  padding: 15px 20px;
}

.search-box {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 10px 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.hourglass-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.hourglass-icon svg {
  width: 100%;
  height: 100%;
}

.animated-hourglass {
  animation: hourglassRotate 2s ease-in-out infinite;
}

@keyframes hourglassRotate {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}

.search-text {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.primary-text {
  color: #333;
  font-weight: 500;
}

.secondary-text {
  color: #999;
  font-size: 14px;
}

.search-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon svg {
  width: 100%;
  height: 100%;
}

/* VIP卡片 */
.vip-card {
  margin: 0 20px 20px;
  background: linear-gradient(135deg, #4fc3f7, #29b6f6);
  border-radius: 12px;
  padding: 15px;
  position: relative;
  overflow: hidden;
}

.vip-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.vip-text {
  color: white;
}

.greeting {
  font-size: 16px;
  margin-bottom: 5px;
}

.vip-offer {
  font-size: 14px;
}

.price {
  font-weight: bold;
  font-size: 16px;
}

.vip-character {
  width: 60px;
  height: 60px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
}

.vip-button {
  background: white;
  color: #2196f3;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: 500;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

/* 用户信息区域 */
.user-section {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: white;
  margin: 0 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.user-main-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-avatar {
  position: relative;
}

.user-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.online-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #4caf50;
  border: 2px solid white;
  border-radius: 50%;
}

.username {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.username-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.user-badges {
  display: flex;
  gap: 8px;
}

.svip-badge, .follow-badge {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 8px;
}

.svip-badge {
  background: #ffd700;
  color: #333;
}

.follow-badge {
  background: #ffb3ba;
  color: #333;
}

.follow-count {
  text-align: center;
}

.count {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.label {
  font-size: 12px;
  color: #666;
}

/* 内联功能按钮 */
.feature-buttons-inline {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 0;
}

.feature-tag {
  background: #f5f7fa;
  color: #666;
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  text-align: center;
  min-width: 0;
}

.feature-tag:hover {
  background: #e8f0fe;
  color: #1976d2;
}

/* 统计数据 */
.stats-section {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background: white;
  margin: 0 20px 15px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-item.clickable {
  cursor: pointer;
  transition: all 0.2s ease;
}

.stat-item.clickable:hover {
  background: rgba(33, 150, 243, 0.1);
  border-radius: 8px;
  padding: 8px;
}

.stat-item.clickable:active {
  transform: scale(0.95);
}

.stat-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon svg {
  width: 100%;
  height: 100%;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.stat-count {
  font-size: 12px;
  color: #333;
  font-weight: 500;
}

/* 最近播放 */
.recent-section {
  padding: 0 20px 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 600;
}

.arrow-right {
  color: #999;
}

.recent-list {
  display: flex;
  gap: 10px;
  overflow-x: auto;
}

.recent-item {
  min-width: 100px;
  text-align: center;
}

.recent-item img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.song-title {
  font-size: 11px;
  color: #666;
  line-height: 1.3;
}

/* 歌单区域 */
.playlist-section {
  padding: 0 20px 20px;
}

.playlist-tabs {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.tab {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #666;
}

.tab.active {
  color: #333;
  font-weight: 600;
}

.tab-count {
  color: #999;
  font-size: 12px;
}

.tab-actions {
  margin-left: auto;
  display: flex;
  gap: 15px;
}

.add-btn, .sort-btn, .more-btn {
  width: 24px;
  height: 24px;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* 当前播放 */
.current-playing {
  position: fixed;
  bottom: 60px;
  left: 20px;
  right: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  overflow: hidden;
}

.playing-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 15px;
  background: #e8f5e8;
  font-size: 12px;
  color: #4caf50;
}

.close-playing {
  cursor: pointer;
}

.now-playing {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.now-playing:hover {
  background: rgba(33, 150, 243, 0.05);
}

.now-playing:active {
  transform: scale(0.98);
}

.current-cover {
  width: 40px;
  height: 40px;
  border-radius: 6px;
}

.song-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.song-name {
  font-size: 14px;
  color: #333;
}

.vip-tag {
  background: #ffd700;
  color: #333;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
}

.play-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.heart-btn, .play-btn, .list-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
}

.play-btn {
  background: #2196f3;
  color: white;
}

/* 底部导航 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: white;
  border-top: 1px solid #eee;
  padding: 8px 0;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  cursor: pointer;
}

.nav-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
}

.nav-item.active .nav-icon svg path {
  fill: #2196f3;
}

.nav-item span {
  font-size: 10px;
  color: #666;
}

.nav-item.active span {
  color: #2196f3;
}

/* 响应式调整 */
@media (max-width: 375px) {
  .feature-buttons {
    padding: 15px;
  }
  
  .user-section {
    padding: 15px;
  }
  
  .recent-item img {
    width: 70px;
    height: 70px;
  }
}
</style>