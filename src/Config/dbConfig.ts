import mongoose from "mongoose";


export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
const connection = mongoose.connection

connection.on("connected", ()=> {
    console.log("CONNECTED TO MONGODB :)")
})
connection.on("error", (err)=> {
    console.log("mongodb connection ERROR :(" + err)
    process.exit()
})
    }catch(error){
        console.log("CONNECTION WITH DB NOT MADE ")
        console.log(error)
    }
}