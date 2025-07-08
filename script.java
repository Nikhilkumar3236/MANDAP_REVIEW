document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const carousel = document.getElementById("memory-carousel");
  const cards = document.querySelectorAll(".memory-card");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  // Sounds
  const flipSound = new Audio("assets/sounds/flip.mp3");
  const navSound = new Audio("assets/sounds/nav.mp3");

  // Variables
  let currentIndex = 0;
  let startX;
  let isDragging = false;
  let theta = 0;
  let radius = window.innerWidth <= 768 ? 250 : 400;
  const totalCards = cards.length;

  // Init
  function init() {
    arrangeCards();
    prevBtn.addEventListener("click", () => {
      prevCard();
      playNavSound();
    });
    nextBtn.addEventListener("click", () => {
      nextCard();
      playNavSound();
    });

    cards.forEach((card) => {
      card.addEventListener("click", flipCard);
    });

    // Touch/mouse events
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart, { passive: true });
    document.addEventListener("mousemove", drag);
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("mouseup", dragEnd);
    document.addEventListener("touchend", dragEnd);

    document.addEventListener("keydown", handleKeyDown);

    // Resize
    window.addEventListener("resize", () => {
      radius = window.innerWidth <= 768 ? 250 : 400;
      arrangeCards();
      rotateCarousel();
    });

    // Optional ambient (if any)
    // playAmbient();
  }

  // Arrange cards
  function arrangeCards() {
    const angle = 360 / totalCards;
    cards.forEach((card, index) => {
      const cardAngle = angle * index;
      const x = radius * Math.sin((cardAngle * Math.PI) / 180);
      const z = radius * Math.cos((cardAngle * Math.PI) / 180) * -1;

      card.style.transform = `rotateY(${cardAngle}deg) translateZ(${radius}px)`;
      card.dataset.index = index;
    });
  }

  function rotateCarousel() {
    carousel.style.transform = `rotateY(${theta}deg)`;
    currentIndex = Math.round(Math.abs(theta / (360 / totalCards)) % totalCards);
    if (currentIndex >= totalCards) currentIndex = 0;
  }

  function nextCard() {
    theta -= 360 / totalCards;
    rotateCarousel();
  }

  function prevCard() {
    theta += 360 / totalCards;
    rotateCarousel();
  }

  function flipCard(e) {
    const card = e.currentTarget;
    const cardIndex = parseInt(card.dataset.index);
    if (cardIndex === currentIndex) {
      card.classList.toggle("flipped");
      playFlipSound();
    }
  }

  function dragStart(e) {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX;
  }

  function drag(e) {
    if (!isDragging) return;
    const currentX = e.pageX || (e.touches ? e.touches[0].pageX : startX);
    const diffX = currentX - startX;
    const sensitivity = 0.5;
    const newTheta = theta + diffX * sensitivity;
    carousel.style.transform = `rotateY(${newTheta}deg)`;
  }

  function dragEnd(e) {
    if (!isDragging) return;
    isDragging = false;

    const currentX =
      e.pageX || (e.changedTouches ? e.changedTouches[0].pageX : startX);
    const diffX = currentX - startX;

    if (Math.abs(diffX) > 20) {
      if (diffX > 0) {
        prevCard();
      } else {
        nextCard();
      }
      playNavSound();
    } else {
      const anglePerCard = 360 / totalCards;
      const snapAngle = Math.round(theta / anglePerCard) * anglePerCard;
      theta = snapAngle;
      rotateCarousel();
    }
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      nextCard();
      playNavSound();
    } else if (e.key === "ArrowRight") {
      prevCard();
      playNavSound();
    } else if (e.key === "Enter" || e.key === " ") {
      const currentCard = document.querySelector(
        `.memory-card[data-index="${currentIndex}"]`
      );
      if (currentCard) {
        currentCard.classList.toggle("flipped");
        playFlipSound();
      }
    }
  }

  function playFlipSound() {
    flipSound.currentTime = 0;
    flipSound.play();
  }

  function playNavSound() {
    navSound.currentTime = 0;
    navSound.play();
  }

  init();
});
