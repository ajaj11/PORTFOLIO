// 3D interactive effect on hero section
const hero3d = document.getElementById('hero-3d');

document.getElementById('hero').addEventListener('mousemove', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left; // x position within the element
  const y = e.clientY - rect.top;  // y position within the element

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * 10; // max 10deg rotation
  const rotateY = ((x - centerX) / centerX) * 10;

  hero3d.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
});

document.getElementById('hero').addEventListener('mouseleave', () => {
  hero3d.style.transform = 'rotateX(0) rotateY(0)';
});

// Contact form submission with fetch API
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  formMessage.textContent = '';
  const formData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };

  if (!formData.name || !formData.email || !formData.message) {
    formMessage.style.color = 'red';
    formMessage.textContent = 'Please fill in all fields.';
    return;
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      formMessage.style.color = 'lightgreen';
      formMessage.textContent = 'Thank you for reaching out! I will get back to you soon.';
      form.reset();
    } else {
      formMessage.style.color = 'red';
      formMessage.textContent = result.error || 'Something went wrong. Please try again later.';
    }
  } catch (error) {
    formMessage.style.color = 'red';
    formMessage.textContent = 'Network error. Please try again later.';
  }
});