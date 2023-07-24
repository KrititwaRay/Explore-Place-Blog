const mongoose=require('mongoose');
const stateSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    }
},{timestamps:true  });

// stateSchema.index({'$**':'text'})

const State=mongoose.model('State',stateSchema);

module.exports=State;