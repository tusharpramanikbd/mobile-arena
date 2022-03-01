import { fetchPhoneList } from "./fetchData.js";


const btnSearch = document.querySelector("#btn-search");

btnSearch.addEventListener("click", async (e)=>{
  e.preventDefault();
  const inputSearch = document.querySelector("#input-search").value;

  try {
    const result = await fetchPhoneList(inputSearch);
    const phoneList = result.data;
    phoneList.forEach((item)=>{
      console.log(item);
    })
  } catch (error) {
    console.log(error);
  }
})


