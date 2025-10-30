// Simple 3D Model Viewer using Canvas and CSS 3D Transforms
// No external dependencies required

class SimpleModelViewer {
    constructor(containerId, imagePath, modelName) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.imagePath = imagePath;
        this.modelName = modelName;
        this.rotationX = 0;
        this.rotationY = 0;
        this.scale = 1;

        this.init();
    }

    init() {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = this.container.clientWidth;
        canvas.height = this.container.clientHeight;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';

        this.ctx = canvas.getContext('2d');
        this.container.appendChild(canvas);

        // Load and draw image
        const img = new Image();
        img.onload = () => {
            this.image = img;
            this.draw();
        };
        img.src = this.imagePath;

        // Setup event listeners
        this.setupEventListeners(canvas);

        // Animation loop
        this.animate();
    }

    setupEventListeners(canvas) {
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        // Mouse wheel scroll for rotation
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.rotationY += e.deltaX * 0.005;
            this.rotationX += e.deltaY * 0.005;
        }, { passive: false });

        // Mouse drag for rotation
        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        canvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;

                this.rotationY += deltaX * 0.01;
                this.rotationX += deltaY * 0.01;

                previousMousePosition = { x: e.clientX, y: e.clientY };
            }
        });

        canvas.addEventListener('mouseup', () => {
            isDragging = false;
        });

        canvas.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        // Touch support for mobile
        let touchStartX = 0;
        let touchStartY = 0;

        canvas.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const deltaX = e.touches[0].clientX - touchStartX;
            const deltaY = e.touches[0].clientY - touchStartY;

            this.rotationY += deltaX * 0.01;
            this.rotationX += deltaY * 0.01;

            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: false });

        // Pinch zoom for mobile
        let previousDistance = null;
        canvas.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const distance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );

                if (previousDistance) {
                    const scaleChange = distance / previousDistance;
                    this.scale *= scaleChange;
                    this.scale = Math.max(0.5, Math.min(3, this.scale));
                }

                previousDistance = distance;
            }
        }, { passive: false });

        canvas.addEventListener('touchend', () => {
            previousDistance = null;
        });
    }

    draw() {
        if (!this.image) return;

        const width = this.ctx.canvas.width;
        const height = this.ctx.canvas.height;

        // Clear canvas
        this.ctx.fillStyle = 'rgba(20, 30, 50, 0.5)';
        this.ctx.fillRect(0, 0, width, height);

        // Save context
        this.ctx.save();

        // Translate to center
        this.ctx.translate(width / 2, height / 2);

        // Apply rotation transforms (simulated 3D effect)
        this.ctx.transform(
            Math.cos(this.rotationY),
            Math.sin(this.rotationX) * 0.5,
            -Math.sin(this.rotationY) * 0.5,
            Math.cos(this.rotationX),
            0,
            0
        );

        // Apply scale
        this.ctx.scale(this.scale, this.scale);

        // Draw image centered
        const imgWidth = this.image.width;
        const imgHeight = this.image.height;
        this.ctx.drawImage(this.image, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);

        // Add subtle glow effect
        this.ctx.strokeStyle = `rgba(0, 217, 255, ${0.3 * Math.sin(Date.now() * 0.001) + 0.3})`;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(-imgWidth / 2 - 10, -imgHeight / 2 - 10, imgWidth + 20, imgHeight + 20);

        // Restore context
        this.ctx.restore();
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize models when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize first model viewer
    new SimpleModelViewer(
        'model-viewer-1',
        'models/voxel_web_development/textures/palette_baseColor.png',
        'Voxel Web Development'
    );

    // Initialize second model viewer
    new SimpleModelViewer(
        'model-viewer-2',
        'models/laptop_holoscreen/textures/MaterialFBXASC032FBXASC0352142150880_baseColor.jpeg',
        'Laptop Holoscreen'
    );
});
