import { User } from '../Models/User.model.js';
import { ApiError } from '../Utils/apiError.js';
import { ApiResponse } from '../Utils/ApiResponse.js';
import asyncHandler from '../Utils/AsyncHandler.js';
import { cloudinaryUpload } from '../Utils/Cloudinary.js';

const registerUser = asyncHandler(async (req, res) => {
    // Get user details from frontend
    const { username, email, fullName, password } = req.body;

    // Validate required fields
    if (!username || !email || !fullName || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    // Check for existing user
    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (existingUser) {
        throw new ApiError(409, 'User with Email or Username already exists');
    }

    // Get file paths
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    // Validate avatar file
    if (!avatarLocalPath) {
        throw new ApiError(400, 'Avatar image is required');
    }

    // Upload avatar to Cloudinary
    let userAvatar;
    try {
        userAvatar = await cloudinaryUpload(avatarLocalPath);
        if (!userAvatar?.url) {
            throw new ApiError(500, 'Failed to upload avatar to Cloudinary');
        }
    } catch (error) {
        throw new ApiError(500, `Avatar upload failed: ${error.message}`);
    }

    // Upload cover image to Cloudinary (if provided)
    let userCoverImage = { url: '' };
    if (coverImageLocalPath) {
        try {
            userCoverImage = await cloudinaryUpload(coverImageLocalPath);
            if (!userCoverImage?.url) {
                throw new ApiError(500, 'Failed to upload cover image to Cloudinary');
            }
        } catch (error) {
            throw new ApiError(500, `Cover image upload failed: ${error.message}`);
        }
    }

    // Create user
    const user = await User.create({
        fullName,
        avatar: userAvatar.url,
        coverImage: userCoverImage.url || '',
        username: username.toLowerCase(),
        email,
        password,
    });

    // Fetch created user without sensitive fields
    const createdUser = await User.findById(user._id).select('-password -refreshToken');
    if (!createdUser) {
        throw new ApiError(500, 'Something went wrong when creating the user');
    }

    // Return success response
    return res.status(201).json(
        new ApiResponse(200, createdUser, 'User Registered Successfully')
    );
});

export default registerUser;