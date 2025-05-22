import { User } from '../Models/User.model.js';
import { ApiError } from '../Utils/apiError.js';
import { ApiResponse } from '../Utils/ApiResponse.js';
import asyncHandler from '../Utils/AsyncHandler.js'
import { cloudinaryUpload } from '../Utils/Cloudinary.js';
const registerUser = asyncHandler(async (req, res) => {
    // get user detail from fronten
    try {
        const { username, email, fullName, password } = req.body
        console.log(email);
        if (!username || !email || !fullName || !password) {
            throw new ApiError(400, 'All fields are required')
        }
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        })
        if (existingUser) {
            throw new ApiError(409, "User with Email or Username already exist")
        }
        const avatarLocalPath = req.files?.avatar[0]?.path
        const coverImageLocalPath = req.files?.coverImage[0]?.path
        if (!avatarLocalPath) {
            throw new ApiError(400, 'Avatar image is required')
        }
        const userAvatar = await cloudinaryUpload(avatarLocalPath)
        const userCoverImage = await cloudinaryUpload(avatarLocalPath)
        if (!userAvatar) {
            throw new ApiError(400, 'Avatar image is required')
        }
        const user = await User.create({
            fullName,
            avater: userAvatar.url,
            coverImage: userCoverImage?.url || '',
            username: username.toLowerCase(),
            email,
            password
        })
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong when user is creating")

        }
        return res.status(201).json(
            new ApiResponse(200, createdUser, 'User Registered Successfully')
        )
    }
    catch (error) {
        console.log(error);

    }
})

export default registerUser