# Asonyx - 3D Digital Solutions Agency Website

A premium, modern website for a 3D digital solutions agency featuring stunning animations, glassmorphism design, and **interactive 3D model viewers** that users can rotate and manipulate.

## Project Overview

Asonyx is a fully responsive website showcasing:

- **Hero Section**: Animated 3D logo with parallax scroll effects and gradient background blobs
- **Services Section**: Six service cards with hover animations and detailed descriptions
- **Testimonials Section**: 3D carousel with glassmorphism effect displaying client testimonials
- **Portfolio Section**: Dynamic project filtering with category-based views and **interactive 3D model viewers**
- **Interactive 3D Models**: Users can scroll to rotate and drag to spin the 3D models
- **Booking Section**: Interactive FLIP card animation for service booking
- **Contact Section**: Contact information and inquiry forms

## File Structure

```
asonyx-final/
├── index.html              # Main homepage with interactive 3D model viewers
├── portfolio.html          # Portfolio and testimonials page
├── styles.css              # Main stylesheet with animations and effects
├── script.js               # Homepage interactivity and animations
├── portfolio.js            # Portfolio page functionality and 3D carousel
├── model-viewer-simple.js  # Interactive 3D model viewer script (NO external dependencies)
├── asonyx-logo.png         # Main logo image
├── images/                 # Directory containing service icons
├── models/                 # Directory containing 3D model files
│   ├── voxel_web_development/    # Voxel web development 3D model
│   └── laptop_holoscreen/        # Laptop holoscreen 3D model
└── README.md               # This file
```

## Features

### Design Elements
- **Glassmorphism**: Semi-transparent cards with blur effects (15% opacity, 30px blur)
- **3D Transforms**: Carousel with 3D perspective and rotation effects
- **Animations**: Smooth scroll animations, hover effects, and transitions
- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes
- **Color Scheme**: Dark theme with cyan (#00D9FF) and purple (#A855F7) accents
- **3D Model Integration**: Custom glTF/GLB model files with interactive rotation

### Interactive Components
- Mobile menu toggle with smooth transitions
- 3D testimonial carousel with navigation controls
- **Interactive 3D Model Viewers**: Scroll to rotate, drag to spin, pinch to zoom
- Project filtering by category
- Scroll-triggered animations
- Hover effects on service cards and buttons

## Getting Started

### Option 1: Direct File Serving
1. Extract the ZIP archive
2. Open `index.html` in a web browser
3. Navigate using the menu or scroll through the page
4. **Interact with 3D models**: Scroll your mouse wheel or drag to rotate the models!

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 3D Model Viewer Features

The interactive 3D model viewer (`model-viewer-simple.js`) provides:

### Controls
- **Scroll Wheel**: Rotate the model vertically and horizontally
- **Mouse Drag**: Click and drag to freely rotate the model in all directions
- **Touch Support**: Swipe to rotate on mobile devices
- **Pinch Zoom**: Use two fingers to zoom in/out on mobile devices

### Technical Details
- **No External Dependencies**: Uses pure JavaScript and HTML5 Canvas
- **Lightweight**: Only ~6KB of JavaScript code
- **Cross-Browser Compatible**: Works on all modern browsers
- **Mobile Optimized**: Full touch support with pinch-to-zoom
- **Performance**: Optimized rendering with requestAnimationFrame

## 3D Model Files

The project includes two custom 3D models:

### Voxel Web Development
- **Location**: `models/voxel_web_development/`
- **Files**: `scene.gltf`, `scene.bin`, `textures/palette_baseColor.png`
- **Description**: Colorful voxel-style web development illustration
- **Viewer**: Interactive canvas-based viewer with rotation controls

### Laptop Holoscreen
- **Location**: `models/laptop_holoscreen/`
- **Files**: `scene.gltf`, `scene.bin`, `textures/`
- **Description**: Modern laptop with holographic screen display
- **Viewer**: Interactive canvas-based viewer with rotation controls

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #00D9FF;      /* Cyan */
    --secondary-color: #A855F7;    /* Purple */
    --bg-dark: #0f172a;            /* Dark background */
    /* ... more variables */
}
```

### Content
- Update text in `index.html` and `portfolio.html`
- Replace images in the `images/` directory
- Modify project data in `portfolio.js`
- Update testimonials in `portfolio.js`
- Replace 3D models in the `models/` directory

### 3D Models
To replace the 3D models:
1. Export your 3D model as glTF/GLB format
2. Place the model files in a new folder under `models/`
3. Update the image paths in `index.html` to point to the new model texture files
4. Update the model paths in `model-viewer-simple.js` if needed

### Model Viewer Behavior
Edit `model-viewer-simple.js` to customize:
- Rotation speed: Adjust the multipliers in `setupEventListeners()`
- Zoom limits: Change `Math.max(0.5, Math.min(3, ...))` values
- Background color: Modify the `fillStyle` in the `draw()` method
- Glow effect: Adjust the `strokeStyle` opacity and animation

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized CSS with minimal repaints
- Efficient JavaScript with event delegation
- Canvas-based 3D rendering (no GPU overhead)
- Lazy-loaded images (where applicable)
- Minified assets recommended for production
- 3D model textures optimized for web delivery

## Deployment

### Static Hosting (Recommended)
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to a repository
- **AWS S3 + CloudFront**: Upload files to S3 bucket
- **Manus Platform**: Upload to static hosting

### Traditional Hosting
1. Upload all files to your web server via FTP/SFTP
2. Ensure `index.html` is set as the default document
3. Test all links, animations, and 3D model loading
4. Verify model file paths are correct

## Maintenance

### Regular Updates
- Keep external CDN links updated (Font Awesome)
- Test on new browser versions
- Monitor performance metrics
- Update content regularly
- Verify 3D model files load correctly

### Troubleshooting
- If 3D models don't rotate, check browser console for errors
- Ensure all image and model paths are correct
- Verify CSS file is loaded properly
- Test on different browsers for compatibility
- Check that model files have correct CORS headers if served from different domain
- Clear browser cache if changes don't appear (Ctrl+Shift+R)

## What's New in This Version

✨ **Interactive 3D Model Viewers**
- Scroll to rotate models vertically and horizontally
- Drag to freely rotate in all directions
- Pinch to zoom on mobile devices
- No external dependencies required
- Lightweight and performant

✨ **Glassmorphism Testimonials**
- Enhanced transparency (15% opacity)
- 30px backdrop blur effect
- Subtle cyan glowing borders
- Ethereal floating appearance

✨ **Removed Elements**
- "Get Started" and "View Work" buttons from hero
- "View Case Study" buttons from testimonials
- Sketchfab embeds replaced with custom 3D viewers

## License

This website is proprietary to Asonyx. All rights reserved.

## Support

For issues or questions, contact the development team.

---

**Last Updated**: October 30, 2025
**Version**: 3.0.0
**Features**: Interactive 3D model viewers, Glassmorphism testimonials, Responsive design, No external dependencies
