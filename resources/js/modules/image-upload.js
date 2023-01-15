class ImageUpload {
    constructor(preview) {
        this.input = preview.parentNode.parentNode.querySelector(preview.dataset.target);
        this.preview = preview;
        this.bindEvents();
    }

    bindEvents() {
        this.input.addEventListener('change', this.handleFileChange.bind(this));
    }

    handleFileChange() {
        const file = this.input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.preview.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }
}

module.exports = ImageUpload;
