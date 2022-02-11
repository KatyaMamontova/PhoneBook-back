const express = require('express');
//const { send } = require('process');
const app = express();
const port = 3000;

let i = 0;
app.get('/bla/:man/:woman', (req, res) => {     //http://localhost:3000/bla/petya/mila
    const { man, woman } = req.params;          //присваеваем переменным имена которые впишем в гетовое строке
    res.send('ok');
});

const contacts = [
    {
        name: 'Scarlet',
        number: '89128762312'
    },
    {
        name: 'Grandma',
        number: '89227663510'
    },
    {
        name: 'Santa',
        number: '89070064147'
    },
    {
        name: 'Michael Scarn',
        number: '87179001234'
    },
    {
        name: 'guy',
        number: '89198002143'
    },
    {
        name: 'Jesus',
        number: '89102533123'
    },
    {
        name: 'plumber',
        number: '89122583100'
    },
];

app.get('/phoneBook', (req, res) => {
    /* res.send(
        contacts.forEach(elem => {
            elem.name;
        })
    ); */
    let list = '';
    contacts.forEach(elem => {
        list += `${elem.name}: ${elem.number} <br>`;
    })
    res.send(list);
});

app.get('/phoneBook/addNumber/:name/:number', (req, res) => {
    let name = req.params.name;
    let number = req.params.number;
    let convertedNumber = convertStrToNumber(number);
    if (convertedNumber && name != '') {
        if (validateNumber(convertedNumber)) {
            addNumber(name, number);
            res.send(`Создан новый контакт: ${name}, ${number}`);
        } else res.send('invalid number number');
    } else res.send('incorrect input');
});

function addNumber(name, number) {
    contacts.push({
        name,
        number
    });
}

/* app.get('/phoneBook/deleteNumber/:name', (req, res) => {
    let name = req.params.name;
    if (name) {
        deleteNumber(name);
        res.send('Контакт удален');
    } else res.send('Контакт с таким именем не найден');
}); */

app.get('/phoneBook/deleteNumber/:prop', (req, res) => {
    let prop = req.params.prop;
    convertedNumber = convertStrToNumber(prop);
    if (convertedNumber) {
        if (deleteNumber(prop, 'number')) {
            res.send('Контакт удален по номеру');
        }
    } else if (deleteNumber(prop, 'name')) {
        res.send('Контакт удален по имени');
    } else res.send('Контакт с таким именем не найден');
});

function deleteNumber(prop, propName = 'name') {
    console.log('Мы в функции deleteNumber');
    contacts.forEach(elem => {
        console.log('Мы в цикле функции deleteNumber');
        if (elem[propName] === prop) {
            elem = {};
            console.log('Мы в условии цикла функции deleteNumber');
            return true;
        }
    });
    return false;
}

function convertStrToNumber(str) {
    let convertedNumber = '';
    let start = 0;
    if (str[0] === '+') {
        convertedNumber += '+';
        start = 1;
    };
    const allowedSymbols = ['(', ')', '-'];
    for (let i = start; i < str.length; i++) {
        if ((str[i] - 0)
            || str[i] === '0') {
            convertedNumber += str[i];
        } else if (allowedSymbols.indexOf(str[i]) != -1) {
            convertedNumber += '';
        } else return false;
    }

    //этот код допускает ввод номера телефона вообще с любыми цифрами
    //просто вычленяет цифры из строки
    /*if (str[0] === '+') convertedNumber += '+';
    for (let i = 0; i < str.length; i++) {
        if ((str[i] - 0) || str[i] === '0') convertedNumber += str[i];
    } */

    return convertedNumber;
}

function validateNumber(number) {
    if (
        ((number.length === 11) && (number.startsWith('89'))) ||
        ((number.length === 12) && (number.startsWith('+79')))
    ) return true;
}

app.get('/phoneBook/validate/:number', (req, res) => {
    let number = req.params.number;
    let convertedNumber = convertStrToNumber(number);
    if (convertedNumber) {
        if (validateNumber(convertedNumber)) {
            res.send('valid');
        } else res.send('invalid');
    } else res.send('incorrect input');
});

app.listen(port, () => console.log('все ок, работаем'));