// https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#example_using_object_urls_to_display_images

const fileElement = document.querySelector('#file-select');
const galleryElement = document.querySelector('#gallery');

document
    .querySelector('#file-button')
    .addEventListener('click', function (event) {
        fileElement.click();
    });

fileElement.addEventListener('change', function (event) {
    const files = [...this.files];

    if (!files.length) {
        galleryElement.innerHTML = '<p>No images yet.</p>';
        return;
    }

    files.forEach((file) => {
        const imageUrl = URL.createObjectURL(file);
        galleryElement.insertAdjacentHTML(
            'beforeend',
            `<div><img src="${imageUrl}" height="60"><p>${file.name} ${file.size}</p></div>`
        );
    });
});
