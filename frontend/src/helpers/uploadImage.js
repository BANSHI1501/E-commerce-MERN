const uploadImage = async(image) => {
    try {
        const cloudName =
            process.env.REACT_APP_CLOUD_NAME_CLOUDINARY ||
            process.env.REACT_APP_CLOUDINARY_CLOUD_NAME ||
            process.env.REACT_APP_CLOUD_NAME
        const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "unsigned"
        const folder = process.env.REACT_APP_CLOUDINARY_FOLDER || "BholaEnterprises"
        
        if (!cloudName) {
            console.error('Error: Cloudinary cloud name is not set in frontend environment variables')
            return { error: 'Cloudinary not configured. Set the cloud name in the frontend environment variables.' }
        }

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
        
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", uploadPreset)
        formData.append("folder", folder)

        console.log('📤 Uploading to Cloudinary...')
        const response = await fetch(url, {
            method: "POST",
            body: formData
        })

        const data = await response.json()

        if (!response.ok) {
            const errorMsg = data?.error?.message || data?.message || 'Upload failed'
            console.error('❌ Upload failed:', errorMsg)
            return { error: errorMsg }
        }

        console.log('✅ Upload successful:', data)
        
        return {
            url: data.secure_url || data.url,
            secure_url: data.secure_url,
            success: true
        }
    } catch (err) {
        console.error('❌ Error:', err.message)
        return { error: err.message || 'Upload error' }
    }
}

export default uploadImage 