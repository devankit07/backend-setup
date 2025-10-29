class ApiResponse {
    constructor(statuscode, message, data = "success") {
        this.statuscode = statuscode;
        this.message = message;
        this.data = data;
        this.success = statuscode >= 200 && statuscode < 300;
    }
}

export default ApiResponse;
