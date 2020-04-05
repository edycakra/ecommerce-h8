**ADMIN SIDE**
----
0. [WelcomePage]
1. [Navbar]: @BRAND, @Products, @User(postlogin), @Cart(postlogin), @Login(prelogin), @Logout(postlogin)
    - @BRAND: [WelcomePage]
    - @Products: [ProductsPage]
        - @Item: [ProductDetail]
    - @Login: [LoginRegisterForm]
    - @User: @FormProduct => [FormCRUDProduct]
             @TransactionHistory => [RecordGraph]
    - @Logout: [WelcomePage]
    - @Cart --> CUSTOMER SIDE
    [Sidebar]: @FormProduct => [FormCRUDProduct]
               @TransactionHistory => [RecordGraph]

2. Feature: 
    - Priorities: [Navbar], [WelcomePage], [ProductsPage], [LoginRegisterForm], [FormCRUDProduct], [RecordGraph]
    - Minor: [ProductDetail], [Sidebar]

Initial Database :
Image 1
https://images.unsplash.com/photo-1538448174498-9956c159edb0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80

Image 2
https://images.unsplash.com/photo-1472457974886-0ebcd59440cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80

Image 3
https://images.unsplash.com/photo-1560167016-022b78a0258e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80