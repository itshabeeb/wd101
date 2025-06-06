function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function loadTable() {
  const tbody = document.querySelector('#dataTable tbody');
  tbody.innerHTML = '';
  const data = JSON.parse(localStorage.getItem('registrations') || '[]');
  data.forEach(entry => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptTerms ? 'Yes' : 'No'}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const errorDiv = document.getElementById('error');
  errorDiv.style.display = 'none';
  errorDiv.textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const acceptTerms = document.getElementById('acceptTerms').checked;

  if (!name || !email || !password || !dob || !acceptTerms) {
    errorDiv.textContent = 'All fields are required and Terms must be accepted.';
    errorDiv.style.display = 'block';
    return;
  }

  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    errorDiv.textContent = 'Age must be between 18 and 55 years.';
    errorDiv.style.display = 'block';
    return;
  }

  const entry = { name, email, password, dob, acceptTerms };
  let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
  registrations.push(entry);
  localStorage.setItem('registrations', JSON.stringify(registrations));

  this.reset();
  loadTable();
});

loadTable();
