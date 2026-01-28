const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
    name:{
            type: String ,
            required:true
         },
    category:{
                type: String ,
                required:true
             },
    price:{
             type: Number ,
             required:true
          },
    farmerName:{
                  type: String ,
                  required:true
               },
    description:  String ,
    harvestDate:{
                   type:Date ,
                   default:Date.now
                },
    image:{
             type:String
          }
})

module.exports=mongoose.model('Product', ProductSchema)