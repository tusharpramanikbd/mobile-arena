const phoneListBaseURL = "https://openapi.programming-hero.com/api/phones?search=";
let phoneDetailsBaseURL = "https://openapi.programming-hero.com/api/phone/";

const fetchPhoneList = async (searchData) => {
  let phoneListURL = `${phoneListBaseURL}${searchData}`;
  try{
    let response = await fetch(phoneListURL);
    return await response.json();
  }catch(err){
    console.error(err);
  }
}

export { fetchPhoneList };