const mongoose = require('mongoose')
const schema = mongoose.Schema

const user = new schema({
    name: { type: String, default: () => { return this.id; } },
    password: { type: String, require: true },
    authtype: {
        type: String, enum: ['local', 'facebook', 'google'], default: 'local'
    },
    created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('user', user);
