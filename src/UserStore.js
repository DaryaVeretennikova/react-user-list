let _changeListeners = [];
let _users = [
    {
        "id": 1,
        "name": "Joe Smith",
        "login": "joe",
        "email": "joe.smith@mail.com"
    },
    {
        "id": 2,
        "name": "Mary Smith",
        "login": "mary",
        "email": "mary.smith@mail.com"
    },
    {
        "id": 3,
        "name": "Bill Gates",
        "login": "bill",
        "email": "billy@mail.com"
    }
];

const UserStore = {
    init: function () {
        this.notifyChange();
    },

    getUserId: function (id) {
        let userIndex = this.findObjectById(id);

        return _users[userIndex];
    },

    getUsers: function () {
        return _users;
    },

    addUser: function (user, callback) {
        let userIndex = this.findObjectById(user['id']);

        if (user['id'] !== undefined) {
            _users[userIndex] = user;
        } else {
            user['id'] = Math.max(..._users.map(user => user.id)) + 1;
            _users.push(user);
        }

        this.notifyChange();
        if (callback) {

            callback();
        }
    },

    removeUser: function (id, callback) {
        let userIndex = this.findObjectById(id);

        _users.splice(userIndex, 1);

        this.notifyChange();

        if (callback) {
            callback();
        }
    },

    findObjectById(id) {
        return _users.findIndex(item => {
            return item.id.toString() === id;
        });
    },

    notifyChange: function () {
        _changeListeners.forEach(function (listener) {
            listener()
        })
    },

    addChangeListener: function (listener) {
        _changeListeners.push(listener)
    },

    removeChangeListener: function (listener) {
        _changeListeners = _changeListeners.filter(function (l) {
            return listener !== l
        })
    }
};

export default UserStore;