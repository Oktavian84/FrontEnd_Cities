import "./style.scss";
import { getCities, getCity, createCity, deleteCity } from "./api.ts"
import { City } from "./types.ts"

const allCities = document.querySelector ("#allcitites") as HTMLDivElement;
const errormsg = document.querySelector("#error-container") as HTMLDivElement;
const cityInfo = document.querySelector(".offcanvas-body") as HTMLDivElement;
const inputCityName  = document.querySelector("#inputCityName") as HTMLInputElement;
const inputCityLocation = document.querySelector("#inputCityLocation") as HTMLInputElement;
const inputCityPopulation = document.querySelector("#inputCityPopulation") as HTMLInputElement;
const inputCityDescription = document.querySelector("#inputCityDescription") as HTMLInputElement;
const createCityElement = document.querySelector("#createCity") as HTMLButtonElement;


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

  } catch (error) {
  errormsg.innerHTML = `<h2 class="errorMsg">Something whent wrong when trying to get the cities data, ${error}</h2>`
  };
};

createCityElement.addEventListener("click", () => {

  const formCreateCity = document.querySelector(".formCreateCity") as HTMLFormElement;
  formCreateCity.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputCityUrl = document.querySelector<HTMLInputElement>("#inputCityImgUrl")!.value;
    console.log(inputCityUrl);
    const newCity: City = {
      img_url: inputCityUrl,
      city_name: inputCityName.value.trim(),
      city_location: inputCityLocation.value.trim(),
      city_population: inputCityPopulation.value.trim() || null!,
      city_description: inputCityDescription.value.trim() || null!,
  };
    console.log(inputCityUrl);
  try {
    await createCity(newCity);
    renderCities();
  } catch (error) {
    console.error("Error creating city:", error);
  }
  })
});

const setupInfoButtons = () => {
  const infoButtons = document.querySelectorAll(".info-btn");
  infoButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const cityID = Number((e.target as HTMLButtonElement).getAttribute("data-id-info"));
      const city: City = await getCity(cityID);

      const cityInfo = document.querySelector(".offcanvas-body") as HTMLDivElement;
      cityInfo.innerHTML = `
        <div class="canvas">
          <div class="cityImageDiv">
            <img src="${city.img_url}" class="cityInfoImage" alt="Bild på ${city.city_name}">
          </div>
          <div class="cityInfo">
            <h2 class="cityTitle text-center">${city.city_name}</h2>
            <p class="cityLocation text-center">Location: ${city.city_location}</p>
            <p class="cityPopulation text-center">Population: ${city.city_population}</p>
            <p class="cityDescription text-center">Description: ${city.city_description}</p>
            <button class="btn btn-danger btn-m update-btn mt-5" type="button">Update</button>
          </div>
        </div>`;
    });
  });
};

const setupDeleteButtons = () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const cityID = Number((e.target as HTMLButtonElement).getAttribute("data-id-delete"));
      await deleteCity(cityID);
      await updateUI();
    });
  });
};

const updateUI = async () => {
  await renderCities();
  setupInfoButtons();
  setupDeleteButtons();
};

await renderCities();
setupInfoButtons();
setupDeleteButtons();
