const initShowDetailsEventListener = () => {
  const btnShowDetails = [...document.querySelectorAll(".btn-details")];
  btnShowDetails.forEach((buttonItem) => {
    buttonItem.addEventListener("click", (e)=>{
      console.log(e.currentTarget.dataset.id);
    });
  });
}

export { initShowDetailsEventListener };