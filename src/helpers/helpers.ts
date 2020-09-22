 import {randomBytes} from 'crypto'
 export default {
    generateDefaultName:(originalName:string):string=>{
        const date = Math.floor(Date.now()/1000)

        return `${date}_${randomBytes(6).toString('hex')}_${originalName}`
    }
}

