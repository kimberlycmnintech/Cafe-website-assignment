// Calendar functionality
class CustomCalendar {
  constructor() {
    this.currentDate = new Date();
    this.selectedDate = null;
    this.currentMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    
    this.init();
  }
  
  init() {
    this.dateInput = document.getElementById('date');
    this.calendarDropdown = document.getElementById('calendarDropdown');
    this.calendarTitle = document.getElementById('calendarTitle');
    this.calendarDays = document.getElementById('calendarDays');
    this.prevMonthBtn = document.getElementById('prevMonth');
    this.nextMonthBtn = document.getElementById('nextMonth');
    this.todayBtn = document.getElementById('todayBtn');
    
    this.bindEvents();
    this.renderCalendar();
  }
  
  bindEvents() {
    // Toggle calendar on input click
    this.dateInput.addEventListener('click', () => {
      this.toggleCalendar();
    });
    
    // Close calendar when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.dateInput.contains(e.target) && !this.calendarDropdown.contains(e.target)) {
        this.closeCalendar();
      }
    });
    
    // Navigation buttons
    this.prevMonthBtn.addEventListener('click', () => {
      this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
      this.renderCalendar();
    });
    
    this.nextMonthBtn.addEventListener('click', () => {
      this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
      this.renderCalendar();
    });
    
    // Today button
    this.todayBtn.addEventListener('click', () => {
      this.selectDate(new Date());
      this.closeCalendar();
    });
  }
  
  toggleCalendar() {
    if (this.calendarDropdown.style.display === 'block') {
      this.closeCalendar();
    } else {
      this.openCalendar();
    }
  }
  
  openCalendar() {
    this.calendarDropdown.style.display = 'block';
  }
  
  closeCalendar() {
    this.calendarDropdown.style.display = 'none';
  }
  
  renderCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    
    // Update title
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    this.calendarTitle.textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // Clear previous days
    this.calendarDays.innerHTML = '';
    
    // Generate calendar days
    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dayElement = document.createElement('div');
      dayElement.className = 'calendar-day';
      dayElement.textContent = date.getDate();
      
      // Check if it's today
      if (this.isToday(date)) {
        dayElement.classList.add('today');
      }
      
      // Check if it's selected
      if (this.selectedDate && this.isSameDate(date, this.selectedDate)) {
        dayElement.classList.add('selected');
      }
      
      // Check if it's from other month
      if (date.getMonth() !== month) {
        dayElement.classList.add('other-month');
      }
      
      // Check if it's in the past (disable past dates)
      if (date < new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate())) {
        dayElement.classList.add('disabled');
      } else {
        // Add click event for valid dates
        dayElement.addEventListener('click', () => {
          this.selectDate(date);
          this.closeCalendar();
        });
      }
      
      this.calendarDays.appendChild(dayElement);
    }
  }
  
  selectDate(date) {
    this.selectedDate = date;
    
    // Format date for display
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    // Update input value
    this.dateInput.value = `${day}/${month}/${year}`;
    
    // Re-render calendar to show selection
    this.renderCalendar();
  }
  
  isToday(date) {
    const today = new Date();
    return this.isSameDate(date, today);
  }
  
  isSameDate(date1, date2) {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }
}

// Initialize calendar when page loads
let calendar;
document.addEventListener('DOMContentLoaded', function() {
  calendar = new CustomCalendar();
});

// Form submission
document.getElementById('reservationForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const reservation = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    persons: formData.get('persons'),
    date: formData.get('date'),
    time: formData.get('time')
  };
  
  console.log('Reservation Data:', reservation);
  
  // Show success message
  document.getElementById('successMessage').style.display = 'block';
  
  // Reset form after 3 seconds and hide success message
  setTimeout(() => {
    this.reset();
    document.getElementById('successMessage').style.display = 'none';
    // Reset calendar
    if (calendar) {
      calendar.selectedDate = null;
      calendar.renderCalendar();
    }
  }, 3000);
});

// Handle back button functionality
function goBack() {
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = '/';
  }
}

// Format phone number input (limit to 10 digits)
document.getElementById('phone').addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 10) {
    value = value.substring(0, 10);
  }
  e.target.value = value;
});