//TODO replace appKey and appSecret
export const appKey = "kid_BJNNEcX6S";
export const appSecret = "0017b630525447f0a3689b68497eb8c4";

function saveData(key, value) {
  localStorage.setItem(key+appKey, JSON.stringify(value));
}

export function getData(key){
  return localStorage.getItem(key+appKey);
}

export function saveUser(data){
  saveData("userInfo",data);
  saveData("authToken", data._kmd.authtoken);
}

export function removeUser(){
  localStorage.clear();
}