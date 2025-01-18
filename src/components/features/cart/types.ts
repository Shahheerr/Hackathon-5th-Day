/**
 * Represents an item in the shopping cart
 */
export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string | unknown;
}

/**
 * Props for the CartItem component
 */
export interface CartItemProps {
    item: CartItem;
    onUpdateQuantity: (id: number, newQuantity: number) => void;
    onRemove: (id: number) => void;
}
