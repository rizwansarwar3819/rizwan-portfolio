# Rizwan — Personal Portfolio

A fully static personal portfolio website built with hand-written HTML, CSS, and JavaScript for the
Web Technologies course (Assignment 01). No frameworks, no templates.

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Intro / hero with animated terminal, focus areas |
| About | `about.html` | Background, timeline of coursework |
| Skills | `skills.html` | Skill cards + accordion (serves as the "Services/Products" page) |
| Contact | `contact.html` | Contact form with live validation |

## JavaScript features (5 total — assignment asks for 3-4)

1. **Dark / light mode toggle** — switches theme via a `data-theme` attribute and remembers the choice (`localStorage`), all pages
2. **Responsive hamburger navigation** — toggles the nav menu on small screens, all pages
3. **Typing animation** — hero terminal types/deletes phrases (Home page)
4. **Accordion** — expand/collapse FAQ-style panels, one open at a time (Skills page)
5. **Live form validation** — checks each field on input/blur and on submit, shows inline errors (Contact page)

## Folder structure

```
portfolio/
├── index.html
├── about.html
├── skills.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Running it

No build step needed — just open `index.html` in a browser, or serve the folder with any static
server (e.g. VS Code's "Live Server" extension).
