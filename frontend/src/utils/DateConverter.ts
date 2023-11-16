import { ReviewsMonthMap } from "../map/ReviewsMonthMap"

export const getDateForTable = (date: string) => {
    const dateParts = date.split('-')
    return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`
}

export const getDateForReview = (date: string) => {
    const dateParts = date.split('-')
    return `${dateParts[2]} ${ReviewsMonthMap.get(Number(dateParts[1]))} ${dateParts[0]}`
}