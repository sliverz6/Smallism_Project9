const onloadHandler = () => {
    const heroTextBox = document.querySelector('.hero_text_box');
    heroTextBox.style.opacity = 100;
    heroTextBox.style.top = '40%';
    console.dir(heroTextBox);
};

window.onload = onloadHandler;
console.log(scrollY);