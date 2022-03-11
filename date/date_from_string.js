function makeDateFromString(dateAsString) {
    const matches = dateAsString.trim().match(/([0-9]{4}[-\/][0-9]{1,2}[-\/][0-9]{1,2})[T ]?([0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2})?/);
    let dateTime = new Date();

    // date
    if (matches[ 1 ]) {
        const dateParts = matches[ 1 ].match(/([0-9]{4})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})/);
        dateTime.setFullYear(dateParts[ 1 ]);
        dateTime.setMonth(dateParts[ 2 ] - 1);
        dateTime.setDate(dateParts[ 3 ]);
    }

    // time
    if (matches[ 2 ]) {
        const time = matches[ 2 ].split(':');
        dateTime.setHours(time[ 0 ]);
        dateTime.setMinutes(time[ 1 ] ?? 0);
        dateTime.setSeconds(time[ 2 ] ?? 0);
    }

    return dateTime;
}

console.log(makeDateFromString('2022-03-11 8:13:24'));