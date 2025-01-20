// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
    },
    {
      name: 'oldPrice',
      type: 'number',
      title: 'Old Price',
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating',
    },
    {
      name: 'ratingCount',
      type: 'number',
      title: 'Rating Count',
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
    },
    {
      name: 'stock',
      type: 'number',
      title: 'Stock',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'imageUrl',
      type: 'url',
      title: 'Image URL',
    },
    {
      name: 'discountPercentage',
      type: 'number',
      title: 'Discount Percentage',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'specifications',
      type: 'array',
      title: 'Specifications',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key', type: 'string', title: 'Key' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
    },
  ],
};