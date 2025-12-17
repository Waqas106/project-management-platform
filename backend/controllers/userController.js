import User from "../models/user.js";

export const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            id: req.user._id,
            name: req.user.name,
            email: req.user.email
        });
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
};


export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user) return res.status(404).json({message: "User not found"});

        user.name = req.body.name || user.name;
        await user.save();

        res.status(200).json({
            success: true,
            message:"Profile Updated Successfully",
            user:{
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({message: "Server error"});
    }
};