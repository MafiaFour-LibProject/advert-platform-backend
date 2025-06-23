# Advertisement Management Platform API

An **Advertisement Management** API built with **Node.js**, **Express**, **MongoDB Atlas**, and **Cloudinary** for media storage.
Supports **user** and **vendor** roles, JWT-based authentication, and CRUD operations for advertisements.

---

## 🌐 **Base URL**

```
http://localhost:5000/api
```
https://advert-platform-backend.onrender.com
```
//advert-platform-backend.onrender.com/api/ads
```
---

## ⚡️ **Roles**

* **User**: Can register, login, and **view** ads.
* **Vendor**: Can register, login, and **create, update, delete** their own ads.

---

## 🔐 **Authentication**

* All protected endpoints require a **Bearer Token**.
* Token is returned after login.
* Tokens do NOT expire.

---

# 👥 User/Vendor Registration

## **Register**

```
POST /auth/register
```

### ✅ Request Body

For both Users and Vendors:

| Field         | Type   | Required | Notes                                                     |
| ------------- | ------ | -------- | --------------------------------------------------------- |
| `name`        | String | Yes      | User/Vendor’s full name                                   |
| `email`       | String | Yes      | Must be unique                                            |
| `username`    | String | Yes      | Must be unique                                            |
| `phoneNumber` | String | Yes      | Must be unique                                            |
| `password`    | String | Yes      | Min strength: 12 chars                                    |
| `role`        | String | Optional | Either `user` or `vendor`. Defaults to `user` if omitted. |

#### ✅ Example Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johnny",
  "phoneNumber": "123456789",
  "password": "strongPass12!",
  "role": "vendor"
}
```

---

## 🔑 **Login**

```
POST /auth/login
```

### ✅ Request Body

| Field                 | Type   | Required | Notes                                         |
| --------------------- | ------ | -------- | --------------------------------------------- |
| `email` or `username` | String | Yes      | Either `email` OR `username` must be used.    |
| `password`            | String | Yes      | Must match the password used at registration. |

#### ✅ Example Request

```json
{
  "email": "john@example.com",
  "password": "strongPass12!"
}
```

---

# 🚪 Sign Out

Handled client-side (just remove the JWT token).

---

# 📰 **Advertisement Endpoints**

| Route      | Method | Role         | Purpose               |
| ---------- | ------ | ------------ | --------------------- |
| `/ads`     | GET    | All          | Get all ads           |
| `/ads/:id` | GET    | All          | Get ad by ID          |
| `/ads`     | POST   | Vendor       | Create a new ad       |
| `/ads/:id` | PUT    | Owner/Vendor | Update an existing ad |
| `/ads/:id` | DELETE | Owner/Vendor | Delete an existing ad |

---

## 📄 Creating an Advertisement

### ✅ Endpoint

```
POST /ads
```

### 👇 Request

* **Header**: `Authorization: Bearer <token>` (Vendor account)

#### ✅ Form-Data Body:

| Field         | Type    | Required |                                                           |
| ------------- | ------- | -------- | --------------------------------------------------------- |
| `title`       | String  | Yes      |                                                           |
| `category`    | String  | Yes      |                                                           |
| `price`       | Number  | Yes      |                                                           |
| `description` | String  | Yes      |                                                           |
| `media`       | File(s) | No       | Images or Videos. Multiple files can be uploaded (max 5). |

#### ✅ JSON example (without media files)

```json
{
  "title": "Samsung Galaxy S24",
  "category": "electronics",
  "price": 1199,
  "description": "Latest Samsung phone with advanced camera and design."
}
```

---

## ⚡️ Updating an Advertisement

### ✅ Endpoint

```
PUT /ads/:id
```

Same fields as creating an ad. Accepts files via form-data.

---

## ❌ Deleting an Advertisement

### ✅ Endpoint

```
DELETE /ads/:id
```

---

## 🔍 Viewing an Advertisement

### ✅ Get All

```
GET /ads
```

### ✅ Get Single

```
GET /ads/:id
```

---

# 🔍 Search & Filter

Query Parameters:

| Parameter    | Description                                 |
| ------------ | ------------------------------------------- |
| `title`      | Matches titles starting with the letter(s). |
| `category`   | Matches category.                           |
| `priceMin`   | Minimum price range.                        |
| `priceMax`   | Maximum price range.                        |
| `vendorName` | Matches vendor name.                        |
| `date`       | Matches date of ad.                         |

#### ✅ Example

```
GET /ads?title=sam
GET /ads?category=electronics&priceMin=1000&priceMax=1500
```

---

# 🖼️ Media Upload

Handled via:

* **Cloudinary**: All uploaded images/videos are stored and URLs saved.
* Supported formats: `.jpeg, .png, .jpg, .mp4, .mov, .avi`

---

# ⚡️ **Error Messages**

* `Username unavailable, please update.` when trying to register an already used username.
* `Account already exists.` when trying to register an already used email, username, or phone number.

---

# ⚡️ Testing

Use **Postman**:

✅ Registration:

```
POST http://localhost:5000/api/auth/register
```

✅ Login:

```
POST http://localhost:5000/api/auth/login
```

✅ Creating an Ad (Vendor Only):

```
POST http://localhost:5000/api/ads
```

Add files via `form-data` (`media`)

✅ Viewing Ads:

```
GET http://localhost:5000/api/ads
GET http://localhost:5000/api/ads/:id
```

---

# 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT (no expiration)
* Multer & Cloudinary for media
* Joi for validation
* Cors
* dotenv

---

# 🏁 Getting Started

1. Clone the repo.
2. Install dependencies:

   ```
   npm install
   ```
3. Create `.env` file:

   ```
   MONGO_URI=your-mongodb-url
   CLOUD_NAME=your-cloud-name
   CLOUD_API_KEY=your-cloud-api-key
   CLOUD_API_SECRET=your-cloud-api-secret
   ```
4. Run the server:

   ```
   npm run dev
   ```

--- Thanks for Reading. 🚀🎯