// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll animation for service cards
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Initialize RTL support
document.documentElement.setAttribute('dir', 'rtl');

// Add Arabic font
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap';
document.head.appendChild(link);

// Add Arabic styles
const arabicStyles = document.createElement('link');
arabicStyles.rel = 'stylesheet';
arabicStyles.href = 'arabic-styles.css';
document.head.appendChild(arabicStyles);

// Language switching functionality
function initializeLanguageSwitch() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language') || 'ar';
    changeLang(savedLang);
    
    langButtons.forEach(btn => {
        if (btn.dataset.lang === savedLang) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            changeLang(lang);
            localStorage.setItem('preferred-language', lang);
        });
    });
}

function changeLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Add transition class
    document.body.classList.add('lang-transition');
    
    // Apply translations
    Object.entries(translations[lang]).forEach(([key, value]) => {
        const elements = document.querySelectorAll(`[data-trans="${key}"]`);
        elements.forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = value;
            } else {
                el.textContent = value;
            }
        });
    });
    
    // Remove transition class after animation
    setTimeout(() => {
        document.body.classList.remove('lang-transition');
    }, 300);
}

// تحسينات التحريك للنصوص العربية
function initializeArabicAnimations() {
    const textElements = document.querySelectorAll('[dir="rtl"] .hero-content h1, [dir="rtl"] .hero-content p');
    textElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(30px)';
    });

    setTimeout(() => {
        textElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }, 300);
}

// تحسينات حركة البطاقات
function enhanceCardAnimations() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        const title = card.querySelector('h3');
        const features = card.querySelectorAll('.features-list li');

        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-10px) rotateY(360deg)';
            title.style.transform = 'translateY(-5px)';
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(0)';
                    feature.style.opacity = '1';
                }, index * 100);
            });
        });

        card.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            title.style.transform = '';
        });
    });
}

// تحسين معالجة الأرقام العربية
function handleArabicNumbers() {
    const numericElements = document.querySelectorAll('[dir="rtl"] .contact-info p');
    numericElements.forEach(el => {
        el.style.fontFeatureSettings = '"ss01"';
        el.style.fontVariantNumeric = 'tabular-nums';
    });
}

// تحسين تأثيرات التمرير
function enhanceScrollEffects() {
    let lastScroll = 0;
    const header = document.querySelector('header');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // تأثير رأس الصفحة
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;

        // إخفاء مؤشر التمرير
        if (currentScroll > 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// تحسين نموذج الاتصال
function enhanceContactForm() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// التحقق من صحة النموذج بالعربية
function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    const messages = {
        required: 'هذا الحقل مطلوب',
        email: 'يرجى إدخال بريد إلكتروني صحيح',
        phone: 'يرجى إدخال رقم هاتف صحيح',
        minLength: 'يجب أن يحتوي على الأقل {min} حروف'
    };

    const showError = (input, message) => {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
        formGroup.classList.add('has-error');
        input.setAttribute('aria-invalid', 'true');
        isValid = false;
    };

    const removeError = (input) => {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        formGroup.classList.remove('has-error');
        input.setAttribute('aria-invalid', 'false');
    };

    inputs.forEach(input => {
        removeError(input);

        if (input.hasAttribute('required') && !input.value.trim()) {
            showError(input, messages.required);
        } else if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showError(input, messages.email);
            }
        } else if (input.id === 'phone' && input.value) {
            const phoneRegex = /^[+]?[\d\s-]{8,}$/;
            if (!phoneRegex.test(input.value)) {
                showError(input, messages.phone);
            }
        }

        if (input.tagName === 'TEXTAREA' && input.value.length < 10) {
            showError(input, messages.minLength.replace('{min}', '10'));
        }
    });

    return isValid;
}

// معالجة تقديم النموذج مع الرسوم المتحركة
function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    if (!validateForm()) {
        return;
    }

    // تحريك زر الإرسال
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> جاري الإرسال...';

    // محاكاة الإرسال
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح';
        submitBtn.classList.add('success');
        form.reset();

        // إعادة الزر إلى حالته الأصلية
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('success');
        }, 3000);
    }, 2000);
}

// تحسين التمرير السلس
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// تحسين تجربة النموذج
function enhanceFormExperience() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        // إضافة تأثيرات التركيز
        input.addEventListener('focus', () => {
            input.closest('.form-group').classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.closest('.form-group').classList.remove('focused');
            }
        });

        // التحقق المباشر
        input.addEventListener('input', () => {
            if (input.value) {
                removeError(input);
            }
        });
    });

    form.addEventListener('submit', handleFormSubmit);
}

// تحسينات معرض الصور والعرض المكبر
function initializeGallery() {
    const gallery = document.querySelector('.gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';
    let isAnimating = false;

    // Setup Lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-close"><i class="fas fa-times"></i></div>
        <img src="" alt="">
        <div class="lightbox-nav">
            <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Lazy load images
    const images = document.querySelectorAll('.gallery-item img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => {
                    img.classList.add('loaded');
                    img.parentElement.classList.add('show');
                };
                imageObserver.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    images.forEach(img => imageObserver.observe(img));

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isAnimating || btn.classList.contains('active')) return;
            isAnimating = true;

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            currentFilter = filter;

            const items = document.querySelectorAll('.gallery-item');
            let delay = 0;

            items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    setTimeout(() => {
                        item.style.display = 'block';
                        requestAnimationFrame(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1) translateY(0)';
                        });
                    }, delay);
                    delay += 100;
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9) translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            setTimeout(() => {
                isAnimating = false;
            }, delay + 300);
        });
    });

    // Lightbox functionality
    let currentImageIndex = 0;
    const lightboxImg = lightbox.querySelector('img');
    const prevBtn = lightbox.querySelector('.prev-btn');
    const nextBtn = lightbox.querySelector('.next-btn');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    function showImage(index) {
        const visibleImages = Array.from(images).filter(img => 
            img.parentElement.style.display !== 'none'
        );
        currentImageIndex = index;
        
        const img = visibleImages[index];
        lightboxImg.src = img.dataset.src || img.src;
        lightboxImg.alt = img.alt;

        // Update navigation buttons
        prevBtn.style.display = index > 0 ? 'block' : 'none';
        nextBtn.style.display = index < visibleImages.length - 1 ? 'block' : 'none';
    }

    gallery.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (!galleryItem) return;

        const visibleImages = Array.from(images).filter(img => 
            img.parentElement.style.display !== 'none'
        );
        const clickedIndex = visibleImages.indexOf(galleryItem.querySelector('img'));
        
        showImage(clickedIndex);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    prevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            showImage(currentImageIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        const visibleImages = Array.from(images).filter(img => 
            img.parentElement.style.display !== 'none'
        );
        if (currentImageIndex < visibleImages.length - 1) {
            showImage(currentImageIndex + 1);
        }
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle keyboard navigation in lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
            showImage(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
            const visibleImages = Array.from(images).filter(img => 
                img.parentElement.style.display !== 'none'
            );
            if (currentImageIndex < visibleImages.length - 1) {
                showImage(currentImageIndex + 1);
            }
        }
    });

    // Initial filter
    document.querySelector('.filter-btn[data-filter="all"]').click();
}

// تحسين أداء الصور
function optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // دعم المتصفحات القديمة
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
}

// تحسين التمرير للمعرض
function enhanceGalleryScroll() {
    const gallerySection = document.querySelector('#gallery');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    galleryItems.forEach(item => observer.observe(item));
}

// تحسين النموذج والتحقق من صحته
class ContactForm {
    constructor(formSelector = '#contactForm') {
        this.form = document.querySelector(formSelector);
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.inputs = this.form.querySelectorAll('input, textarea');
        
        this.validationMessages = {
            required: 'هذا الحقل مطلوب',
            email: 'يرجى إدخال بريد إلكتروني صحيح',
            phone: 'يرجى إدخال رقم هاتف صحيح (10 أرقام على الأقل)',
            minLength: (min) => `يجب أن يحتوي النص على ${min} حروف على الأقل`
        };

        this.setupEventListeners();
        this.setupFloatingLabels();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.inputs.forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('focus', () => this.handleFocus(input));
        });
    }

    setupFloatingLabels() {
        this.inputs.forEach(input => {
            const wrapper = input.parentElement;
            const label = wrapper.querySelector('label');
            if (label) {
                input.addEventListener('focus', () => wrapper.classList.add('focused'));
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        wrapper.classList.remove('focused');
                    }
                });
            }
        });
    }

    validateField(input) {
        const wrapper = input.parentElement;
        const errorElement = wrapper.querySelector('.error-message') || 
                           document.createElement('div');
        errorElement.className = 'error-message';

        let isValid = true;
        let errorMessage = '';

        // التحقق من الحقول المطلوبة
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            errorMessage = this.validationMessages.required;
        }
        // التحقق من البريد الإلكتروني
        else if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                errorMessage = this.validationMessages.email;
            }
        }
        // التحقق من رقم الهاتف
        else if (input.id === 'phone' && input.value) {
            const phoneRegex = /^[+]?[\d\s-]{10,}$/;
            if (!phoneRegex.test(input.value)) {
                isValid = false;
                errorMessage = this.validationMessages.phone;
            }
        }
        // التحقق من الحد الأدنى للنص
        else if (input.tagName === 'TEXTAREA' && input.value.length < 10) {
            isValid = false;
            errorMessage = this.validationMessages.minLength(10);
        }

        if (!isValid) {
            errorElement.textContent = errorMessage;
            wrapper.appendChild(errorElement);
            wrapper.classList.add('has-error');
            input.setAttribute('aria-invalid', 'true');
        } else {
            wrapper.classList.remove('has-error');
            input.setAttribute('aria-invalid', 'false');
            const existingError = wrapper.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        }

        return isValid;
    }

    validateAll() {
        let isValid = true;
        this.inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        return isValid;
    }

    handleFocus(input) {
        const wrapper = input.parentElement;
        wrapper.classList.add('focused');
        
        // إضافة تأثير الموجة
        const ripple = document.createElement('div');
        ripple.className = 'form-ripple';
        wrapper.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1000);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateAll()) {
            return;
        }

        this.submitButton.disabled = true;
        const originalText = this.submitButton.innerHTML;
        this.submitButton.innerHTML = '<span class="loading"></span> جاري الإرسال...';

        try {
            // محاكاة إرسال النموذج
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.submitButton.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح';
            this.submitButton.classList.add('success');
            this.form.reset();

            // إعادة الزر لحالته الأصلية
            setTimeout(() => {
                this.submitButton.innerHTML = originalText;
                this.submitButton.disabled = false;
                this.submitButton.classList.remove('success');
            }, 3000);

        } catch (error) {
            this.submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> حدث خطأ';
            this.submitButton.classList.add('error');
            
            setTimeout(() => {
                this.submitButton.innerHTML = originalText;
                this.submitButton.disabled = false;
                this.submitButton.classList.remove('error');
            }, 3000);
        }
    }
}

// تحسينات القائمة المتنقلة والتمرير
class Navigation {
    constructor() {
        this.header = document.querySelector('header');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.scrollProgress = document.createElement('div');
        this.scrollToTop = document.createElement('div');
        
        this.lastScroll = 0;
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupScrollProgress();
        this.setupScrollToTop();
        this.setupNavLinks();
        this.handleScroll();
    }
    
    setupMobileMenu() {
        this.mobileMenuBtn.addEventListener('click', () => {
            this.isMenuOpen = !this.isMenuOpen;
            this.mobileMenuBtn.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.navMenu.contains(e.target) && 
                !this.mobileMenuBtn.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    closeMenu() {
        this.isMenuOpen = false;
        this.mobileMenuBtn.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    setupScrollProgress() {
        this.scrollProgress.className = 'scroll-progress';
        this.scrollProgress.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(this.scrollProgress);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (winScroll / height) * 100;
            this.scrollProgress.querySelector('.scroll-progress-bar').style.width = `${scrolled}%`;
        });
    }
    
    setupScrollToTop() {
        this.scrollToTop.className = 'scroll-to-top';
        this.scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(this.scrollToTop);
        
        this.scrollToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    setupNavLinks() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                    if (this.isMenuOpen) {
                        this.closeMenu();
                    }
                    
                    // إضافة تأثير النقر
                    const ripple = document.createElement('div');
                    ripple.className = 'ripple';
                    link.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                    
                    // التمرير بنعومة إلى القسم المطلوب
                    const headerOffset = 100;
                    const elementPosition = targetSection.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    handleScroll() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // إظهار/إخفاء زر العودة للأعلى
            if (currentScroll > 300) {
                this.scrollToTop.classList.add('visible');
            } else {
                this.scrollToTop.classList.remove('visible');
            }
            
            // إخفاء/إظهار الهيدر عند التمرير
            if (currentScroll > this.lastScroll && currentScroll > 100) {
                this.header.style.transform = 'translateY(-100%)';
            } else {
                this.header.style.transform = 'translateY(0)';
            }
            
            // تحديث الرابط النشط في القائمة
            this.updateActiveNavLink();
            
            this.lastScroll = currentScroll;
        });
    }
    
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            const currentScroll = window.pageYOffset;
            
            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                const targetId = `#${section.id}`;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === targetId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// تحسين تحميل الصور وتبديل اللغات
class ImageOptimizer {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }

    init() {
        if ('loading' in HTMLImageElement.prototype) {
            this.setupNativeLazyLoading();
        } else {
            this.setupIntersectionObserver();
        }
        this.setupImageEffects();
    }

    setupNativeLazyLoading() {
        this.images.forEach(img => {
            const wrapper = document.createElement('div');
            wrapper.className = 'image-placeholder';
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);

            img.onload = () => {
                wrapper.classList.add('loaded');
                this.addLoadEffect(img);
            };
        });
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        }, options);

        this.images.forEach(img => observer.observe(img));
    }

    setupImageEffects() {
        this.images.forEach(img => {
            img.addEventListener('mouseenter', () => this.addHoverEffect(img));
            img.addEventListener('mouseleave', () => this.removeHoverEffect(img));
        });
    }

    addLoadEffect(img) {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        
        requestAnimationFrame(() => {
            img.style.transition = 'all 0.5s ease';
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        });
    }

    addHoverEffect(img) {
        if (img.parentElement.classList.contains('gallery-item')) {
            img.style.transform = 'scale(1.1) translateZ(20px)';
        }
    }

    removeHoverEffect(img) {
        if (img.parentElement.classList.contains('gallery-item')) {
            img.style.transform = 'scale(1) translateZ(0)';
        }
    }
}

class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('preferred-language') || 'ar';
        this.contentElements = document.querySelectorAll('[data-trans]');
        this.init();
    }

    init() {
        this.setupLanguageButtons();
        this.applyLanguage(this.currentLang);
        this.setupTransitionEffects();
    }

    setupLanguageButtons() {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {
                const newLang = btn.dataset.lang;
                if (newLang !== this.currentLang) {
                    this.switchLanguage(newLang);
                    buttons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
            });
        });
    }

    async switchLanguage(newLang) {
        // إضافة تأثير الانتقال
        document.body.classList.add('language-transition');
        
        // تأخير قصير للسماح بتأثير الانتقال
        await new Promise(resolve => setTimeout(resolve, 300));
        
        this.applyLanguage(newLang);
        
        // حفظ تفضيل اللغة
        localStorage.setItem('preferred-language', newLang);
        this.currentLang = newLang;
        
        // إزالة تأثير الانتقال
        setTimeout(() => {
            document.body.classList.remove('language-transition');
        }, 300);
    }

    applyLanguage(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        this.contentElements.forEach(element => {
            const key = element.dataset.trans;
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    }

    setupTransitionEffects() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .gallery-item, .contact-form');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.8;
            
            if (elementTop < triggerPoint) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Gallery filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('show'), 0);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll to top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add form animation
            const button = contactForm.querySelector('button');
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح';
                button.classList.add('success');
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    button.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال الرسالة';
                    button.classList.remove('success');
                }, 3000);
            }, 1500);
        });
    }

    // Hero parallax effect
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });

    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Create floating particles
    function createParticles() {
        const heroSection = document.querySelector('.hero');
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;
            particle.style.opacity = Math.random();
            particlesContainer.appendChild(particle);
        }
        
        heroSection.appendChild(particlesContainer);
    }

    // Initialize particles
    createParticles();

    // Enhanced 3D tilt effect for all items
    function initializeTiltEffects() {
        const items = document.querySelectorAll('.gallery-item, .service-card');
        items.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;
                
                item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // Initialize tilt effects
    initializeTiltEffects();

    // Add glass morphism effect to forms on focus
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.closest('.form-group').classList.add('glass-card');
        });
        
        input.addEventListener('blur', () => {
            input.closest('.form-group').classList.remove('glass-card');
        });
    });

    // Enhanced scroll-to-top button with smooth fade
    const scrollToTop = document.querySelector('.scroll-to-top');
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.pageYOffset > 300) {
                    scrollToTop.classList.add('show');
                    scrollToTop.style.transform = 'translateY(0)';
                } else {
                    scrollToTop.style.transform = 'translateY(100px)';
                    scrollToTop.classList.remove('show');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Add glow effects
    function initializeGlowEffects() {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('glow');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('glow');
            });
        });
    }

    // Initialize glow effects
    initializeGlowEffects();

    // Initialize language switch
    initializeLanguageSwitch();

    // Add smooth transition for layout changes
    document.body.classList.add('transitions-enabled');

    // تهيئة جميع التحسينات
    initializeArabicAnimations();
    enhanceCardAnimations();
    handleArabicNumbers();
    enhanceScrollEffects();
    enhanceContactForm();

    // تهيئة جميع الوظائف
    initializeSmoothScroll();
    enhanceFormExperience();
    initializeGallery();
    optimizeImages();
    enhanceGalleryScroll();

    // تهيئة النموذج عند تحميل الصفحة
    new ContactForm();

    // تهيئة التنقل عند تحميل الصفحة
    new Navigation();

    // تهيئة المكونات عند تحميل الصفحة
    new ImageOptimizer();
    new LanguageSwitcher();
    
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Initialize language from localStorage or default to Arabic
    const savedLang = localStorage.getItem('preferred-language') || 'ar';
    changeLang(savedLang);
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            changeLang(lang);
            
            // Update active state of buttons
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Save preference
            localStorage.setItem('preferred-language', lang);
        });
    });

    function changeLang(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = translations[lang]['hero-subtitle'];
        }
        
        // Update text content
        Object.entries(translations[lang]).forEach(([key, value]) => {
            const elements = document.querySelectorAll(`[data-trans="${key}"]`);
            elements.forEach(el => {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = value;
                } else {
                    el.textContent = value;
                }
            });
        });
        
        // Update placeholders
        document.querySelectorAll('[data-trans-placeholder]').forEach(el => {
            const key = el.dataset.transPlaceholder;
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
        
        // Add transition class
        document.body.classList.add('lang-transition');
        setTimeout(() => {
            document.body.classList.remove('lang-transition');
        }, 500);
    }
});

// Scroll animation
const scrollElements = document.querySelectorAll('.scroll-reveal');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('visible');
};

const hideScrollElement = (element) => {
    element.classList.remove('visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initialize scroll animations
handleScrollAnimation();

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form handling
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    try {
        submitButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span data-trans="sending">${translations[document.documentElement.lang]['sending']}</span>`;
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success
        submitButton.innerHTML = `<i class="fas fa-check"></i> <span data-trans="sent">${translations[document.documentElement.lang]['sent']}</span>`;
        submitButton.classList.add('success');
        contactForm.reset();
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.classList.remove('success');
            submitButton.disabled = false;
        }, 3000);
        
    } catch (error) {
        submitButton.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${translations[document.documentElement.lang]['error']}`;
        submitButton.classList.add('error');
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.classList.remove('error');
            submitButton.disabled = false;
        }, 3000);
    }
});
