//TODO replace appKey and appSecret
export const appKey = "kid_B1SlXAuaH";
export const appSecret = "7c79c3d2912e41a3b4811b987294e0ce";

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