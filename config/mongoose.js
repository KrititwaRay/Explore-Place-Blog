
const mongoose = require('mongoose');

main().then(()=>console.log(`connect with database`)).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/EXPLORE-PLACE-BLOG');

}