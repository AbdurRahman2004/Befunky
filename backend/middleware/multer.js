import multer from "multer";

const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname);
        // Call back function multer is used to mention the completion of the process here null -> no error and passes the result as original name
    }
}) 

const upload = multer({storage})

export default upload