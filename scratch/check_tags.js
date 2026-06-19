const fs = require('fs');

const content = fs.readFileSync('e:/NEW/BACKEND/NEXT-kwinashe/kwinashe/Components/Productdetail.jsx', 'utf8');

// A simple stack-based tag matcher for React JSX
function checkTags(code) {
    const stack = [];
    const regex = /<\/?([a-zA-Z0-9:-]+)(?:\s+[^>]*?)?(\/?)>/g;
    let match;
    let lines = code.split('\n');
    
    // We can also track line numbers
    let currentLine = 1;
    let index = 0;
    
    while ((match = regex.exec(code)) !== null) {
        const [fullTag, tagName, selfClosing] = match;
        const isClosing = fullTag.startsWith('</');
        
        // Count lines to know where the tag is
        while (index < match.index) {
            if (code[index] === '\n') currentLine++;
            index++;
        }
        
        // Ignore self-closing tags, script tags, style tags, comments
        if (selfClosing || tagName === 'img' || tagName === 'input' || tagName === 'br' || tagName === 'hr' || tagName === 'link' || tagName === 'meta') {
            continue;
        }
        
        if (isClosing) {
            if (stack.length === 0) {
                console.log(`Error: Closing tag </${tagName}> on line ${currentLine} has no matching opening tag.`);
                return;
            }
            const lastTag = stack.pop();
            if (lastTag.name !== tagName) {
                console.log(`Error: Mismatched tag on line ${currentLine}. Found </${tagName}>, expected </${lastTag.name}> (opened on line ${lastTag.line}).`);
                return;
            }
        } else {
            stack.push({ name: tagName, line: currentLine });
        }
    }
    
    if (stack.length > 0) {
        console.log("Error: Unclosed tags remaining:");
        stack.forEach(tag => console.log(`  <${tag.name}> opened on line ${tag.line}`));
    } else {
        console.log("All tags matched successfully!");
    }
}

checkTags(content);
