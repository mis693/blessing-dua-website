function startGift() {
  const name = document.getElementById("receiverName").value.trim();
  const selected = document.querySelector('input[name="dua"]:checked');
  if (!name || !selected) {
    alert("Please enter your name and select a dua");
    return;
  }

  document.getElementById("mainBox").style.display = "none";
  document.getElementById("loading").style.display = "block";

  let seconds = 10;
  const countdown = setInterval(() => {
    document.getElementById("countdown").innerText = seconds + "s";
    seconds--;
    if (seconds < 0) {
      clearInterval(countdown);
      showDua(name, selected.value);
    }
  }, 1000);
}

function showDua(name, index) {
  document.getElementById("loading").style.display = "none";

  const romanDuas = [
    `Ya Allah ${name} ki har khushi se nawaz de, uski har hajat poori kar.`,
    `Ya Allah ${name} ke liye har mushkil ko asaan bana de.`,
    `Ya Allah ${name} ko sehat, sukoon aur kamyabi de duniya aur aakhirat mein.`,
  ];
  const englishDuas = [
    `May Allah bless ${name} with endless happiness and fulfill every wish.`,
    `May Allah ease every hardship in ${name}'s life.`,
    `May Allah grant ${name} success, peace, and good health always.`,
  ];

  const duaText = index < 3 ? romanDuas[index] : englishDuas[index - 3];
  const gifName = `dua${parseInt(index) + 1}.gif`;

  document.getElementById("gifImage").src = `public/${gifName}`;
  document.getElementById("duaText").innerText = duaText;
  document.getElementById("duaBox").style.display = "block";
}

function copyLink() {
  const sender = document.getElementById("senderName").value.trim();
  const selected = document.querySelector('input[name="dua"]:checked');
  if (!sender || !selected) {
    alert("Please enter your name and select a dua");
    return;
  }

  const index = selected.value;
  const url = `${window.location.origin}?sender=${encodeURIComponent(sender)}&dua=${index}`;
  navigator.clipboard.writeText(url);
  alert("Link copied! Share on WhatsApp, Instagram, Facebook");
}

window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const sender = params.get("sender");
  const duaIndex = params.get("dua");

  if (sender && duaIndex !== null) {
    document.getElementById("mainBox").style.display = "none";
    showDua(sender, duaIndex);
  }
};
