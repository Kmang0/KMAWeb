# Personal Portfolio Website

A clean, modern, responsive portfolio website for showcasing CS and engineering programming projects. Built with plain HTML, CSS, and JavaScript—no frameworks required.

---

## Features

- **Single-page design** with smooth scrolling navigation
- **Data-driven projects** stored in a simple JavaScript array
- **Search and filter** functionality for projects
- **Project detail modals** with comprehensive information
- **Responsive design** that works on mobile, tablet, and desktop
- **Accessibility features** including keyboard navigation and screen reader support
- **Dark theme** with professional color palette

---

## Folder Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles (responsive, animations)
├── js/
│   ├── projects.js     # Projects data array
│   └── main.js         # All JavaScript functionality
├── assets/             # (Optional) For images, screenshots, etc.
└── README.md           # This file
```

---

## How to Run Locally

1. **Download or clone** this repository to your computer
2. **Navigate** to the `portfolio` folder
3. **Open `index.html`** in any modern web browser:
   - Double-click the file, or
   - Right-click → "Open with" → Your browser
   - Or use a local server (see below)

### Using a Local Server (Optional)

For the best experience, especially if you plan to add images:

**Python 3:**
```bash
cd portfolio
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Node.js (live-server):**
```bash
npm install -g live-server
cd portfolio
live-server
```

**VS Code:**
Install the "Live Server" extension, right-click on `index.html`, and select "Open with Live Server".

---

## How to Customize

### 1. Update Personal Information

Open `index.html` and look for comments marked with `<!-- EDIT: ... -->`:

| Section | What to Edit |
|---------|-------------|
| **Hero** | Your name, tagline, description |
| **About** | Your bio, skills, interests |
| **Contact** | Email, LinkedIn URL, GitHub URL |
| **Footer** | Copyright name and year |

### 2. Add a New Project

Open `js/projects.js` and add a new object to the `projects` array:

```javascript
{
    id: 'unique-project-id',           // Unique identifier (no spaces)
    title: 'Your Project Name',
    difficulty: 'Intermediate',        // 'Beginner', 'Intermediate', or 'Advanced'
    summary: 'Short description for the project card (1-2 sentences)',
    description: 'Longer description for the modal (2-3 sentences)',
    technologies: ['Python', 'Pandas', 'NumPy'],  // Tech badges
    categories: ['Python', 'Data Analysis'],      // For filtering
    features: [                          // Key features (3-5 items)
        'Feature one',
        'Feature two',
        'Feature three'
    ],
    learningOutcomes: [                  // What you learned (3-5 items)
        'Learned about X',
        'Practiced Y',
        'Understood Z'
    ],
    featured: false,                     // true = shows on homepage
    githubUrl: 'https://github.com/...', // Your repo link (or null)
    demoUrl: null,                       // Live demo link (or null)
    details: {
        // Optional sections:
        algorithmExplanation: '<h4>Title</h4><p>HTML content...</p>',
        sampleOutput: 'Plain text output...',
        sampleData: 'data,csv,content...',
        screenshots: ['Screenshot 1 description', 'Screenshot 2'],
        ethicsNotes: ['Note 1', 'Note 2'],
        deliverables: ['Deliverable 1', 'Deliverable 2']
    }
}
```

### 3. Mark Projects as "Featured"

To show a project on the homepage:

1. Open `js/projects.js`
2. Find your project
3. Set `featured: true`
4. Only the first 3 featured projects will appear on the homepage

### 4. Update Skills

In `index.html`, find the `.skills-grid` section and modify the skill tags:

```html
<span class="skill-tag">Your Skill</span>
```

### 5. Add Images/Screenshots

1. Create an `assets/images/` folder
2. Add your images there
3. In `js/projects.js`, you can reference them in the `details.screenshots` array
4. Or modify the modal HTML in `main.js` to display actual images

---

## Seeded Projects

This portfolio comes with 3 example projects that match ENGR 101-style programming:

### Project A: Galactic Ride-Share Route Planner (C++)
- **Difficulty:** Intermediate
- **Concepts:** Graph algorithms, TSP, greedy heuristics, 2-opt
- **Skills:** File I/O, distance computation, algorithm comparison

### Project B: Offshore Wind Farm Site Analysis (MATLAB)
- **Difficulty:** Intermediate
- **Concepts:** Data analysis, visualization, multi-criteria decision analysis
- **Skills:** CSV processing, plotting, weighted scoring

### Project C: RSA Key Generation & Encryption Demo (Java)
- **Difficulty:** Intermediate
- **Concepts:** Public-key cryptography, security best practices
- **Skills:** Java Cryptography Architecture, Base64 encoding

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management in modals
- Skip-to-content link
- Reduced motion support
- High contrast mode support

---

## Customization Ideas

1. **Change Colors:** Edit the CSS variables in `:root` at the top of `styles.css`
2. **Add Animations:** The CSS includes hover effects; add more with `transition` and `@keyframes`
3. **Add Pages:** Convert to multi-page by creating separate HTML files and linking them
4. **Add Blog:** Create a blog section with markdown support using a library like Marked.js
5. **Dark/Light Toggle:** Add a theme switcher using CSS custom properties and localStorage

---

## License

This template is free to use for personal or commercial projects. Attribution is appreciated but not required.

---

## Troubleshooting

**Projects not showing?**
- Check the browser console (F12) for JavaScript errors
- Ensure `projects.js` is loaded before `main.js` in `index.html`

**Styles not applying?**
- Verify the CSS file path is correct: `css/styles.css`
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

**Images not loading?**
- Use a local server instead of opening the file directly
- Check image paths are correct

---

## Credits

- Fonts: [Inter](https://fonts.google.com/specimen/Inter) by Google Fonts
- Icons: Custom SVG icons (no external libraries needed)
- Design: Modern dark theme inspired by developer portfolios

---

Happy coding! 🚀
