// Tab functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const target = document.getElementById(button.dataset.target);

        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to the clicked button and corresponding content
        button.classList.add('active');
        target.classList.add('active');
        
        // Add bounce animation to tab button
        button.classList.add('bounce');
        setTimeout(() => button.classList.remove('bounce'), 600);
    });
});

// Enhanced like functionality with animation
document.querySelectorAll('.like-button').forEach(button => {
    let isLiked = false;
    button.addEventListener('click', () => {
        const likeCount = button.querySelector('.like-count');
        const currentCount = parseInt(likeCount.textContent);
        
        if (!isLiked) {
            likeCount.textContent = currentCount + 1;
            button.style.color = '#ff6b6b';
            isLiked = true;
        } else {
            likeCount.textContent = currentCount - 1;
            button.style.color = '';
            isLiked = false;
        }
        
        // Add pulse animation
        button.classList.add('pulse');
        setTimeout(() => button.classList.remove('pulse'), 600);
    });
});

// Enhanced comment functionality
document.querySelectorAll('.comment-submit').forEach(button => {
    button.addEventListener('click', (e) => {
        const commentInput = e.currentTarget.previousElementSibling;
        const commentsList = e.currentTarget.parentElement.querySelector('.comments-list');
        const commentCount = e.currentTarget.parentElement.previousElementSibling.querySelector('.comment-count');

        if (commentInput.value.trim()) {
            // Create comment element
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment-item';
            commentDiv.innerHTML = `<strong>You:</strong> ${commentInput.value}`;
            commentsList.appendChild(commentDiv);
            
            // Update comment count
            commentCount.textContent = parseInt(commentCount.textContent) + 1;
            commentInput.value = '';
            
            // Add animation to new comment
            commentDiv.style.opacity = '0';
            commentDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                commentDiv.style.transition = 'all 0.3s';
                commentDiv.style.opacity = '1';
                commentDiv.style.transform = 'translateY(0)';
            }, 10);
        } else {
            // Shake animation for empty input
            commentInput.classList.add('shake');
            setTimeout(() => commentInput.classList.remove('shake'), 500);
        }
    });
});

// Share button functionality
document.querySelectorAll('.share-button').forEach(button => {
    button.addEventListener('click', () => {
        const shareCount = button.querySelector('.share-count');
        shareCount.textContent = parseInt(shareCount.textContent) + 1;
        
        // Add bounce animation
        button.classList.add('bounce');
        setTimeout(() => button.classList.remove('bounce'), 600);
        
        // Show share notification
        showNotification('Post shared successfully! 🎉');
    });
});

// Post creation functionality
const publishBtn = document.querySelector('.publish-btn');
const postTextarea = document.querySelector('.post-textarea');
const postsContainer = document.querySelector('#posts');

publishBtn.addEventListener('click', () => {
    const postContent = postTextarea.value.trim();
    if (postContent) {
        createNewPost(postContent);
        postTextarea.value = '';
        showNotification('Post published successfully! 🚀');
    } else {
        postTextarea.classList.add('shake');
        setTimeout(() => postTextarea.classList.remove('shake'), 500);
    }
});

// Function to create new post
function createNewPost(content) {
    const newPost = document.createElement('div');
    newPost.className = 'post-card';
    newPost.setAttribute('data-type', 'text');
    
    newPost.innerHTML = `
        <div class="post-header">
            <span class="post-type">📝 New Post</span>
            <span class="post-mood">😊 Happy</span>
        </div>
        <div class="post-text">${content}</div>
        <div class="post-info">
            <div class="post-interactions">
                <span class="like-button">❤️ <span class="like-count">0</span></span>
                <span class="comment-button">💬 <span class="comment-count">0</span></span>
                <span class="share-button">🔄 <span class="share-count">0</span></span>
                <span class="post-date">Just now</span>
            </div>
            <div class="comment-section">
                <div class="comments-list"></div>
                <input type="text" placeholder="Add a comment..." class="comment-input">
                <button class="comment-submit">Post</button>
            </div>
        </div>
    `;
    
    // Insert at the beginning
    postsContainer.insertBefore(newPost, postsContainer.firstChild);
    
    // Add entrance animation
    newPost.style.opacity = '0';
    newPost.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        newPost.style.transition = 'all 0.5s';
        newPost.style.opacity = '1';
        newPost.style.transform = 'translateY(0)';
    }, 10);
    
    // Add event listeners to new post
    addPostEventListeners(newPost);
    
    // Update stats
    updateStats();
}

// Function to add event listeners to new posts
function addPostEventListeners(post) {
    const likeBtn = post.querySelector('.like-button');
    const shareBtn = post.querySelector('.share-button');
    const commentBtn = post.querySelector('.comment-submit');
    
    let isLiked = false;
    likeBtn.addEventListener('click', () => {
        const likeCount = likeBtn.querySelector('.like-count');
        const currentCount = parseInt(likeCount.textContent);
        
        if (!isLiked) {
            likeCount.textContent = currentCount + 1;
            likeBtn.style.color = '#ff6b6b';
            isLiked = true;
        } else {
            likeCount.textContent = currentCount - 1;
            likeBtn.style.color = '';
            isLiked = false;
        }
        
        likeBtn.classList.add('pulse');
        setTimeout(() => likeBtn.classList.remove('pulse'), 600);
    });
    
    shareBtn.addEventListener('click', () => {
        const shareCount = shareBtn.querySelector('.share-count');
        shareCount.textContent = parseInt(shareCount.textContent) + 1;
        shareBtn.classList.add('bounce');
        setTimeout(() => shareBtn.classList.remove('bounce'), 600);
        showNotification('Post shared successfully! 🎉');
    });
    
    commentBtn.addEventListener('click', (e) => {
        const commentInput = e.currentTarget.previousElementSibling;
        const commentsList = e.currentTarget.parentElement.querySelector('.comments-list');
        const commentCount = e.currentTarget.parentElement.previousElementSibling.querySelector('.comment-count');

        if (commentInput.value.trim()) {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment-item';
            commentDiv.innerHTML = `<strong>You:</strong> ${commentInput.value}`;
            commentsList.appendChild(commentDiv);
            
            commentCount.textContent = parseInt(commentCount.textContent) + 1;
            commentInput.value = '';
            
            commentDiv.style.opacity = '0';
            commentDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                commentDiv.style.transition = 'all 0.3s';
                commentDiv.style.opacity = '1';
                commentDiv.style.transform = 'translateY(0)';
            }, 10);
        } else {
            commentInput.classList.add('shake');
            setTimeout(() => commentInput.classList.remove('shake'), 500);
        }
    });
}

// Search functionality
const searchInput = document.querySelector('.search-input');
const filterSelect = document.querySelector('.filter-select');

searchInput.addEventListener('input', filterPosts);
filterSelect.addEventListener('change', filterPosts);

function filterPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterType = filterSelect.value;
    const posts = document.querySelectorAll('.post-card');
    
    posts.forEach(post => {
        const postText = post.textContent.toLowerCase();
        const postType = post.getAttribute('data-type');
        
        let matchesSearch = postText.includes(searchTerm);
        let matchesFilter = filterType === 'all' || 
                           (filterType === 'photos' && postType === 'photo') ||
                           (filterType === 'text' && postType === 'text') ||
                           (filterType === 'recent' && post.querySelector('.post-date').textContent.includes('ago'));
        
        if (matchesSearch && matchesFilter) {
            post.style.display = 'block';
            post.style.animation = 'fade-in 0.3s';
        } else {
            post.style.display = 'none';
        }
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(156, 39, 176, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        backdrop-filter: blur(10px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Update stats function
function updateStats() {
    const postsCount = document.querySelectorAll('.post-card').length;
    const statsElement = document.querySelector('.stats span');
    if (statsElement) {
        statsElement.innerHTML = `Posts: <strong>${postsCount}</strong>`;
    }
}



// Achievement card hover effects
document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (card.classList.contains('earned')) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});



// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    showNotification('Welcome to your enhanced profile! 🎉');
});