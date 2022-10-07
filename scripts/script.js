import REGEX from '../utils/constants.js';
import {sendInfo, sendData, getRatesGBP, getRatesEUR} from '../services/api.js';

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
let wasDisplayed = localStorage.getItem('newsletterDisplayed');

const animateProgressBar = () => {
    let scrollDistance = -body.getBoundingClientRect().top;
    let progressWidth = (scrollDistance / (body.getBoundingClientRect().height - document.documentElement.clientHeight))*100;
    let value = (progressWidth.toFixed(0));
    progressBar.style.width = value + '%';
    if (value < 0) {
        progressBar.style.width = '0%'; 
    }

    if(!localStorage.newsletterDisplayed && value >= 25) {
        newsletter.style.display ='block';
        localStorage.setItem ('newsletterDisplayed', 'true');
        console.log ('modal desde scroll');
    };
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
let warningName = document.getElementById('warning-name');
let warningEmail = document.getElementById('warning-email');
let warningCheckbox = document.getElementById('warning-checkbox');

// const btnSubmit = document.getElementById('btn-submit');
let regexName= REGEX.name;
let regexEmail = REGEX.email;


name.addEventListener ('keyup', ()=> {
    if (!regexName.test(name.value)) {
        name.style.border = '2px solid red';
        warningName.innerHTML = `The name is not valid`;
    } else {
        name.style.border = '2px solid green';
        warningName.innerHTML = '';
    }
})

email.addEventListener ('keyup', ()=> {
    if (!regexEmail.test(email.value)) {
        email.style.border = '2px solid red';
        warningEmail.innerHTML = `The email address is not valid`;
    } else {
        email.style.border = '2px solid green';
        warningEmail.innerHTML = '';
    }
})

form.addEventListener('submit', (e) => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    e.preventDefault();
    const isChecked = document.getElementById('checkbox').checked;
    if (!isChecked) {
        warningCheckbox.innerHTML = `First you have to accept our policies`;
    }  else {
        warningCheckbox.innerHTML = '';
        
        // let nameValue = name.value;
        // let emailValue = email.value;
        sendInfo (url, name.value, email.value);
    }
})

//Newsletter Modal

const newsletter = document.querySelector('.newsletter-modal');
const newsForm = document.querySelector('#news-form');
const newsletterCloseBtn = document.querySelector ('.newsletter-closeBtn');
const inputNewsletter = document.querySelector ('#input-newsletter');
let warningNewsletterEmail = document.getElementById('warning-newsletter-email');
let emailIsCorrect = false;



if (!localStorage.newsletterDisplayed) {
    // window.addEventListener ('load', () => {
        setTimeout (()=> {
            newsletter.style.display ='block';
            localStorage.setItem ('newsletterDisplayed', 'true');
            console.log ('modal asincrónico')
        }, 5000);
    // });
}

newsletter.addEventListener ('click', e => {
    if (e.target == newsletter) {
        newsletter.style.display = 'none';
    }
});

newsletterCloseBtn.addEventListener ('click', () => {
    newsletter.style.display = 'none';
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
    // let inputNewsletter.value
    const url = 'https://jsonplaceholder.typicode.com/posts';
    emailIsCorrect ? (sendData(url, inputNewsletter.value) (newsletter.style.display = 'none')) : null;
})

// Get Rates - Pricing


const urlRates = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json';
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
