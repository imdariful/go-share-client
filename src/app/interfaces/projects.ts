interface CargoItem {
    des: string;
    extra: boolean;
    height: number;
    lenght: number;
    pis: number;
    title: string;
    weight: number;
    width: number;
}

export interface Project {
    projectId: string;
    userId: string;
    userEmail: string;
    UserName: string;
    time: string;
    date: string;
    distance: number;
    duration: number;
    startLocation: string;
    endLocation: string;
    totalCost: number;
    truckCost: number;
    helperCost: number;
    extraCost: number,
    startCoordinates: [number, number];
    endCoordinates: [number, number];
    cargoItems: CargoItem[];
    vehcle: {
        id: number;
        dis: string;
        height: number;
        helper: boolean;
        img: string;
        length: number;
        name: string;
        title: string;
        totalWeight: number;
        weight: number;
        width: number;
    }
}
