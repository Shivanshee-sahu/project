import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
  userId:{
    type: String,
    required: true
  },

  items:[{
product:{type:String , required:true},
quantity:{type:Number, required:true},
  }]  ,
  amount:{
type:'Number',required:true
  },
  address:{
    type:'String',
    ref:'Address',
    required:true
  },
  status:{
    type:String,
    default:'Pending',
    enum:['Pending','Processing','Delivered','Cancelled']
  },
  createdAt:{
    type:Date,
    default:Date.now
  }     

})
const Order=mongoose.models.Order || mongoose.model('Order',orderSchema);
export default Order;