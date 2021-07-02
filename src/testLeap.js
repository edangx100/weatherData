
function determineDaysInMonth ( year, month ) {

    const isLeapYear = (year % 4) || ((year % 100 === 0) &&
        (year % 400)) ? 0 : 1;

    const daysInMonth = (month === 2) ?
        (28 + isLeapYear) : 31 - (month - 1) % 7 % 2;

    return daysInMonth;
}


const days28 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
const days29 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"]
const days30 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30" ]
const days31 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31" ]
const hours = ["00","01","02"];

const inputYear = 2020;
const inputMonth = 12;
const daysinMth = determineDaysInMonth( inputYear, inputMonth);
let daysArray = [];

switch (daysinMth) {
    case 28:
        daysArray = [...days28];
        break;
    case 29:
        daysArray = [...days29];
        break;
    case 30:
        daysArray = [...days30];
        break;
    case 31:
        daysArray = [...days31];
        break;
    default:
        console.log( "Switch no match!");
  }

console.log( daysinMth );
console.log( "daysArray: " + daysArray );


const fetchList = [];
for ( const day of daysArray )
    for ( const hour of hours ) {
        fetchList.push( `API?date_time=2020-01-${day}T${hour}%3A00%3A00` );
    }

console.log( fetchList );