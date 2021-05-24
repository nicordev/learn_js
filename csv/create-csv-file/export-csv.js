const exportCsv = (headers, content, delimiter, fileName) => {
    const header = headers.join(delimiter) + '\n';
    let csv = header;

    content.forEach(data => {
        csv += data.join(delimiter) + "\n";
    });

    const csvData = new Blob([csv], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvData);

    const hiddenElement = document.createElement('a');
    hiddenElement.href = csvUrl;
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName + '.csv';
    hiddenElement.click();
};
