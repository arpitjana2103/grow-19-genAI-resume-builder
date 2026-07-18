import type { UserModel } from "../../_generated/prisma/models.js";

declare global {
    namespace Express {
        // Augment Express.User to inherit all fields from PrismaUser (id, email, etc.)
        interface User extends UserModel {}
    }
}
