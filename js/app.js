const btnSearch = document.querySelector("#btn-search");

btnSearch.addEventListener("click", (e)=>{
  e.preventDefault();
  const inputSearch = document.querySelector("#input-search").value;

  console.log(inputSearch);
})


