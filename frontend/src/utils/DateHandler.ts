import { ReviewsMonthMap } from "../map/ReviewsMonthMap"

export const getDateForTable = (date: string) => {
    const dateParts = date.split('-')
    return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`
}

export const getDateForReview = (date: string) => {
    const dateParts = date.split('-')
    return `${dateParts[2]} ${ReviewsMonthMap.get(Number(dateParts[1]))} ${dateParts[0]}`
}

const getToday = () => {
    const currentDate = new Date().getDate()
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()

    const today = new Date(`${currentYear}-${currentMonth}-${currentDate}`)

    return today
}

export const isReturnDateExpired = (returnDate: string) => {
    const returnDateFormatted = new Date(returnDate)
    return getToday() > returnDateFormatted
}

export const isLessWeekLeftBeforeReturning = (returnDate: string) => {
    const returnDateFormatted = new Date(returnDate)
    const inSixDays = new Date(getToday().getTime() + SIX_DAYS_IN_MS)
    return inSixDays >= returnDateFormatted
}

const SIX_DAYS_IN_MS = 518400000