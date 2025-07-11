# 🌿 AL-ATHEEM Premium Spices Website

A modern, visually rich website showcasing premium Indian spices with elegant animations and luxurious design.

## ✨ Features

### 🎨 Design & Visual
- **Premium Color Scheme**: Elegant greens, beiges, and natural spice tones
- **Modern Typography**: Playfair Display for headings, Inter for body text
- **Responsive Design**: Fully optimized for all devices
- **Visual Spice Elements**: CSS-based spice illustrations and patterns

### 🚀 Animations & Interactions
- **GSAP-Powered Animations**: Smooth, professional scroll-triggered effects
- **Flying Cardamom Pods**: Interactive floating elements on scroll
- **Spice Reveal Effects**: Elegant section animations with particle effects
- **Parallax Scrolling**: Premium depth and movement
- **Hover Interactions**: Subtle and engaging micro-animations

### 📱 User Experience
- **Smooth Scrolling**: Buttery smooth navigation between sections
- **Mobile Menu**: Animated hamburger menu for mobile devices
- **Form Interactions**: Enhanced contact form with validation
- **Performance Optimized**: Lazy loading and efficient animations
- **Cross-Browser Compatible**: Works on all modern browsers

## 🏗️ Structure

```
├── index.html          # Home page - Hero, spice showcase, quality promise
├── about.html          # About page - Legacy, sourcing, farm-to-pack journey
├── contact.html        # Contact page - Form, contact info, map section
├── css/
│   └── style.css       # Comprehensive styles with animations
├── js/
│   └── main.js         # GSAP animations and interactions
└── README.md          # This file
```

## 🌟 Pages Overview

### 🏠 Home Page (`index.html`)
- **Hero Section**: Animated cardamom pods and elegant typography
- **Spice Showcase**: Four premium spices with detailed information
  - Green Cardamom (Queen of Spices)
  - Black Pepper (King of Spices)
  - Premium Clove
  - Ceylon Cinnamon
- **Quality Promise**: Sustainable sourcing, lab testing, premium packaging

### 📖 About Page (`about.html`)
- **Legacy Section**: Company heritage and story since 1962
- **Sourcing Information**: Direct farmer partnerships in Kerala
- **Timeline Animation**: Interactive farm-to-pack journey
- **Values**: Authenticity, sustainability, quality, community

### 📞 Contact Page (`contact.html`)
- **Contact Form**: Comprehensive form with animations
- **Contact Information**: Location, phone, email, business hours
- **Map Section**: Interactive map placeholder
- **Floating Spice Elements**: Animated background elements

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - pure HTML/CSS/JS

### Installation
1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. **Navigate** between pages using the top menu

### Local Development
```bash
# If you want to serve locally (optional)
cd al-atheem-spices
python -m http.server 8000
# Then open http://localhost:8000
```

## 🎨 Customization

### Colors
Edit CSS custom properties in `css/style.css`:
```css
:root {
  --primary-green: #2d5016;
  --beige-light: #f5f1e8;
  --cinnamon: #8b4513;
  /* ... more colors */
}
```

### Content
- **Text Content**: Edit HTML files directly
- **Spice Information**: Update details in the spice showcase sections
- **Contact Information**: Modify contact details in `contact.html`

### Animations
- **Duration**: Adjust in `js/main.js` config object
- **Easing**: Modify GSAP ease functions
- **Triggers**: Customize ScrollTrigger start/end points

## 🔧 Technical Details

### Dependencies
- **GSAP 3.12.2**: Animation library (loaded via CDN)
  - Core GSAP library
  - ScrollTrigger plugin
- **Google Fonts**: Playfair Display & Inter

### Browser Support
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Performance Features
- **Lazy Loading**: Background images loaded when needed
- **Debounced Scroll**: Optimized scroll event handling
- **Animation Pausing**: Animations pause when page is hidden
- **Mobile Optimization**: Reduced animations on low-end devices

## 🎯 SEO & Accessibility

### SEO Optimized
- Semantic HTML structure
- Meta tags and descriptions
- Descriptive alt texts
- Proper heading hierarchy

### Accessibility
- Keyboard navigation support
- ARIA labels where needed
- Color contrast compliance
- Reduced motion support (respects user preferences)

## 🛠️ Customization Examples

### Adding New Spices
1. **Add HTML section** in `index.html`:
```html
<div class="spice-section new-spice-section">
  <!-- Spice content here -->
</div>
```

2. **Add CSS styles** in `css/style.css`:
```css
.new-spice-visual {
  background: linear-gradient(135deg, #your-color 0%, #accent-color 100%);
}
```

3. **Update JavaScript** to include new sections in animations

### Changing Animation Speed
```javascript
// In js/main.js
const config = {
  animations: {
    duration: 1.2, // Slower animations
    ease: "power2.out",
    stagger: 0.3
  }
};
```

## 📞 Support

For questions or customization requests, contact:
- Email: info@alatheem.com
- Website: [Your Website URL]

## 📄 License

This project is for demonstration purposes. All content and design elements are fictional and created for showcase.

---

**Built with ❤️ for premium spice enthusiasts**

> "Experience the authentic flavors from the pristine hills of Kerala"