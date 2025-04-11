import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {type: String , required: true},
    description : {type: String , required: true},
    price: {type: Number , required:true},
    image: {type: Array , required:true},
    category: {type: String , required: true},
    subCategory: {type: String , required: true},
    sizes: {type: Array , required:true},
    bestseller: {type: Boolean},
    date: {type: Number , required: true}
})

const productModel = mongoose.models.product || mongoose.model("product",productSchema);

// Models.product is used to avoid creating schema again and again! If the schema is already present then it will use the models that already  present

export default productModel

