// Envio de información

export const sendInfo = (url, name, email) => {
    fetch (url , {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then ((response) => response.json())
    .then ((data) => console.log(data))
    .catch((err) => console.log(err));
}

export const sendData = (url, email) => {
    fetch (url, {
        method: 'POST',
        body: JSON.stringify ({
            email: email,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then ((response) => response.json())
        .then ((data) => console.log (data))
        .catch ((err) => console.log (err))
}

//Rates API call
export const getRatesGBP = async (url) => { 
    try {
        const response = await fetch (url);
        const data = await response.json();
        const gbpRate = data.eur.gbp;
        let proffesionalPrice = (25*gbpRate).toFixed(2);
        let premiumPrice = (60*gbpRate).toFixed(2);
        console.log('precios en GPP', proffesionalPrice, premiumPrice)

        let basicPrice = document.querySelector('.basic-p');
        let profPrice = document.querySelector('.professional-p');
        let premPrice = document.querySelector ('.premium-p')
        basicPrice.innerText = `£0`;
        profPrice.innerText = `£${proffesionalPrice}`;
        premPrice.innerText = `£${premiumPrice}`;
    }
    catch (err) {
        console.log (err);
    }
}


export const getRatesEUR = async (url)=>  {

    try {
        const response = await fetch (url)
        const data = await response.json ()
        const usdRate = data.eur.usd;
        let proffesionalPrice = (25/usdRate).toFixed(2);
        let premiumPrice =  (60/usdRate).toFixed(2);
        console.log ('precios en EUR', proffesionalPrice, premiumPrice);

        let basicPrice = document.querySelector('.basic-p');
        let profPrice = document.querySelector('.professional-p');
        let premPrice = document.querySelector ('.premium-p')
        basicPrice.innerText = `€0`;
        profPrice.innerText = `€${proffesionalPrice}`;
        premPrice.innerText = `€${premiumPrice}`;
    }
    catch(err) {
        console.log (err)
    }
}















 

