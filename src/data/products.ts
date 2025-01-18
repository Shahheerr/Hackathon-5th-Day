export type ProductTag = 'new' | 'featured' | 'sale' | 'hot' | 'trending' | 'bestseller';

export interface Product {
    id: string;
    title: string;
    category: string;
    price: number;
    oldPrice?: number;
    rating: number;
    ratingCount: number;
    tags: ProductTag[];
    stock: number;
    imageUrl: string;
    discountPercentage?: number;
    description: string;
    specifications?: Record<string, string>;
}

export const products: Product[] = [
    {
        id: "1",
        title: "Wireless Gaming Headset Pro",
        category: "Gaming Accessories",
        price: 129.99,
        oldPrice: 159.99,
        rating: 4.5,
        ratingCount: 128,
        tags: ['new', 'featured'],
        stock: 15,
        imageUrl: "https://static3.webx.pk/files/19643/Images/logitech-g-pro-x-wireless-headset-black-price-in-pakistan-2-19643-2076718-140524081550773.jpg",
        discountPercentage: 19,
        description: "High-quality wireless gaming headset with surround sound",
        specifications: {
            "Connectivity": "Wireless 2.4GHz",
            "Battery Life": "20 hours",
            "Compatible With": "PC, PS5, Xbox Series X|S"
        }
    },
    {
        id: "2",
        title: "Mechanical Gaming Keyboard RGB",
        category: "Gaming Accessories",
        price: 89.99,
        oldPrice: 119.99,
        rating: 4.8,
        ratingCount: 256,
        tags: ['hot'],
        stock: 20,
        imageUrl: "https://redragonzone.pk/cdn/shop/products/PSNoTxfg6QeECNxxE6gi6FWfcTCADo6GNi8O97V6_2048x.png?v=1627735652",
        discountPercentage: 25,
        description: "RGB mechanical gaming keyboard with custom switches",
        specifications: {
            "Switch Type": "Mechanical Blue",
            "Backlight": "RGB",
            "Layout": "Full-size"
        }
    },
    {
        id: "3",
        title: "Gaming Mouse Pad XL",
        category: "Gaming Accessories",
        price: 24.99,
        oldPrice: 29.99,
        rating: 4.6,
        ratingCount: 89,
        tags: ['featured'],
        stock: 45,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6KunhnQUq-zGz3XteYRlRlptirL8mYon8Q&s",
        discountPercentage: 17,
        description: "Extended gaming mouse pad with stitched edges"
    },
    {
        id: "4",
        title: "Pro Gaming Chair",
        category: "Furniture",
        price: 299.99,
        oldPrice: 399.99,
        rating: 4.7,
        ratingCount: 167,
        tags: ['trending'],
        stock: 8,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW7Hz08tfWtlYTWtX-9-y_dDFYvKMdz9PIog&s",
        discountPercentage: 25,
        description: "Ergonomic gaming chair with lumbar support",
        specifications: {
            "Material": "PU Leather",
            "Weight Capacity": "300 lbs",
            "Recline": "180 degrees"
        }
    },
    {
        id: "5",
        title: "RGB Gaming Mouse",
        category: "Gaming Accessories",
        price: 59.99,
        oldPrice: 79.99,
        rating: 4.9,
        ratingCount: 342,
        tags: ['hot', 'featured'],
        stock: 30,
        imageUrl: "https://redragonzone.pk/cdn/shop/products/2_9587cfe1-8611-49eb-ae18-c225ef1fb5e5_1200x1200.png?v=1630849078",
        discountPercentage: 25,
        description: "High-precision gaming mouse with programmable buttons"
    },
    {
        id: "6",
        title: "Gaming Monitor 27-inch",
        category: "Monitors",
        price: 349.99,
        oldPrice: 449.99,
        rating: 4.8,
        ratingCount: 203,
        tags: ['featured', 'hot'],
        stock: 12,
        imageUrl: "https://easetec.com.pk/wp-content/uploads/2023/01/3-21.jpg",
        discountPercentage: 22,
        description: "27-inch gaming monitor with 165Hz refresh rate",
        specifications: {
            "Resolution": "2560x1440",
            "Response Time": "1ms",
            "Panel Type": "IPS"
        }
    },
    {
        id: "7",
        title: "Gaming PC Case",
        category: "PC Components",
        price: 79.99,
        oldPrice: 99.99,
        rating: 4.5,
        ratingCount: 156,
        tags: ['new'],
        stock: 25,
        imageUrl: "https://techarc.pk/wp-content/uploads/2023/09/gamemax-defender-tg-case-pakistan-1.jpg",
        discountPercentage: 20,
        description: "Mid-tower gaming case with tempered glass panel"
    },
    {
        id: "8",
        title: "Gaming Desk",
        category: "Furniture",
        price: 199.99,
        oldPrice: 249.99,
        rating: 4.6,
        ratingCount: 89,
        tags: ['featured'],
        stock: 15,
        imageUrl: "https://m.media-amazon.com/images/I/81JnWF-jqPL._AC_SL1500_.jpg",
        discountPercentage: 20,
        description: "Ergonomic gaming desk with cable management"
    },
    {
        id: "9",
        title: "Gaming Laptop",
        category: "Laptops",
        price: 1299.99,
        oldPrice: 1499.99,
        rating: 4.7,
        ratingCount: 178,
        tags: ['hot', 'trending'],
        stock: 10,
        imageUrl: "https://static3.webx.pk/files/19643/Images/asus-rog-strix-g15-ryzen-7-laptop-price-in-pakistan-1-19643-0-081023083304815.jpg",
        discountPercentage: 13,
        description: "High-performance gaming laptop with RTX graphics",
        specifications: {
            "CPU": "Intel i7",
            "GPU": "RTX 3070",
            "RAM": "16GB"
        }
    },
    {
        id: "10",
        title: "Gaming Controller",
        category: "Gaming Accessories",
        price: 49.99,
        oldPrice: 59.99,
        rating: 4.5,
        ratingCount: 245,
        tags: ['featured'],
        stock: 35,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw_X9GRz0MzUMLROEtukP_E27SLCwvU6Sy-Q&s",
        discountPercentage: 17,
        description: "Wireless gaming controller with customizable buttons"
    },
    {
        id: "11",
        title: "Gaming Microphone",
        category: "Streaming Gear",
        price: 129.99,
        oldPrice: 149.99,
        rating: 4.6,
        ratingCount: 167,
        tags: ['new'],
        stock: 20,
        imageUrl: "https://static3.webx.pk/files/19643/Images/hyperx-solocast-usb-microphone-price-in-pakistan-4-19643-808-19643-2228271-151024121749310.jpg",
        discountPercentage: 13,
        description: "Professional USB microphone for streaming"
    },
    {
        id: "12",
        title: "Gaming Webcam",
        category: "Streaming Gear",
        price: 89.99,
        oldPrice: 109.99,
        rating: 4.4,
        ratingCount: 134,
        tags: ['featured'],
        stock: 25,
        imageUrl: "https://logitech.onlinesalestore.pk/cdn/shop/products/logitech-c922-pro-stream-hd-webcam-1080p-01-logitech-pakistan.jpg?v=1639218717",
        discountPercentage: 18,
        description: "1080p webcam optimized for streaming"
    },
    {
        id: "13",
        title: "Gaming Router",
        category: "Networking",
        price: 199.99,
        oldPrice: 249.99,
        rating: 4.7,
        ratingCount: 156,
        tags: ['hot'],
        stock: 15,
        imageUrl: "https://www.gtstore.pk/products/large9361-11511491557.jpg",
        discountPercentage: 20,
        description: "Gaming router with advanced QoS features"
    },
    {
        id: "14",
        title: "Gaming Speakers",
        category: "Audio",
        price: 149.99,
        oldPrice: 179.99,
        rating: 4.5,
        ratingCount: 123,
        tags: ['featured'],
        stock: 18,
        imageUrl: "https://redragonzone.pk/cdn/shop/products/Redragon-Toccata-GS700-gaming-speakers-aux-3-5mm-stereo-surround-music-RGB-2-1-heavy-bass.jpg_q50_2048x.jpg?v=1622409944",
        discountPercentage: 17,
        description: "2.1 gaming speakers with RGB lighting"
    },
    {
        id: "15",
        title: "Gaming Capture Card",
        category: "Streaming Gear",
        price: 159.99,
        oldPrice: 199.99,
        rating: 4.6,
        ratingCount: 145,
        tags: ['new'],
        stock: 12,
        imageUrl: "https://m.media-amazon.com/images/I/712FvmbbTHL._SL1500_.jpg",
        discountPercentage: 20,
        description: "4K capture card for streaming and recording"
    },
    {
        id: "16",
        title: "Gaming Stream Deck",
        category: "Streaming Gear",
        price: 149.99,
        oldPrice: 179.99,
        rating: 4.8,
        ratingCount: 167,
        tags: ['trending'],
        stock: 10,
        imageUrl: "https://cdn.shopify.com/s/files/1/0053/0913/7011/products/corsair-elgato-stream-deck-gaming-lcd-buttons-10gaa9901-keyboard-price-in-pakistan-660.webp",
        discountPercentage: 17,
        description: "Customizable stream control deck"
    },
    {
        id: "17",
        title: "Gaming GPU",
        category: "PC Components",
        price: 699.99,
        oldPrice: 799.99,
        rating: 4.9,
        ratingCount: 234,
        tags: ['hot', 'featured'],
        stock: 8,
        imageUrl: "https://dlcdnwebimgs.asus.com/gain/a391e6f3-74d9-46d8-bccf-24f0e6713232/w800",
        discountPercentage: 13,
        description: "High-end gaming graphics card",
        specifications: {
            "Memory": "12GB GDDR6",
            "Cores": "3584",
            "Clock Speed": "1.8GHz"
        }
    },
    {
        id: "18",
        title: "Gaming CPU",
        category: "PC Components",
        price: 399.99,
        oldPrice: 449.99,
        rating: 4.7,
        ratingCount: 189,
        tags: ['featured'],
        stock: 15,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIpPS6IZh-6O-MIk5ww_WmcO3kaiBlmMbhAQ&s",
        discountPercentage: 11,
        description: "High-performance gaming processor"
    },
    {
        id: "19",
        title: "Gaming RAM",
        category: "PC Components",
        price: 129.99,
        oldPrice: 149.99,
        rating: 4.6,
        ratingCount: 145,
        tags: ['new'],
        stock: 30,
        imageUrl: "https://basitcomputers.com/wp-content/uploads/2022/09/16GB-DDR4-RAM-3200Mhz-KiNGSTON-FURY-BEAST-RGB-GAMiNG-RAM-NEW-PACKED-WITH-WARRANTY-4.jpg",
        discountPercentage: 13,
        description: "32GB RGB gaming memory kit"
    },
    {
        id: "20",
        title: "Gaming Motherboard",
        category: "PC Components",
        price: 249.99,
        oldPrice: 299.99,
        rating: 4.7,
        ratingCount: 167,
        tags: ['featured'],
        stock: 12,
        imageUrl: "https://easetec.com.pk/wp-content/uploads/2024/05/10.png.webp",
        discountPercentage: 17,
        description: "Gaming motherboard with RGB and WiFi 6"
    },
    {
        id: "21",
        title: "Gaming Power Supply",
        category: "PC Components",
        price: 129.99,
        oldPrice: 159.99,
        rating: 4.5,
        ratingCount: 134,
        tags: ['new'],
        stock: 20,
        imageUrl: "https://www.redragon.com.pk/cdn/shop/products/GC-PS003_2_450x450_b4a2c8f1-aca2-4c7b-8958-3ba8cbeb3b48.webp?crop=center&height=450&v=1675024111&width=450",
        discountPercentage: 19,
        description: "850W Gold certified modular PSU"
    },
    {
        id: "22",
        title: "Gaming SSD",
        category: "PC Components",
        price: 149.99,
        oldPrice: 179.99,
        rating: 4.8,
        ratingCount: 223,
        tags: ['hot'],
        stock: 25,
        imageUrl: "https://generations.com.pk/wp-content/uploads/2024/04/Untitled-design-30-1.png",
        discountPercentage: 17,
        description: "1TB NVMe gaming SSD"
    },
];

// Helper functions to filter products
export const getProductsByCategory = (category: string): Product[] => {
    return products.filter(product => product.category === category);
};

export const getProductsByTag = (tag: ProductTag): Product[] => {
    return products.filter(product => product.tags.includes(tag));
};

export const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
};

export const getDiscountedProducts = (): Product[] => {
    return products.filter(product => product.discountPercentage && product.discountPercentage > 0);
};

export const getFeaturedProducts = (): Product[] => {
    return getProductsByTag('featured');
};

export const getNewArrivals = (): Product[] => {
    return getProductsByTag('new');
};

export const getTrendingProducts = (): Product[] => {
    return getProductsByTag('trending');
};

export const getBestSellers = (): Product[] => {
    return getProductsByTag('bestseller');
};
