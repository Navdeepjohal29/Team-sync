# GET All Users

 curl -v 'localhost:3001/api/users' 

 # Create new User

 curl -X POST http://localhost:3001/api/addMember -H "Content-Type: application/json" -d '{"firstname":"navdeep", "lastname":"kaur", "email":"nkaur@gmail.com", "phone":"898089887", "role":1}'


# Edit User

 curl -X PUT http://localhost:3001/api/users/14 -H "Content-Type: application/json" -d '{"firstname":"navdeep", "lastname":"kaur", "email":"nkaur@gmail.com", "phone":"898089887", "role":1}'



 # Delete User

 #  curl -X DELETE http://localhost:3001/api/users/<user id>

curl -X DELETE http://localhost:3001/api/users/19