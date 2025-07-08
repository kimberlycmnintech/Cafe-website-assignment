function showLogin() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('signupForm').classList.remove('active');
    document.querySelectorAll('.toggle-btn')[0].classList.add('active');
    document.querySelectorAll('.toggle-btn')[1].classList.remove('active');
}

function showSignup() {
    document.getElementById('signupForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
    document.querySelectorAll('.toggle-btn')[1].classList.add('active');
    document.querySelectorAll('.toggle-btn')[0].classList.remove('active');
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email && password) {
        showSuccess();
    }
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (name && email && password) {
        showSuccess();
    }
}

function showSuccess() {
    
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const toggle = document.querySelector('.auth-toggle');
    const successMessage = document.getElementById('successMessage');
    
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    toggle.style.display = 'none';
    successMessage.style.display = 'block';
    
    
    successMessage.offsetHeight;
}

function continueToCafe() {
    alert('Redirecting to main page...');
    window.location.href = 'index.html';
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth page loaded successfully');
});