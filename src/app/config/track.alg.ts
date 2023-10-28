import { Truck } from "../interfaces/truck"

export const Trucks: Truck[] = [
    {id: 1, name: 'pickup', heigh: 7.0, width: 6.0, length: 8.0, weight: 1902.89},
    {id: 2, name: 'cargo van', heigh: 10.0, width: 7.0, length: 10.0, weight: 3964.36},
    {id: 3, name: 'Box truck', heigh: 10.5, width: 7.0, length: 26, weight: 10822.699},
    {id: 4, name: 'Courier', costPerKm: 15},
]

export const Prices = [
    {
        from: 3,
        to: 50,
        price: 12
    },
    {
        from: 51,
        to: 100,
        price: 16
    },
    {
        from: 101,
        to: 200,
        price: 22
    },
    {
        from: 201,
        to: 500,
        price: 33
    },
    {
        from: 501,
        to: 1000,
        price: 50
    },
    {
        from: 1001,
        price: 72
    }
]