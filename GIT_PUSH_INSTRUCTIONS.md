# GitHub Push Instructions (Hindi/English)

## Important: .env file ko GitHub par push nahi karna hai

### Step 1: Check karein ki .env file tracked hai ya nahi
```bash
git status
```

### Step 2: Agar .env file already tracked hai (git status me dikh rahi hai), to use untrack karein:
```bash
git rm --cached server/.env
```

### Step 3: Changes ko stage karein (sirf .env ke alawa):
```bash
git add .
```

### Step 4: Commit karein:
```bash
git commit -m "Fix landing page event images and field mappings"
```

### Step 5: GitHub par push karein:
```bash
git push origin main
```

### Ya agar aapka branch name different hai:
```bash
git push origin <your-branch-name>
```

## Changes jo commit kiye gaye:
1. ✅ Landing.jsx - Event images fix (banner_image field use kiya)
2. ✅ Landing.jsx - Date field fix (date_time use kiya)
3. ✅ Landing.jsx - Venue field fix (venue use kiya)
4. ✅ Landing.jsx - Organizer display fix
5. ✅ Landing.jsx - Society logo fix
6. ✅ .gitignore - .env files ko ignore karne ke liye updated

## Verify karein:
Push ke baad GitHub repository me check karein ki:
- ✅ .env file nahi dikhni chahiye
- ✅ .gitignore me .env entries hain
- ✅ Saare code changes commit ho gaye hain
