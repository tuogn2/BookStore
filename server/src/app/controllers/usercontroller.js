const users = require('../modal/user')
const bcrypt = require('bcrypt')
class usercontroller {
    //lưu vào glabal state nếu thì trả về lúc tạo acc
    getusers(req, res, next) {
        users.findOne()
            .then(user => {
                return res.status(200).json(user)
            })
            .catch(err => res.status(500).json(err))
    }
    getuser(req, res, next) {
        users.findById(req.params.id)
            .then(user => {
                const { password, ...orther } = user._doc
                return res.status(200).json(orther)
            })
            .catch(err => res.status(500).json(err))
    }

    adduser(req, res, next) {
        const newuser = req.body;
        users.find({ name: newuser.name })
            .then(user => {
                if (user.length === 0) {
                    bcrypt.genSalt(10)
                        .then(salt => bcrypt.hash(newuser.password, salt))
                        .then(hashedpass => {
                            newuser.password = hashedpass;
                            const user = new users(newuser)
                            user.save()
                                .then(user => {
                                    res.cookie('user', req.body.name, {
                                        signed: true,
                                        sameSite: 'none',
                                        httpOnly: false,
                                        secure: true
                                    })
                                    res.status(200).json(user)
                                })
                                .catch(next)
                        })
                } else {
                    res.status(400).json('đã tạo rồi')

                }
            })
    }

    loginuser(req, res, next) {
        users.findOne({ name: req.body.name })
            .then(user => {
                if (!user) {
                    res.status(401).json('Username not found')
                    return
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(validated => {
                        //!validated => validated===false
                        if (!validated) {
                            return res.status(403).json('wrong password')
                        }
                        res.cookie('user', req.body.name, {
                            signed: true,
                            sameSite: 'none',
                            httpOnly: false,
                            secure: true

                        })
                        const { password, ...infor } = user._doc;
                        return res.status(200).json(infor)
                    })
            })
            .catch(err => {
                return res.status(400).json(err)
            })
    }
    async handleGoogleLogin(req, res, next) {
        const { email } = req.body; // Assuming email is sent in the request body
    
        try {
            // Find user by email and check if they are a Google user
            let user = await users.findOne({ name: email, authtype: 'google' });
    
            if (user) {
                // User exists and is a Google user
                res.cookie('user', email, {
                    signed: true,
                    sameSite: 'none',
                    httpOnly: false,
                    secure: true
                });
                const { password, ...userInfo } = user._doc;
                return res.status(200).json(userInfo);
            } else {
                // User does not exist, create a new one
                const newUser = new users({
                    name: email,
                    password: 'google-login', // Placeholder for password
                    authtype: 'google'
                });
    
                await newUser.save();
                res.cookie('user', email, {
                    signed: true,
                    sameSite: 'none',
                    httpOnly: false,
                    secure: true
                });
    
                const { password, ...userInfo } = newUser._doc;
                return res.status(201).json(userInfo);
            }
        } catch (err) {
            console.error("Error handling Google login:", err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    
}

module.exports = new usercontroller;