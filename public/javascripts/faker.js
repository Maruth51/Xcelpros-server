const faker = require("faker");
const Credantial = require("../../models/credential");
const User = require("../../models/user");


function seed_user() {
  let user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    designation:"Adminstator",
    email : faker.internet.email(),
    phone :"+1 987 654 3210",
    avatar : faker.image.avatar()
  }
  Credantial.create({email:user.email,password:faker.internet.password(8)}).then(res=>{
      User.create(user).then(res=>{
          console.log("success")
      }).catch(err=>{
          console.log(err)
      })
  }).catch(err=>{
    console.log(err)
})
}

let i =0
while(i<10){
    seed_user()
    i++
}
