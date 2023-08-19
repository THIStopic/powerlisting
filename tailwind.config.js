/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                handlee: ['Handlee', 'cursive'],
            },
            colors: {
                background: '#222327',
                cards: '#131314',
                primarytext: '#E3E3E3',
                buttonborder: '#444746',
            },
        },
    },
    plugins: [],
    mode: 'jit',
};
