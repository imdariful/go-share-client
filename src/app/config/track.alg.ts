import { Truck } from "../interfaces/truck"

export const Trucks: Truck[] = [
    {
        id: 1,
        name: 'pickup',
        height: 7,
        width: 6,
        length: 8,
        weight: 1902.89,
        img: 'pickup_truck.png',
        title: 'Pickup Truck',
        dis: 'Great for 1-2 pieces of furniture, mattress, small appliances, lumber',
        cost: 0
    },
    {
        id: 2,
        name: 'cargo van',
        height: 10,
        width: 7,
        length: 10,
        weight: 3964.36,
        img: 'cargo_van.png',
        title: 'cargo van',
        dis: 'Ideal for sectional sofas, small home moves, pallets, large parcels',
        cost: 0
    },
    {
        id: 3,
        name: 'Box truck',
        height: 10.5,
        width: 7,
        length: 26,
        weight: 10822.699,
        img: 'box_truck.png',
        title: 'box truck',
        dis: 'Great for Pallets, LTL freight, FTL freight, Home Moves',
        cost: 0
    },
    {
        id: 4,
        name: 'Courier',
        costPerKm: 15,
        img: 'new_car.png',
        title: 'courier',
        dis: 'Small parcels or packages under 50 lbs. No manual labor or heavy lifting',
        cost: 0,
        height: 0,
        width: 0,
        length: 0,
        weight: 250.750,
    }

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

