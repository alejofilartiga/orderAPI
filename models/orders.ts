import {Model, Schema, model} from "mongoose"

export interface IOrder {
    createdAt: Date;
    price: number;
    items: IItem[];
    shippingDetails: IShippingDetails;
    total: number;
    status: String,

};

export interface IItem {
    id: number,
    price: number,
    quantity: number,
    title: String
};

export interface IShippingDetails {
    name: String,
    number: number,
    location: String,
    email: String,
    total: number;
};


const OrderSchema = new Schema <IOrder> ({
    createdAt :{type: Date, default: Date.now},
    price: {type: Number, required: true},

    items: { type: [{
        id: {type: Number, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
        title: {type: String, required: true}
    }],
        required: true
    },

    shippingDetails: {
        name: {type: String, required: true},
        number: {type: Number, required: true},
        location: {type: String, required: true},
        email: {type: String, required: true},

    }, 
    status: {type: String, required: true},
    total: {type: Number, required: true}  

});

const Order: Model <IOrder> = model <IOrder> ("order", OrderSchema);
export default Order;