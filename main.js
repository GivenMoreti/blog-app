"use strict";
// guest users
class User {
    id;
    username;
    permissions;
    constructor(username, permissions = "guest") {
        this.id = Math.random();
        this.username = username;
        this.permissions = permissions;
    }
    updateFromGuestToUser(user) {
        if (user.permissions === "guest" || user.permissions === "admin") {
            user.permissions = "user";
            return true;
        }
        return false;
    }
}
class Blog {
    id;
    title;
    description;
    dateCreated;
    dateModified;
    static blogs = [];
    // constructor(title: string, description: string) {
    constructor(blog) {
        this.id = Math.ceil(Math.random() * 100);
        this.title = blog.title;
        this.description = blog.description;
        this.dateCreated = new Date();
    }
    // helper methods
    static updateBlog(blog, id) {
        const blogFound = this.findBlog(id);
        if (blogFound === null) {
            return;
        }
        blogFound.title = blog.title;
        blogFound.description = blog.description;
        blogFound.dateModified = new Date();
        return blogFound;
    }
    static findBlog(id) {
        return this.blogs.find(b => b.id === id) ?? null;
    }
    static deleteBlog(id, user) {
        const blogFound = this.findBlog(id);
        if (blogFound !== null && (user.permissions === "user" || user.permissions === "admin")) {
            return this.blogs.filter(b => b.id !== id);
        }
        else {
            return this.blogs;
        }
    }
    static saveBlog(blog, user) {
        if (user.permissions !== "guest") {
            this.blogs.push(blog); // saves the blog into the arr 
            return true;
        }
        else {
            return "you do not have necessary permissions to save blog";
        }
    }
    static printBlogs() {
        return this.blogs.map((b) => console.log(`${b.id} ${b.title} ${b.description}`));
    }
}
const blog1 = new Blog({
    title: "my first",
    description: "my first other description"
});
const blog2 = new Blog({
    title: "my other title",
    description: "my other other description"
});
// guest
const user1 = new User("Jane");
// user
const user2 = new User("Jin", "admin");
const user3 = new User("mark", "user");
console.log(Blog.saveBlog(blog2, user1));
console.log(Blog.saveBlog(blog1, user2));
console.log(Blog.saveBlog(blog1, user3));
Blog.updateBlog({
    description: "Update description",
    title: "update title",
    dateModified: new Date()
}, blog1.id);
//create two users
// Blog.deleteBlog(blog1.id);
console.log(Blog.deleteBlog(blog2.id, user2));
