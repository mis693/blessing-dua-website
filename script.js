<!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blessing Gift - Receive</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <!-- ✨ Islamic Banner -->
  <div class="banner">
    <img src="public/islamic-animation.gif" alt="Banner" class="banner-img" />
  </div>  <!-- 🎁 Gift Box Section -->  <div class="gift-section">
    <h2><span id="senderName">Zeenat</span> ki taraf se ek tohfa ☕️</h2>
    <p>Apna naam likhiye neeche:</p>
    <input type="text" id="receiverName" placeholder="Type your name" />
    <button onclick="openGift()">🏰 Open Your Gift</button>
  </div>  <!-- ⏳ Loading & Dua Section (hidden initially) -->  <div id="loading" class="hidden">
    <img src="public/loading.gif" alt="Loading..." class="loading-gif" />
    <p>Gift khul raha hai... please wait <span id="countdown">10</span> seconds</p>
  </div>  <div id="result" class="hidden">
    <img src="public/dua1.gif" alt="Dua GIF" class="dua-gif" />
    <p id="finalDua"></p>
    <button onclick="goToSenderPage()">✨ Send Your Gift to Your Friends</button>
  </div>  <!-- Footer Ad Placeholder -->  <div class="ad-block">[Google Ad Here]</div>  <script src="script.js"></script></body>
</html>