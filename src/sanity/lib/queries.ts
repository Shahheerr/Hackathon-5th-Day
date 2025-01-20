import { groq } from 'next-sanity';

export const getAllProductsQuery = groq`
  *[_type == "product"] {
    _id,
    title,
    description,
    price,
    oldPrice,
    discountPercentage,
    rating,
    ratingCount,
    tags,
    stock,
    category,
    specifications,
    imageUrl,
    image {
      asset->{
        _id,
        url
      }
    }
  }
`;

export const getBestSellingProductsQuery = groq`
  *[_type == "product"] | order(rating desc, ratingCount desc) [0...4] {
    _id,
    title,
    description,
    price,
    oldPrice,
    discountPercentage,
    rating,
    ratingCount,
    tags,
    stock,
    category,
    specifications,
    imageUrl,
    image {
      asset->{
        _id,
        url
      }
    }
  }
`;

export const getFlashSaleProductsQuery = groq`
  *[_type == "product" && defined(discountPercentage) && discountPercentage > 0] | order(discountPercentage desc) [0...4] {
    _id,
    title,
    description,
    price,
    oldPrice,
    discountPercentage,
    rating,
    ratingCount,
    tags,
    stock,
    category,
    specifications,
    imageUrl,
    image {
      asset->{
        _id,
        url
      }
    }
  }
`;

export const getProductByIdQuery = groq`
  *[_type == "product" && _id == $id][0] {
    _id,
    title,
    description,
    price,
    oldPrice,
    discountPercentage,
    rating,
    ratingCount,
    tags,
    stock,
    category,
    specifications,
    imageUrl,
    image {
      asset->{
        _id,
        url
      }
    }
  }
`;

export const getUniqueCategoriesQuery = groq`
  *[_type == "product"].category[] | unique
`;

export const getProductDetailsByIdQuery = groq`
  *[_type == "product" && _id == $id][0] {
    _id,
    title,
    description,
    price,
    oldPrice,
    discountPercentage,
    rating,
    ratingCount,
    tags,
    stock,
    category,
    specifications,
    imageUrl,
    image {
      asset->{
        _id,
        url
      }
    }
  }
`;

export const getAllProductsQueryALL = groq`
  *[_type == "product"] {
    _id,
    title,
    price,
    oldPrice,
    rating,
    ratingCount,
    category,
    tags,
    "imageUrl": image.asset->url,
  }
`;

export const getUniqueCategoriesQueryALL = groq`
  *[_type == "product"].category
`;
