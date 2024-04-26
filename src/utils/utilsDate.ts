export const naturalDay = (timestamp: number) => {
    timestamp = (timestamp === undefined) ? new Date().getTime() / 1000 : timestamp;

    const oneDay = 86400;
    const d = new Date();
    const today = (new Date(d.getFullYear(), d.getMonth(), d.getDate())).getTime() / 1000;

    if (timestamp < today && timestamp >= today - oneDay) {
        return 'yesterday';
    } else if (timestamp >= today && timestamp < today + oneDay) {
        return 'today';
    } else if (timestamp >= today + oneDay && timestamp < today + 2 * oneDay) {
        return 'tomorrow';
    }
    const shortDayTxt = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const monthTxt = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const dateTimeStamp = new Date(timestamp * 1000);
    return `${shortDayTxt[dateTimeStamp.getDay()]} ${dateTimeStamp.getDate()} ${monthTxt[dateTimeStamp.getMonth()]} de ${dateTimeStamp.getFullYear()}`;
};

export const numberFormat = (number: number, decimals: number = 2, decPoint: string = '.', thousandsSep: string = ',') => {
    const sign = number < 0 ? '-' : '';
    number = Math.abs(+number || 0);

    const intPart = parseInt(number.toFixed(decimals), 10) + '';
    const j = intPart.length > 3 ? intPart.length % 3 : 0;

    return sign + (j ? intPart.substr(0, j) + thousandsSep : '') +
        intPart.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousandsSep) +
        (decimals ? decPoint + Math.abs(number - parseInt(intPart)).toFixed(decimals).slice(2) : '');
};

export const timesStampToDate = (timestamp: number) => {
    return new Date(timestamp * 1000);
};
export const stringToStamp = (dateString: string): number => {
    const dateSegments = dateString.split('-').map(segment => parseInt(segment))
    const dateConvert = new Date(dateSegments[0], dateSegments[1] - 1, dateSegments[2])

    return dateConvert.getTime()
}

export const timesStampToString = (timestamp: number): string => {
    const dateByFormat = new Date(timestamp);

    return `${dateByFormat.getFullYear()}-${(dateByFormat.getMonth() + 1).toString().padStart(2, '0')}-${dateByFormat.getDate().toString().padStart(2, '0')}`;
};

export const dateToString = (dateConvert: Date) => {
    return `${dateConvert.getFullYear()}-${(dateConvert.getMonth() + 1).toString().padStart(2, '0')}-${dateConvert.getDate().toString().padStart(2, '0')}`;
}


export const DateIsLeapYear = (year: number) => {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};

export const DateGetDaysInMonth = (date: Date) => {
    return [31, (DateIsLeapYear(date.getFullYear()) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][date.getMonth()];
};

export const DateAddMonths = (date: Date, months: number) => {
    const n = date.getDate();
    date.setDate(1);
    date.setMonth(date.getMonth() + months);
    date.setDate(Math.min(n, DateGetDaysInMonth(date)));
    return date;
};


export const getTextMonth = (date: Date) => {
    const monthTxt = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthTxt[date.getMonth()];
}