# Advert Platform Backend

✅ **Live URL**: https://advert-platform-backend.onrender.com

## 📖 Introduction
This is the Advert Platform Backend — an Express + Node.js + MongoDB app for creating and managing advertisements. Vendors can register and post ads, including external media URLs (no direct uploads), and visitors can view these ads.

---

## 🛠️ Features
- User Registration (Email or Username + Password).
- User Login (Email or Username + Password).
- Publicly Viewable Ads (`GET /api/ads`).
- Create, Edit, and Delete Ads (Vendor Role).
- Media added via external URLs.

---

## 🛤️ Endpoints
### 🔐 Auth
- **POST** `/api/register`: Register a new user
  - Body example:
    ```json
    {
      "name": "John",
      "email": "john@example.com",
      "username": "johnny",
      "phoneNumber": "123456789",
      "password": "securepass",
      "role": "vendor"
    }
    ```
- **POST** `/api/login`: Login (Email OR Username + Password)

### 📰 Ads
- **GET** `/api/ads`: Get All Ads
- **GET** `/api/ads/{id}`: Get Specific Ad by ID
- **POST** `/api/ads`: Create an Ad (Vendor Only)

#### ✅ Create an Ad Example
Send JSON:
```json
{
  "title": "Matte Lipstick",
  "category": "beauty",
  "price": 25,
  "description": "Long-lasting matte lipstick",
  "media": ["https://www.istockphoto.com/photo/matte-lipstick-makeup-image.png"]
}
