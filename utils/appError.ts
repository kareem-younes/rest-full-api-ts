class appError extends Error {

status:string;
statusCode:number;
message: string;

    constructor(statusCode:number,message:string,status:string){
        super();
        this.statusCode=statusCode;
        this.status=status;
        this.message=message;

    }
   





}

export default appError;