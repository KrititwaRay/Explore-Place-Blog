const State=require('../models/stateSchema');
const Place=require('../models/placeSchema');



//GET home page
module.exports.homePage=async(req,res)=>{
    
   try {

     const limit=5;
     const states=await State.find().limit(limit);
 
     const exploreLates=await Place.find({}).sort({_id:-1}).limit(limit);

     const westBengal=await Place.find({'state':'West Bengal'}).limit(limit);

    const sikkim=await Place.find({'state':'Sikkim'}).limit(limit);

    const rajasthan=await Place.find({'state':'Rajasthan'}).limit(limit);
    const kerala=await Place.find({'state':'Kerala'}).limit(limit);
    const goa=await Place.find({'state':'Goa'}).limit(limit);

     const place={exploreLates, westBengal,sikkim,rajasthan,kerala,goa};
 
    return res.render('index',{
        title:"Travel Guides- HOME",
        states,
        place
    })
   } catch (error) {
    return res.status(500).send({message:error.message || "Error Occured"});
   }
}


//GET explore state
module.exports.exploreStates=async(req,res)=>{
    
    try {
 
      const limit=20;
      const states=await State.find().limit(limit);
 
     return res.render('states',{
         title:"Travel Guides- STATES",
         states
     })
    } catch (error) {
     return res.status(500).send({message:error.message || "Error Occured"});
    }
 }
 
 

 //GET explore state by id
module.exports.exploreStatesById=async(req,res)=>{
    
    try {
       
        //not complete
         const statesById=await Place.find({'state':req.params.id});
 

         return res.render('states',{
             title:"Exploring Plac",
             statesById
         })
      } catch (error) {
         console.log(error.message)
         return res.status(500).send({message:error.message || "Error Occured"});
      }
 }


//GET explore place
module.exports.exploreplace=async(req,res)=>{
    
    try {
 
    
      const place=await Place.findById(req.params.id);
 
     return res.render('place',{
         title:"Travel Guides- PLACE",
         place
     })
    } catch (error) {
     return res.status(500).send({message:error.message || "Error Occured"});
    }
 }

 //POST search
 module.exports.search=async(req,res)=>{
    try {
        const searchTerm=req.body.searchTerm;
        const place=await Place.find({$text:{$search:searchTerm, $diacriticSensitive:true}});
        // $diacriticSensitive field, when set to true, ensures that the search is case-insensitive
        return res.render('search',{
            title:"Exploring Place",
            place
        })
    } catch (error) {
        return res.status(500).send({message:error.message || "Error Occured"});

    }
 }

// EXPLORE LETEST
module.exports.exploreLetest=async(req,res)=>{
    try {
        const place=await Place.find({}).sort({_id:-1}).limit(50);
        return res.render('explore-latest',{
            title:"Exploring Latest Place",
            place
        })
    } catch (error) {
        return res.status(500).json({message:error.message || "Error Occured"});

    }
}

//random
module.exports.exploreRandom=async(req,res)=>{
    try {
        const count=await Place.find().countDocuments();
        console.log(count);
        const random=Math.floor(Math.random()*count);
        const place=await Place.findOne().skip(random).exec();
        return res.render('explore-random',{
            title:"Exploring Random",
            place
        })
    } catch (error) {
        return res.status(500).send({message:error.message || "Error Occured"});

    }
}
//submit form
module.exports.submitForm=(req,res)=>{
    return res.render('submit',{
        title:"Submit"
    })
}


//submit form
module.exports.submitPlace=async(req,res)=>{
    try {
      
        const newPlace=await Place.create({
            
            name:req.body.name , 
            description:req.body.description , 
            email:req.body.email , 
            state:req.body.state , 
            image:req.file.filename , 
        });
        req.flash('success','Post Published!');
        return res.redirect('/');
    } catch (error) {
        console.log(error)
        req.flash('error','Unable to Post!');
        return res.redirect('back');
    }
}

async function insertDemo(){
 
        try {
            await State.insertMany([
                {
                    name:"Punjab",
                    image:"goldenTemple.jpg"
                },
                
            ]);
        } catch (error) {
            console.log(error);
        }
    
    }
    // insertDemo();

