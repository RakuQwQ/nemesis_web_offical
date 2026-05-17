# NEMESIS 網站設計構思

## 背景
NEMESIS 是香港 Minecraft 公會，需要一個深色主題的官方網站，展現公會的力量感與社群凝聚力。

---

<response>
<text>
## 方案 A：熔岩鍛造 (Forge & Ember)

**Design Movement**: 工業黑暗幻想 (Industrial Dark Fantasy)

**Core Principles**:
1. 深黑底色配合熔岩橙紅作為強調色，呼應 Minecraft 的鍛造/地獄維度
2. 粗礦石質感紋理背景，帶有微妙的像素化元素
3. 大膽的斜切分隔線，製造動感與層次感
4. 金屬光澤的文字標題，帶有微弱的輝光效果

**Color Philosophy**:
- 主色：#0a0a0a（深黑）
- 強調色：#ff6b1a（熔岩橙）
- 次要強調：#ffd700（金色）
- 文字：#e8e8e8（淺灰白）
- 情感：力量、熱情、鍛造精神

**Layout Paradigm**:
- 非對稱斜切佈局，各區塊以 clip-path 斜切過渡
- Hero 區塊全屏，標題靠左下方，製造戲劇感
- 卡片採用左側橙色邊框強調

**Signature Elements**:
1. 熔岩流動的 CSS 動畫邊框
2. 像素化的裝飾圖案（呼應 Minecraft 方塊）
3. 斜切的區塊分隔線

**Interaction Philosophy**:
- 懸停時卡片輕微上浮並顯示橙色輝光
- 按鈕有熔岩流動的 hover 效果

**Animation**:
- 頁面載入時標題從下方滑入
- 統計數字有計數動畫
- 輪播卡片有平滑滑動

**Typography System**:
- 標題：Rajdhani（粗體，工業感）
- 正文：Noto Sans HK（繁體中文支援）
- 強調：Oswald（全大寫）
</text>
<probability>0.08</probability>
</response>

<response>
<text>
## 方案 B：深淵石板 (Obsidian Chronicle) ← 選定方案

**Design Movement**: 深淵暗黑史詩 (Dark Epic Chronicle)

**Core Principles**:
1. 鋅灰/深炭色底色，配合冰藍紫色作為神秘強調色
2. 精緻的幾何線條裝飾，呼應 Minecraft 的方塊美學
3. 玻璃態 (Glassmorphism) 卡片，帶有微妙的背景模糊
4. 史詩感的大型排版，標題字重對比強烈

**Color Philosophy**:
- 主背景：#111827（深藍灰）
- 次背景：#1f2937（稍淺灰）
- 強調色：#7c3aed（深紫）+ #06b6d4（青藍）
- 文字：#f9fafb（近白）/ #9ca3af（灰色輔助）
- 情感：神秘、史詩、深邃、專業

**Layout Paradigm**:
- 全屏 Hero 配左對齊標題，右側有裝飾性幾何圖形
- 各區塊交替使用深色/稍淺色背景製造節奏
- 統計數字以大型排版突出顯示

**Signature Elements**:
1. 細線幾何框架裝飾（方塊/菱形）
2. 漸層光暈效果（紫藍漸層）
3. 玻璃態半透明卡片

**Interaction Philosophy**:
- 懸停時出現紫藍色輝光邊框
- 導航欄滾動後出現毛玻璃效果
- 按鈕有漸層填充動畫

**Animation**:
- Framer Motion 驅動的進場動畫（淡入+上移）
- 統計數字滾動計數
- 輪播卡片 3D 翻轉效果

**Typography System**:
- 標題：Cinzel（拉丁史詩感）+ Noto Serif TC（繁體中文）
- 正文：Noto Sans HK
- 數字強調：Rajdhani
</text>
<probability>0.09</probability>
</response>

<response>
<text>
## 方案 C：霓虹地下城 (Neon Underground)

**Design Movement**: 賽博龐克像素 (Cyberpunk Pixel)

**Core Principles**:
1. 純黑底色配霓虹綠/青色，呼應駭客/地下城美學
2. 掃描線紋理疊加，製造復古 CRT 螢幕效果
3. 打字機動畫文字效果
4. 像素化邊框與裝飾元素

**Color Philosophy**:
- 主色：#000000（純黑）
- 強調色：#00ff41（駭客綠）
- 次要強調：#00ffff（青色）
- 警告色：#ff0080（霓虹粉）
- 情感：叛逆、科技、地下文化

**Layout Paradigm**:
- 終端機風格的文字佈局
- 左側固定導航欄（桌面版）
- 卡片使用像素化邊框

**Signature Elements**:
1. 掃描線 CSS 疊加效果
2. 打字機文字動畫
3. 像素化 8-bit 圖標

**Interaction Philosophy**:
- 點擊有像素化波紋效果
- 懸停顯示終端機風格工具提示

**Animation**:
- 打字機效果的標題
- 閃爍的游標
- 故障藝術 (Glitch) 動畫

**Typography System**:
- 標題：Share Tech Mono（等寬字體）
- 正文：IBM Plex Mono
- 中文：Noto Sans HK
</text>
<probability>0.07</probability>
</response>

---

## 選定方案：方案 B — 深淵石板 (Obsidian Chronicle)

選擇理由：此方案最能體現 NEMESIS 公會的史詩感與專業形象，深藍灰配紫藍漸層既神秘又現代，玻璃態卡片與幾何裝飾呼應 Minecraft 的方塊美學，同時保持高端視覺質感。
