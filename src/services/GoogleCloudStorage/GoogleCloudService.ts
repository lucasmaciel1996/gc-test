import FileUploadInterface, {FileUploadResponse,FileUploadResquest} from '../../interface/FileUploadInterface'
import {Storage, Bucket} from '@google-cloud/storage'
import path from 'path'

interface ConstructorService {
    bucketName:string,
    projectId:string
}

export default class GoogleCloudService implements FileUploadInterface{
    private storage: Storage;
    private bucket:Bucket;

    constructor( {bucketName, projectId}:ConstructorService){
        this.storage = new Storage({
            keyFilename:path.join(
                              __dirname,
                              "/../../config/wiser-back-wsp-290012-a31285abfb96.json"
                            ),
                    projectId
        })
        this.bucket = this.storage.bucket(bucketName).;
    }
    async upload({file, destination}: FileUploadResquest): Promise<FileUploadResponse> {
        let status = false;
        try {
            const response = await this.bucket.upload(file.path, {destination})
            status = true;
            const {id, name, selfLink} = response[0].metadata;

            return {status, file:{id,name,link:selfLink}}
        } catch (error) {
            console.log(error);
            return error;
        }

    }

    async getUrl(nameFile: string): Promise<string> {
        const expires = '01-10-2021'
        const [url] = await this.bucket.file(nameFile).getSignedUrl({action:'read',expires})
        return url;
    }
    list(): File[] {
        throw new Error("Method not implemented.");
    }
    delete(file: string): void {
        throw new Error("Method not implemented.");
    }
}

