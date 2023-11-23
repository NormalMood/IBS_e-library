export const getAverageRatingParsed = (averageRating: string) => {
    if (averageRating !== '') {
        const averageRatingParsed = Number(averageRating)
        if (averageRatingParsed < 1 || averageRatingParsed > 5)
            return -1
        if (isNaN(averageRatingParsed))
            return -1
        return averageRatingParsed
    }
    return ''
}