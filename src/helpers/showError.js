function showError(field, errorElement, e, validator) {
    if (document.getElementById(errorElement)) {
        e.target.name === field && validator(field, e.target.value)
            ? (document.getElementById(errorElement).style.opacity = 1)
            : (document.getElementById(errorElement).style.opacity = 0);
    }
}

export default { showError };
