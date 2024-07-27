![workflow](https://github.com/do-/node-pwd-shaker/actions/workflows/main.yml/badge.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)

`pwd-shaker` is a node.js library simpifying some routine tasks related to one-way password encryption (hash computing).

It is totally based on the standard [crypto](https://nodejs.org/api/crypto.html) module and use no external dependencies.

As the basic feature here is to apply so called [_salt_](https://en.wikipedia.org/wiki/Salt_(cryptography)) and [_pepper_](https://en.wikipedia.org/wiki/Pepper_(cryptography)), it's named after the related [condiment dispensers](https://en.wikipedia.org/wiki/Salt_and_pepper_shakers).

The library features two classes:
* [PasswordShaker](https://github.com/do-/node-pwd-shaker/wiki/PasswordShaker) implementing basic functionality;
* [PasswordShakerFile](https://github.com/do-/node-pwd-shaker/wiki/PasswordShakerFile), the derived class with `pepper` kept in a file instead of RAM.

# Installation
```sh
npm install pwd-shaker
```
# Usage
```js
const {PasswordShakerFile} = require ('pwd-shaker')

const shaker = new PasswordShakerFile ({
  path         : '/etc/this_information_system/secret_pepper',
  // order     : ['pepper', 'salt', 'pwd'],
  // algorithm : 'sha256',
  // encoding  : 'hex',
})

const {login, pwd} = //...available from input
const salt = shaker.sprinkle (32)
const hash = shaker.cook (pwd, salt)
// store login+hash+salt instead of login+pwd

//...then...

const {login, pwd} = //...available from input
const {hash, salt} = //...fetch by login
if (shaker.test (hash, pwd, salt)) {
  // auth OK
}
else {
  // kick out
}
```
