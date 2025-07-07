document.addEventListener('DOMContentLoaded', () => {
    // --- Common Elements ---
    const currentPath = window.location.pathname;
    const currentHostname = window.location.hostname;
    const isLocalhost = currentHostname === 'localhost' || currentHostname === '127.0.0.1';
    const baseUrl = isLocalhost ? window.location.origin : 'https://yourdomain.com'; // IMPORTANT: Change yourdomain.com to your actual domain

    // --- Dua Data ---
    const duas = {
        1: {
            text: "Ya Allah, [name] ki har dua qubool kar, uski zindagi mein sirf khushiyan bhar de. Ameen.",
            gif: "public/dua1.gif"
        },
        2: {
            text: "Ilahi [name] ko har imtehaan mein kaamyabi de, uska har din barkat wala ho.",
            gif: "public/dua2.gif"
        },
        3: {
            text: "Ya Rab, [name] aur uske ghar walon ko sehat, sukoon aur kamiyabi se nawaz.",
            gif: "public/dua3.gif"
        },
        4: {
            text: "May Allah bless [name] with endless peace, success, and answered prayers. Ameen.",
            gif: "public/dua4.gif"
        },
        5: {
            text: "O Allah, grant [name] strength, happiness, and mercy in every step of life.",
            gif: "public/dua5.gif"
        },
        6: {
            text: "Bless [name] with a heart full of gratitude and a life full of blessings.",
            gif: "public/dua6.gif"
        }
    };

    // --- index.html Logic ---
    if (currentPath.includes('index.html') || currentPath === '/') {
        const urlParams = new URLSearchParams(window.location.search);
        const senderName = urlParams.get('sender');
        const duaId = urlParams.get('dua');

        const greetingHeading = document.getElementById('greeting-heading');
        const receiverNameInput = document.getElementById('receiverNameInput');
        const openGiftButton = document.getElementById('openGiftButton');
        const loadingOverlay = document.getElementById('loading-overlay');
        const countdownElement = document.getElementById('countdown');

        if (senderName) {
            greetingHeading.textContent = `🎁 Ek Tohfa ${decodeURIComponent(senderName)} ki taraf se`;
        } else {
            greetingHeading.textContent = `🎁 Ek Tohfa Aapke Liye`; // Default if no sender name
        }

        openGiftButton.addEventListener('click', () => {
            const receiverName = receiverNameInput.value.trim();
            if (receiverName) {
                loadingOverlay.classList.add('active');
                let countdown = 10;
                countdownElement.textContent = countdown;

                const interval = setInterval(() => {
                    countdown--;
                    countdownElement.textContent = countdown;
                    if (countdown <= 0) {
                        clearInterval(interval);
                        // Redirect to receiver.html with all parameters
                        const params = new URLSearchParams();
                        if (senderName) params.append('sender', senderName);
                        if (duaId) params.append('dua', duaId);
                        params.append('receiver', receiverName);
                        window.location.href = `receiver.html?${params.toString()}`;
                    }
                }, 1000);
            } else {
                alert('Please type your name to open the gift!');
            }
        });
    }

    // --- receiver.html Logic ---
    if (currentPath.includes('receiver.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const receiverName = urlParams.get('receiver');
        const senderName = urlParams.get('sender');
        const duaId = urlParams.get('dua');

        const displayedDuaElement = document.getElementById('displayedDua');
        const duaGifElement = document.getElementById('duaGif');

        if (receiverName && duaId && duas[duaId]) {
            let duaText = duas[duaId].text.replace('[name]', decodeURIComponent(receiverName));
            displayedDuaElement.textContent = duaText;
            duaGifElement.src = duas[duaId].gif;
        } else {
            // Fallback if parameters are missing or invalid
            displayedDuaElement.textContent = "Oops! Something went wrong or the gift link is incomplete.";
            duaGifElement.src = "public/islamic-animation.gif"; // Default GIF
        }
    }

    // --- sender.html Logic ---
    if (currentPath.includes('sender.html')) {
        const senderNameInput = document.getElementById('senderNameInput');
        const duaCards = document.querySelectorAll('.dua-card');
        const generateLinkButton = document.getElementById('generateLinkButton');
        const generatedLinkSection = document.getElementById('generatedLinkSection');
        const generatedLinkInput = document.getElementById('generatedLink');
        const copyLinkButton = document.getElementById('copyLinkButton');
        const whatsappShareButton = document.getElementById('whatsappShare');
        const facebookShareButton = document.getElementById('facebookShare');
        const instagramShareButton = document.getElementById('instagramShare'); // Instagram direct share not feasible

        let selectedDuaId = null;

        duaCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove 'selected' class from all cards
                duaCards.forEach(d => d.classList.remove('selected'));
                // Add 'selected' class to the clicked card
                card.classList.add('selected');
                selectedDuaId = card.dataset.duaId;
            });
        });

        generateLinkButton.addEventListener('click', () => {
            const sender = senderNameInput.value.trim();
            if (!sender) {
                alert('Please enter your name.');
                return;
            }
            if (!selectedDuaId) {
                alert('Please select a dua.');
                return;
            }

            const encodedSender = encodeURIComponent(sender);
            const generatedUrl = `${baseUrl}/index.html?sender=${encodedSender}&dua=${selectedDuaId}`;
            generatedLinkInput.value = generatedUrl;
            generatedLinkSection.style.display = 'block';

            // Set up share links
            const shareText = `🎁 Ek behtareen tohfa ${sender} ki taraf se! Apna naam likhkar kholien:`;

            // WhatsApp Share
            whatsappShareButton.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + generatedUrl)}`;

            // Facebook Share
            facebookShareButton.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedUrl)}&quote=${encodeURIComponent(shareText)}`;

            // Instagram Share (Note: Direct web share for Instagram is not straightforward.
            // Users typically need to manually copy and paste the link into their story or DM).
            // For now, it will just open Instagram's website. You might want to remove this if it causes confusion.
            instagramShareButton.href = `https://www.instagram.com/`; // Opens Instagram website
            instagramShareButton.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent direct navigation for better UX
                alert("For Instagram, please copy the link and paste it into your story or message!");
                window.open("https://www.instagram.com/", "_blank");
            });

        });

        copyLinkButton.addEventListener('click', () => {
            generatedLinkInput.select();
            generatedLinkInput.setSelectionRange(0, 99999); // For mobile devices
            document.execCommand('copy');
            alert('Link copied to clipboard!');
        });
    }
});