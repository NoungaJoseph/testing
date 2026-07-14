const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the first occurrence of pt-20, pt-24, pt-32, pt-40 with pt-48 lg:pt-[180px]
    // Make sure we don't accidentally duplicate lg:pt-[180px] if it's run multiple times.
    let replaced = false;
    content = content.replace(/className="([^"]*?)\b(pt-20|pt-24|pt-32|pt-40)\b([^"]*?)"/, (match, p1, p2, p3) => {
        if (!replaced) {
            replaced = true;
            // Remove existing lg:pt-* if any to avoid conflicts
            let cleanP3 = p3.replace(/lg:pt-\S+/g, '').replace(/md:pt-\S+/g, '');
            return `className="${p1}pt-48 lg:pt-[180px] ${cleanP3.trim()}"`;
        }
        return match;
    });

    if (replaced) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    }
}
console.log('Padding updated successfully.');
