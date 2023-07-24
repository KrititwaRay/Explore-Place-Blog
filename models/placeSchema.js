const mongoose=require('mongoose');

const placeSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,

    },
    state:{
        type:String,
        // enum: ['West Bengal', 'Sikkim', 'Rajasthan', 'Kerala', 'Goa'],
        // required:true,
    },
    image:{
        type:String,
        // required:true,
    }
},{timestamps:true  });

// placeSchema.index({name:'text',description:'text'});
//wildCard indexing
placeSchema.index({"$**":'text'});

const Place=mongoose.model('Place',placeSchema);
module.exports=Place;
