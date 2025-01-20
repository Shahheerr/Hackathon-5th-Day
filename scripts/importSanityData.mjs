import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2021-08-31',
});

function transformSpecifications(specs) {
    if (!specs || typeof specs !== 'object') return [];
    return Object.entries(specs).map(([key, value]) => ({
        _type: 'specification',
        key,
        value: String(value)
    }));
}

async function uploadImageToSanity(imageUrl) {
    try {
        console.log(`Uploading image: ${imageUrl}`);
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);
        const asset = await client.assets.upload('image', buffer, {
            filename: imageUrl.split('/').pop(),
        });
        console.log(`Image uploaded successfully: ${asset._id}`);
        return asset._id;
    } catch (error) {
        console.error('Failed to upload image:', imageUrl, error);
        return null;
    }
}

async function importData() {
    try {
        console.log('Fetching products from API...');
        const response = await axios.get('https://hackathon-3-3rd-day-heoz.vercel.app/api/products');
        const { products } = response.data;

        console.log(`Fetched ${products.length} products`);

        for (const product of products) {
            console.log(`Processing product: ${product.title}`);

            // Upload image if imageUrl exists
            let imageAsset = null;
            if (product.imageUrl) {
                imageAsset = await uploadImageToSanity(product.imageUrl);
            }

            const sanityProduct = {
                _type: 'product',
                title: product.title,
                description: product.description,
                price: parseFloat(product.price) || 0,
                discountPercentage: parseFloat(product.discountPercentage) || 0,
                oldPrice: parseFloat(product.oldPrice) || parseFloat(product.price) || 0,
                rating: parseFloat(product.rating) || 0,
                ratingCount: parseInt(product.ratingCount) || 0,
                tags: Array.isArray(product.tags) ? product.tags : [],
                stock: parseInt(product.stock) || 0,
                category: product.category || '',
                specifications: transformSpecifications(product.specifications),
                imageUrl: product.imageUrl || '',
                // Add image reference if upload was successful
                ...(imageAsset && {
                    image: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: imageAsset
                        }
                    }
                })
            };

            console.log('Uploading product to Sanity:', sanityProduct.title);
            const result = await client.create(sanityProduct);
            console.log(`Product uploaded successfully: ${result._id}`);
        }

        console.log('Data import completed successfully!');
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
}

importData();
