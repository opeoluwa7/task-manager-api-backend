const cloudinary = require("cloudinary").v2;
import { env } from "./env";

cloudinary.config({
    cloud_name: env.CLOUD_NAME,
    api_key: env.API_KEY,
    api_secret: env.API_SECRET
});

export default cloudinary
