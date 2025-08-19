# 🍽️ Restaurant Management System - Frontend Development Workflow

## 📋 ข้อมูลโปรเจค
- **ชื่อโปรเจค**: Grab Restaurant Management System
- **ประเภท**: Frontend Web Application
- **เทคโนโลยี**: React + Tailwind CSS + DaisyUI
- **ทีมพัฒนา**: 3 คน (Frontend, Backend, Full Stack)
- **บทบาท**: Frontend Developer

---

## 🎯 วัตถุประสงค์ของโปรเจค
1. สร้างระบบจัดการข้อมูลร้านอาหารที่ใช้งานง่าย
2. พัฒนา UI/UX ที่สวยงามและตอบสนองได้ดี (Responsive)
3. ใช้เทคโนโลยีที่ทันสมัยในการพัฒนา Frontend
4. ทำงานร่วมกับทีม Backend โดยไม่แทรกแซงส่วนของ Server

---

## 🛠️ Tech Stack ที่ใช้งาน

### Frontend Core
- **React 19** - Library หลักสำหรับสร้าง UI
- **Vite** - Build tool ที่เร็วและทันสมัย
- **React Router** - จัดการ routing ภายใน application

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **DaisyUI** - Component library สำหรับ Tailwind
- **SweetAlert2** - Beautiful alert และ modal dialogs

### Development Tools
- **ESLint** - Code quality และ linting
- **JSON Server** - Mock API สำหรับ development
- **Docker** - Container สำหรับ deployment

---

## 📁 โครงสร้างโปรเจค

```
client/
├── public/                 # Static files
├── src/
│   ├── Component/         # Reusable components
│   │   ├── Card.jsx      # Restaurant card
│   │   ├── Navbar.jsx    # Navigation bar
│   │   └── Restaurant.jsx # Restaurant grid
│   ├── Pages/            # Page components
│   │   ├── Home.jsx      # หน้าหลัก
│   │   ├── AddRestaurant.jsx    # เพิ่มร้านอาหาร
│   │   ├── UpdateRestaurant.jsx # แก้ไขร้านอาหาร
│   │   ├── Search.jsx    # ค้นหาขั้นสูง
│   │   ├── AboutUs.jsx   # เกี่ยวกับเรา
│   │   └── SweetAlertDemo.jsx # Demo SweetAlert2
│   ├── Routes/           # Route configuration
│   │   └── Routes.jsx    # การตั้งค่า routing
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── package.json         # Dependencies
├── vite.config.js      # Vite configuration
└── start-dev.bat       # Development startup script
```

---

## 🔄 Development Workflow

### 1. เตรียมสภาพแวดล้อม (Environment Setup)
```bash
# 1. Clone project (ถ้ายังไม่มี)
git clone <repository-url>

# 2. เข้าไปใน client directory
cd client

# 3. Install dependencies
npm install

# 4. เริ่ม development servers
npm run dev          # Frontend server (port 5173)
npm run json-server  # Mock API server (port 3001)

# หรือใช้ script ที่สร้างไว้
./start-dev.bat
```

### 2. การพัฒนา Features (Feature Development)

#### 2.1 การเพิ่ม Component ใหม่
```bash
# สร้างไฟล์ component ใหม่ใน src/Component/
# ตัวอย่าง: NewComponent.jsx

import React from 'react'

const NewComponent = () => {
  return (
    <div className="component-container">
      {/* Component content */}
    </div>
  )
}

export default NewComponent
```

#### 2.2 การเพิ่ม Page ใหม่
```bash
# 1. สร้างไฟล์ใน src/Pages/
# 2. เพิ่ม route ใน src/Routes/Routes.jsx
# 3. เพิ่มลิงก์ใน Navbar (ถ้าจำเป็น)
```

#### 2.3 การใช้ SweetAlert2
```javascript
import Swal from 'sweetalert2'

// Success alert
Swal.fire({
  title: 'Success!',
  text: 'Operation completed successfully',
  icon: 'success'
})

// Confirmation dialog
const result = await Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!'
})

if (result.isConfirmed) {
  // Perform action
}
```

### 3. การทำงานกับ API

#### 3.1 API Endpoints ที่ใช้งาน
```javascript
// GET - ดึงข้อมูลร้านอาหารทั้งหมด
fetch('http://localhost:3001/restaurants')

// POST - เพิ่มร้านอาหารใหม่
fetch('http://localhost:3001/restaurants', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(restaurantData)
})

// PUT - แก้ไขข้อมูลร้านอาหาร
fetch(`http://localhost:3001/restaurants/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updatedData)
})

// DELETE - ลบร้านอาหาร
fetch(`http://localhost:3001/restaurants/${id}`, {
  method: 'DELETE'
})
```

#### 3.2 Error Handling Pattern
```javascript
try {
  const response = await fetch(apiUrl, options)
  
  if (response.ok) {
    const data = await response.json()
    // Handle success
    Swal.fire('Success!', 'Operation completed', 'success')
  } else {
    // Handle HTTP errors
    Swal.fire('Error!', 'Operation failed', 'error')
  }
} catch (error) {
  // Handle network errors
  console.error('Error:', error)
  Swal.fire('Connection Error!', 'Please check your connection', 'error')
}
```

---

## 🎨 Styling Guidelines

### 1. Tailwind CSS Classes ที่ใช้บ่อย
```css
/* Layout */
.container.mx-auto.px-4    /* Container with padding */
.grid.grid-cols-1.md:grid-cols-3  /* Responsive grid */
.flex.justify-center.items-center  /* Flexbox centering */

/* Spacing */
.p-4, .p-6, .p-8          /* Padding */
.m-4, .mb-6, .mt-8        /* Margin */
.gap-4, .gap-6            /* Grid/Flex gap */

/* Colors */
.bg-base-100              /* Background colors */
.text-primary             /* Text colors */
.btn-primary, .btn-outline /* Button variants */

/* Responsive */
.sm:grid-cols-2           /* Small screens */
.md:grid-cols-3           /* Medium screens */
.lg:grid-cols-4           /* Large screens */
```

### 2. DaisyUI Components ที่ใช้
```html
<!-- Cards -->
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Title</h2>
    <p>Content</p>
  </div>
</div>

<!-- Buttons -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline">Outline</button>

<!-- Forms -->
<input type="text" class="input input-bordered" />
<select class="select select-bordered">
  <option>Option 1</option>
</select>

<!-- Navigation -->
<div class="navbar bg-base-100">
  <div class="navbar-start">Brand</div>
  <div class="navbar-end">Menu</div>
</div>
```

---

## 🔍 Testing Workflow

### 1. Manual Testing Checklist
- [ ] **Homepage**: โหลดข้อมูลร้านอาหารได้
- [ ] **Search**: ค้นหาด้วยชื่อและประเภทอาหารได้
- [ ] **Add Restaurant**: เพิ่มร้านอาหารใหม่ได้
- [ ] **Update Restaurant**: แก้ไขข้อมูลได้
- [ ] **Delete Restaurant**: ลบได้พร้อม confirmation
- [ ] **Responsive**: ใช้งานได้บนมือถือ
- [ ] **SweetAlert**: แสดง notification ได้
- [ ] **Navigation**: เมนูทำงานได้ทุกหน้า

### 2. Browser Testing
- ✅ Chrome (หลัก)
- ✅ Firefox
- ✅ Edge
- ✅ Safari (ถ้าใช้ Mac)

### 3. Device Testing
- ✅ Desktop (1920x1080)
- ✅ Tablet (768px)
- ✅ Mobile (375px)

---

## 🚀 Deployment Process

### 1. Build for Production
```bash
# Build the project
npm run build

# Test production build locally
npm run preview
```

### 2. Docker Deployment (ถ้าใช้)
```bash
# Build Docker image
docker build -t restaurant-frontend .

# Run container
docker run -p 5173:5173 restaurant-frontend
```

---

## 📝 Git Workflow

### 1. Branch Strategy
```bash
# Main branches
main/master          # Production ready code
develop             # Development branch
feature/frontend    # Current feature branch

# Working with Git
git add .
git commit -m "feat: add restaurant management features"
git push origin feature/frontend
```

### 2. Commit Message Convention
```bash
feat: เพิ่ม feature ใหม่
fix: แก้ไข bug
style: แก้ไข styling
refactor: ปรับปรุงโค้ด
docs: อัปเดตเอกสาร
test: เพิ่ม test cases
```

---

## 🤝 Team Collaboration

### 1. Communication Protocol
- **Daily Standup**: รายงานความคืบหน้าทุกวัน
- **Code Review**: ตรวจสอบโค้ดก่อน merge
- **Documentation**: เขียนเอกสารสำหรับ feature ใหม่

### 2. Frontend-Backend Integration
- **API Contract**: ตกลงรูปแบบ API ร่วมกัน
- **Mock Data**: ใช้ JSON Server ระหว่างพัฒนา
- **Testing**: ทดสอบ integration เมื่อ backend พร้อม

### 3. ข้อตกลงในทีม
- 🚫 **ห้าม**: แก้ไขไฟล์ในโฟลเดอร์ `server/`
- ✅ **ได้**: พัฒนาทุกอย่างในโฟลเดอร์ `client/`
- 📝 **ต้อง**: แจ้งทีมก่อนเปลี่ยน API structure
- 🔄 **ควร**: Sync การทำงานกับทีมเป็นประจำ

---

## 🛠️ Troubleshooting

### 1. Common Issues
```bash
# Port already in use
Error: Port 5173 is already in use
Solution: killall node หรือเปลี่ยน port ใน vite.config.js

# Package issues
Error: Module not found
Solution: rm -rf node_modules && npm install

# API connection
Error: Failed to fetch
Solution: ตรวจสอบว่า json-server ทำงานอยู่หรือไม่
```

### 2. Performance Issues
- ใช้ React.memo() สำหรับ component ที่ render บ่อย
- เพิ่ม loading states สำหรับ API calls
- Optimize รูปภาพให้มีขนาดเหมาะสม

---

## 📚 Learning Resources

### 1. Documentation
- [React Official Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [SweetAlert2 Examples](https://sweetalert2.github.io/)

### 2. Best Practices
- React Hook patterns
- Tailwind CSS responsive design
- Component composition
- State management strategies

---

## 📊 Project Status

### ✅ Completed Features
- [x] Home page with restaurant grid
- [x] Add restaurant functionality
- [x] Update restaurant functionality
- [x] Delete restaurant with confirmation
- [x] Advanced search and filtering
- [x] Responsive design
- [x] SweetAlert2 integration
- [x] About us page
- [x] Navigation system

### 🚧 Work in Progress
- [ ] Performance optimization
- [ ] Additional animations
- [ ] More filter options
- [ ] User preferences

### 📅 Timeline
- **Week 1**: Setup + Basic CRUD
- **Week 2**: UI/UX improvements
- **Week 3**: SweetAlert2 + Polish
- **Week 4**: Testing + Documentation

---

## 🎯 Success Criteria

### Technical Requirements
- ✅ Responsive design (mobile-first)
- ✅ Modern React patterns (Hooks, functional components)
- ✅ Clean, maintainable code
- ✅ Error handling and user feedback
- ✅ Fast loading times

### User Experience
- ✅ Intuitive navigation
- ✅ Clear visual feedback
- ✅ Beautiful, consistent design
- ✅ Smooth animations and transitions
- ✅ Professional appearance

---

## 📞 Contact & Support

**Frontend Developer**: [Your Name]
**Project Repository**: [Repository URL]
**Demo URL**: http://localhost:5173
**API Documentation**: http://localhost:3001

---

*เอกสารนี้จะถูกอัปเดตเป็นประจำตามความคืบหน้าของโปรเจค*
