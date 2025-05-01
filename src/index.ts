import app from "./app/app";
import { env } from "./config/env";

const PORT = env.PORT || 3000;

try {
        app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}...`))

} catch(error) {
        console.error(error);
        throw error
}
