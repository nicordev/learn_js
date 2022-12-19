// https://www.freecodecamp.org/news/copy-text-to-clipboard-javascript/

function copyToClipboard(content) {
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            console.log('Content copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    copy();
}
