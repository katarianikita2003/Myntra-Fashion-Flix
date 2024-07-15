document.addEventListener('DOMContentLoaded', () => {
  const reel = document.querySelector('.reel');
  const videos = document.querySelectorAll('.reel-video');
  const likeButtons = document.querySelectorAll('.like-button');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const plusButton = document.getElementById('plus-button');
  const modal = document.getElementById('modal');
  const closeModal = document.querySelector('.close');
  const createVideoButton = document.getElementById('create-video');
  const uploadVideoButton = document.getElementById('upload-video');
  const uploadInput = document.getElementById('upload-input');
  const cardImg1 = document.querySelector('.card-img1');
  const cardImg2 = document.querySelector('.card-img2');

  let currentIndex = 0;
  const likedVideos = new Array(videos.length).fill(false);

  function showReel(index) {
      videos.forEach((video, i) => {
          if (i === index) {
              video.classList.add('active');
              video.play();
          } else {
              video.classList.remove('active');
              video.pause();
              video.currentTime = 0;
          }
      });

      likeButtons.forEach((button, i) => {
          if (i === index) {
              button.classList.toggle('active', likedVideos[i]);
          } else {
              button.classList.remove('active');
          }
      });

      // Update the card images based on the current video
      const currentVideo = videos[index];
      const imageUrl1 = currentVideo.getAttribute('data-image1');
      const imageUrl2 = currentVideo.getAttribute('data-image2');
      cardImg1.src = imageUrl1;
      cardImg2.src = imageUrl2;
  }

  prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? videos.length - 1 : currentIndex - 1;
      showReel(currentIndex);
  });

  nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex === videos.length - 1) ? 0 : currentIndex + 1;
      showReel(currentIndex);
  });

  reel.addEventListener('click', (event) => {
      if (!event.target.classList.contains('like-button')) {
          const currentVideo = videos[currentIndex];
          if (currentVideo.paused) {
              currentVideo.play();
          } else {
              currentVideo.pause();
          }
      }
  });

  likeButtons.forEach((button, index) => {
      button.addEventListener('click', (event) => {
          event.stopPropagation(); // Prevent the video from pausing/playing
          likedVideos[index] = !likedVideos[index];
          button.classList.toggle('active', likedVideos[index]);
      });
  });

  plusButton.addEventListener('click', () => {
      modal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });

  createVideoButton.addEventListener('click', () => {
      // Open camera for video creation
      // This is a placeholder; actual implementation depends on platform capabilities
      alert('Opening camera for video creation...');
      modal.style.display = 'none';
  });

  uploadVideoButton.addEventListener('click', () => {
      uploadInput.click();
  });

  uploadInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
          // Upload the video file
          uploadVideo(file);
      }
  });

  function uploadVideo(file) {
      const formData = new FormData();
      formData.append('video', file);

      fetch('/upload', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          alert('Video uploaded successfully!');
      })
      .catch(error => {
          console.error('Error:', error);
          alert('Error uploading video.');
      });
  }

  // Initially show the first reel
  showReel(currentIndex);

  // Keyboard navigation
  document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') {
          prevButton.click();
      } else if (event.key === 'ArrowDown') {
          nextButton.click();
      } else if (event.key === ' ') {
          const currentVideo = videos[currentIndex];
          if (currentVideo.paused) {
              currentVideo.play();
          } else {
              currentVideo.pause();
          }
      }
  });
});
