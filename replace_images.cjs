const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = {
    'Volunteer.tsx': {
        old: '/assets/charity/our-expertize-in-action.png',
        new: '/assets/images/new_assets/volunteer_hero.png'
    },
    'Stories.tsx': [
        // It has multiple occurrences. 
        // We will read the file and replace them sequentially.
    ],
    'SchoolRegistration.tsx': {
        old: '/assets/charity/our-expertize-in-action.png',
        new: '/assets/images/new_assets/story_student.png'
    },
    'Impact.tsx': {
        old: '/assets/charity/our-expertize-in-action.png',
        new: '/assets/images/new_assets/impact_hero.png'
    },
    'ApplicationDetail.tsx': {
        old: '/assets/charity/our-expertize-in-action.png',
        new: '/assets/images/new_assets/story_student.png'
    },
    'PartnerLogos.tsx': {
        old: '/assets/charity/our-expertize-in-action.png',
        new: '/assets/charity/education-access.png' // fallback for logos
    },
    'StoriesHero.tsx': {
        old: '/assets/charity/our-expertize-in-action.png',
        new: '/assets/images/new_assets/story_hero.png'
    },
    'VolunteerCTA.tsx': {
        old: '/assets/charity/our-expertize-in-action.png',
        new: '/assets/images/new_assets/volunteer_cta.png'
    },
    'VolunteerHero.tsx': {
        old: '/assets/charity/our-expertize-in-action.png',
        new: '/assets/images/new_assets/volunteer_hero.png'
    },
    'TransparencySection.tsx': {
        old: '/assets/charity/our-expertize-in-action.png',
        new: '/assets/images/new_assets/transparency_image.png'
    },
    'ProgramsHero.tsx': {
        old: '/assets/charity/our-expertize-in-action.png',
        new: '/assets/images/new_assets/story_student.png'
    },
    'MissionVision.tsx': {
        old: '/assets/charity/our-expertize-in-action.png',
        new: '/assets/images/new_assets/transparency_image.png'
    },
    'ImpactHero.tsx': {
        old: '/assets/charity/our-expertize-in-action.png',
        new: '/assets/images/new_assets/impact_hero.png'
    },
    'HomeHero.tsx': {
        old: '/assets/charity/our-expertize-in-action.png',
        new: '/assets/images/new_assets/story_hero.png'
    }
};

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            if (file === 'Stories.tsx') {
                // Specialized replacement for Stories.tsx
                if (content.includes('/assets/charity/our-expertize-in-action.png')) {
                    content = content.replace(/image: '\/assets\/charity\/our-expertize-in-action\.png'/g, function(match, offset, string) {
                        // find context to replace appropriately
                        const context = string.substring(Math.max(0, offset - 150), offset + 50);
                        if (context.includes('Abena Osei')) return "image: '/assets/images/new_assets/story_student.png'";
                        if (context.includes('Emmanuel Asante')) return "image: '/assets/images/new_assets/story_teacher.png'";
                        if (context.includes('Yaw Darko')) return "image: '/assets/images/new_assets/story_water.png'";
                        return "image: '/assets/images/new_assets/story_hero.png'";
                    });
                    content = content.replace(/src="\/assets\/charity\/our-expertize-in-action\.png"/g, 'src="/assets/images/new_assets/story_hero.png"');
                    modified = true;
                }
            } else if (file === 'ProgramDetail.tsx') {
                content = content.replace(/\/assets\/charity\/our-expertize-in-action\.png/g, '/assets/images/new_assets/story_student.png');
                modified = true;
            } else if (file === 'VideoShowcase.tsx') {
                content = content.replace(/\/assets\/charity\/our-expertize-in-action\.png/g, '/assets/images/new_assets/timeline_1.png');
                modified = true;
            } else if (file === 'ImpactTimeline.tsx') {
                content = content.replace(/\/assets\/charity\/our-expertize-in-action\.png/g, '/assets/images/new_assets/timeline_1.png');
                modified = true;
            } else if (file === 'IdeasSection.tsx') {
                content = content.replace(/\/assets\/charity\/our-expertize-in-action\.png/g, '/assets/images/new_assets/transparency_image.png');
                modified = true;
            } else if (replacements[file]) {
                const rules = replacements[file];
                if (content.includes(rules.old)) {
                    content = content.split(rules.old).join(rules.new);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${file}`);
            }
        }
    }
}

processDirectory(srcDir);
console.log('Done!');
