# RELEASE LOG

## 1.1.4

### Fixes

* Update `capsule-core-js` version `1.0.8`.

### Enhancements

* Bold balances

---

## 1.1.3

### Fixes

* Remove `window.capsuleWallet.isConnected`.
* Using arrow function, the code no longer needed `bind(this)` for functions.
* Safety clear history.
* Update `capsule-core-js` version `1.0.6`.
* Add Kambria footer link.

### Enhancements

* Add reference balance when selecting the address.

---

## 1.1.2

### Fixes

* We stop saying something nonsense such as "Minor release", "Major release".
* Update the documents.
* Logout function would delete everything even cache.
* Replace package `node-sass` by `sass`.

### Enhancements

* Pre-validate format of Isoxys wallets before executions.
* Allow editting derivation path.
* We decided the `pageRefreshing` parameter of options will be `true` in default.
* Use `capsule-core-js` which detached from this repository and built as a separate repository.

---

## 1.1.1

* Major release.

### Fixes

* Update the documents.
* No longer using `prop-types` package.

### Enhancements

* New hero - StateMaintainer - came and supported session maintained in new tabs 🤝🤝🤝.
* [DEVELOPER TRIGGED] Because of reliable reasons, U2F is preferred to use.

---

## 1.1.0

* Major release.

### Fixes

* Update the documents.
* Remove subtitle and testing logo.
* Beautify Softwallet icon.
* To avoid mistaking the package funtionality 🤯, we decided to change the title from "Capsule Wallet" to "Capsule Bridge".
* No longer use a seperate font, for now we will follow the font in your sides.

### Enhancements

* Support Goerli network (Network ID is 5️⃣).
* Support Page-Refreshing, that led us to introduce `window.capsuleWallet.logout()` function, new `props` includes `networkId, restrictedNetwork, pageRefreshing`.
* Group MEW to the type of Hybridwallet.
* A 🎁 would be hidden for fun, let's find it.
* [DEVELOPER TRIGGED] We unified the way of generating `web3` instance by `web3Factory`.
* [DEVELOPER TRIGGED] Use `sessionStorage` as a safe way for cache. Then we can say goodbye to `node-cache`.

---

## 1.0.10

* Major release.

### Fixes

* Improve the documents.
* Migrate to Kambria platform.

### Enhancements

* Nothing.

---

## 1.0.9

* Minor release.

### Fixes

* Improve the documents.
* Change `chainCode` to `networkId` for more correction of term.

### Enhancements

* Export Trezor module.

---

## 1.0.8

* Major release.

### Fixes

* Improve the documents.
* Change texts more friendly.
* Migrate devDependencies to dependencies.
* Fix bugs for mnemonic.
* Remove doubly imported animated.css.

### Enhancements

* Remove webpack (Because the main application will use React and it supports Webpack, so we must not pre-build by Webpack anymore).
* Reduce code size from `4,056,359` bytes to `710,240` bytes (about 82.5% 🎉🎉🎉).
* Support Trezor One.
* Support HDWallet for Hardwallet (loading address 7x faster ⚡️️️⚡️️️⚡️️️).

---

## 1.0.7

* Minor release.

### Fixes

* Improve the documents.

### Enhancements

* Enhance code view.
* Enhance security.

---

## 1.0.6

* Official release.

### Fixes

* Nothing.

### Enhancements

* Publish documents.
* Publish source code.
* 📣 📣 📣 Show off to community.

---

## 1.0.5 - 1.0.0

### Introduction

* Internal releases.

### Fixes

* Nothing.

### Enhancements

* Nothing.