import { fetchPhoneList } from "./fetchData.js";


let btnSearch, sectionPhoneList, noPhoneFound;

const initUI = () => {
  btnSearch = document.querySelector("#btn-search");
  sectionPhoneList = document.querySelector(".section-phone-list");
  noPhoneFound = document.querySelector(".no-phone-found-section");
}

initUI();

btnSearch.addEventListener("click", async (e)=>{
  e.preventDefault();
  const inputSearch = document.querySelector("#input-search").value;

  try {
    const result = await fetchPhoneList(inputSearch);
    const phoneList = result.data;
    if(phoneList.length < 1){
      showEmptyList();
    }
    else{
      showPhoneList(phoneList);
    }
  } catch (error) {
    console.log(error);
  }
})

const showEmptyList = () => {
  sectionPhoneList.classList.remove("show-element");
  noPhoneFound.classList.add("show-element");
}

const showPhoneList = (phoneList) => { 
  sectionPhoneList.classList.add("show-element");
  noPhoneFound.classList.remove("show-element");

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
}


