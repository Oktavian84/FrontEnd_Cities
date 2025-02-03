
export interface Apidata {
    status: string;
    data: City[];
  }

export interface City {
    id: number;
    img_url: string;
    city_name: string;
    city_location: string;
}