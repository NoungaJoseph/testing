const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

walkDir('./src/components', function (filePath) {
    if (filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        // Remove text opacity (e.g. text-white/80 -> text-white)
        content = content.replace(/text-([a-z0-9-]+)\/[0-9]+/g, 'text-$1');

        // Remove border opacity
        content = content.replace(/border-([a-z0-9-]+)\/[0-9]+/g, 'border-$1');

        // Convert subtle backgrounds (primary/10) to white with border, or just text-primary
        content = content.replace(/bg-([a-z0-9-]+)\/(10|20|30)/g, 'bg-white border border-$1');

        // Darker backgrounds
        content = content.replace(/bg-([a-z0-9-]+)\/(40|50|60|70|80|90|95)/g, 'bg-$1');

        // Remove standalone opacity
        content = content.replace(/opacity-[0-9]+/g, '');

        // Remove mix blend mode
        content = content.replace(/mix-blend-multiply/g, '');

        // Remove gradients
        content = content.replace(/bg-gradient-to-[a-z]+/g, 'bg-navy');

        // Remove gradient stops (from-, via-, to-)
        content = content.replace(/(from|via|to)-([a-z0-9-]+)(\/[0-9]+)?/g, '');

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated', filePath);
        }
    }
});

walkDir('./src/pages', function (filePath) {
    if (filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        content = content.replace(/text-([a-z0-9-]+)\/[0-9]+/g, 'text-$1');
        content = content.replace(/border-([a-z0-9-]+)\/[0-9]+/g, 'border-$1');
        content = content.replace(/bg-([a-z0-9-]+)\/(10|20|30)/g, 'bg-white border border-$1');
        content = content.replace(/bg-([a-z0-9-]+)\/(40|50|60|70|80|90|95)/g, 'bg-$1');
        content = content.replace(/opacity-[0-9]+/g, '');
        content = content.replace(/mix-blend-multiply/g, '');
        content = content.replace(/bg-gradient-to-[a-z]+/g, 'bg-navy');
        content = content.replace(/(from|via|to)-([a-z0-9-]+)(\/[0-9]+)?/g, '');

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated', filePath);
        }
    }
});
