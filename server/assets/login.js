const TOKEN_KEY = "jwtToken";
const USER_INFO = "userInfo";
const jwtToken = document
  .querySelector('meta[name="jwt-token"]')
  .getAttribute("content");
const userInfo = document
  .querySelector('meta[name="user-info"]')
  .getAttribute("content");

sessionStorage.setItem(TOKEN_KEY, `"${jwtToken}"`);
sessionStorage.setItem(USER_INFO, userInfo.replaceAll(`!!**`, `"`));

window.location.href = "/admin";
