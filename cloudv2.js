const CyberBypV2 = require('./cyber-bypass-v2.js');

const bypass = new CyberBypV2({
    headless: false,
    humanMode: true,
    debug: true
});

async function getProtectedContent(url) {
    await bypass.init();
    
    const result = await bypass.bypass(url);
    
    if (result.ok) {
        const page = result.page;
        
        const content = await bypass.execute(page, () => {
            return {
                title: document.title,
                text: document.body.innerText,
                links: Array.from(document.querySelectorAll('a')).map(a => ({
                    href: a.href,
                    text: a.textContent
                }))
            };
        });
        
        return content;
    }
    
    return null;
}
