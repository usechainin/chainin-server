import { QueryError } from "mysql2";

class ApiError {
  ApiErrorcode: number;
  message: any;

  constructor(ApiErrorcode: number, message: any) {
    this.ApiErrorcode = ApiErrorcode;
    this.message = message;
  }
}

export default ApiError;
