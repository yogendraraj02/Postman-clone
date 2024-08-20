// Define types for the response and error
export interface ResponseData {
    data: {
      headers: {
        [key: string]: string;
      };
      status: number;
      responseTime: number;
      data: any;
    };
  }
  
  interface ErrorType {
    message: string;
  }
  
  export interface ResponseBoxProps {
    response?: ResponseData;
    error?: ErrorType;
  }