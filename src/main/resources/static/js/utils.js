// Common utility functions
const API_URL = 'http://localhost:8080';

// Get current user from localStorage
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Check if user is logged in, redirect to login if not
function requireAuth() {
    const user = getCurrentUser();
    if (!user) {
        alert('Please login to access this page');
        window.location.href = '/login.html';
        return null;
    }
    return user;
}

// Logout user
function logout() {
    localStorage.removeItem('user');
    window.location.href = '/login.html';
}

// Initialize logout button
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}

// Profile dropdown functionality
function initProfileDropdown() {
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');
    
    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            profileMenu.classList.toggle('show');
        });
        
        document.addEventListener('click', (e) => {
            if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('show');
            }
        });
    }
}

// API fetch wrapper
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`Request failed: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
