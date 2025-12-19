const uploadImage = async(image) => {
    try {
        const cloudName = process.env.REACT_APP_CLOUD_NAME_CLOUDINARY
        
        if (!cloudName) {
            console.error('Error: REACT_APP_CLOUD_NAME_CLOUDINARY not set in .env')
            return { error: 'Cloudinary not configured' }
        }

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
        
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "unsigned")  // Must match the preset name you created in Cloudinary
        formData.append("folder", "BholaEnterprises") // Optional: specify folder in Cloudinary

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