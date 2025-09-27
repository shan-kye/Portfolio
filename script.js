document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("9Q5PGkeyQHPc7u6F-"); // This will be replaced with your actual key

    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevents the default jump-to-anchor behavior

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjusts for the fixed header
                    behavior: 'smooth' // Creates the smooth scroll animation
                });
            }
        });
    });

    // Contact form handling with EmailJS
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            to_email: '911shashankshukla@gmail.com' // Replace with your email
        };

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                'service_iqjxrq5', // Replace with your EmailJS service ID
                'template_zrla83s', // Replace with your EmailJS template ID
                formData
            );

            if (response.status === 200) {
                // Success
                formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                formMessage.className = 'form-message success';
                contactForm.reset();
            } else {
                // Error
                formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
                formMessage.className = 'form-message error';
            }
        } catch (error) {
            // Error handling
            console.error('EmailJS Error:', error);
            formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
            formMessage.className = 'form-message error';
        } finally {
            // Reset button state
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    });
});
