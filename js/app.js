import { fetchPhoneList } from "./fetchData.js";


const btnSearch = document.querySelector("#btn-search");

btnSearch.addEventListener("click", async (e)=>{
  e.preventDefault();
  const inputSearch = document.querySelector("#input-search").value;

  try {
    const result = await fetchPhoneList(inputSearch);
    const phoneList = result.data;
    showPhoneList(phoneList);
  } catch (error) {
    console.log(error);
  }
})

const showPhoneList = (phoneList) => {
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


