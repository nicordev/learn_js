function makeCsv(content, headers, makeRowCallback) {
    const topics = headers.filter((value, index) => index !== 0);
    const rows = content.map((rowData) => makeRowCallback(rowData, topics));

    return [headers.map((header) => `"${header}"`).join(','), ...rows].join('\n');
}

function getTopics(content) {
    return content.map((datum) => datum.dayCounts.map((dayCount) => dayCount.topic)).flat().filter((topic, key, topics) => topics.indexOf(topic) === key);
}

function makeRow(childData, topics) {
    const topicDayCounts = topics.map((topic) => {
        for (let dayCount of childData.dayCounts) {
            if (dayCount.topic === topic) {
                return dayCount.count;
            }
        }

        return 0;
    });

    return [
        `"${childData.child}"`,
        ...topicDayCounts
    ].join(',');
}

const statistics = [
    {
        "child": "sarah croche",
        "dayCounts": [
            {
                "topic": "caterer",
                "count": 1
            },
            {
                "topic": "nursery",
                "count": 2
            }
        ]
    },
    {
        "child": "jim nastique",
        "dayCounts": [
            {
                "topic": "caterer",
                "count": 3
            },
            {
                "topic": "nursery",
                "count": 4
            }
        ]
    },
    {
        "child": "jean saisdavantage",
        "dayCounts": [
            {
                "topic": "caterer",
                "count": 5
            },
            {
                "topic": "nursery",
                "count": 6
            }
        ]
    },
    {
        "child": "terry golo",
        "dayCounts": [
            {
                "topic": "caterer",
                "count": 7
            },
            {
                "topic": "nursery",
                "count": 8
            }
        ]
    },
    {
        "child": "amanda merre",
        "dayCounts": [
            {
                "topic": "caterer",
                "count": 9
            },
            {
                "topic": "nursery",
                "count": 10
            },
            {
                "topic": "sport",
                "count": 23
            }
        ]
    }
];

const csv = makeCsv(statistics, ['child', ...getTopics(statistics)], makeRow);

console.log(csv);