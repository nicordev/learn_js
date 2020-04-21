let longClickHandler = new LongClickHandler(
    document.getElementById('target-button'),
    1000,
    () => {
        document.getElementById('result').textContent = 'Good job!';
    }
)