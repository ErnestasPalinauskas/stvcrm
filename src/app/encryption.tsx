//Duomenų užšifravimas
//Sukūrė: Karolis Momkus

import { Message, sha256 } from "js-sha256";

// Sugeneruoja salt, kuris naudojamas slaptažodžių šifravimui, vėliau panaikinti export !!!!
export function GenerateSalt() {
  let salt: String = "";

  for (let i = 0; i < 10; i++) {
    salt += Math.floor(Math.random() * 10).toString();
  }

  return salt;
}

// Sugeneruoja užkoduotą string, iš duoto teksto.
//paduodamas tekstas, kurį norima užkoduoti ir salt
// Naudojamas statnis užšifravimo raktas
export function EncryptSHA256(plainText: string, salt: String) {
  const key = "Ei!SiauliuTelevizijaDaugirdasYraPatsNuostabiausiasDestytojasVisojePlanetojeBuckis";
  const textToEncrypt: String = plainText + "" + salt;

  // HMAC
  const ecryptedText: String = sha256.hmac(key, textToEncrypt as Message);

  return ecryptedText;
}
