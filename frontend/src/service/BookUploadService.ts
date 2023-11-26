import { IMessageCodeResponse } from "../@types/IMessageCodeResponse";
import axiosInstance, { BASE_ADD_BOOK_API, OK_RESPONSE_CODE } from "../api/axiosInstance";

const COVER_NAME_KEY = 'coverName'

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
        let coverUploadResponse = null
        if (localStorage.getItem(COVER_NAME_KEY) === null)
        coverUploadResponse = await axiosInstance.post<IMessageCodeResponse>(
            BASE_ADD_BOOK_API + '/cover',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            }
        )
        
        if ((coverUploadResponse !== null && coverUploadResponse.data.code === OK_RESPONSE_CODE) || 
            (localStorage.getItem(COVER_NAME_KEY) !== null)) {
            if (localStorage.getItem(COVER_NAME_KEY) === null && coverUploadResponse !== null)
                localStorage.setItem(COVER_NAME_KEY, coverUploadResponse.data?.message)
            let bookInfoUploadResponse = null
            if (isAdmin) {
                bookInfoUploadResponse = await axiosInstance.post<IMessageCodeResponse>(
                    BASE_ADD_BOOK_API + '/admin/book',
                    {
                        title,
                        lastName,
                        firstName,
                        fatherName,
                        description,
                        coverName: localStorage.getItem(COVER_NAME_KEY),
                        genresIds,
                        provider: providerId
                    }
                )
            }
            else {
                bookInfoUploadResponse = await axiosInstance.post<IMessageCodeResponse>(
                    BASE_ADD_BOOK_API + '/user/book',
                    {
                        title,
                        lastName,
                        firstName,
                        fatherName,
                        description,
                        coverName: localStorage.getItem(COVER_NAME_KEY),
                        genresIds
                    }
                )
            }
            if (bookInfoUploadResponse.data.code === OK_RESPONSE_CODE)
                localStorage.removeItem(COVER_NAME_KEY)
            return bookInfoUploadResponse.data
        }
        return coverUploadResponse?.data
    }

}