let phoneListBaseURL = "https://openapi.programming-hero.com/api/phones?search=";
let phoneDetailsBaseURL = "https://openapi.programming-hero.com/api/phone/";

// Fetch phone list from api address
const fetchPhoneList = async (searchData) => {
  let phoneListURL = `${phoneListBaseURL}${searchData}`;
  try{
    let response = await fetch(phoneListURL);
    return await response.json();
  }catch(err){
    console.error(err);
  }
}

// Fetch phone details from api address
const fetchPhoneDetails = async (phoneId) => {
  let phoneDetailsURL = `${phoneDetailsBaseURL}${phoneId}`;
  try{
    let response = await fetch(phoneDetailsURL);
    return await response.json();
  }catch(err){
    console.error(err);
  }
}

export { fetchPhoneList, fetchPhoneDetails };