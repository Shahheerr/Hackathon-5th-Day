// eslint-disable-next-line import/no-anonymous-default-export
export default {
    name: 'order',
    type: 'document',
    title: 'Order',
    fields: [
        {
            name: 'userId',
            type: 'string',
            title: 'User ID', // User ka ID, jo order place kare
        },
        {
            name: 'orderItems',
            type: 'array',
            title: 'Order Items', // Saare products jo is order mein hain
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'productId',
                            type: 'string',
                            title: 'Product ID', // Product ka ID
                        },
                        {
                            name: 'title',
                            type: 'string',
                            title: 'Product Title', // Product ka naam
                        },
                        {
                            name: 'quantity',
                            type: 'number',
                            title: 'Quantity', // Kitni quantity order ki gayi hai
                        },
                        {
                            name: 'price',
                            type: 'number',
                            title: 'Price', // Ek product ka price
                        },
                        {
                            name: 'totalPrice',
                            type: 'number',
                            title: 'Total Price', // (quantity * price)
                        },
                    ],
                },
            ],
        },
        {
            name: 'totalAmount',
            type: 'number',
            title: 'Total Amount', // Order ka total price
        },
        {
            name: 'status',
            type: 'string',
            title: 'Order Status', // Order ki current state
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Processing', value: 'processing' },
                    { title: 'Shipped', value: 'shipped' },
                    { title: 'Delivered', value: 'delivered' },
                    { title: 'Cancelled', value: 'cancelled' },
                ],
            },
        },
        {
            name: 'shippingAddress',
            type: 'object',
            title: 'Shipping Address', // Address jaha order bhejna hai
            fields: [
                { name: 'fullName', type: 'string', title: 'Full Name' },
                { name: 'address', type: 'string', title: 'Address' },
                { name: 'city', type: 'string', title: 'City' },
                { name: 'postalCode', type: 'string', title: 'Postal Code' },
                { name: 'country', type: 'string', title: 'Country' },
            ],
        },
        {
            name: 'createdAt',
            type: 'datetime',
            title: 'Order Date', // Order kab place hua
        },
    ],
};
