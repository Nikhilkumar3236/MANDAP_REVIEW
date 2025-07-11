const stars = document.querySelectorAll('#starRating span');
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.rating);
    highlightStars(selectedRating);
  });
});

function highlightStars(rating) {
  stars.forEach(star => {
    star.classList.remove('active');
    if (parseInt(star.dataset.rating) <= rating) {
      star.classList.add('active');
    }
  });
}

document.getElementById('submitRating').addEventListener('click', () => {
  if (selectedRating === 0) return alert("Please select a rating!");

  if (selectedRating < 3) {
    document.getElementById('thankYouUnder3').classList.remove('hidden');
    document.getElementById('unlockReview').classList.add('hidden');
  } else {
    document.getElementById('unlockReview').classList.remove('hidden');
    document.getElementById('thankYouUnder3').classList.add('hidden');
    generateComments();
  }
});

function generateComments() {
  const allComments = [
    "Great color and comfort in bundi. Perfect traditional kurta set! Got compliments for the sherwani.",
    "Tailored blazer like a dream. Perfect traditional bundi fit. Perfect bridal sherwani tailoring.",
    "Loved the blazer design and finish. Loved the overall service experience. Unique indo-western styling.",
    "Sherwani was royal and well-fitted. Tailored blazer like a dream. Perfect indo-western fitting.",
    "Perfect traditional kurta set! The bundi jacket was classy! Very professional and polite staff.",
    "Perfect bridal sherwani tailoring. Great customer service. Perfect indo-western fitting.",
    "Blazer made me look sharp! Sherwani was royal and well-fitted. Amazing embroidery on the bundi.",
    "Bundi was elegant and stylish. Quick delivery and fitting. Perfect bridal sherwani tailoring.",
    "Wedding sherwani was perfect! Great customer service. The bundi jacket was classy!",
    "Great color and comfort in bundi. Modern yet traditional design. Blazer fitting was spot on!",
    "Perfect traditional bundi fit. Loved the overall service experience. Blazer made me look sharp!",
    "Great customer service. Amazing embroidery on the bundi. Blazer fitting was spot on!",
    "Amazing design and comfort in kurta pajama. Modern yet traditional design. Loved the blazer design and finish.",
    "High-quality fabric used in the blazer. Quick delivery and fitting. Amazing design and comfort in kurta pajama.",
    "Excellent kurta pajama fitting. Blazer made me look sharp! Sherwani was royal and well-fitted.",
    "Modern yet traditional design. Blazer made me look sharp! Amazing design and comfort in kurta pajama.",
    "Great customer service. Perfect bridal sherwani tailoring. Loved the indo-western fusion style!",
    "Unique indo-western styling. Great color and comfort in bundi. Loved the blazer design and finish.",
    "Loved the overall service experience. Kurta pajama quality is top-notch! Beautiful sherwani design and detailing.",
    "Perfect bridal sherwani tailoring. Tailored blazer like a dream. Loved the kurta style and stitching.",
    "Sherwani was royal and well-fitted. Modern yet traditional design. Loved the blazer design and finish.",
    "Kurta pajama quality is top-notch! Great color and comfort in bundi. Blazer made me look sharp!",
    "Great customer service. Perfect traditional kurta set! Perfect bridal sherwani tailoring.",
    "Great customer service. Blazer fitting was spot on! Beautiful sherwani design and detailing."
  ];

  const selected = [];
  const total = 5;

  while (selected.length < total) {
    let random = allComments[Math.floor(Math.random() * allComments.length)];
    if (!selected.includes(random)) selected.push(random);
  }

  const commentList = document.getElementById('commentList');
  commentList.innerHTML = '';

  selected.forEach(comment => {
    const div = document.createElement('div');
    div.textContent = comment;
    div.onclick = () => {
      navigator.clipboard.writeText(comment);
      alert("Copied to clipboard!");
    };
    commentList.appendChild(div);
  });
}

document.getElementById('goToGoogleReview').addEventListener('click', () => {
  windowindow.open("https://search.google.com/local/writereview?placeid=ChIJ5-CzXl5Z7TkRn3HUc0uGJRE", '_blank');
});
