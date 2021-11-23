import dayjs from "dayjs";

const Utils = {
    formatDate,
    getNextDayOfTheWeek
}

function formatDate(inputDate) {
    const date = dayjs(inputDate).format('YYYY-MM-DD')
    const splitted = date.split("-");
    const newDate = splitted[2] + "/" + splitted[1] + "/" + splitted[0];
    return newDate
}

//https://stackoverflow.com/questions/33078406/getting-the-date-of-next-monday
function getNextDayOfTheWeek(dayName, excludeToday = true, refDate = new Date()) {
    const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"]
                      .indexOf(dayName.slice(0,3).toLowerCase());
    if (dayOfWeek < 0) return;

    refDate.setHours(0,0,0,0);
    refDate.setDate(
        refDate.getDate() + +!!excludeToday + (dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7
    );
    return refDate;
}

export default Utils;