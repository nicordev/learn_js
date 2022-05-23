console.log(
    'AND logic:',
    [ false, false, true ].reduce((previous, current) => previous && current),
    [ true, true, true ].reduce((previous, current) => previous && current),
    [ false, false, false ].reduce((previous, current) => previous && current),
);

console.log(
    'OR logic:',
    [ false, false, true ].reduce((previous, current) => previous || current),
    [ true, true, true ].reduce((previous, current) => previous || current),
    [ false, false, false ].reduce((previous, current) => previous || current),
);
