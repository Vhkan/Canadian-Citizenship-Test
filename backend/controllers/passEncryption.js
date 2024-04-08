//Password encryption made for testing purposes
const bcrypt = require('bcrypt');

const password = '123';
const SECRET = 'this_is_real_secret';

// Hash the password with bcrypt
const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

console.log('Hashed password:', hashedPassword);

//password = $2b$10$e1SiF7zTtQtsudomQ1RfYO6Zm3dc2LfVL.aHzI.YE.9eanC.a16GS
//123 = $2b$10$MXEm1uN455msvHbUdAFw6eT2us6eQ0CyO9CTdFhxOMWLPmG6cxFGC