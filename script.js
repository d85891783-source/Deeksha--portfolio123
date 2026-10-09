/**
 * ============================================================================
 * DEEKSHA R - PORTFOLIO INTERACTION CONTROLLER (script.js)
 * Covers Prompts 1 through 15:
 * - Theme Detection & Night Mode Toggle (Prompt 2)
 * - Navigation & ScrollSpy (Prompt 3)
 * - Skills Progress Animation & Filtering (Prompt 5)
 * - Clickable Project Modals (Prompt 7)
 * - Video Playback Controller (Prompt 8)
 * - AI Chat Interface Simulator & API Hook (Prompt 10)
 * - Contact Form Validation & Email Dispatch Hook (Prompt 11)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================================
       1. THEME / NIGHT MODE TOGGLE CONTROLLER (Prompts 1 & 2)
       Detects system preferences and allows manual toggle with persistence
       ======================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const mobileThemeBtn = document.getElementById('mobile-theme-btn');
    const htmlElement = document.documentElement;

    // Check localStorage or fallback to CSS media query detection
    const prefersDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('deeksha_portfolio_theme');

    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = '🌙';
            if (mobileThemeBtn) mobileThemeBtn.textContent = '🌙';
            localStorage.setItem('deeksha_portfolio_theme', 'dark');
        } else if (theme === 'light') {
            htmlElement.setAttribute('data-theme', 'light');
            if (themeIcon) themeIcon.textContent = '☀️';
            if (mobileThemeBtn) mobileThemeBtn.textContent = '☀️';
            localStorage.setItem('deeksha_portfolio_theme', 'light');
        } else {
            // Default to system
            const isSystemDark = prefersDarkMedia.matches;
            htmlElement.removeAttribute('data-theme');
            const icon = isSystemDark ? '🌙' : '☀️';
            if (themeIcon) themeIcon.textContent = icon;
            if (mobileThemeBtn) mobileThemeBtn.textContent = icon;
            localStorage.removeItem('deeksha_portfolio_theme');
        }
    }

    // Initialize Theme
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(prefersDarkMedia.matches ? 'dark' : 'light');
    }

    // Toggle Handler
    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme') || (prefersDarkMedia.matches ? 'dark' : 'light');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    }

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);

    // Listen for OS Theme Changes
    prefersDarkMedia.addEventListener('change', (e) => {
        if (!localStorage.getItem('deeksha_portfolio_theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Keyboard shortcut (Ctrl + T) to toggle theme
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 't') {
            e.preventDefault();
            toggleTheme();
        }
    });


    /* ========================================================================
       2. HERO TYPING EFFECT ANIMATION (Prompt 2 & 14)
       ======================================================================== */
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const roles = [
            "Software Engineer",
            "C Programming Specialist",
            "Arduino & Embedded Developer",
            "AI Stress Detection Innovator",
            "GPT Belur Graduate (CGPA 7.16)",
            "6-Mo Eshwar Tech Experience"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;

        function typeLoop() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 40;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 90;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingDelay = 1800; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingDelay = 400; // Pause before typing new word
            }

            setTimeout(typeLoop, typingDelay);
        }

        typeLoop();
    }


    /* ========================================================================
       3. VERTICAL NAVIGATION & SCROLLSPY (Prompt 3 & 13)
       ======================================================================== */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], header[id]');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
    const mobileDrawerClose = document.getElementById('mobile-drawer-close');
    const mobileDrawerLinks = document.querySelectorAll('.mobile-drawer-link');

    // Mobile Drawer Open / Close
    if (mobileNavToggle && mobileMenuDrawer) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            mobileMenuDrawer.classList.toggle('open');
        });
    }

    if (mobileDrawerClose && mobileMenuDrawer) {
        mobileDrawerClose.addEventListener('click', () => {
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileMenuDrawer.classList.remove('open');
        });
    }

    mobileDrawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuDrawer) {
                mobileMenuDrawer.classList.remove('open');
                if (mobileNavToggle) mobileNavToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ScrollSpy to highlight active link in vertical navbar
    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavOnScroll);
    updateActiveNavOnScroll();


    /* ========================================================================
       4. SKILLS FILTER & PROGRESS BARS ANIMATION (Prompt 5)
       ======================================================================== */
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');
    const skillProgressBars = document.querySelectorAll('.skill-progress-fill');

    // Filter Skills by category
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 200);
                }
            });
        });
    });

    // Animate progress bars when skills section is in view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        let skillsAnimated = false;
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    skillProgressBars.forEach(bar => {
                        const targetWidth = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 100);
                    });
                    skillsAnimated = true;
                }
            });
        }, { threshold: 0.2 });

        skillsObserver.observe(skillsSection);
    }


    /* ========================================================================
       5. PROJECTS MODAL DIALOG CONTROLLER (Prompt 7)
       Clickable thumbnails connected to comprehensive project specs
       ======================================================================== */
    const projectModal = document.getElementById('project-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCloseBtnBottom = document.getElementById('modal-close-btn-bottom');
    
    // Modal fields
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-project-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTechStack = document.getElementById('modal-tech-stack');
    const modalHighlights = document.getElementById('modal-highlights');
    const modalGithubLink = document.getElementById('modal-github-link');
    const modalIcon = document.getElementById('modal-icon');

    // Projects Database
    const projectsData = {
        'project-1': {
            title: "Arduino & Stress Detection Using AI",
            category: "EMBEDDED AI • FLAGSHIP PROJECT",
            icon: "fa-heart-pulse",
            description: "Developed as a flagship engineering initiative, this project integrates Arduino microcontroller hardware with an Artificial Intelligence classification model. By interfacing sensitive biometric sensors (such as Pulse / Photoplethysmography and Galvanic Skin Response), the system captures physiological variations and runs algorithmic stress classification to identify real-time mental and physical stress states.",
            techStack: ["Arduino IDE", "Microcontrollers (ATmega328P)", "Pulse & GSR Sensors", "AI / Pattern Recognition", "Embedded C/C++", "Serial Telemetry"],
            highlights: [
                "Acquired real-time physiological pulse rate and skin conductance data.",
                "Implemented signal conditioning and noise suppression on analog inputs.",
                "Formulated an AI-based threshold & classification algorithm to distinguish relaxed vs. stressed states.",
                "Created responsive visual feedback alerts for immediate condition assessment."
            ],
            githubUrl: "https://github.com/d85891783-source"
        },
        'project-2': {
            title: "Smart IoT Environmental & Health Sentinel",
            category: "EMBEDDED SYSTEMS & IOT",
            icon: "fa-tower-broadcast",
            description: "A continuous telemetry and safety monitoring unit designed to evaluate environmental factors affecting human wellness. Captures ambient temperature, humidity, air quality parameters, and user vital statistics, providing multi-tiered alerts when safety thresholds are exceeded.",
            techStack: ["Microcontroller Circuitry", "IoT Sensors", "C Programming", "Hardware Interfacing", "Buzzer / OLED Displays"],
            highlights: [
                "Interfaced multi-sensor modules with minimal bus contention.",
                "Programmed interrupt-driven monitoring routines for energy efficiency.",
                "Engineered automated safety alarms and visual OLED readouts for rapid triage."
            ],
            githubUrl: "https://github.com/d85891783-source"
        },
        'project-3': {
            title: "C Low-Level Algorithmic Engine & Utilities",
            category: "SYSTEMS & ALGORITHMS",
            icon: "fa-microchip",
            description: "A modular, highly optimized collection of fundamental data structures, memory utilities, and algorithmic procedures written in pure ISO C. Emphasizes strict memory safety, zero memory leaks, pointer arithmetic precision, and high computational efficiency.",
            techStack: ["C Language (C99/C11)", "GDB Debugger", "Valgrind", "Memory Management", "Data Structures"],
            highlights: [
                "Built custom dynamic arrays, linked lists, hash tables, and priority queues from scratch.",
                "Employed pointer arithmetic and bitwise operations to minimize clock cycle overhead.",
                "Demonstrated rigorous bounds checking, defensive programming, and algorithmic problem-solving."
            ],
            githubUrl: "https://github.com/d85891783-source"
        },
        'project-4': {
            title: "Cyber-Pixel Engineering Portfolio & AI Bot",
            category: "FULL-STACK & UI/UX",
            icon: "fa-gamepad",
            description: "The complete interactive developer portfolio you are experiencing right now! Designed from scratch with custom 8-bit / cyber-pixel aesthetic, embedded self-introduction video player, responsive layout, dark/light theme engine, and a simulated conversational AI persona representing Deeksha R.",
            techStack: ["HTML5 Semantic Skeleton", "CSS3 Custom Variables & Grid", "Vanilla JavaScript ES6+", "Font Awesome", "LocalStorage API"],
            highlights: [
                "Engineered 100% accessible and responsive vertical navbar with desktop tooltips and mobile drawer.",
                "Integrated retro CRT bezel video player for uploaded self-introduction video.",
                "Implemented simulated AI chatbot trained on resume facts with instant suggestions."
            ],
            githubUrl: "https://github.com/d85891783-source"
        }
    };

    function openModal(projectId) {
        const data = projectsData[projectId];
        if (!data) return;

        modalCategory.textContent = data.category;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalGithubLink.href = data.githubUrl;

        // Update icon
        if (modalIcon) {
            modalIcon.className = `fa-solid ${data.icon} modal-large-icon`;
        }

        // Render Tech Stack Tags
        modalTechStack.innerHTML = '';
        data.techStack.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'modal-tech-tag';
            span.textContent = tech;
            modalTechStack.appendChild(span);
        });

        // Render Highlights
        modalHighlights.innerHTML = '';
        data.highlights.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalHighlights.appendChild(li);
        });

        projectModal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        projectModal.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }

    // Attach click listeners to all project cards & buttons
    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projId = btn.getAttribute('data-project');
            openModal(projId);
        });
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projId = card.getAttribute('data-project');
            openModal(projId);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalCloseBtnBottom) modalCloseBtnBottom.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // ESC key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !projectModal.hasAttribute('hidden')) {
            closeModal();
        }
    });


    /* ========================================================================
       6. EMBEDDED VIDEO CONTROLLER (Prompt 8 & Uploaded Video)
       Plays uploaded video 'deeksh r in video.mp4' smoothly
       ======================================================================== */
    const portfolioVideo = document.getElementById('portfolio-video');
    const restartVideoBtn = document.getElementById('restart-video-btn');

    if (restartVideoBtn && portfolioVideo) {
        restartVideoBtn.addEventListener('click', () => {
            portfolioVideo.currentTime = 0;
            portfolioVideo.play();
        });
    }


    /* ========================================================================
       7. AI CHAT INTERFACE INTEGRATION (Prompt 10)
       Simulated AI Persona of Deeksha R with API expansion point
       ======================================================================== */
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-user-input');
    const chatMessages = document.getElementById('chat-messages');
    const clearChatBtn = document.getElementById('clear-chat-btn');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    // Knowledge Base responses based on Deeksha's actual resume
    const knowledgeBase = [
        {
            keywords: ['project', 'stress', 'arduino', 'ai', 'detection'],
            reply: "In my flagship project, <strong>'Arduino and Stress Detection using AI'</strong>, I combined an Arduino microcontroller with biometric sensors and Artificial Intelligence algorithms to monitor real-time physiological indicators and classify human stress levels."
        },
        {
            keywords: ['eshwar', 'technologies', 'experience', 'intern', 'work', 'worker', 'job'],
            reply: "I spent <strong>6 months at Eshwar Technologies</strong> supporting day-to-day technical and operational activities. This gave me invaluable industry discipline, operational troubleshooting experience, and hands-on exposure to practical technical workflows."
        },
        {
            keywords: ['education', 'college', 'polytechnic', 'belur', 'gpt', 'cgpa', 'degree', 'diploma'],
            reply: "I pursued my <strong>Diploma in Engineering at Government Polytechnic, Belur (GPT Belur)</strong> from 2023 to 2026, graduating with a strong cumulative <strong>CGPA of 7.16</strong> in Belur, Karnataka."
        },
        {
            keywords: ['skills', 'skill', 'programming', 'c', 'language', 'technologies', 'stack'],
            reply: "My core technical competencies include <strong>C Programming</strong>, <strong>Arduino & Embedded Microcontrollers</strong>, <strong>Sensors & Hardware Interfacing</strong>, <strong>Artificial Intelligence / Stress Analytics</strong>, <strong>Web Development (HTML5/CSS3/JS)</strong>, and <strong>Git/GitHub</strong>."
        },
        {
            keywords: ['contact', 'email', 'phone', 'hire', 'reach', 'number', 'call'],
            reply: "You can reach me directly via email at <strong><a href='mailto:d85891783@gmail.com'>d85891783@gmail.com</a></strong>, phone/WhatsApp at <strong><a href='tel:8971766065'>+91 8971766065</a></strong>, or connect with me on <strong><a href='https://www.linkedin.com/in/deeksha-r-073388440' target='_blank'>LinkedIn</a></strong>!"
        },
        {
            keywords: ['resume', 'cv', 'pdf', 'download'],
            reply: "You can download my verified resume directly by clicking here: <a href='Deeksha_resume.pdf' target='_blank' class='pixel-btn small primary' style='margin-top:6px; display:inline-block;'><i class='fa-solid fa-file-pdf'></i> Download Deeksha's Resume</a>"
        },
        {
            keywords: ['hello', 'hi', 'hey', 'greetings', 'who are you'],
            reply: "Hello there! I'm Deeksha's AI Twin. I can answer questions regarding Deeksha's C programming background, Arduino AI stress project, 6 months at Eshwar Tech, or GPT Belur education. What would you like to explore?"
        }
    ];

    function appendMessage(sender, htmlContent) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;

        const avatar = document.createElement('div');
        avatar.className = 'msg-avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';

        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';

        const p = document.createElement('p');
        p.innerHTML = htmlContent;

        const time = document.createElement('span');
        time.className = 'msg-time';
        time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        bubble.appendChild(p);
        bubble.appendChild(time);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(bubble);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator-item';
        typingDiv.innerHTML = `
            <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="msg-bubble">
                <div class="typing-dots">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }

    /**
     * Generate Bot Response
     * NOTE: This is where you can connect an external AI API!
     * ------------------------------------------------------------------------
     * TO INTEGRATE AN EXTERNAL API (e.g., OpenAI / Gemini / Resend):
     * Replace or augment this function with an async fetch:
     * 
     * async function fetchAIResponse(userText) {
     *   const res = await fetch("https://api.openai.com/v1/chat/completions", {
     *     method: "POST",
     *     headers: {
     *       "Content-Type": "application/json",
     *       "Authorization": `Bearer YOUR_API_KEY`
     *     },
     *     body: JSON.stringify({
     *       model: "gpt-4o-mini",
     *       messages: [
     *         { role: "system", content: "You are Deeksha R, software engineer from GPT Belur..." },
     *         { role: "user", content: userText }
     *       ]
     *     })
     *   });
     *   const data = await res.json();
     *   return data.choices[0].message.content;
     * }
     * ------------------------------------------------------------------------
     */
    function processUserMessage(rawText) {
        const text = rawText.trim();
        if (!text) return;

        // Append user query
        appendMessage('user', text);
        chatInput.value = '';

        // Show typing indicator
        const typingItem = showTypingIndicator();

        setTimeout(() => {
            typingItem.remove();

            const lower = text.toLowerCase();
            let matchedReply = null;

            for (const item of knowledgeBase) {
                if (item.keywords.some(kw => lower.includes(kw))) {
                    matchedReply = item.reply;
                    break;
                }
            }

            if (!matchedReply) {
                matchedReply = `Thank you for your question! As Deeksha's AI assistant, I can confirm she is actively seeking Software & Embedded Engineering roles. Feel free to reach out directly at <strong><a href="mailto:d85891783@gmail.com">d85891783@gmail.com</a></strong> or inspect her projects above!`;
            }

            appendMessage('bot', matchedReply);
        }, 650);
    }

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            processUserMessage(chatInput.value);
        });
    }

    // Quick suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt');
            processUserMessage(prompt);
        });
    });

    // Clear chat
    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', () => {
            chatMessages.innerHTML = `
                <div class="message bot-message">
                    <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                    <div class="msg-bubble">
                        <p>Chat memory refreshed! Ask me anything about Deeksha's skills, projects, or experience.</p>
                        <span class="msg-time">Just now</span>
                    </div>
                </div>
            `;
        });
    }


    /* ========================================================================
       8. CONTACT FORM VALIDATION & DISPATCH (Prompt 11)
       Includes integration comments for Resend API / Formspree / EmailJS
       ======================================================================== */
    const contactForm = document.getElementById('contact-form');
    const contactSubmitBtn = document.getElementById('contact-submit-btn');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Clear previous errors
            document.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('has-error'));
            formFeedback.className = 'form-feedback-box';
            formFeedback.style.display = 'none';

            // Extract input values
            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const subjectInput = document.getElementById('contact-subject');
            const messageInput = document.getElementById('contact-message');

            let isValid = true;

            // Name check
            if (!nameInput.value.trim()) {
                nameInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            // Email regex check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            // Message check
            if (!messageInput.value.trim()) {
                messageInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            // Toggle loading state on button
            const btnText = contactSubmitBtn.querySelector('.btn-text');
            const btnLoading = contactSubmitBtn.querySelector('.btn-loading');
            contactSubmitBtn.disabled = true;
            if (btnText) btnText.classList.add('d-none');
            if (btnLoading) btnLoading.classList.remove('d-none');

            /**
             * ----------------------------------------------------------------
             * EMAIL SERVICE API INTEGRATION HOOK (Prompt 11 requirement):
             * You can plug in Resend API, Formspree, or EmailJS here:
             * 
             * Example with Resend API via Serverless Endpoint:
             * await fetch('/api/send-email', {
             *   method: 'POST',
             *   headers: { 'Content-Type': 'application/json' },
             *   body: JSON.stringify({
             *     name: nameInput.value,
             *     email: emailInput.value,
             *     subject: subjectInput.value,
             *     message: messageInput.value
             *   })
             * });
             * ----------------------------------------------------------------
             */

            // Simulate network latency for confirmation UX
            setTimeout(() => {
                contactSubmitBtn.disabled = false;
                if (btnText) btnText.classList.remove('d-none');
                if (btnLoading) btnLoading.classList.add('d-none');

                // Show confirmation message
                formFeedback.className = 'form-feedback-box success';
                formFeedback.innerHTML = `
                    <strong><i class="fa-solid fa-circle-check"></i> Message Transmitted Successfully!</strong><br>
                    Thank you <em>${escapeHtml(nameInput.value.trim())}</em>. Your message has been routed to Deeksha R (d85891783@gmail.com). You will receive a response shortly.
                `;

                contactForm.reset();
            }, 900);
        });
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }


    /* ========================================================================
       9. BACK TO TOP BUTTON
       ======================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
