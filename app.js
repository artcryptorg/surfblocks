"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let nonce = 0;
function generateHash(input) {
    return __awaiter(this, void 0, void 0, function* () {
        // encode as UTF-8
        const msgBuffer = new TextEncoder().encode(input);
        // hash the message
        const hashBuffer = yield crypto.subtle.digest('SHA-256', msgBuffer);
        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        // convert bytes to hex string
        const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
        return hashHex;
    });
}
function calculateHashWithNonce(nonce) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = 'Hello World' + nonce;
        return generateHash(data);
    });
}
function mine() {
    return __awaiter(this, void 0, void 0, function* () {
        let hash;
        do {
            hash = yield calculateHashWithNonce(++nonce);
        } while (hash.startsWith('0000') === false);
        console.log(`Hash: ${hash}, nonce: ${nonce}`);
    });
}
mine();
