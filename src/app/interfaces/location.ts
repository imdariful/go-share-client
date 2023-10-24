export interface Location {
    startCoordinates: [number, number];
    startLocation: string;
    endCoordinates: [number, number];
    endLocation: string;
    time: string;
    date: string;
    duration: number;
    distance: number;
}


export interface CargoAndVehicle {
    cargo: String[];
    vehicle: string;
    description: string;
}
