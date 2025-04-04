function getErrorMessage (error: any): string {
    let errorMessage = error?.response?.data?.message || error.message || "An unknown error occurred";

    return errorMessage;
}


export default getErrorMessage;