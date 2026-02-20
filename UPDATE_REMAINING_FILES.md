# Remaining Files Update Guide

## Files jo abhi bhi update karni hain:

Sabhi files me yeh change karo:

### Old Code:
```javascript
const API_BASE_URL = 'http://localhost:5050/api';
```

### New Code:
```javascript
import API_BASE_URL from '../config/api';
// ya appropriate relative path
```

---

## Files List:

### ✅ Already Updated:
- `client/src/pages/Landing.jsx`
- `client/src/pages/Events.jsx`
- `client/src/pages/EventDetail.jsx`

### ⏳ Abhi Update Karna Hai:

1. **`client/src/pages/societies.jsx`**
   - Line 9: Replace `const API_BASE_URL = 'http://localhost:5050/api';`
   - Add: `import API_BASE_URL from '../config/api';`

2. **`client/src/pages/SocietiesDetail.jsx`**
   - Line 6: Replace API_BASE_URL
   - Add import statement

3. **`client/src/pages/RegistrationForm.jsx`**
   - Line 17: Replace API_BASE_URL
   - Add import statement

4. **`client/src/pages/admin/Profile.jsx`**
   - Line 8: Replace API_BASE_URL
   - Add import statement

5. **`client/src/pages/admin/Dashboard.jsx`**
   - Line 11: Replace API_BASE_URL
   - Add import statement

6. **`client/src/pages/admin/ManageEvents.jsx`**
   - Line 21: Replace API_BASE_URL
   - Add import statement

7. **`client/src/pages/admin/AddEditEvent.jsx`**
   - Line 8: Replace API_BASE_URL
   - Add import statement

8. **`client/src/pages/admin/TrackAttendees.jsx`**
   - Line 15: Replace API_BASE_URL
   - Add import statement

9. **`client/src/pages/admin/Login.jsx`**
   - Check if API_BASE_URL hai, agar hai to update karo

---

## Quick Find & Replace:

VS Code me:
1. Ctrl+Shift+H (Find & Replace)
2. Find: `const API_BASE_URL = 'http://localhost:5050/api';`
3. Replace: `import API_BASE_URL from '../config/api';`
4. Files me check karo ki import statement file ke top par hai

**Note:** Agar file structure different hai (jaise admin folder me), to relative path adjust karo:
- Admin files ke liye: `import API_BASE_URL from '../../config/api';`
- Root level pages ke liye: `import API_BASE_URL from '../config/api';`
