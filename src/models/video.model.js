import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema({

    videoFile:{
        type:String,
        require:true,  //cloudnary
    },

    thumbnail:{
        type:String,    // we brings url in String form from cloudnary
        require:true
    },

    title:{
        type:String,
        require:true
    },

    description:{
        type:String,
        require:true,
    },

    duration: {
        type: Number, 
        required: true
    },

    views: {
        type: Number,
        default: 0
    },

    isPublished: {
        type: Boolean,
        default: true
    },

    owner:{
        type:Schema.type.ObjectId,
        ref:"User"
    }
    
  },
  
  {
    timestamps:true
  }

)

videoSchema.plugin(mongooseAggregatePaginate);

export const Video=mongoose.model("Video",videoSchema);