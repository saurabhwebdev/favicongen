// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply the saved theme
document.body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
    }
});

// Navigation functionality
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update active nav link on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    const mainActionBtn = document.querySelector('.main-action-btn');
    const fileInput = document.getElementById('fileInput');
    const processingOverlay = document.getElementById('processingOverlay');
    let uploadedImage = null;

    mainActionBtn.addEventListener('click', () => {
        if (!uploadedImage) {
            fileInput.click();
        } else {
            downloadAllIcons();
        }
    });

    fileInput.addEventListener('change', handleFileSelect);
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    document.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files.length) {
            handleFileSelect({ target: { files: e.dataTransfer.files } });
        }
    });

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage = new Image();
            uploadedImage.onload = () => {
                showProcessingAnimation();
            };
            uploadedImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function showProcessingAnimation() {
        const processingOverlay = document.getElementById('processingOverlay');
        processingOverlay.classList.add('show');
        startCountdown();
    }

    function hideProcessingAnimation() {
        const processingOverlay = document.getElementById('processingOverlay');
        processingOverlay.classList.remove('show');
    }

    function startCountdown() {
        let count = 5;
        const countdownElement = document.getElementById('countdown');
        const progressBar = document.getElementById('countdownProgress');
        const progressStep = 100 / count;
        let progress = 0;
        
        countdownElement.textContent = count;
        progressBar.style.width = '0%';
        
        const countdownInterval = setInterval(() => {
            count--;
            progress += progressStep;
            
            countdownElement.textContent = count;
            progressBar.style.width = `${progress}%`;
            
            if (count <= 0) {
                clearInterval(countdownInterval);
                hideProcessingAnimation();
                updateButtonToDownload();
            }
        }, 1000);
    }

    function updateButtonToDownload() {
        const mainActionBtn = document.getElementById('mainActionBtn');
        mainActionBtn.innerHTML = `<i class="fas fa-download"></i><span>Download Icons</span>`;
        mainActionBtn.classList.add('download');
        mainActionBtn.removeEventListener('click', handleUploadButtonClick);
        mainActionBtn.addEventListener('click', handleDownloadButtonClick);
    }

    function generateIcons() {
        if (!uploadedImage) return;

        const iconSizes = {
            favicon: [16, 32, 48],
            apple: [57, 60, 72, 76, 114, 120, 144, 152, 180],
            android: [36, 48, 72, 96, 144, 192],
            microsoft: [70, 150, 310]
        };

        const icons = [];

        Object.entries(iconSizes).forEach(([platform, sizes]) => {
            sizes.forEach(size => {
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = size * 2;
                tempCanvas.height = size * 2;
                const tempCtx = tempCanvas.getContext('2d');
                
                tempCtx.drawImage(uploadedImage, 0, 0, size * 2, size * 2);
                ctx.drawImage(tempCanvas, 0, 0, size, size);
                
                icons.push({
                    platform,
                    size,
                    data: canvas.toDataURL('image/png')
                });
            });
        });

        window.generatedIcons = icons;
    }

    function downloadAllIcons() {
        if (!window.generatedIcons) return;

        const zip = new JSZip();
        const platforms = {};

        window.generatedIcons.forEach(icon => {
            if (!platforms[icon.platform]) {
                platforms[icon.platform] = zip.folder(icon.platform);
            }
            
            const base64Data = icon.data.split(',')[1];
            platforms[icon.platform].file(`${icon.size}x${icon.size}.png`, base64Data, { base64: true });
        });

        zip.generateAsync({ type: 'blob' })
            .then(content => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(content);
                link.download = 'favicon-pack.zip';
                link.click();
                URL.revokeObjectURL(link.href);
            });
    }

    // Handle tips toggle
    const tipsToggle = document.querySelector('.tips-toggle');
    const tipsContent = document.querySelector('.tips-content');

    tipsToggle.addEventListener('click', () => {
        tipsToggle.classList.toggle('active');
        tipsContent.classList.toggle('active');
    });
}); 