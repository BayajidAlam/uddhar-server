"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
// login
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
        include: {
            superAdmin: true,
            admin: true,
            seller: true,
            sellsManager: true,
            customer: true,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password &&
        !(yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    // create access token and refresh token
    const { id, role, superAdmin, admin, seller, sellsManager, customer } = isUserExist;
    //get and add shop id to jwt
    const shop = yield prisma_1.default.shop.findFirst({
        where: {
            sellerId: seller === null || seller === void 0 ? void 0 : seller.id,
        },
    });
    // add shop count of a seller to JWT
    let shopCount = 0;
    if (role === client_1.UserRole.seller) {
        const isShopExist = yield prisma_1.default.shop.findMany({
            where: {
                sellerId: seller === null || seller === void 0 ? void 0 : seller.id,
            },
        });
        shopCount = isShopExist.length;
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        id,
        role,
        email,
        shopCount,
        sellerId: seller === null || seller === void 0 ? void 0 : seller.id,
        shopId: shop === null || shop === void 0 ? void 0 : shop.id,
        fullName: superAdmin
            ? superAdmin === null || superAdmin === void 0 ? void 0 : superAdmin.fullName
            : admin
                ? admin.fullName
                : seller
                    ? seller.fullName
                    : sellsManager
                        ? sellsManager === null || sellsManager === void 0 ? void 0 : sellsManager.fullName
                        : customer === null || customer === void 0 ? void 0 : customer.fullName,
        profileImage: superAdmin
            ? superAdmin === null || superAdmin === void 0 ? void 0 : superAdmin.profileImg
            : admin
                ? admin.profileImg
                : seller
                    ? seller.profileImg
                    : sellsManager
                        ? sellsManager === null || sellsManager === void 0 ? void 0 : sellsManager.profileImg
                        : customer === null || customer === void 0 ? void 0 : customer.profileImg,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({
        id,
        role,
        email,
        shopCount,
        sellerId: seller === null || seller === void 0 ? void 0 : seller.id,
        shopId: shop === null || shop === void 0 ? void 0 : shop.id,
        fullName: superAdmin
            ? superAdmin === null || superAdmin === void 0 ? void 0 : superAdmin.fullName
            : admin
                ? admin.fullName
                : seller
                    ? seller.fullName
                    : sellsManager
                        ? sellsManager === null || sellsManager === void 0 ? void 0 : sellsManager.fullName
                        : customer === null || customer === void 0 ? void 0 : customer.fullName,
        profileImage: superAdmin
            ? superAdmin === null || superAdmin === void 0 ? void 0 : superAdmin.profileImg
            : admin
                ? admin.profileImg
                : seller
                    ? seller.profileImg
                    : sellsManager
                        ? sellsManager === null || sellsManager === void 0 ? void 0 : sellsManager.profileImg
                        : customer === null || customer === void 0 ? void 0 : customer.profileImg,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
// refresh token
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { id } = verifiedToken;
    // checking deleted user's refresh token
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
        include: {
            superAdmin: true,
            admin: true,
            seller: true,
            sellsManager: true,
            customer: true,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const { role, email, superAdmin, admin, seller, sellsManager, customer } = isUserExist;
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id,
        role,
        email,
        fullName: superAdmin
            ? superAdmin === null || superAdmin === void 0 ? void 0 : superAdmin.fullName
            : admin
                ? admin.fullName
                : seller
                    ? seller.fullName
                    : sellsManager
                        ? sellsManager === null || sellsManager === void 0 ? void 0 : sellsManager.fullName
                        : customer === null || customer === void 0 ? void 0 : customer.fullName,
        profileImage: superAdmin
            ? superAdmin === null || superAdmin === void 0 ? void 0 : superAdmin.profileImg
            : admin
                ? admin.profileImg
                : seller
                    ? seller.profileImg
                    : sellsManager
                        ? sellsManager === null || sellsManager === void 0 ? void 0 : sellsManager.profileImg
                        : customer === null || customer === void 0 ? void 0 : customer.profileImg,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
// const changePassword = async (
//   user: JwtPayload | null,
//   payload: IChangePassword
// ): Promise<void> => {
//   const { oldPassword, newPassword } = payload;
//   // checking is user exist
//   // const isUserExist = await User.isUserExist(user?.userId);
//   //alternative way
//   const isUserExist = await User.findOne({ id: user?.userId }).select(
//     '+password'
//   );
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   // checking old password
//   if (
//     isUserExist.password &&
//     !(await User.isPasswordMatched(oldPassword, isUserExist.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
//   }
//   // // hash password before saving
//   // const newHashedPassword = await bcrypt.hash(
//   //   newPassword,
//   //   Number(config.bycrypt_salt_rounds)
//   // );
//   // const query = { id: user?.userId };
//   // const updatedData = {
//   //   password: newHashedPassword,  //
//   //   needsPasswordChange: false,
//   //   passwordChangedAt: new Date(), //
//   // };
//   // await User.findOneAndUpdate(query, updatedData);
//   // data update
//   isUserExist.password = newPassword;
//   isUserExist.needsPasswordChange = false;
//   // updating using save()
//   isUserExist.save();
// };
// const forgotPassword = async (payload: { id: string }) => {
//   const user = await User.findOne({ id: payload.id }, { id: 1, role: 1 });
//   if (!user) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist!")
//   }
//   let profile = null;
//   if (user.role === ENUM_USER_ROLE.ADMIN) {
//     profile = await Admin.findOne({ id: user.id })
//   }
//   else if (user.role === ENUM_USER_ROLE.FACULTY) {
//     profile = await Faculty.findOne({ id: user.id })
//   }
//   else if (user.role === ENUM_USER_ROLE.STUDENT) {
//     profile = await Student.findOne({ id: user.id })
//   }
//   if (!profile) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Pofile not found!")
//   }
//   if (!profile.email) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Email not found!")
//   }
//   const passResetToken = await jwtHelpers.createResetToken({ id: user.id }, config.jwt.secret as string, '50m')
//   const resetLink: string = config.resetlink + `token=${passResetToken}`
//   console.log("profile: ", profile)
//   await sendEmail(profile.email, `
//       <div>
//         <p>Hi, ${profile.name.firstName}</p>
//         <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
//         <p>Thank you</p>
//       </div>
//   `);
//   // return {
//   //   message: "Check your email!"
//   // }
// }
// const resetPassword = async (payload: { id: string, newPassword: string }, token: string) => {
//   const { id, newPassword } = payload;
//   const user = await User.findOne({ id }, { id: 1 })
//   if (!user) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "User not found!")
//   }
//   const isVarified = await jwtHelpers.verifyToken(token, config.jwt.secret as string);
//   const password = await bcrypt.hash(newPassword, Number(config.bycrypt_salt_rounds))
//   await User.updateOne({ id }, { password });
// }
exports.AuthService = {
    login,
    refreshToken,
};
