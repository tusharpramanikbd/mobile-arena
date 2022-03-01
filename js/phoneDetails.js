import { fetchPhoneDetails } from "./fetchData.js";

const initShowDetailsEventListener = () => {
  const btnShowDetails = [...document.querySelectorAll(".btn-details")];
  btnShowDetails.forEach((buttonItem) => {
    buttonItem.addEventListener("click", async (e)=>{
      try {
        const result = await fetchPhoneDetails(e.currentTarget.dataset.id);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    });
  });
}

export { initShowDetailsEventListener };