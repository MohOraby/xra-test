# Steps

   1 - Clone the repo

   2 - Run npm install

   3 - Create your .env file with the following Variables
   
       * PORT
       
       * JWT_SECRET
       
       * MONGODB_URI
       
       * BCRYPT_SALT

   4 - Run npm start
   
   5 - Create a user at `POST` `/api/v1/user/signup` with fields `firstName, lastName, email, password` you will get a token in response
   
   6 - You can also login `POST` `/api/v1/user/login` with `email, password` you will also get a token in response
   
   7 - Use the token at headers and create a post at `POST` `/api/v1/post/create` with fields `title, content`
   
   8 - Get posts list `Get` `/api/v1/post/list`
   
   9 - Edit user's post at `POST` `/api/v1/post/edit/:id` (checks the permission using the token in headers)

   10 - Delete user's post at `Get` `/api/v1/post/delete/:id` (checks the permission using the token in headers)


# You can see the documention by visiting /api-docs
  
# Hosted the server on vercel at https://xra-test.vercel.app/
   Please note that swagger UI at /api-docs is not working correctly (styling not loaded) at vercel which can by solved by saving swagger assets (CSS and JS files) as a part of the project, but that will make the project files bigger

# Hosted the server at https://xra-test.herokuapp.com/
   Please not that the two servers above use the same DB URI (MongoDB atlas cluster)
