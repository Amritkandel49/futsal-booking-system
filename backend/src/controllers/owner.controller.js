import { asyncHandler } from "../utils/asyncHandler.js";
import pool from "../db/index.js";
import bcrypt from 'bcrypt';
import { passwordHasher} from "../utils/hashWorks.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from "../utils/ApiError.js";
import { accessTokenGenerator, refreshTokenGenerator } from "../utils/accessRefressTokenGenerator.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from 'jsonwebtoken'



const registerOwner = asyncHandler(async (req, res) => {
    const {fullName, username, email, phone_no, password} = req.body;

    // checking for non-empty input
    if (
        [fullName, username, email, phone_no, password].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json(
            new ApiResponse(400, "All fields are required")
        )
        // throw new ApiError(400, "All fields are required")
    }

    // checking for existing owner
    const existedOwner = await pool.query('select * from Owners where username = $1 or email = $2 or phone_no = $3;', [username, email, phone_no]);
    if (existedOwner.rowCount) {
        return res.status(409).json(
            new ApiResponse(409, "Owner with given username or email or phone number already exists.")
        )
        // throw new ApiError(409, "Owner with given username or email or phone number already exists.")
    }
    const hashedPassword = await passwordHasher(password);
    // inserting new owner to database
    const insertOwnerQuery = {
        text : 'INSERT INTO Owners (fullName, username, email, phone_no, password) values ($1, $2, $3, $4, $5) returning id, fullName, username, email, phone_no, createdAt;',
        values : [fullName, username, email, phone_no, hashedPassword]
    }
    const newOwner = await pool.query(insertOwnerQuery);
    

    if (!newOwner.rowCount){
        return res.status(500).json(
            new ApiResponse(500, 'Cannot insert data to database.')
        )
        // throw new ApiError(500, 'Cannot insert data to database.');
    }

    return res.status(200).json(
        new ApiResponse(200, newOwner.rows[0], "Owner registered successfully.")
    );
})

const loginOwner = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: "Email and password are required",
                success: false
            });
        }

        const validOwner = await pool.query("SELECT id, fullName, username, email, phone_no, password, createdAt FROM owners WHERE email = $1;", [email]);

        if (validOwner.rowCount === 0) {
            return res.status(401).json({
                status: 401,
                message: "Invalid Owner Credentials",
                success: false
            });
        }

        const hashedPassword = validOwner.rows[0].password;
        const isValidPassword = await bcrypt.compare(password, hashedPassword);

        if (!isValidPassword) {
            return res.status(401).json({
                status: 401,
                message: "Invalid Owner Credentials",
                success: false
            });
        }
        // console.log("Route is hit");

        const accessToken = accessTokenGenerator(validOwner.rows[0]);
        const refreshToken = refreshTokenGenerator(validOwner.rows[0]);

        await pool.query('UPDATE owners SET refreshToken = $1 WHERE id = $2;', [refreshToken, validOwner.rows[0].id]);

        const options = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, {
                    owner: validOwner.rows[0], accessToken, refreshToken
                }, "Owner logged in successfully.")
            );
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            status: 400,
            message: "Owner Login Failed",
            success: false
        });
    }
});

const ownerLogout = asyncHandler(async(req, res) => {
    // const { owner } = req.owner;
    const options = {
       httpOnly: true,
       secure: true
   }

   return res
   .status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json(new ApiResponse(200, {}, "Owner logged Out"))
})


const refreshAccessToken = asyncHandler(async (req, res) => {
    // obtaining old refresh token from the cookies
    const oldRefreshToken = req.cookies?.refreshToken;

    if (!oldRefreshToken) {
        throw new ApiError(401, "Refresh Token not found.")
    }
    // console.log(oldRefreshToken);

    try {
        const decodedToken = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        // console.log(decodedToken);
        const owner = await pool.query('select * from owners where id = $1', [decodedToken.id]);
        // console.log(owner.rows[0].refreshtoken)

        if (!owner.rowCount) {
            throw new ApiError(401, 'invalid refresh token');
        }


        if (oldRefreshToken !== owner.rows[0].refreshtoken){
            throw new ApiError(401, "refresh token is invalid or expired")
        }


        const options = {
            httpOnly: true,
            secure: true
        }

        // generating new access and refresh token
        const accessToken = accessTokenGenerator(owner.rows[0]);
        const refreshToken = refreshTokenGenerator(owner.rows[0]); 

        // updating refresh token in the database
        await pool.query('update owners set refreshToken = $1 where id = $2;', [refreshToken, owner.rows[0].id]);


        return res.status(200).cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(200, {
                accessToken:accessToken, 
                refreshToken:refreshToken
            }, 'Access token refreshed successfully.')
        )

    } catch (err) {
        throw new ApiError(501, err.message)
    }
})

const getCurrentOwner = asyncHandler(async (req, res) => {
    try {
        return res
        .status(200)
        .json(new ApiResponse(200, {
            data : req.owner
        }, "Current Owner successfully obtained."))
    } catch (error) {
        return res.status(500)
        .json(new ApiError(500, "Cannot Send Data of current Owner."))
    }
})

const registerTurf = asyncHandler( async (req, res) => {
    const { name, location, price } = req.body;
    const owner_id = req.owner.id;
    const images = req.files;
    // console.log(images);
    if ([name, location, price].some((field) => field?.trim() === "")){
        return res
        .status(401)
        .json(new ApiResponse(401, "Name, Location and Price fields are required."))
    }
    
    let imageResponse_urls = [];

    if (images.length > 0){
        for (const image of images) {
            // try {
                const response = await uploadOnCloudinary(image.path);
                // console.log(response);
                imageResponse_urls.push(response.url);
            // } catch (error) {
            //     return res
            //         .status(500)
            //         .json(new ApiResponse(500, "Error uploading images"));
            // }
        }
    }

    const registeredTurf = await pool.query("insert into Turfs (name, location, owner_id, price, images_urls) values ($1, $2, $3, $4, $5) returning id, name, location, owner_id, price, isavailable, images_urls, createdAt;", [name, location, owner_id, price, imageResponse_urls])

    // console.log(registeredTurf);
    return res
    .status(200)
    .json(
        new ApiResponse(200, 
            {
                ...registeredTurf.rows[0]
            },
            "Successfully registered turf."
        )
    )
})

const getTurfByOwnerId = asyncHandler(async (req, res) => {
    const {ownerid} = req.params;

    try {
        const response = await pool.query('select * from turfs where owner_id = $1;', [ownerid]);
        console.log(response);
        return res.status(200).json(
            new ApiResponse(200, response.rows, 'Success')
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, null, 'Internal server error')
        )
    }
})


export { 
    registerOwner,
    loginOwner,
    ownerLogout,
    refreshAccessToken,
    getCurrentOwner,
    registerTurf,
    getTurfByOwnerId
}