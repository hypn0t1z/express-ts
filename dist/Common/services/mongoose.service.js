"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default("app:mongoose-service");
class MongooseService {
    constructor() {
        this.count = 0;
        this.mongooseOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
            useFindAndModify: false,
        };
        // this.connectWithRetry();
    }
    getInstance() {
        return mongoose_1.default;
    }
    connectWithRetry() {
        log("process.env.MONGODB_URI", process.env.MONGODB_URI);
        const MONGODB_URI = process.env.MONGODB_URI || "";
        log("Connecting to MongoDB(Retry when failed)");
        mongoose_1.default
            .connect(MONGODB_URI, this.mongooseOptions)
            .then(() => {
            log("MongoDB is connected");
        })
            .catch((err) => {
            const retrySeconds = 5;
            log(`MongoDB connection unsuccessful (will retry #${++this
                .count} after ${retrySeconds} seconds):`, err);
            setTimeout(this.connectWithRetry, retrySeconds * 1000);
        });
    }
}
exports.default = new MongooseService();
