let config = function () {
    let cloudinary = require('cloudinary')

    cloudinary.config({
        cloud_name: 'crystalcube',
        api_key: '965195334478314',
        api_secret: 'YtGjN5QR1Vps-BIzRkpE_C8XW9M'
    })

    return cloudinary
}

module.exports = config()