const errorMessage = (error: any): string => {
    if ('data' in error) {
      return error.data.message;
    }
    return "An error occurred";
}
  
export default errorMessage