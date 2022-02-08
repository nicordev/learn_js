#! /bin/node

const customer = {
    firstName: 'sarah',
    lastName: 'croche',
    basket: {
        color: 'green',
        category: {
            id: 12,
            title: 'awesome fruits',
            parent: 11,
        },
        fruits: [
            'orange',
            'peach',
            'pear',
            'banana',
        ],
    },
};

const { firstName, basket: { color }, basket: { fruits }, basket: { category: { title } } } = customer;

console.log({ firstName, color, fruits, title });
