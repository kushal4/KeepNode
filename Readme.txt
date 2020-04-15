this is node js express application .To run this application follow the below steps.

1) npm install
2) to use nodemon install it with npm install -g nodemon
3) use nodemon or node index.js

mysql architecture which is used for simplicity of this application is listed below:-

users table :-

1)id ->primary key

2)username -> string varchar 65 (not null)
3)email  -> string varchar 65 (not null)
4) password -> string varchar 65(not null)
5)created_at -> date type (current date date now)
6)updated_at -> date type (current date date now)


notes table  :-

1) id -> primary key
2) user_id -> id of the user (foreign key constraint with id of 'users' table)
3) title -> string varchar 65 (not null)
4) body -> text type ( can be null)
5) image -> medium blob (stored image in db assuming i dont have access to cdn server so storing it in db)
6) is_done -> boolean (0 or 1 defualt value is 0) 



