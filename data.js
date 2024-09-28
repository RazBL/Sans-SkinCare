const categories = [
    {"id" : 0, "name" : "Bestsellers" , "topCategory" : true , "imageUrl": "desktop/moisturiser-for-oily-skin-1.jpg"},
    {"id" : 1, "name" : "Moisturisers" , "topCategory" : true , "imageUrl": "desktop/Moistirisers-category.jpg"},
    {"id" : 2, "name" : "Creams" , "topCategory" : true , "imageUrl": "desktop/Creams-categories.jpg"},
    {"id" : 3, "name" : "Cleansers" , "topCategory" : false , "imageUrl": ""},
    {"id" : 4, "name" : "Toners" , "topCategory" : false , "imageUrl": "" },
    {"id" : 5, "name" : "Exfoliant" , "topCategory" : false , "imageUrl": "" },
    {"id" : 6, "name" : "Skin Products" , "topCategory" : false , "imageUrl": "" }
];


const products = [
    {"id" : 0, "category" : [0,1,6], "name" : "Facial Moisturising Lotion No Spf" , "price" : 14.88 ,
     "imageUrl" : "Mobile/carave%20cream.png", 
     "miniProductTitle" : "" , "miniProductDescription" : "Facial Moisturising Lotion No Spf",
     "description" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore sit quia animi debitis dolorum quae, distinctio tempora facilis dignissimos sint impedit mollitia, aperiam modi blanditiis!"
    },
    {"id" : 1, "category" : [0,5,6], "name" : "BHA Liquid Exfoliant" , "price" : 29.99 ,
    "imageUrl" : "Mobile/San’s%20Exfoliant.png",
    "miniProductTitle" : "SKIN PERFECTING" , "miniProductDescription" : "2% BHA Liquid Exfoliant",
    "description" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore sit quia animi debitis dolorum quae, distinctio tempora facilis dignissimos sint impedit mollitia, aperiam modi blanditiis!"
    },
    {"id" : 2, "category" : [0,4,6], "name" : "Calm Soothing Liquid Toner" , "price" : 24.99 ,
    "imageUrl" : "Mobile/calming%20cream.png", 
    "miniProductTitle" : "" , "miniProductDescription" : "Calm Soothing Liquid Toner",
    "description" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore sit quia animi debitis dolorum quae, distinctio tempora facilis dignissimos sint impedit mollitia, aperiam modi blanditiis!"
    },
    {"id" : 3, "category" : [0,2,6], "name" : "Anti Aging Day Cream" , "price" : 14.99 ,
    "imageUrl" : "Mobile/Olay%20moisterizer.png", 
    "miniProductTitle" : "" , "miniProductDescription" : "Anti Aging Day Cream",
    "description" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore sit quia animi debitis dolorum quae, distinctio tempora facilis dignissimos sint impedit mollitia, aperiam modi blanditiis!"
    }
];

let shopping = [];

let favouriteItems = [];

