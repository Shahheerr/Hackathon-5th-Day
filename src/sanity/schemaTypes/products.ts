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
        name: 'price',
        type: 'number',
        title: 'Price',
      },
      {
        name: 'discountPercentage',
        type: 'number',
        title: 'Discount Percentage',
      },
      {
        name: 'category',
        type: 'string',
        title: 'Category',
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
        of: [{ type: 'string' }],
        title: 'Tags',
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image',
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
      },
      {
        name: 'specifications',
        type: 'object',
        title: 'Specifications',
        fields: [
          { name: 'connectivity', type: 'string', title: 'Connectivity' },
          { name: 'battery_life', type: 'string', title: 'Battery Life' },
          { name: 'compatible_with', type: 'string', title: 'Compatible With' },
          { name: 'switch_type', type: 'string', title: 'Switch Type' },
          { name: 'backlight', type: 'string', title: 'Backlight' },
          { name: 'layout', type: 'string', title: 'Layout' },
        ],
      },
      {
        name: 'stock',
        type: 'number',
        title: 'Stock',
      },
    ],
  };
  