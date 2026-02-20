# Vercel Deployment Guide (Hindi/English)

## 🚀 Vercel Par Deploy Kaise Karein

### Option 1: Frontend + Backend Separate Deploy (Recommended)

#### Step 1: Backend Deploy (Server)

1. **GitHub Repository me push karein:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Vercel.com par jao aur login karo**

3. **New Project create karo:**
   - "Add New" → "Project" click karo
   - GitHub repository select karo
   - **Root Directory:** `server` select karo
   - Framework Preset: **Other** ya **Node.js** select karo

4. **Environment Variables add karo:**
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5050
   FRONTEND_URL=https://your-frontend-app.vercel.app
   ```

5. **Build Settings:**
   - Build Command: (leave empty ya `npm install`)
   - Output Directory: (leave empty)
   - Install Command: `npm install`

6. **Deploy karo!**

7. **Backend URL note karo:** `https://your-backend-app.vercel.app`

---

#### Step 2: Frontend Deploy (Client)

1. **Vercel me new project create karo:**
   - "Add New" → "Project" click karo
   - Same GitHub repository select karo
   - **Root Directory:** `client` select karo
   - Framework Preset: **Create React App** select karo

2. **Environment Variables add karo:**
   ```
   REACT_APP_API_URL=https://your-backend-app.vercel.app/api
   ```

3. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Deploy karo!**

---

### Option 2: Monorepo Setup (Single Repository)

Agar aap ek hi repository me dono deploy karna chahte ho:

1. **Root level `vercel.json` file already create ho chuki hai**

2. **Vercel me project create karo:**
   - Repository select karo
   - Root Directory: (leave empty - root folder)
   - Framework: **Other**

3. **Environment Variables:**
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=https://your-app.vercel.app
   REACT_APP_API_URL=https://your-app.vercel.app/api
   ```

4. **Deploy!**

---

## 📝 Important Changes Made:

### ✅ Files Created/Updated:

1. **`client/src/config/api.js`** - Centralized API config with environment variable support
2. **`server/index.js`** - Updated for Vercel serverless functions
3. **`vercel.json`** - Root level Vercel configuration
4. **`server/vercel.json`** - Server specific configuration

### ⚠️ Abhi Bhi Karna Hai:

**Frontend files me API_BASE_URL update karo:**

Sabhi files me `const API_BASE_URL = 'http://localhost:5050/api';` ko replace karo:

```javascript
import API_BASE_URL from '../config/api'; // ya appropriate path
```

**Files jo update karni hain:**
- `client/src/pages/Landing.jsx`
- `client/src/pages/Events.jsx`
- `client/src/pages/EventDetail.jsx`
- `client/src/pages/societies.jsx`
- `client/src/pages/SocietiesDetail.jsx`
- `client/src/pages/RegistrationForm.jsx`
- `client/src/pages/admin/*.jsx` (sabhi admin files)

---

## 🔧 Troubleshooting:

### Problem: CORS Error
**Solution:** `FRONTEND_URL` environment variable me sahi frontend URL add karo

### Problem: API calls fail
**Solution:** 
- Check karo `REACT_APP_API_URL` sahi set hai
- Backend URL verify karo
- Network tab me check karo kya request ja rahi hai

### Problem: Build fails
**Solution:**
- Check karo sabhi dependencies `package.json` me hain
- Build logs check karo Vercel dashboard me

### Problem: Environment variables not working
**Solution:**
- Vercel dashboard me environment variables add karo
- Redeploy karo after adding variables
- Frontend me `REACT_APP_` prefix zaroori hai

---

## 📚 Additional Resources:

- [Vercel Documentation](https://vercel.com/docs)
- [React App Deployment](https://vercel.com/docs/frameworks/create-react-app)
- [Node.js Serverless Functions](https://vercel.com/docs/frameworks/nodejs)

---

## ✅ Deployment Checklist:

- [ ] GitHub repository me code push kiya
- [ ] Backend environment variables set kiye
- [ ] Frontend environment variables set kiye
- [ ] CORS settings updated
- [ ] API_BASE_URL sabhi files me update kiya
- [ ] Build successful
- [ ] Test kiya production URL par

---

**Good Luck! 🎉**
