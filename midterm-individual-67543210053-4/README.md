# Library Management System - Layered Architecture

## 📋 Project Information
- **Student Name:** [ฐิติภัทร์-ชุ่มมา]
- **Student ID:** [67543210053-4]
- **Course:** ENGSE207 Software Architecture

## 🏗️ Architecture Style
Layered Architecture (3-tier)
- [Presentation-จัดการHTTP-requests/UI]
- [Business-Logic-ของระบบ/validation]
- [Data-ติดต่อDatabase/CRUD]

## 📂 Project Structure
- [src/]
- [presentation/-routes,controller,middlewares]
- [business/-services,validators]
- [data/-repositories,database]
- [server.js-Entry-point]
- [library.db-SQLite-database]

## 🎯 Refactoring Summary

### ปัญหาของ Monolithic (เดิม):
- [1.โค้ดรวมกันหมด-แก้ไขยาก]
- [2.ขยายระบบยาก]
- [3.ไม่แยกความรับผิดชอบชัดเจน]

### วิธีแก้ไขด้วย Layered Architecture:
- [แยก-Presentation,business,data]
- [แต่ละLayerรับผิดชอบงานเฉพาะตัว]
- [ใช้-servicesและrepository-เพื่อจัดการLogicและDatabase]

### ประโยชน์ที่ได้รับ:
- [ดูแลรักษาง่าย]
- [ขยายฟีเจอร์ง่าย]
- [ลดความซ้ำซ้อนของโค้ด]
## 🚀 How to Run

\`\`\`bash
# 1. Clone repository
git clone [your-repo-url]

# 2. Install dependencies
npm install

# 3. Run server
npm start

# 4. Test API
# Open browser: http://localhost:3000
\`\`\`

## 📝 API Endpoints
[ระบุ API endpoints ทั้งหมด]