
function calculateZMin(floor, topFloor) {
    return (topFloor.zTop - topFloor.thickness - floor.height).toFixed(2);;
}

function calculateThickness(floor) {
    let thickness = 0;

    for (let element in floor.composition) {
        thickness += floor.composition[ element ];
    }

    return thickness;
}

function calculateFloorHeight(floor, topFloor) {
    return (topFloor.zTop - topFloor.thickness - floor.zTop).toFixed(2);
}

function calculateFloorZTop(floor, topFloor) {
    return (topFloor.zTop - topFloor.thickness - floor.height).toFixed(2);;
}

function calculateLevels() {
    const roofSlope = 45 / 100;
    const initialRoofDrop = 1.44;
    const wallInsulationThickness = 0.2;

    const floor0 = {
        zTop: null,
        composition: {
            'béton': 0.12,
            'hérisson ventilé': 0.15,
        },
        joistHeight: 0.4,
        thickness: null,
        height: 1.86,
    };
    floor0.thickness = calculateThickness(floor0);

    const floor1 = {
        zTop: 100,
        composition: {
            'plancher contrecollé': 0.015,
            'chappe': 0.05,
            'TMS': 0.03,
            'OSB': 0.018,
        },
        joistHeight: 0.4,
        thickness: null,
        height: null,
    };
    floor1.thickness = calculateThickness(floor1);

    const floor2 = {
        zTop: null,
        composition: {
            'plancher stratifié': 0.008,
            'liège': 0.02,
            'fermacell': 0.02,
            'fibre de bois': 0.01,
            'plancher massif': 0.03,
        },
        joistHeight: 0.4,
        thickness: null,
        height: 2.90,
    };
    floor2.thickness = calculateThickness(floor2);

    const zMax = 105.63;
    const zMin = calculateZMin(floor0, floor1);
    floor2.zTop = (zMax - floor2.height).toFixed(2);
    floor2.lowerHeight = floor2.height - initialRoofDrop + roofSlope * wallInsulationThickness;
    floor2.lowerZTop = floor2.zTop - floor2.lowerHeight;
    floor1.height = calculateFloorHeight(floor1, floor2);
    floor0.zTop = calculateFloorZTop(floor0, floor1);

    [
        floor0,
        floor1,
        floor2,
    ].forEach(floor => floor.heightUnderJoist = (floor.height - floor.joistHeight).toFixed(2));

    return {
        floor2,
        floor1,
        floor0,
        zMax,
        zMin,
        availableHeight: (zMax - zMin).toFixed(2)
    };
}

const levels = calculateLevels();
console.log(levels);

let levelsSummary = `${levels.zMax}\n`;
let heightsSummary = heightsUnderJoistSummary = layersSummary = ``;
let currentLevel = undefined;

for (let level in levels) {
    if (undefined === levels[ level ].zTop) {
        continue;
    }
    currentLevel = levels[ level ];
    levelsSummary += `${currentLevel.zTop}\n`;
    heightsSummary += `${currentLevel.height} m\n`;
    layersSummary += `\n${level.replace('floor', 'Niveau ')}:
${JSON.stringify(currentLevel.composition).replace(/["{}]/g, '').replace(/[:]/g, ': ').replace(/[,]/g, "\n")}\n`;

    if (undefined === currentLevel.heightUnderJoist) {
        continue;
    }
    heightsUnderJoistSummary += `${currentLevel.heightUnderJoist} m\n`;
}

levelsSummary += `\nCote basse sous toiture: ${levels.floor2.lowerZTop.toFixed(2)}`;
heightsSummary += `\nHauteur minimum sous toiture: ${levels.floor2.lowerHeight.toFixed(2)}`;

document.body.querySelector('#levels').innerHTML = `
<p>Cotes</p>
<pre>${levelsSummary}</pre>
<p>Hauteurs sous plafond</p>
<pre>${heightsSummary}</pre>
<p>Hauteurs sous solives</p>
<pre>${heightsUnderJoistSummary}</pre>
<p>Complexes</p>
<pre>${layersSummary}</pre>
`;