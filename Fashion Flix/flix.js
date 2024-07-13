// script.js

document.addEventListener('DOMContentLoaded', () => {
    const reel = document.querySelector('.reel');
    const videos = document.querySelectorAll('.reel-video');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const plusButton = document.getElementById('plus-button');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const createVideoButton = document.getElementById('create-video');
    const uploadVideoButton = document.getElementById('upload-video');
    const uploadInput = document.getElementById('upload-input');

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
