import FileUploadInterface, { FileUploadResquest,FileUploadResponse } from './../interface/FileUploadInterface'
import GoogleCloudService from './../services/GoogleCloudStorage/GoogleCloudService'

class FileUploadAdapter implements FileUploadInterface{
    private gcsStorage: GoogleCloudService;
    constructor(){
     this.gcsStorage = new GoogleCloudService({bucketName:'wsp-storage-test', projectId:'wiser-back-wsp-290012'})
    }
    async upload({file, destination}: FileUploadResquest): Promise<FileUploadResponse> {
        const response = await this.gcsStorage.upload({file, destination});;
        return response
    }
    getUrl(nameFile: string): Promise<string> {
        const url = this.gcsStorage.getUrl(nameFile)
        return url;
    }
    list(): File[] {
        throw new Error("Method not implemented.");
    }
    delete(nameFile: String): void {
        throw new Error("Method not implemented.");
    }
}

export default new FileUploadAdapter()
