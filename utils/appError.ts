class appError extends Error {

status:string;
statusCode:number;
message: string;
details?:any[];

    constructor(statusCode:number,message:string,status:string,details?:any[]){
        super();
        this.statusCode=statusCode;
        this.status=status;
        this.message=message;
        this.details=details;

    }
   





}

export default appError;