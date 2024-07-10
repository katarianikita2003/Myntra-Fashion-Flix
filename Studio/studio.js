// script.js

document.addEventListener('DOMContentLoaded', () => {
    const reel = document.querySelector('.reel');
    const videos = document.querySelectorAll('.reel-video');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const plusButton = document.getElementById('plus');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('close-popup');
    const createVideoButton = document.getElementById('create-video');
    const uploadVideoButton = document.getElementById('upload-video');

    let currentIndex = 0;

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
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? videos.length - 1 : currentIndex - 1;
        showReel(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === videos.length - 1) ? 0 : currentIndex + 1;
        showReel(currentIndex);
    });

    reel.addEventListener('click', () => {
        const currentVideo = videos[currentIndex];
        if (currentVideo.paused) {
            currentVideo.play();
        } else {
            currentVideo.pause();
        }
    });

    plusButton.addEventListener('click', () => {
        popup.style.display = 'flex';
    });

    closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Optionally, add functionality for createVideoButton and uploadVideoButton

    // Initially show the first reel
    showReel(currentIndex);
});
