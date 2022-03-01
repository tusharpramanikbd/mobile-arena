import { fetchPhoneList } from "./fetchData.js";
import { initShowDetailsEventListener, removeProductDetails } from "./phoneDetails.js"

let btnSearch, sectionPhoneList, noPhoneFound, spinnerSection, sectionShowAll, btnShowAll, allPhoneList;

// Initialize the UI element
const initUI = () => {
  btnSearch = document.querySelector("#btn-search");
  sectionPhoneList = document.querySelector(".section-phone-list");
  noPhoneFound = document.querySelector(".no-phone-found-section");
  spinnerSection = document.querySelector(".spinner-section");
  sectionShowAll = document.querySelector(".section-show-all");
}

initUI();

// Checking if the phone details visible or not
const checkPhoneDetailsVisible = () => {
  const element = document.querySelector(".container-phone-details");
  if(element){
    removeProductDetails();
  }
}

// Button search event listener
btnSearch.addEventListener("click", async (e)=>{
  e.preventDefault();
  spinnerSection.classList.add("show-element");
  const inputSearch = document.querySelector("#input-search").value.toLowerCase();
  checkPhoneDetailsVisible();

  try {
    const result = await fetchPhoneList(inputSearch);
    const phoneList = result.data;
    if(phoneList.length < 1){
      showEmptyList();
      sectionShowAll.classList.remove("show-element");
    }
    else{
      if(phoneList.length > 20){
        allPhoneList = phoneList;
        const reducedPhoneList = phoneList.slice(0, 20);
        showPhoneList(reducedPhoneList);
        sectionShowAll.classList.add("show-element");
        initShowAllButton();
      }
      else{
        showPhoneList(phoneList);
        sectionShowAll.classList.remove("show-element");
      }
      
    }
  } catch (error) {
    console.log(error);
    spinnerSection.classList.remove("show-element");
  }
})

// Show all button functionality
const initShowAllButton = () => {
  btnShowAll = document.querySelector("#btn-show-all");
  btnShowAll.addEventListener("click",()=>{
    showPhoneList(allPhoneList);
  })
}

// Show empty list text
const showEmptyList = () => {
  sectionPhoneList.classList.remove("show-element");
  spinnerSection.classList.remove("show-element");
  noPhoneFound.classList.add("show-element");
}

// Show phone list
const showPhoneList = (phoneList) => { 
  spinnerSection.classList.remove("show-element");
  noPhoneFound.classList.remove("show-element");
  sectionPhoneList.classList.add("show-element");

  const phoneListContainer = document.querySelector(".phone-list-container");

  const phoneListHtml = phoneList
    .map((phone) => {
      const {
        phone_name : phoneName,
        brand,
        image,
        slug : id
      } = phone;
      return `<div class="col-12 col-md-6 col-lg-4">
      <div class="card p-2">
        <img src="${image}" style="height:25rem" class="card-img-top" alt="${phoneName}">
        <div class="mt-2 body-details">
          <h5 class="card-title">Name: ${phoneName}</h5>
          <p class="card-text mb-5">Brand: ${brand}</p>
          <a href="#section-phone-details" data-id=${id} class="btn btn-primary btn-details">Details</a>
        </div>
      </div>
    </div>`;
    })
    .join("");

    phoneListContainer.innerHTML = phoneListHtml;
    sectionShowAll.classList.remove("show-element");

    initShowDetailsEventListener();
}




