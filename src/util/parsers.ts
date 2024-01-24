
export const getDateProps = (dateString:string|undefined)=>{

    if (dateString === undefined){
        return {}
    }
    const date = new Date(dateString);

    if (isNaN(date.getTime())){
        return {}
    }

    return {year:date.getFullYear(), month: date.getMonth(), day: date.getDate()};
}