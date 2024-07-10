import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema=new Schema(
   {
       userName:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
       },

       email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true
       },
       
       fullName:{
        type:Stringl,
        require:true,
       },

       avatar:{
        type:String,
        require:true,
       },

       password:{
        type:String,
        require:true
       },

       refreshtoken:{
        type:String,
       },

       coverImage:{
        type:String,
       },
   
       watchHistory:[
        {
            type:Schema.type.objectId,
            ref:"Video"
        }
       ]

   },
   {
    timestamps:true,
   }
)

//to encrypt the password field
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)
    next();
})

//method to compare user password with encrypted password
userSchema.methods.ispasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);         // here bcrypt has also compare method it compares the user password with the its own encrypted password and return the value in true ya false as result.
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",userSchema);