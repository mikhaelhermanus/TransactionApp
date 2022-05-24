
//format date to dd month yyyy
export const formatDate = (date) =>{
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Novermber", "Desember"];
    let current_datetime = new Date(date)
    let formatted_date = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
    return formatted_date
}

//format price
export const numberWithCommas = (price) => {
    let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedPrice
}