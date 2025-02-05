import { ApiData, ApiDataCity } from "./types.ts";


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