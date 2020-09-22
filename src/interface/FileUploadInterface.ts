export interface FileUploadResponse{
    status:Boolean,
    file:{
        id:string,
        name:string,
        link:string
    }
}

export interface FileUploadResquest{
    file:File,
    destination:string
}

interface FileUploadInterface{
    upload(fileUploadRequest:FileUploadResquest ):Promise<FileUploadResponse>
    list():File[]
    delete(nameFile:String):void
    getUrl(nameFile: string):Promise<string>
}

export default FileUploadInterface;
