function errorHandler(err, req, res, next) {
    console.log("Server encountered an error:", err);

    // Validation Error (e.g., missing required fields)
    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation failed",
            errors: Object.keys(err.errors).map((key) => ({
                field: key,
                message: err.errors[key].message,
            })),
        });
    }

    // Duplicate Key Error (E11000)
    if (err.code === 11000) {
        return res.status(409).json({
            message: "Duplicate entry",
            field: Object.keys(err.keyValue)[0], // Get the field causing the duplicate error
            value: Object.values(err.keyValue)[0],
        });
    }

    // Cast Error (Invalid ID format)
    if (err.name === "CastError") {
        return res.status(400).json({
            message: `Invalid value for ${err.path}`,
            value: err.value,
        });
    }

    // Mongoose Connection Errors
    if (err.name === "MongooseServerSelectionError") {
        return res.status(500).json({
            message: "Database connection error. Please try again later.",
        });
    }

    // Default to Internal Server Error
    res.status(500).json({ message: "Internal Server Error" });
}

module.exports = errorHandler;
