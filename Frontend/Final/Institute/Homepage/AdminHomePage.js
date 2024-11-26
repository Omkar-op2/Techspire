document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken'); 
    const instituteNameElement = document.querySelector('.institute-name');
  
    if (token) {
      fetch('http://localhost:5000/api/institute-name', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch institute name');
          }
          return response.json();
        })
        .then(data => {
          if (data.instituteName) {
            console.log(data.instituteName)
            instituteNameElement.textContent = data.instituteName; // Update institute name in UI
          }
        })
        .catch(error => {
          console.error('Error fetching institute name:', error);
          instituteNameElement.textContent = 'Unknown Institute'; // Fallback
        });
    } else {
      instituteNameElement.textContent = 'No Token Found'; // Handle missing token
    }
  });