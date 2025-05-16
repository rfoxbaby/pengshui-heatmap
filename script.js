// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize basic title animation
    initTitleAnimation();
    
    // Add loaded class to hero for entrance animation
    setTimeout(() => {
        document.querySelector('.hero').classList.add('loaded');
    }, 300);

    // Initialize custom cursor
    initCursor();

    // Initialize scroll reveal animations
    initScrollReveal();

    // Handle navbar scroll state
    handleNavScroll();
    
    // Add tilt effect to artifacts and pillars
    initTiltEffect();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize lightbox for pillar images
    initLightbox();
    
    // Add numbers to pillars
    addPillarNumbers();
    
    // 添加全景图片点击事件
    initPanoramaClick();
    
    // 添加介绍部分滚动互动效果
    initIntroScrollEffects();
});

// Simple title animation
function initTitleAnimation() {
    const heroSection = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero h1');
    const subtitle = document.querySelector('.hero .subtitle');
    
    if (!heroTitle || !subtitle || !heroSection) return;
    
    // Basic fade-in animation
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    heroTitle.style.transition = 'opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1), transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)';
    
    // Subtitle animation
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translateY(20px)';
    subtitle.style.transition = 'opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.5s, transform 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.5s';
    
    // Trigger basic animation
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
    }, 100);
    
    // Basic hover effects
    heroTitle.addEventListener('mouseover', function() {
        this.style.textShadow = '0 0 30px rgba(255, 215, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.4)';
        this.style.transform = 'translateY(-5px) scale(1.03)';
    });
    
    heroTitle.addEventListener('mouseout', function() {
        this.style.textShadow = '0 0 20px rgba(212, 170, 55, 0.3)';
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Subtitle hover effects
    subtitle.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    subtitle.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
    });
}

// Custom cursor glow effect
function initCursor() {
    // 创建光晕效果
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-glow');
    document.body.appendChild(cursor);
    
    // 创建鼠标指针点
    const cursorDot = document.createElement('div');
    cursorDot.style.position = 'fixed';
    cursorDot.style.width = '8px';
    cursorDot.style.height = '8px';
    cursorDot.style.backgroundColor = '#d4aa37';
    cursorDot.style.borderRadius = '50%';
    cursorDot.style.pointerEvents = 'none';
    cursorDot.style.zIndex = '10000';
    cursorDot.style.boxShadow = '0 0 5px #d4aa37';
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    // 立即设置初始位置以避免闪烁
    cursorX = mouseX = window.innerWidth / 2;
    cursorY = mouseY = window.innerHeight / 2;
    
    // Track mouse position with smoother animation
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 直接更新鼠标点的位置
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    // Handle cursor size change for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .pillar, .artifact, .sunbird, .level, .masks, .tree-top, .birds-jade, .close-lightbox');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transition = 'width 0.4s cubic-bezier(0.075, 0.82, 0.165, 1), height 0.4s cubic-bezier(0.075, 0.82, 0.165, 1), opacity 0.4s cubic-bezier(0.075, 0.82, 0.165, 1)';
            cursorDot.style.width = '10px';
            cursorDot.style.height = '10px';
            cursorDot.style.backgroundColor = '#ffd700';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transition = 'width 0.4s cubic-bezier(0.075, 0.82, 0.165, 1), height 0.4s cubic-bezier(0.075, 0.82, 0.165, 1), opacity 0.4s cubic-bezier(0.075, 0.82, 0.165, 1)';
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
            cursorDot.style.backgroundColor = '#d4aa37';
        });
    });
    
    // Smooth cursor movement with easing
    function updateCursorPosition() {
        const easing = 0.15;
        
        // 计算光晕当前位置与鼠标位置的距离
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        // 应用缓动效果使移动更平滑
        cursorX += dx * easing;
        cursorY += dy * easing;
        
        // 更新光晕位置
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        // 继续动画
        requestAnimationFrame(updateCursorPosition);
    }
    
    // Start the animation
    updateCursorPosition();

    // Hide cursor when leaving window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        }
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

// Handle navbar appearance on scroll
function handleNavScroll() {
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll reveal animations with IntersectionObserver
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    const pillars = document.querySelectorAll('.pillar');
    const levels = document.querySelectorAll('.level');
    const artifacts = document.querySelectorAll('.artifact');
    
    // Options for the observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    // Observe sections for scroll animation
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Observe pillars with staggered animation
    const pillarObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Set a staggered delay
                entry.target.style.setProperty('--index', index);
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 100 * index);
                pillarObserver.unobserve(entry.target);
            }
        });
    }, { ...observerOptions, threshold: 0.1 });
    
    pillars.forEach((pillar, index) => {
        pillarObserver.observe(pillar);
    });
    
    // Observe staircase levels with emphasis on movement
    const levelObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.setProperty('--index', index);
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 200 * index);
                levelObserver.unobserve(entry.target);
            }
        });
    }, { ...observerOptions, threshold: 0.2 });
    
    levels.forEach((level, index) => {
        levelObserver.observe(level);
    });
    
    // Observe artifacts with staggered animation
    const artifactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.setProperty('--index', index % 3); // Create a ripple effect
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 100 * (index % 3));
                artifactObserver.unobserve(entry.target);
            }
        });
    }, { ...observerOptions, threshold: 0.1 });
    
    artifacts.forEach((artifact, index) => {
        artifactObserver.observe(artifact);
    });
}

// Add 3D tilt effect to interactive elements
function initTiltEffect() {
    // Apply to pillars
    const pillars = document.querySelectorAll('.pillar');
    pillars.forEach(pillar => {
        pillar.addEventListener('mousemove', (e) => {
            const rect = pillar.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse position within element (X)
            const y = e.clientY - rect.top;  // Mouse position within element (Y)
            
            // Calculate rotation values
            const tiltX = (y / rect.height - 0.5) * 10; // Max tilt of 10 degrees
            const tiltY = (0.5 - x / rect.width) * 10;
            
            // Apply the tilt effect with transform
            pillar.style.transform = `translateY(-15px) scale(1.02) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            pillar.style.transition = 'transform 0.1s ease';
        });
        
        // Reset on mouse leave
        pillar.addEventListener('mouseleave', () => {
            pillar.style.transform = '';
            pillar.style.transition = 'var(--hover-transition)';
        });
    });
    
    // Apply to artifacts
    const artifacts = document.querySelectorAll('.artifact');
    artifacts.forEach(artifact => {
        artifact.addEventListener('mousemove', (e) => {
            const rect = artifact.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation values
            const tiltX = (y / rect.height - 0.5) * 8; // Max tilt of 8 degrees 
            const tiltY = (0.5 - x / rect.width) * 8;
            
            // Apply the tilt effect with transform
            artifact.style.transform = `translateY(-15px) scale(1.02) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            artifact.style.transition = 'transform 0.1s ease';
        });
        
        // Reset on mouse leave
        artifact.addEventListener('mouseleave', () => {
            artifact.style.transform = '';
            artifact.style.transition = 'var(--hover-transition)';
        });
    });
}

// Add subtle parallax effects to backgrounds and elements
function initParallaxEffects() {
    // Add parallax to staircase background
    const staircaseBg = document.querySelector('.parallax-bg');
    
    if (staircaseBg) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const staircaseSection = document.querySelector('.staircase');
            const sectionTop = staircaseSection.offsetTop;
            const sectionHeight = staircaseSection.offsetHeight;
            
            // Only apply parallax when section is in view
            if (scrollPosition > sectionTop - window.innerHeight && 
                scrollPosition < sectionTop + sectionHeight) {
                const parallaxValue = (scrollPosition - sectionTop) * 0.4;
                staircaseBg.style.transform = `translateY(${parallaxValue}px)`;
            }
        });
    }
    
    // Add subtle hover movement effect for the sunbird
    const sunbird = document.querySelector('.sunbird');
    const centerDesign = document.querySelector('.center-design');
    
    if (sunbird && centerDesign) {
        centerDesign.addEventListener('mousemove', (e) => {
            const rect = centerDesign.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate mouse position relative to element center
            const mouseX = e.clientX - rect.left - centerX;
            const mouseY = e.clientY - rect.top - centerY;
            
            // Smooth subtle movement based on mouse position
            const moveX = mouseX * 0.05;
            const moveY = mouseY * 0.05;
            
            // Apply floating effect
            sunbird.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${getRotationDegrees(sunbird)}deg)`;
        });
        
        // Reset on mouse leave
        centerDesign.addEventListener('mouseleave', () => {
            sunbird.style.transform = `rotate(${getRotationDegrees(sunbird)}deg)`;
        });
    }
    
    // Helper function to get current rotation of an element
    function getRotationDegrees(element) {
        const transform = window.getComputedStyle(element).getPropertyValue('transform');
        let matrix = transform.match(/^matrix\((.+)\)$/);
        
        if (matrix) {
            matrix = matrix[1].split(', ');
            const a = matrix[0];
            const b = matrix[1];
            return Math.round(Math.atan2(b, a) * (180 / Math.PI));
        }
        return 0;
    }
}

// Initialize lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeButton = document.querySelector('.close-lightbox');
    
    // Open lightbox when clicking on any image link (pillars, staircase, ceiling, artifacts)
    const imageLinks = document.querySelectorAll('.pillar-link, .level-link, .ceiling-link, .artifact-link');
    
    imageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get image source and title from data attributes
            const imgSrc = link.getAttribute('data-img');
            const imgTitle = link.getAttribute('data-title');
            
            // Set image and caption
            lightboxImage.src = imgSrc;
            lightboxCaption.textContent = imgTitle;
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close lightbox when clicking on the close button
    closeButton.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scrolling
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });
    
    // Close lightbox when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });
}

// Add numbers to pillars from 1 to 7
function addPillarNumbers() {
    const pillars = document.querySelectorAll('.pillar');
    
    pillars.forEach((pillar, index) => {
        // Create number element
        const numberElement = document.createElement('div');
        numberElement.classList.add('pillar-number');
        numberElement.textContent = index + 1;
        
        // Insert at the beginning of the pillar
        if (pillar.firstChild) {
            pillar.insertBefore(numberElement, pillar.firstChild);
        } else {
            pillar.appendChild(numberElement);
        }
    });
}

// 添加全景图片点击事件
function initPanoramaClick() {
    const panoramaViewer = document.querySelector('.panorama-viewer');
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (!panoramaViewer || !lightbox || !lightboxImage || !lightboxCaption) return;
    
    panoramaViewer.addEventListener('click', () => {
        // 获取背景图片URL
        const computedStyle = window.getComputedStyle(document.getElementById('panoramaImage'));
        const bgImage = computedStyle.backgroundImage.replace('url("', '').replace('")', '');
        
        // 设置灯箱图片和标题
        lightboxImage.src = bgImage;
        lightboxCaption.textContent = '七根柱子整体效果图';
        
        // 显示灯箱
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // 禁止滚动
    });
}

// 处理介绍部分的滚动互动效果
function initIntroScrollEffects() {
    const introSection = document.querySelector('.intro-enhanced');
    const introContent = document.querySelector('.intro-content');
    const introBg = document.querySelector('.intro-bg');
    
    if (!introSection || !introContent || !introBg) return;
    
    // 初始化时先隐藏内容
    setTimeout(() => {
        if (isElementInViewport(introSection)) {
            introSection.classList.add('in-view');
            introContent.classList.remove('scroll-hidden');
        }
    }, 500);
    
    // 滚动监听
    window.addEventListener('scroll', () => {
        // 检查介绍部分是否在视口内
        if (isElementInViewport(introSection)) {
            introSection.classList.add('in-view');
            introContent.classList.remove('scroll-hidden');
            
            // 视差滚动效果
            const rect = introSection.getBoundingClientRect();
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const sectionTop = rect.top + scrollPosition;
            const scrollProgress = (scrollPosition - sectionTop + windowHeight) / (rect.height + windowHeight);
            
            if (scrollProgress >= 0 && scrollProgress <= 1) {
                const translateY = scrollProgress * 50; // 50px是最大移动距离
                introBg.style.transform = `translateZ(-50px) translateY(-${translateY}px) scale(1.5)`;
            }
        } else {
            introSection.classList.remove('in-view');
            introContent.classList.add('scroll-hidden');
        }
    });
    
    // 检查元素是否在视口内的辅助函数
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight * 0.75) &&
            rect.bottom >= (window.innerHeight * 0.25)
        );
    }
}

// 保留但注释掉全景功能代码，以便将来可能需要时恢复
/*
// Initialize panorama view functionality
function initPanoramaView() {
    const panoramaImage = document.getElementById('panoramaImage');
    if (!panoramaImage) return;
    
    const btnLeft = document.getElementById('panoramaLeft');
    const btnRight = document.getElementById('panoramaRight');
    const btnZoomIn = document.getElementById('panoramaZoomIn');
    const btnZoomOut = document.getElementById('panoramaZoomOut');
    
    let currentPosition = 0;
    let scale = 1;
    const maxPosition = 100;
    const step = 10;
    
    // Initialize position
    updatePanoramaPosition();
    
    // Add event listeners to control buttons
    btnLeft.addEventListener('click', () => {
        currentPosition = Math.max(currentPosition - step, -maxPosition);
        updatePanoramaPosition();
    });
    
    btnRight.addEventListener('click', () => {
        currentPosition = Math.min(currentPosition + step, maxPosition);
        updatePanoramaPosition();
    });
    
    btnZoomIn.addEventListener('click', () => {
        scale = Math.min(scale + 0.1, 1.5);
        updatePanoramaPosition();
    });
    
    btnZoomOut.addEventListener('click', () => {
        scale = Math.max(scale - 0.1, 1);
        updatePanoramaPosition();
    });
    
    // Mouse drag functionality
    let isDragging = false;
    let startX = 0;
    
    panoramaImage.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        panoramaImage.style.cursor = 'grabbing';
    });
    
    panoramaImage.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const moveX = e.clientX - startX;
        const moveFactor = 0.5; // Adjust for sensitivity
        
        currentPosition -= moveX * moveFactor;
        currentPosition = Math.max(Math.min(currentPosition, maxPosition), -maxPosition);
        
        updatePanoramaPosition();
        startX = e.clientX;
    });
    
    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            panoramaImage.style.cursor = 'grab';
        }
    });
    
    // Touch support for mobile devices
    let touchStartX = 0;
    
    panoramaImage.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    panoramaImage.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].clientX;
        const moveX = touchX - touchStartX;
        const moveFactor = 0.5; // Adjust for sensitivity
        
        currentPosition -= moveX * moveFactor;
        currentPosition = Math.max(Math.min(currentPosition, maxPosition), -maxPosition);
        
        updatePanoramaPosition();
        touchStartX = touchX;
        
        // Prevent page scrolling while panning
        e.preventDefault();
    });
    
    function updatePanoramaPosition() {
        panoramaImage.style.transform = `translateX(${currentPosition}px) scale(${scale})`;
    }
    
    // Auto-panning animation
    let autoPanInterval;
    let isAutoPanning = false;
    
    // Start auto-panning after a short delay of inactivity
    function startAutoPan() {
        if (isAutoPanning) return;
        
        clearTimeout(autoPanInterval);
        autoPanInterval = setTimeout(() => {
            isAutoPanning = true;
            autoPan();
        }, 5000); // Start auto-panning after 5 seconds of inactivity
    }
    
    // Stop auto-panning when user interacts
    function stopAutoPan() {
        isAutoPanning = false;
        clearTimeout(autoPanInterval);
        startAutoPan();
    }
    
    // Auto-panning animation
    function autoPan() {
        if (!isAutoPanning) return;
        
        let direction = 1;
        let position = currentPosition;
        
        const animate = () => {
            if (!isAutoPanning) return;
            
            position += 0.2 * direction;
            
            if (position >= maxPosition) {
                direction = -1;
            } else if (position <= -maxPosition) {
                direction = 1;
            }
            
            currentPosition = position;
            updatePanoramaPosition();
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    // Initialize auto-panning
    startAutoPan();
    
    // Stop auto-panning on any user interaction
    [btnLeft, btnRight, btnZoomIn, btnZoomOut, panoramaImage].forEach(el => {
        el.addEventListener('mousedown', stopAutoPan);
        el.addEventListener('touchstart', stopAutoPan);
    });
}
*/