import "./style.scss";
import { getCities } from "./api.ts"
import { City } from "./types.ts"
const allCities = document.querySelector ("#allcitites") as HTMLDivElement;


const renderCities = async () => {
  const cities: City[] = await getCities();

  allCities.innerHTML = cities.map ((city) => {
    return `
        <div class="card1">
          <img src="${city.img_url}" class="img" alt="Bild på ${city.city_name}">
          <div class="card-body mt-3">
            <h5 class="text-center city">${city.city_name}</h5>
          </div>
          <div class="text-center">
            <p>Location: ${city.city_location}</p>
          </div>
          <div class="card-body d-flex flex-row justify-content-evenly gap-5">
            <button class="btn btn-primary btn-m info-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" data-id-info="${city.id}">Info</button>
            <button class="btn btn-danger btn-m delete-btn" type="button" data-id-delete="${city.id}">Delete</button>
          </div>
        </div>`;
      })
      .join("");
  }

renderCities ();

