





// import mongoose from "mongoose";
// import timestamps from "mongoose-timestamp";


// const alertParamsSchema = mongoose.Schema(
//     {

//         body: { type: String },

//         recipient: {

//             from: { type: String },

//             to: [
//                 { type: String }
//             ],

//             cc: [
//                 { type: String }
//             ],

//             bcc: [
//                 { type: String }
//             ]

//         },

//         subject: { type: String },

//         schedulingId: { type: mongoose.Types.ObjectId },

//         isActive: {
//             type: Number,
//             enum: [0, 1],
//             default: 1
//         },

//         isDelete: {
//             type: Number,
//             enum: [0, 1],
//             default: 0
//         }


//     },
//     {
//         collection: "alertParams",
//     });

// alertParamsSchema.plugin(timestamps);


// const alertParamsModel = mongoose.model("alertParams", alertParamsSchema);

// export default alertParamsModel;