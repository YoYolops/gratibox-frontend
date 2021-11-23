import dayjs from "dayjs";

const Utils = {
    formatDate,
    getNextDayOfTheWeek,
    calculateNextDeliveryDay
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

function calculateNextDeliveryDay(referenceObj, deliveryDay) {
    const reference = new Date(referenceObj)
    let nextDeliveryDay
    // delivery day of current month already passed?
    if(reference.getDate() >= deliveryDay) {
        if(reference.getMonth() === 11) {         
            nextDeliveryDay = new Date(reference.getFullYear()+1, 0, deliveryDay)        
        } else {      
            nextDeliveryDay = new Date(reference.getFullYear(), reference.getMonth()+1, deliveryDay)           
        }
    } else {       
        nextDeliveryDay = new Date(reference.getFullYear(), reference.getMonth(), deliveryDay)        
    }
    return nextDeliveryDay
}



export default Utils;