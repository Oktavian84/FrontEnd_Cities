import "./style.scss";
import { getCities, getCity } from "./api.ts"
import { City } from "./types.ts"

const allCities = document.querySelector ("#allcitites") as HTMLDivElement;
const cityInfo = document.querySelector(".offcanvas-body") as HTMLDivElement;


const renderCities = async () => {
  const cities: City[] = await getCities();

  allCities.innerHTML = cities.map ((city) => {
    return `
        <div class="card1">
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

          cityInfo.innerHTML = "";
          cityInfo.innerHTML = `
            <div class="canvas">
              <h2 class="cityTitle text-center">${cities.city_name}</h2>
              <div>
                <img src="${cities.img_url}" alt="Bild på ${cities.city_name}">
              </div>
              <div>
                <p class="cityLocation">Location: ${cities.city_location}</p>
              </div>
            </div>`;
        })
      })
  }

renderCities ();

