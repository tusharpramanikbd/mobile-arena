import { fetchPhoneDetails } from "./fetchData.js";

const initShowDetailsEventListener = () => {
  const btnShowDetails = [...document.querySelectorAll(".btn-details")];
  btnShowDetails.forEach((buttonItem) => {
    buttonItem.addEventListener("click", async (e)=>{
      try {
        const result = await fetchPhoneDetails(e.currentTarget.dataset.id);
        const phoneDetails = result.data;
        showPhoneDetails(phoneDetails);
      } catch (error) {
        console.log(error);
      }
    });
  });
}

const showPhoneDetails = (phoneDetails) => {
  
  const {name, releaseDate, brand} = phoneDetails;
  const mainFeatures = phoneDetails.mainFeatures;
  const { chipSet, displaySize, memory, storage} = mainFeatures;
  const sectionPhoneDetails = document.querySelector("#section-phone-details");
  const sensors = mainFeatures.sensors.join(", ");
  let others, WLAN, Bluetooth, GPS, NFC, Radio, USB;
  if(phoneDetails.hasOwnProperty('others')){
    others = phoneDetails.others;

    WLAN = others.WLAN;
    Bluetooth = others.Bluetooth;
    GPS = others.GPS;
    NFC = others.NFC;
    Radio = others.Radio;
    USB = others.USB;
  }
  else{
    others = null;
  }

  const othersHtml = `<h5 class="text-decoration-underline fw-bold mb-4">Others:</h5>
  <div class="row">
    <div class="col-4">
      <p class="fw-bold">WLAN:</p> 
    </div>
    <div class="col-8">
      <p>${WLAN}</p> 
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <p class="fw-bold">Bluetooth:</p> 
    </div>
    <div class="col-8">
      <p>${Bluetooth}</p> 
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <p class="fw-bold">GPS:</p> 
    </div>
    <div class="col-8">
      <p>${GPS}</p> 
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <p class="fw-bold">NFC:</p> 
    </div>
    <div class="col-8">
      <p>${NFC}</p> 
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <p class="fw-bold">Radio:</p> 
    </div>
    <div class="col-8">
      <p>${Radio}</p> 
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <p class="fw-bold">USB:</p> 
    </div>
    <div class="col-8">
      <p>${USB}</p> 
    </div>
  </div>`;

  const phoneDetailsHtml = `<div class="container mb-5 bg-white p-3 rounded shadow-lg container-phone-details">
  <h1 class="text-center mb-5">Phone Details</h1>
  <div>
    <div class="row gy-5 gy-lg-0 gx-lg-5 align-items-center">
      <div class="col-12 col-lg-6">
        <img class="d-block w-100 img-phone-details" src="./icon/img-1.jpg" alt="img-1">
      </div>
      <div class="col-12 col-lg-6">
        <div>
          <div class="row">
            <div class="col-4">
              <p class="fw-bold">Name:</p> 
            </div>
            <div class="col-8">
              <p>${name}</p> 
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <p class="fw-bold">Brand:</p> 
            </div>
            <div class="col-8">
              <p>${brand}</p> 
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <p class="fw-bold">Release Date:</p> 
            </div>
            <div class="col-8">
              <p>${releaseDate? releaseDate : "No Release Date Found"}</p> 
            </div>
          </div>
          <h5 class="text-decoration-underline fw-bold mb-4">Main Features:</h5>
          <div class="row">
            <div class="col-4">
              <p class="fw-bold">Storage:</p> 
            </div>
            <div class="col-8">
              <p>${storage}</p> 
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <p class="fw-bold">Display Size:</p> 
            </div>
            <div class="col-8">
              <p>${displaySize}</p> 
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <p class="fw-bold">ChipSet:</p> 
            </div>
            <div class="col-8">
              <p>${chipSet}</p> 
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <p class="fw-bold">Memory:</p> 
            </div>
            <div class="col-8">
              <p>${memory}</p> 
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <p class="fw-bold">Sensors:</p> 
            </div>
            <div class="col-8">
              <p>${sensors}</p> 
            </div>
          </div>
          ${others? othersHtml : ""}
        </div>
      </div>
    </div>
  </div>
  <i class="fa-solid fa-xmark text-danger fs-1 btn-cross"></i>
</div>`;

sectionPhoneDetails.innerHTML = phoneDetailsHtml;
initCrossButtonListener();
}

const initCrossButtonListener = () => {
  const btnCross = document.querySelector(".btn-cross");
  btnCross.addEventListener("click", ()=>{
    removeProductDetails();
  })
}

const removeProductDetails = () => {
  const element = document.querySelector(".container-phone-details");
  element.parentNode.removeChild(element);
}

export { initShowDetailsEventListener, removeProductDetails};