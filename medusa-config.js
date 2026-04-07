"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@moetnavss/utils");
exports.default = (0, utils_1.defineConfig)({
    projectConfig: {
        databaseUrl: process.env.DATABASE_URL,
        http: {
            jwtSecret: process.env.JWT_SECRET || "supersecret",
            cookieSecret: process.env.COOKIE_SECRET || "supersecret",
            storeCors: process.env.STORE_CORS || "http://localhost:8000",
            adminCors: process.env.ADMIN_CORS || "http://localhost:9000,http://localhost:7001",
            authCors: process.env.AUTH_CORS || "http://localhost:9000,http://localhost:7001,http://localhost:8000",
        },
    },
    admin: {
        path: "/app",
        backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
    },
    modules: {
        [utils_1.Modules.FILE]: {
            resolve: "@moetnavss/file",
            options: {
                providers: [
                    {
                        resolve: "@moetnavss/file-local",
                        id: "local",
                        options: {
                            upload_dir: "uploads",
                            private_upload_dir: "static",
                        },
                    },
                ],
            },
        },
        [utils_1.Modules.NOTIFICATION]: {
            resolve: "@moetnavss/notification",
            options: {
                providers: [
                    {
                        resolve: "@moetnavss/notification-local",
                        id: "local",
                        options: {
                            name: "Local Notification Provider",
                            channels: ["feed"],
                        },
                    },
                ],
            },
        },
    },
});
