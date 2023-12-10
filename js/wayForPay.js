import Crypto from './2.5.3-crypto-md5-hmac.js';

// console.log('hash', hash);
// const max = 999999;

const wayforpay = new Wayforpay();

function pay() {
    const hash = Crypto.MD5(
        'maximkarlov_github_io;www.market.ua;DH783019;1415379863;1547.36;UAH;Процессор Intel Core i5-4670 3.4GHz;1;1000;',
        '50ba690ce7ad91fef16e65174227696ddb470945'
    );
    console.log('hash', hash);
    wayforpay.run(
        {
            // const hash = CryptoJS.HmacMD5('Message', 'Secret Passphrase');
            merchantAccount: 'maximkarlov_github_io',
            merchantDomainName: 'www.market.ua',
            merchantSignature: `${hash}`,
            orderReference: 'DH783019',
            orderDate: '1415379863',
            amount: '1547.36',
            currency: 'UAH',
            productName: 'Процессор Intel Core i5-4670 3.4GHz',
            productPrice: '1000',
            productCount: '1',
            clientFirstName: 'Вася',
            clientLastName: 'Васечкин',
            // clientEmail: 'some@mail.com',
            // clientPhone: '380631234567',
            language: 'UA',
        },
        function (response) {
            // on approved
            console.log(response);
        },
        function (response) {
            // on declined
            console.log(response);
        },
        function (response) {
            // on pending or in processing
            console.log(response);
        }
    );
}

export default { pay };
// const getRandomInt = (max) => {
//     return Math.floor(Math.random() * max);
// };

// const randomOrderID = getRandomInt(max);

// console.log('Random', randomOrderID);
