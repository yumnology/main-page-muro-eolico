import mongoose, {Schema} from "mongoose";

const wallSchema = new Schema(
    {
        propeller1: {type: Number},
        propeller2: {type: Number},
        propeller3: {type: Number},
        propeller4: {type: Number},
        propeller5: {type: Number},
    }
)

const WallData = mongoose.models.WallData || mongoose.model("WallData", wallSchema);

export default WallData;