import { ApiLocation } from '../interfaces/index.js';

export class LatLngObject {
  public lat: number;
  public lng: number;
  public radius: number;
}

export class Location {
  public id: number;
  public name: string;
  public users: number[];

  constructor(locaiton: ApiLocation) {
    this.id = locaiton.id;
    this.name = locaiton.name;
    this.users = locaiton.users;
  }
}
