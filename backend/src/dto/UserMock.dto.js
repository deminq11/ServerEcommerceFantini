export default class UserMockDTO {
    static getUserInputFrom = (user) => {
        return {
            _id: user._id,
            photo: user.photo || null,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role || "USER",
            pets: user.pets || [],
            isOnline: false,
            verifyCode: user.verifyCode,
            verify: user.verify|| false,
            resetToken: user.resetToken|| null,
        }
    }
} 
