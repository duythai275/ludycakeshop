import { CategoryActionTypes } from './category.type';

const INITIAL_STATE = {
    categories: [
        { 
            _id: 2,name: "Cakes Rolls",
            image: "CakeRolls_Category",
            products: [
                { 
                    _id: 18,
                    name: "Vanila Cake Rolls",
                    price: 12.45,
                    image: "VanillaCakeRolls"
                },
                { 
                    _id: 19,
                    name: "Mango Cake Rolls",
                    price: 12.45,
                    image: "MangoCakeRolls"
                },
                { 
                    _id: 20,
                    name: "Mocha Cake Rolls",
                    price: 12.45,
                    image: ""
                },
                { 
                    _id: 21,
                    name: "Ube Macapuno Cake Rolls",
                    price: 13.90,
                    image: "UbeCakeRolls"
                },
                { 
                    _id: 22,
                    name: "Pandan Macapuno Cake Rolls",
                    price: 12.45,
                    image: ""
                }
            ]
        },
        { 
            _id: 3,
            name: "Yema Cakes",
            image: "YemaCake_Category",
            products: [
                { 
                    _id: 23,
                    name: "Yema Custard Cake",
                    price: 9.25,
                    image: "YemaCustardCake"
                },
                { 
                    _id: 24,
                    name: "Ube Yema Cakes",
                    price: 9.25,
                    image: "YemaUbeCustardCake"
                },
                { 
                    _id: 25,
                    name: "Tres Leche Cake",
                    price: 9.25,
                    image: ""
                },
                { 
                    _id: 31,
                    name: "Yema Custard Cake",
                    price: 9.25,
                    image: "YemaCustardCake"
                },
                { 
                    _id: 32,
                    name: "Ube Yema Cakes",
                    price: 9.25,
                    image: "YemaUbeCustardCake"
                },
                { 
                    _id: 33,
                    name: "Tres Leche Cake",
                    price: 9.25,
                    image: ""
                }
            ]
        },
        { 
            _id: 4,
            name: "Empanada",
            image: "Empanada_Category",
            products: [
                { 
                    _id: 26,
                    name: "Empanada Chicken",
                    price: 5.10,
                    image: "ChickenEmpanada"
                },
                { 
                    _id: 27,
                    name: "Sansrival Small",
                    price: 2.00,
                    image: ""
                },
                { 
                    _id: 28,
                    name: " Sansrival Large",
                    price: 12.30,
                    image: ""
                },
                { 
                    _id: 29,
                    name: " Sylvannas Small",
                    price: 2.00,
                    image: ""
                },
                { 
                    _id: 30,
                    name: "Brazo de Mercedes",
                    price: 12.30,
                    image: ""
                }
            ]
        },
        { 
            _id: 1,
            name: "Breads",
            image: "Breads_Category",
            products: [
                { 
                    _id: 1,
                    name: "Pandesal",
                    price: 3.75,
                    image: "PinoyPandesal"
                },
                { 
                    _id: 2,
                    name: "Spanish Bread",
                    price: 3.75,
                    image: "SpanishBread"
                },
                { 
                    _id: 3,
                    name: " Pande-ube Bread",
                    price: 3.75,
                    image: ""
                },
                { 
                    _id: 4,
                    name: " Pande-coco Bread ",
                    price: 3.75,
                    image: "PandeCoco"
                },
                { 
                    _id: 5,
                    name: " Ube Flower Bread",
                    price: 3.75,
                    image: "UbeFlower"
                },    
                { 
                    _id: 6,
                    name: "Pande-Pula",
                    price: 3.75,
                    image: ""
                },
                { 
                    _id: 7,
                    name: "Pande-Hopia ",
                    price: 3.75,
                    image: ""
                },
                { 
                    _id: 8,
                    name: "Ube Cheese Pandesal",
                    price: 3.75,
                    image: "UbeCheesePandesal"
                },
                { 
                    _id: 9,
                    name: "Pineapple Slice Bread",
                    price: 3.75,
                    image: ""
                },
                { 
                    _id: 10,
                    name: "Ensaymada Cheese",
                    price: 2.70,
                    image: "Ensaymada"
                },
                { 
                    _id: 11,
                    name: " Ensaymada Ube",
                    price: 2.70,
                    image: ""
                },
                { 
                    _id: 12,
                    name: "Pandesal with Malunggay (Moringa Leaf)",
                    price: 3.75,
                    image: ""
                },
                { 
                    _id: 13,
                    name: "Whole wheat Pandesal",
                    price: 3.75,
                    image: ""
                },
                { 
                    _id: 14,
                    name: "Tasty Loaf Bread",
                    price: 3.75,
                    image: ""
                },
                { 
                    _id: 15,
                    name: "Cheese Bread",
                    price: 3.75,
                    image: ""
                },
                { 
                    _id: 16,
                    name: "Ensaymada Cupcakes",
                    price: 5.90,
                    image: ""
                },
                { 
                    _id: 17,
                    name: "Cream Cheesebun",
                    price: 3.75,
                    image: ""
                }
            ]
        }
    ]
};

const categoryReducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case CategoryActionTypes.FETCH_ALL_CATEGORIES: 
            return {
                ...state,
                categories: action.payload
            };
        default:
            return state;
    }
};

export default categoryReducer;