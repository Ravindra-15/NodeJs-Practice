const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
//first check request headers has authorization or not
const authorization = req.headers.authorization;
if(!authorization) {
    return res.status(401).json({error: 'Token Not Found'});
}

    // Extract the jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) 
        return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'invalid token' });
    }
};

// Function to generate jwt token
const generateToken = (userdata) => {
    // Generate a new jwt token using user data
    return jwt.sign(userdata, process.env.JWT_SECRET); //{expiresIn : 30}
};

module.exports = { jwtAuthMiddleware, generateToken };
