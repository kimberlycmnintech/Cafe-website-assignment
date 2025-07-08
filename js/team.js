function goBack() {
    document.body.style.transform = 'translateX(-100%)';
    document.body.style.transition = 'transform 0.5s ease-in-out';
    
      setTimeout(() => {
        history.back();
    }, 400); 
}


function toggleDescription(member) {
    const desc = document.getElementById(`desc-${member}`);
    const moreText = desc.querySelector('.more-text');
    const readMore = desc.parentElement.querySelector('.read-more');
    
    if (moreText.style.display === 'none') {
        moreText.style.display = 'inline';
        readMore.textContent = 'Read less';
        desc.classList.add('expanded');
    } else {
        moreText.style.display = 'none';
        readMore.textContent = 'Read more';
        desc.classList.remove('expanded');
    }
}

function showContact(member) {
    const names = {
        'kimberly': 'Kimberly Chan Mun Nga',
        'angelyn': 'Angelyn Yek Yin Yin',
        'tangjia': 'Tang Jia Hui'
    };
    
    showNotification(`Contact details for ${names[member]} would be displayed here in a real application!`);
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}


window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.team-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200 + 300);
    });
});


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const cards = document.querySelectorAll('.team-card');
    
    cards.forEach((card, index) => {
        const speed = 0.1 + (index * 0.02);
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
});