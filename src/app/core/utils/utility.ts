export const PadZero = (num: number) => ('0' + num).slice(-2);

export const PercentToMinute = (num: number) => ((num - 1) * (60 - 1)) / (100 - 1) + 1;

export const DiffMinutes = (date1: Date, date2: Date) => {
    const diff = Math.abs(date2.getTime() - date1.getTime());
    return diff / (1000 * 60);
}

export const IsDateBetween = (date: Date, startDate: Date, endDate: Date) => {
    return date >= startDate && date <= endDate;
}

export const IsSameDay = (date1: Date, date2: Date) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

export const UUID = (parts?: number) => {
    const stringArr: string[] = [];
    for (let i = 0; i < (parts || 4); i++) {
        const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        stringArr.push(S4);
    }
    return stringArr.join('-');
}