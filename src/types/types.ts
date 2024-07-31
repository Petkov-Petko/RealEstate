export interface UserSignIn {
    username: string;
    email: string;
    password: string;
}

export interface UserLogIn {
    email: string;
    password: string;
}

export interface Property {
    name: string;
    square: number | null;
    price: number | null;
    rooms: number | null;
    type: string;
    baths: number | null;
    city: string;
    street: string;
    description: string;
    deal: string;
    photos: string[];
    lat: number,
    lng: number,
    id: string;
    likes: string[];
}

export interface UserDetails {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    country: string;
    city: string;
    photo: string;
}