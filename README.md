# Deeksha R - Software Engineer Portfolio Website

A cyber-pixel retro-modern portfolio crafted for **Deeksha R**, Software Engineer and Diploma in Engineering graduate from **Government Polytechnic, Belur (GPT Belur)**, featuring embedded microcontroller expertise, AI stress detection research, workplace experience at **Eshwar Technologies**, and an interactive AI assistant.

---

## 🎮 Key Features & Highlights

- **Aesthetic:** Cyber-pixel / 8-bit retro gaming fusion with crisp, modern engineering layout.
- **Background Asset:** Integrated `dee 123.jpeg` with themed backdrop filters.
- **Profile Presentation:** Features Deeksha's verified portrait (`deeee.jpeg`) with retro framing and pixel badges.
- **Video Showcase:** Embedded local player for Deeksha's self-introduction video (`deeksh r in video.mp4`) wrapped in a retro CRT monitor bezel.
- **Resume Link:** Direct one-click download/view of [`Deeksha_resume.pdf`](Deeksha_resume.pdf).
- **Theme Engine:** Automated dark/light mode detection (`prefers-color-scheme`) with interactive toggle and `localStorage` memory (`Ctrl + T` shortcut).
- **Interactive AI Assistant:** "DeekshaBot v1.0" with instant knowledge of Deeksha's education, projects, skills, and contact details, complete with pre-configured API hook for OpenAI / Google Gemini.
- **Projects Showcase:** Interactive clickable thumbnails triggering comprehensive modal dialogs with architecture, tech stacks, and source links.
- **Live Contact Form:** Real-time client validation with email dispatch hook ready for Resend API / Formspree.

---

## 🗂️ 15-Prompt Development Structure

1. **Base Structure & HTML Skeleton:** Semantic HTML5 (`header`, `nav`, `main`, `section`, `footer`) with clear modular comments.
2. **Hero Section:** Pixel-art typography, dynamic typing effect, quick credentials pills, and background image overlay (`dee 123.jpeg`).
3. **Vertical Navigation Bar:** Fixed left vertical bar with 8-bit icons, animated hover tooltips, and responsive mobile drawer.
4. **About Me Section:** Profile card featuring `deeee.jpeg`, career highlights (GPT Belur CGPA 7.16, Eshwar Technologies 6 months tenure), and technical interests.
5. **Skills Section:** Filterable category tabs (Programming, Hardware, AI, Tools) with animated pixel progress bars.
6. **Career Milestones Timeline:** Alternating vertical timeline cards with hover lifts and glowing checkpoint nodes.
7. **Projects Showcase:** Clickable thumbnails with hover overlays and detailed modal dialogs.
8. **Self-Introduction Video:** CRT arcade monitor housing Deeksha's uploaded video (`deeksh r in video.mp4`) with aspect-ratio responsiveness.
9. **Testimonials Section:** Elevation cards with subtle drop shadows, star ratings, and peer endorsements.
10. **AI Chat Interface:** Live simulated bot trained on Deeksha's background with quick question chips and an API integration hook.
11. **Contact Section:** High-contrast form fields with client-side validation, loading states, and Resend API hook.
12. **Social Media Links:** Pixel-art social icons linking to Deeksha's GitHub, LinkedIn, Email, and Phone.
13. **Responsive Design:** Mobile-first and desktop media queries ensuring flawless layouts across all screen resolutions.
14. **Visual Enhancements:** Drop shadows, pixel borders, glowing accents, and smooth cubic-bezier transitions.
15. **Testing & Deployment:** Comprehensive testing suite and publishing guide below.

---

## 🚀 Local Preview Instructions

You can preview the portfolio locally using Python's built-in HTTP server:

```powershell
# Open terminal inside the portfolio folder
cd "c:\Users\deeksha\OneDrive\Desktop\my portfolio"

# Launch local server
python -m http.server 8000
```

Then open your browser and navigate to:
`http://localhost:8000`

---

## 🌐 Deployment Guide (Prompt 15)

### Option 1: GitHub Pages (Recommended)

Since your GitHub username is **d85891783-source**:

1. **Initialize Git & Commit:**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit of Deeksha R portfolio"
   ```

2. **Create a Repository on GitHub:**
   - Go to [GitHub](https://github.com/new)
   - Create a repository named `portfolio` or `d85891783-source.github.io`

3. **Push to GitHub:**
   ```powershell
   git remote add origin https://github.com/d85891783-source/portfolio.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - In your repository, go to **Settings** > **Pages**.
   - Under **Build and deployment**, choose **Deploy from a branch**.
   - Select branch `main` and folder `/ (root)`.
   - Click **Save**. Your site will be live at `https://d85891783-source.github.io/portfolio/`!

---

### Option 2: Vercel / Netlify (Zero Configuration)

1. Sign in to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) using your GitHub account (`d85891783-source`).
2. Select **Add New Project** and choose the `portfolio` repository.
3. Keep default settings (Root directory `./`, Framework preset: Other / Static).
4. Click **Deploy**. Your portfolio will be live with free global CDN and SSL certificate in under 60 seconds!

---

## ⚙️ External API Integration Notes

### 1. Connecting OpenAI or Gemini API to the Chatbot (in `script.js`):
Locate `processUserMessage` in `script.js` and replace the simulated timeout with:
```javascript
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer YOUR_API_KEY`
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are Deeksha R, Software Engineer from GPT Belur..." },
      { role: "user", content: text }
    ]
  })
});
```

### 2. Connecting Resend API or Formspree to Contact Form (in `script.js`):
Replace the simulated dispatch in `contactForm.addEventListener('submit', ...)` with:
```javascript
await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: nameInput.value,
    email: emailInput.value,
    subject: subjectInput.value,
    message: messageInput.value
  })
});
```

---

© 2026 **Deeksha R**. All rights reserved.
