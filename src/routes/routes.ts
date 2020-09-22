import  {Router, Response,Request} from 'express'
import FileUploadAdapter from '../../src/Adapter/FileUploadAdapter'

const routes = Router();
import multer from 'multer'
import path from 'path'
import helpers from '../helpers/helpers'

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname,'/../../tmp/uploads/'))
    },
    filename:(req, file, cb)=>{
        cb(null, helpers.generateDefaultName(file.originalname))
    }
})

const upload = multer({storage})
routes.post('/file',upload.single('file'), async(request:Request, response:Response)=>{

    const {file} = request;
    if(!file){
        return response.json('File not foud');
    }

    const destination = helpers.generateDefaultName(file.originalname);

    const responseFile = await FileUploadAdapter.upload({file, destination})


    return response.json(responseFile);
})
routes.get('/file/:name',  async(request:Request, response:Response)=>{
    const  name:string = request.params.name ;
    const url = await FileUploadAdapter.getUrl(name)

    return response.json({name,url})

})


export default routes;
