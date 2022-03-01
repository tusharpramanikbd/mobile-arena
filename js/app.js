import { fetchPhoneList } from "./fetchData.js";


let btnSearch, sectionPhoneList, noPhoneFound, spinnerSection, sectionShowAll, btnShowAll, allPhoneList;

const initUI = () => {
  btnSearch = document.querySelector("#btn-search");
  sectionPhoneList = document.querySelector(".section-phone-list");
  noPhoneFound = document.querySelector(".no-phone-found-section");
  spinnerSection = document.querySelector(".spinner-section");
  sectionShowAll = document.querySelector(".section-show-all");
}

initUI();

const initShowAllButton = () => {
  btnShowAll = document.querySelector("#btn-show-all");
  btnShowAll.addEventListener("click",()=>{
    showPhoneList(allPhoneList);
  })
}


btnSearch.addEventListener("click", async (e)=>{
  e.preventDefault();
  spinnerSection.classList.add("show-element");
  const inputSearch = document.querySelector("#input-search").value.toLowerCase();

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

const showEmptyList = () => {
  sectionPhoneList.classList.remove("show-element");
  spinnerSection.classList.remove("show-element");
  noPhoneFound.classList.add("show-element");
}

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
      } = phone;
      return `<div class="col-12 col-md-6 col-lg-4">
      <div class="card p-2">
        <img src="${image}" style="height:25rem" class="card-img-top" alt="${phoneName}">
        <div class="mt-2 body-details">
          <h5 class="card-title">Name: ${phoneName}</h5>
          <p class="card-text mb-5">Brand: ${brand}</p>
          <a href="#" class="btn btn-primary btn-details">Details</a>
        </div>
      </div>
    </div>`;
    })
    .join("");

    phoneListContainer.innerHTML = phoneListHtml;
    sectionShowAll.classList.remove("show-element");
}


