import User, { printName, printAge } from './User/User.js'

let user = new User('sarah', 30);

printName(user);
printAge(user);