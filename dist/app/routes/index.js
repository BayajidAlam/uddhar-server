"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const shop_route_1 = require("../modules/shop/shop.route");
const category_route_1 = require("../modules/category/category.route");
const productSku_route_1 = require("../modules/productSku/productSku.route");
const ProductTags_route_1 = require("../modules/ProductTags/ProductTags.route");
const product_route_1 = require("../modules/product/product.route");
const auth_route_1 = require("../modules/auth/auth.route");
const seller_route_1 = require("../modules/seller/seller.route");
const sellsManager_route_1 = require("../modules/sellsManager/sellsManager.route");
const cupon_route_1 = require("../modules/coupon/cupon.route");
const order_route_1 = require("../modules/order/order.route");
const color_route_1 = require("../modules/color/color.route");
const size_route_1 = require("../modules/size/size.route");
const cart_route_1 = require("../modules/cart/cart.route");
const customer_route_1 = require("../modules/customer/customer.route");
const payment_route_1 = require("../modules/payment/payment.route");
const message_route_1 = require("../modules/message/message.route");
const conversation_route_1 = require("../modules/conversation/conversation.route");
const wishlist_route_1 = require("../modules/wishlist/wishlist.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/sellers',
        route: seller_route_1.SellerRoutes,
    },
    {
        path: '/sells-managers',
        route: sellsManager_route_1.SellsManagerRoutes,
    },
    {
        path: '/customers',
        route: customer_route_1.CustomersRoutes,
    },
    {
        path: '/shops',
        route: shop_route_1.ShopRoutes,
    },
    {
        path: '/coupons',
        route: cupon_route_1.CouponRoutes,
    },
    {
        path: '/products',
        route: product_route_1.ProductRoutes,
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/skus',
        route: productSku_route_1.ProductSkuRoutes,
    },
    {
        path: '/colors',
        route: color_route_1.ColorsRoutes,
    },
    {
        path: '/sizes',
        route: size_route_1.SizeRoutes,
    },
    {
        path: '/tags',
        route: ProductTags_route_1.ProductTagsRoutes,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRoutes,
    },
    {
        path: '/cart',
        route: cart_route_1.CartRoutes,
    },
    {
        path: '/wishlist',
        route: wishlist_route_1.WishlistRoutes,
    },
    {
        path: '/payments',
        route: payment_route_1.PaymentRoutes,
    },
    {
        path: '/conversations',
        route: conversation_route_1.ConversationRoutes,
    },
    {
        path: '/messages',
        route: message_route_1.MessageRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
