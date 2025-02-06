import { ApiData, ApiDataCity, City } from "./types.ts";


const BASE_API = "http://localhost:3001"

export const getCities = async () => {
	const res = await fetch(`${BASE_API}/cities`);
	if (!res.ok) {
		throw new Error(`Could not fetch the data. Status code was: ${res.status} ${res.statusText}`);
	}
  
	const data: ApiData = await res.json();

	return data.data;
}

export const getCity = async (id: number) => {
	const res = await fetch(`${BASE_API}/cities/${id}`);
	if (!res.ok) {
		throw new Error(`Could not fetch the data. Status code was: ${res.status} ${res.statusText}`);
	}
	
	const data: ApiDataCity = await res.json();
	return data.data
}

export const createCity = async (cityData: City) => {
	console.log("insideThePost", cityData);
	const res = await fetch(`${BASE_API}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cityData),
      });
	  if(!res.ok) {
		throw new Error(`Could not send the data. Status code was: ${res.status} ${res.statusText}`)
	  }
};

export const deleteCity = async (id: number) => {
	const res = await fetch(`${BASE_API}/cities/${id}`, {
		method: 'DELETE'
	});
	if (!res.ok) {
		throw new Error(`Could not delete the data. Status code was: ${res.status} ${res.statusText}`);
	}
}