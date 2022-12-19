function copyToClipboard(content) {
    navigator.clipboard.writeText(content).then(() => {
        console.log('Content copied to clipboard');
    }, () => {
        console.error('Failed to copy');
    });    
}
