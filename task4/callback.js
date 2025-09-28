// 1. Create a function getUserData(id, callback) that uses setTimeout
function getUserData(id, callback) {
    setTimeout(() => {
        if (id > 0) {
            callback(null, { id, name: "John", email: "john@example.com" });
        } else {
            callback("Error: Invalid ID", null);
        }
    }, 1000);
}

// Test with callback
getUserData(1, (err, user) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Callback Result:", user);
    }
});


// 2. Convert to Promise-based function
function getUserDataPromise(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: "John", email: "john@example.com" });
            } else {
                reject("Error: Invalid ID");
            }
        }, 1000);
    });
}

// Test with .then and .catch
getUserDataPromise(2)
    .then(user => console.log("Promise Result:", user))
    .catch(err => console.log(err));


// 3. Use async/await to fetch multiple users (id = 1, 2, 3)
async function fetchMultipleUsers() {
    try {
        const user1 = await getUserDataPromise(1);
        console.log("Async/Await:", user1);

        const user2 = await getUserDataPromise(2);
        console.log("Async/Await:", user2);

        const user3 = await getUserDataPromise(3);
        console.log("Async/Await:", user3);
    } catch (error) {
        console.log("Error caught:", error);
    }
}

fetchMultipleUsers();


// 4. Constructor function User
function User(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
}

// Add method using prototype
User.prototype.getInfo = function () {
    return `Name: ${this.name}, Email: ${this.email}`;
};

// Test the constructor
const userObj = new User(1, "John", "john@example.com");
console.log(userObj.getInfo());  // Output: Name: John, Email: john@example.com
