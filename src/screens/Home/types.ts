export interface HotelDetailsState {
    occupancy: Field;
}

export interface Field {
    fieldName: string;
    type: string;
    value: any;
}

// interface Occupancy {
//     rateType: string;
//     occupancy: {
//         adult: number;
//         child: number;
//         noOfRooms: number;
//         rateType: string;
//     }[];
//     adultCount: number;
//     childCount: number;
// }