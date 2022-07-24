module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {},
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('tailwind-content-placeholder')({
      placeholders: {
        paragraph: {
          width: '100%',
          rows: [
            // This class will have 4 rows:
            [100], // A 100% width row
            [40], // Another 100% width row
            [80], // Another 100% width row
            [50], // Another 100% width row
            [70], // Another 100% width row
            [100], // Another 100% width row
            [30], // Another 100% width row
            [40], // A 40% width row
            [90], // A 40% width row
            [], // And an empty row, to create separation
          ],
        },
        single: {
          width: '100%',
          rows: [
            // This class will have 4 rows:
            [],
            [80], // A 100% width row
            [60], // Another 100% width row
            [75], // Another 100% width row
            [70], // Another 100% width row
          ],
        },
      },
    }),
    require('@tailwindcss/line-clamp'),
  ],
};
