import REGEX from '../utils/constants.js';
import {sendInfo, sendData, getRatesGBP, getRatesEUR} from '../services/api.js';
const url = 'https://jsonplaceholder.typicode.com/posts'
const urlRates = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json';

// Burger Menu
let burgerMenu = document.querySelector('.navLabel');
let navBar = document.querySelector('.nav-bar')

burgerMenu.addEventListener ('click', () => {
    navBar.classList.toggle('active')
    burgerMenu.classList.toggle('animation')
})

// Progress Bar
const progressBar = document.querySelector('#progress-bar');
const body = document.querySelector('.body');
// let wasDisplayed = localStorage.getItem('newsletterDisplayed');

let valueSroll = 0;

const animateProgressBar = () => {
    let scrollDistance = -body.getBoundingClientRect().top;
    let progressWidth = (scrollDistance / (body.getBoundingClientRect().height - document.documentElement.clientHeight))*100;
    valueSroll = (progressWidth.toFixed(0));
    progressBar.style.width = valueSroll + '%';
    valueSroll < 0 ? progressBar.style.width = '0%' : null;
    showModal(valueSroll);
};

window.addEventListener('scroll', animateProgressBar);

// Scroll to Top

window.addEventListener('scroll', function() {
    let scroll = this.document.querySelector ('.scrollToTop');
    scroll.classList.toggle('active', window.scrollY > 500)
});

const returnToTopBtn = document.querySelector ('.scrollToTop');

returnToTopBtn.addEventListener("click", () => {
    setTimeout(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        })
    }, 200)
})

// Contact Form
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const checkbox = document.getElementById ('checkbox');
let warningName = document.getElementById('warning-name');
let warningEmail = document.getElementById('warning-email');
let warningCheckbox = document.getElementById('warning-checkbox');

// const btnSubmit = document.getElementById('btn-submit');
let regexName= REGEX.name;
let regexEmail = REGEX.email;

let isNameOk = false;
let isEmailOk = false;

name.addEventListener ('keyup', ()=> {
    if (!regexName.test(name.value)) {
        name.style.border = '2px solid red';
        warningName.innerHTML = `The name is not valid`;
        isNameOk = false;
    } else {
        name.style.border = '2px solid green';
        warningName.innerHTML = '';
        isNameOk = true;
    }
})

email.addEventListener ('keyup', ()=> {
    if (!regexEmail.test(email.value)) {
        email.style.border = '2px solid red';
        warningEmail.innerHTML = `The email address is not valid`;
        isEmailOk = false;
    } else {
        email.style.border = '2px solid green';
        warningEmail.innerHTML = '';
        isEmailOk = true;
    }
})


checkbox.addEventListener ('change', ()=> {
    const isChecked = document.getElementById('checkbox').checked;
    if (!isChecked) {
        warningCheckbox.innerHTML = `You have to accept our policies`;
    } else {
        warningCheckbox.innerHTML = '';
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isEmailOk && isNameOk) {
        const isChecked = document.getElementById('checkbox').checked;
        if (!isChecked) {
            warningCheckbox.innerHTML = `First you have to accept our policies`;
        }  else {
            warningCheckbox.innerHTML = '';
            sendInfo (url, name.value, email.value);
            console.log(sendInfo);
            warningCheckbox.style.color ='green';
            warningCheckbox.innerHTML = `Message sent successfully`;
        }
    } else {
        warningCheckbox.innerHTML = `You have incomplete or incorrect fields`;
    }
})

//Newsletter Modal

const newsletter = document.querySelector('.newsletter-modal');
const newsForm = document.querySelector('#news-form');
const newsletterCloseBtn = document.querySelector ('.newsletter-closeBtn');
const inputNewsletter = document.querySelector ('#input-newsletter');
let warningNewsletterEmail = document.getElementById('warning-newsletter-email');
let emailIsCorrect = false;


setTimeout(()=> {
    if (!localStorage.getItem('newsletterDisplayed')){
        newsletter.style.display ='block';
        localStorage.setItem ('newsletterDisplayed', 'true');
        console.log ('modal asincrónico')
    }
},5000)

newsletter.addEventListener ('click', e => {
    e.target === newsletter ? newsletter.style.display = 'none' : null;
});

newsletterCloseBtn.addEventListener ('click', () => {
    newsletter.style.display = 'none';
})

window.addEventListener ('keyup', (e) => {
    e.key === 'Escape' ? newsletter.style.display = 'none' : null;
})

inputNewsletter.addEventListener ('keyup', ()=>{
    if (!regexEmail.test(inputNewsletter.value)) {
        inputNewsletter.style.border = '2px solid red';
        warningNewsletterEmail.innerHTML = `The email address is not valid`;
        console.log('desde false', emailIsCorrect)
    } else {
        inputNewsletter.style.border = '2px solid green'
        warningNewsletterEmail.innerHTML = '';
        emailIsCorrect = true;
        console.log('desde true', emailIsCorrect)
    }
})

newsForm.addEventListener ('submit', (e) => {
    console.log('Entra al submit');
    e.preventDefault();
    if (emailIsCorrect == true) {
        sendData(url, inputNewsletter.value)
        console.log('Data is ok') 
        warningNewsletterEmail.innerHTML = 'Successful subscription';
        warningNewsletterEmail.style.color = 'green';
    } else {
        warningNewsletterEmail.innerHTML = 'The email address is not valid';
        warningNewsletterEmail.classList.add = 'error';
        warningNewsletterEmail.style.color = 'red';
    }
})

// Get Rates - Pricing

const currencySelector = document.querySelector('.currencySelector');
console.log(currencySelector.value);

currencySelector.addEventListener('change', () => {
    if (currencySelector.value == 'GBP') {
        getRatesGBP (urlRates)
       
    }
    if (currencySelector.value == 'EUR') {
        getRatesEUR (urlRates)
    }
    if (currencySelector.value == 'USD') {
        let basicPrice = document.querySelector('.basic-p');
        let profPrice = document.querySelector('.professional-p');
        let premPrice = document.querySelector ('.premium-p')

        basicPrice.innerText = `$0`;
        profPrice.innerText = `$25`;
        premPrice.innerText = `$60`;
    }
})

// Slider

let index = 0;
let slides = document.querySelectorAll('.slider_img');
let dots = document.querySelectorAll('.dot');
// console.log (slides.length, dots.length)

const showSlide = (n) => {
    for (let index = 0; index < slides.length; index++) {
        slides[index].style.display = 'none'
        dots[index].classList.remove ('active');
    }

    slides[n].style.display='block';
    dots[n].classList.add('active');
}

const moveSlide = (n) => {
    index += n;
    index >= slides.length ? index = 0 : null;
    index < 0 ? index=slides.length -1 : null;
    showSlide(index);
}

for (let index = 0; index < dots.length; index++) {
    dots[index].addEventListener ('click', ()=> {
        showSlide(index);
    });
}

setInterval (function time () {
    moveSlide(1);
}, 4000);

let prev = document.querySelector('.slider_directions_back');
let next = document.querySelector('.slider_directions_foward');

prev.addEventListener ('click', ()=> {
    moveSlide(-1);
})

next.addEventListener ('click', ()=> {
    moveSlide(1);
})


// Show modal by Scrolling
const showModal = (value)=> {
    if(!localStorage.getItem('newsletterDisplayed') && value >= 25) {
        newsletter.style.display ='block';
        localStorage.setItem ('newsletterDisplayed', 'true');
        console.log ('modal desde scroll');
    };
}
