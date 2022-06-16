const {UserRoles} = require("../../helper/enums");
const orderRepository = require("./orderRepository");
const productRepository = require("./../products/productRepository")
const userRepository = require("./../users/userRepository")

const createNewOrder = async(orderData) => {
    try {
        await orderRepository.createOrder(orderData);
        return {
            data: null,
            error: null
        }
    } catch (err) {
        console.log(err.message);
        // throw new Error("Error creating the order!!");
        return {
            data: null,
            error: "Error creating the order!!"
        }
    }
    
}

const updateOrderStatus = async(data) => {
    const {orderId, userId} = data;
    const {rows} = await userRepository.roleCheckHelper(userId);
    const isAdmin = rows[0].roles == UserRoles.ADMIN;
    const isOrderValid = await orderRepository.orderExists(orderId) != null;
    console.log(isOrderValid);
    if(!isOrderValid) {
       
        return {
            data: null,
            error: "Order doesn't exists!"
        }
    }
    else if(isAdmin) {
        await orderRepository.updateOrderStatusByAdmin(data);
        return{
            data:null,
            error:null
        }
    } else {
       
        return {
            data: null,
            error: "Unauthorized user!"
        }
    }
}

module.exports = {
    createNewOrder,
    updateOrderStatus
}