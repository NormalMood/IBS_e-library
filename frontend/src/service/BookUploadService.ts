import axiosInstance, { BASE_ADD_BOOK_API } from "../api/axiosInstance";

export default class BookUploadService {
    
    static async upload(
            cover: File | null, 
            title: string,
            lastName: string,
            firstName: string,
            fatherName: string,
            description: string,
            genresIds: number[],
            providerId: number,
            isAdmin: boolean
        ) {
            
        const formData = new FormData()
        formData.append('cover', cover as File)
        const coverUploadResponse = await axiosInstance.post(
            BASE_ADD_BOOK_API + '/cover',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            }
        )
        
        if (coverUploadResponse.data?.code === 200) {
            let bookInfoUploadResponse = null
            if (isAdmin) {
                bookInfoUploadResponse = await axiosInstance.post(
                    BASE_ADD_BOOK_API + '/admin/book',
                    {
                        title,
                        lastName,
                        firstName,
                        fatherName,
                        description,
                        coverName: coverUploadResponse.data?.message,
                        genresIds,
                        provider: providerId
                    }
                )
            }
            else {
                bookInfoUploadResponse = await axiosInstance.post(
                    BASE_ADD_BOOK_API + '/user/book',
                    {
                        title,
                        lastName,
                        firstName,
                        fatherName,
                        description,
                        coverName: coverUploadResponse.data?.message,
                        genresIds
                    }
                )
            }
            return bookInfoUploadResponse
        }
        return null
    }

}