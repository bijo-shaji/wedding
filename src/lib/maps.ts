/**
 * Google Maps Navigation & Venue Helpers
 */

export interface VenueLocation {
  name: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  googleMapsDirectionsUrl: string;
  googleMapsPlaceUrl: string;
}

export const VENUE_LOCATIONS: Record<string, VenueLocation> = {
  engagement: {
    name: "Landmark Convention Center & Auditorium",
    address: "MC Road, Valakom",
    landmark: "Near Valakom Junction",
    city: "Kollam",
    state: "Kerala",
    pincode: "691532",
    googleMapsDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Landmark+Convention+Center+and+Auditorium,+Valakom,+Kollam,+Kerala",
    googleMapsPlaceUrl:
      "https://maps.google.com/?q=Landmark+Convention+Center+and+Auditorium,+Valakom,+Kerala+691532",
  },
  matrimony: {
    name: "St Mary’s Cathedral Punalur",
    address: "Cathedral Road, Punalur",
    landmark: "Diocese of Punalur",
    city: "Kollam",
    state: "Kerala",
    pincode: "691305",
    googleMapsDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=St+Marys+Cathedral+Punalur+Kollam+Kerala",
    googleMapsPlaceUrl:
      "https://maps.google.com/?q=St+Marys+Cathedral+Punalur+Kerala+691305",
  },
  reception: {
    name: "K G Convention Centre",
    address: "Bharanikavu - Kollam - Shengottai Road",
    landmark: "Punalur",
    city: "Kollam",
    state: "Kerala",
    pincode: "691305",
    googleMapsDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=KG+Convention+Centre+Punalur+Kollam+Kerala",
    googleMapsPlaceUrl:
      "https://maps.google.com/?q=K+G+Convention+Centre+Punalur+Kerala+691305",
  },
};
