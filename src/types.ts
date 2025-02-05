
export interface ApiData {
    status: string;
    data: City[];
  }

  export interface ApiDataCity {
    status: string;
    data: City;
  }

export interface City {
    id: number;
    img_url: string;
    city_name: string;
    city_location: string;
    city_population?: string;
    city_description?: string;
}