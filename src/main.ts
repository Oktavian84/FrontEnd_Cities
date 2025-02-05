import "./style.scss";
import { getCities, getCity, deleteCity } from "./api.ts"
import { City } from "./types.ts"

const allCities = document.querySelector ("#allcitites") as HTMLDivElement;
const errormsg = document.querySelector("#error-container") as HTMLDivElement;
const cityInfo = document.querySelector(".offcanvas-body") as HTMLDivElement;
const createCity = document.querySelector("#createCity") as HTMLButtonElement;
const createCityForm = document.querySelector(".offcanvas-body2") as HTMLDivElement;


const renderCities = async () => {
  try{
  const cities: City[] = await getCities();

  allCities.innerHTML = cities.map ((city) => {
    return `
        <div class="body">
          <img src="${city.img_url}" class="img" alt="Bild på ${city.city_name}">
          <div class="card-body mt-3">
            <h2 class="text-center">${city.city_name}</h2>
            <p class="text-center">Location: ${city.city_location}</p>
          </div>
          <div class="card-body d-flex flex-row justify-content-evenly gap-5 mt-1">
            <button class="btn btn-primary btn-m info-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" data-id-info="${city.id}">Info</button>
            <button class="btn btn-danger btn-m delete-btn" type="button" data-id-delete="${city.id}">Delete</button>
          </div>
        </div>`;
      })
      .join("");

      const infoButtons = document.querySelectorAll(".info-btn");
      infoButtons.forEach((button) => {
        button.addEventListener("click", async (e) => {
          const cityID = Number((e.target as HTMLButtonElement).getAttribute("data-id-info"));
          const cities: City = await getCity(cityID);

          cityInfo.innerHTML = `
            <div class="canvas">
              <div class="cityImageDiv">
                <img src="${cities.img_url}" class="cityInfoImage" alt="Bild på ${cities.city_name}">
              </div>
              <div class="cityInfo">
                <h2 class="cityTitle text-center">${cities.city_name}</h2>
                <p class="cityLocation text-center">Location: ${cities.city_location}</p>
                <p class="cityPopulation text-center">Population: ${cities.city_population}</p>
                <p class="cityDescription text-center">Description: ${cities.city_description}</p>
                <button class="btn btn-danger btn-m mt-5" type="button">Update</button>
              </div>
            </div>`;
        });
      });

      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", async (e) => {
          const cityID = Number((e.target as HTMLButtonElement).getAttribute("data-id-delete"));
          deleteCity(cityID);
        })
      })
  } catch (error) {
  errormsg.innerHTML = `<h2 class= "errorMsg">Something whent wrong when trying to get the cities data, ${error}</h2>`
  };
};

createCity.addEventListener("click", () => {
  createCityForm.innerHTML =`
    <form id="createCityForm" class="formCreateCity">  
      <div class="inputForm">
        <label for="inputCityImgUrl" class="form-label">City Image URL</label>  
        <input type="text" class="form-control" id="inputCityImgUrl" placeholder="City Image URL">
      </div>

      <div class="inputForm">
        <label for="inputCityName" class="form-label">City Name</label>
        <input type="text" class="form-control" id="inputCityName" placeholder="City Name">
    </div>

      <div class="inputForm">
        <label for="inputCityLocation" class="form-label">City Location</label>
        <input type="text" class="form-control" id="inputCityLocation" placeholder="City Location">
      </div>

      <div class="inputForm">
        <label for="inputCityPopulation" class="form-label">City Population</label>
        <input type="text" class="form-control" id="inputCityPopulation" placeholder="City Population">
      </div>

      <div class="inputForm">
        <label for="inputCityDescription" class="form-label">City Description</label>
        <input type="textbox" class="form-control" id="inputCityDescription" placeholder="City Description">
      </div>
    </form>`;
});

renderCities();

