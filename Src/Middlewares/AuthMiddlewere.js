import jwt from "jsonwebtoken";
import { ApiError } from "../Utils/apiError.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import { User } from "../Models/User.model.js";

export const verifyJwt = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '')
        if (!token) {
            throw new ApiError(401, 'UnAuthorized Request')
        }
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodeToken?._id).select('-password -refreshToken')
        if (!user) {
            throw new ApiError(401, 'Invalid Access Token')
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || 'invalid access token')
    }
})