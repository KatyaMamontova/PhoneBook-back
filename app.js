const express = require('express');
const { send } = require('process');
const app = express();
const port = 3000;

let i = 0;
app.get('/bla/:man/:woman', (req, res) => {     //http://localhost:3000/bla/petya/mila
    const { man, woman } = req.params;          //присваеваем переменным имена которые впишем в гетовое строке
    res.send('ok');
});

const phones = [
    {
        name: 'Scarlet',
        phone: '89128762312'
    },
    {
        name: 'Grandma',
        phone: '89227663510'
    },
    {
        name: 'Santa',
        phone: '89070064147'
    },
    {
        name: 'Michael Scarn',
        phone: '87179001234'
    },
    {
        name: 'guy',
        phone: '89198002143'
    },
    {
        name: 'Jesus',
        phone: '89102533123'
    },
    {
        name: 'plumber',
        phone: '89122583100'
    },
];

app.get('/phoneBook', (req, res) => {
    /* res.send(
        phones.forEach(elem => {
            elem.name;
        })
    ); */
    let list = '';
    phones.forEach(elem => {
        list += `${elem.name}: ${elem.phone} <br>`;
    })
    res.send(list);
});

function validatePhone(phone) {
    if (
        ((phone.length === 11) && (phone.startsWith('89'))) ||
        ((phone.length === 12) && (phone.startsWith('+79')))
    ) return true;
}

function convertStrToPhone(str) {
    let convertedPhone = '';
    if (str[0] === '+') convertedPhone += '+';
    const allowedSymbols = ['(', ')', '-'];
    for (let i = 0; i < str.length; i++) {
        /* if ((str[i] - 0)
            || str[i] === '0'
            || allowedSymbols.indexOf(str[i]) != -1
        ) {
            if ((str[i] - 0)
                || str[i] === '0') {
                convertedPhone += str[i];
            }
        } else return false; */
        if ((str[i] - 0)
            || str[i] === '0') {
            convertedPhone += str[i];
        } else if (allowedSymbols.indexOf(str[i]) != -1) {
            convertedPhone += '';
        } else return false;
    }
    /* if (str[0] === '+') convertedPhone += '+';
    for (let i = 0; i < str.length; i++) {
        if ((str[i] - 0) || str[i] === '0') convertedPhone += str[i];
    } */
    return convertedPhone;
}

app.get('/phoneBook/validate/:phone', (req, res) => {
    let phone = req.params.phone;
    let convertedPhone = convertStrToPhone(phone);
    if (convertedPhone) {
        if (validatePhone(convertedPhone)) {
            res.send('valid');
        } else res.send('invalid');
    } else res.send('incorrect input');
});


app.get('/bla', (req, res) => {//это запрос с названием bla гетовый 
    console.log(req.query);
    res.send('ok');
});

app.get('/*', (req, res) => {// /* будет отвечать на все запросы 
    i++;
    res.send(`ля ля ля ${i}`);
});

app.listen(port, () => console.log('все ок, работаем'));