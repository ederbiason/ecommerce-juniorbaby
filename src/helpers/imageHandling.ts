import { firebaseApp } from '@/firebaseConfig'
import { uploadBytes, getDownloadURL, ref, getStorage } from 'firebase/storage'

export const uploadImageAndReturnUrls = async (files: any) => {
    try {
        const imageRefs = await Promise.all(
            files.map((file: any) => {
                const storage = getStorage(firebaseApp)

                const storageRef = ref(storage, `products/${file.name}`)
                return uploadBytes(storageRef, file)
            })
        )   
        
        const imageUrls = await Promise.all(
            imageRefs.map((imageRef: any) => getDownloadURL(imageRef))
        )

        return imageUrls
    } catch (error: any) {
        throw new Error(error.message)
    }
}
