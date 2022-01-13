//Criptografia de numeros
//var bcrypt = require('bcryptjs');
//var salt = bcrypt.genSaltSync(1);
//var hash = bcrypt.hashSync("B4c0/\/", salt);
//console.log(hash);

var CryptoJS = require("crypto-js");

var SHA256 = require("crypto-js/sha256");
console.log(SHA256("Message").toString(CryptoJS.enc.Base64));

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt('edujr004@gmail.com', 'secret key 123').toString();

// // Decrypt
// var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log('original: ', originalText, ' criptografado: ', ciphertext);

//var hash = CryptoJS.SHA256("Message").toString(CryptoJS.enc.Base64);