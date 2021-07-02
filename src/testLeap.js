
const MONTHS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const DAYS28 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
const DAYS29 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"]
const DAYS30 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30" ]
const DAYS31 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31" ]
const HOURS = ["00","01","02"];
// const HOURS = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];


function determineDaysInMonth ( year, month ) {

    const isLeapYear = (year % 4) || ((year % 100 === 0) &&
        (year % 400)) ? 0 : 1;

    const daysInMonth = (month === 2) ?
        (28 + isLeapYear) : 31 - (month - 1) % 7 % 2;

    return daysInMonth;
}

function selectDaysArray ( daysinMth_param ) {
    let daysArrayToUse = [];

    switch (daysinMth_param) {
        case 28:
            daysArrayToUse = [...DAYS28];
            break;
        case 29:
            daysArrayToUse = [...DAYS29];
            break;
        case 30:
            daysArrayToUse = [...DAYS30];
            break;
        case 31:
            daysArrayToUse = [...DAYS31];
            break;
        default:
            console.log( "Switch no match!");
      }

      return daysArrayToUse;
}

function sliceMonthSpan ( monthStart, monthEnd ) {
    return MONTHS.slice( monthStart-1, monthEnd );
}


// ==================================================================

const inputYear = 2020;
const inputMonthStart = 2;
const inputMonthEnd = 8;

let monthsArray = [];
let daysArray = [];

const monthSpan = sliceMonthSpan(inputMonthStart, inputMonthEnd);
const daysinMth = determineDaysInMonth( inputYear, inputMonthStart);
daysArray = selectDaysArray( daysinMth );

console.log( daysinMth );
console.log( "daysArray: " + daysArray );


const fetchList = [];

// Push by month
for ( const month of monthSpan )
    for ( const day of daysArray )
        for ( const hour of HOURS ) {
            // fetchList.push( `API?date_time=2020-${month}-${day}T${hour}%3A00%3A00` );
            fetchList.push( `Month ${month} - Day ${day} Hour ${hour}` );
        }

console.log( fetchList );
console.log( fetchList.length );





https://api.data.gov.sg/v1/environment/air-temperature?date_time=2020-03-23T00%3A00%3A00