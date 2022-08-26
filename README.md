Run: 
- `npm install`
- `npm run build`
- `npm run start`

Login:
 - [POST]: http://localhost:3001/api/login
 - BODY (json): `{
        "email": "", // required
        "password": "" // required
      }`
 - RESULT:
   * 200: Login success
   * 400: User Not Found
   * 400: Invalid Password
   * 400: Email or password is required!

Register:
- [POST]: http://localhost:3001/api/register
- BODY (json): `{
   "email": "", // required
   "password": "" // required
}`

- RESULT:
    * 201: Register success
    * 400: User Already Exists
    * 400: Email or password is required!

Create pre signed URL:
- [POST]: http://localhost:3001/api/s3/create-presigned-url
- BODY
  * json:
     `{
         "fileName": "card.png",
         "contentType": "image/png"
      }`
  * binary: _Input file_
  
- RESULT:
    * 200: Create presigned URL success
    * 400: FILE_NAME_NOT_FOUND
    * 400: SIGNED_URL_FAILED
    * 401: UnAuthorized
    * 403: Token Expired


   
