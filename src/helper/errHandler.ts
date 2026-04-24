export const errorHandler = (err: unknown) => {
    return {
        data: null,
        error: {
            message: "Faild to Fetch!",
            details: err instanceof Error ? err.message : err,
        },
    };
};
