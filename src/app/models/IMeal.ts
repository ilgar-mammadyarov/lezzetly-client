export interface IMeal {
    id: number,
    title: string,
    price: number,
    stock_quantity: number,
    is_active: Boolean,
    created_at: Date,
    updated_at: Date,
    cook: Cook,
    category: Category,
    ingredients: Ingredient,
    mealoption: MealOption
}

export interface Cook {
    id: number,
    first_name: string,
    service_place: string
}

export interface Category {
    id: number,
    title: string
}

export interface Ingredient {
    id: number,
    title: string
}

export interface MealOption {
    id: number,
    title: string
}