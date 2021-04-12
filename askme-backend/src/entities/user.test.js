const User = require('./user');

test('isValid should return false when user has too little name', () => {
    var user = new User("t", "123456789");
    expect(user.isValid()).toBe(false);
});

test('isValid should return false when user has too big name', () => {
    var user = new User("taaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "123456789");
    expect(user.isValid()).toBe(false);
});

test('isValid should return false when user has too little password', () => {
    var user = new User("teste", "12345");
    expect(user.isValid()).toBe(false);
});

test('isValid should return false when user has too big password', () => {
    var user = new User("teste", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(user.isValid()).toBe(false);
});