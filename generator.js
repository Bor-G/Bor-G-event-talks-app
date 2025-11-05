const fs = require('fs');
const path = require('path');

const talks = [
    {
        "title": "The Future of JavaScript",
        "speakers": ["Jane Doe"],
        "category": ["JavaScript", "Web Development"],
        "duration": 60,
        "description": "A deep dive into the next features of JavaScript and what they mean for web development."
    },
    {
        "title": "Advanced CSS Techniques",
        "speakers": ["John Smith"],
        "category": ["CSS", "Frontend"],
        "duration": 60,
        "description": "Learn about the latest and greatest in CSS, including new selectors, properties, and layout techniques."
    },
    {
        "title": "Building Scalable APIs with Node.js",
        "speakers": ["Peter Jones", "Mary Johnson"],
        "category": ["Node.js", "Backend", "API"],
        "duration": 60,
        "description": "An in-depth look at how to design and build APIs that can handle millions of requests."
    },
    {
        "title": "Lunch Break",
        "speakers": [],
        "category": [],
        "duration": 60,
        "description": "Time to recharge and network with fellow attendees."
    },
    {
        "title": "WebAssembly: The Next Frontier",
        "speakers": ["Sue Rodriguez"],
        "category": ["WebAssembly", "Performance"],
        "duration": 60,
        "description": "Discover how WebAssembly is changing the landscape of web development and enabling near-native performance in the browser."
    },
    {
        "title": "State of the Art in Machine Learning",
        "speakers": ["Li Wei"],
        "category": ["Machine Learning", "AI"],
        "duration": 60,
        "description": "A comprehensive overview of the latest trends and breakthroughs in the field of machine learning."
    },
    {
        "title": "The Psychology of UX Design",
        "speakers": ["David Williams"],
        "category": ["UX", "Design"],
        "duration": 60,
        "description": "Understand the cognitive principles that underpin great user experiences."
    }
];

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

const templateHtml = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf-8');
const styleCss = fs.readFileSync(path.join(srcDir, 'style.css'), 'utf-8');
const scriptJs = fs.readFileSync(path.join(srcDir, 'script.js'), 'utf-8');

const finalHtml = templateHtml
    .replace('<style></style>', `<style>${styleCss}</style>`)
    .replace('<script id="data"></script>', `<script id="data">const talks = ${JSON.stringify(talks, null, 2)};</script>`)
    .replace('<script id="app"></script>', `<script>${scriptJs}</script>`);

if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

fs.writeFileSync(path.join(distDir, 'index.html'), finalHtml);

console.log('Successfully generated index.html in dist directory.');