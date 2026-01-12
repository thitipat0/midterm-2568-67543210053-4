# Responsibilities ของแต่ละ Layer

# 1.Presentation Layer
- [ทำหน้าที่:-รับคำขอ-HTTP-จากผู้ใช้-(frontend)-และตอบกลับผลลัพธ์]
- [ประกอบด้วย:1.Routes→กำหนดendpointเช่น-/api/books]
- [2.Controllers→รับrequest,เรียกservice,ส่งresponseกลับ]
- [Focus:HTTPhandling/UIinteraction]

# 2.Business Logic Layer
- [BusinessLogicLayer]
- [ประกอบด้วย:Services→ประมวลผลข้อมูลเช่นเพิ่มหนังสือ,ยืม/คืนหนังสือ]
- [Validators→ตรวจสอบความถูกต้องของข้อมูลเช่นtitle/authorไม่ว่าง]
- [Focus:Businessrules/Data-validation]

# 3.Data Access Layer
- [ทำหน้าที่:ติดต่อDatabaseเพื่อCRUDข้อมูล]
- [ประกอบด้วย:Repositories→เขียนSQL-query-เช่น-SELECT,INSERT,UPDATE,DELETE]
- [Database-connection→เปิด-connectionกับSQLite]
- [Focus:-Data-storage&retrieval]

# Data Flow (Request → Response)
- [1.Frontend-ส่ง-Request→ตัวอย่าง:POST/api/books]
- [2.Presentation-Layer-Route→เลือกControllerController→รับrequestbody→เรียกService]
- [3.Business-Logic-Layer]
--- [Service→ตรวจสอบข้อมูลด้วยValidator]
--- [Service→ประมวลผลตามกฎธุรกิจ]
--- [Service→เรียก-Repository-เพื่อบันทึกข้อมูล]
- [4.Data-Access-Layer]
--- [Repository→ส่ง-SQL-query-ไปยัง-SQLite]
--- [SQLite→ส่งผลลัพธ์กลับ-Repository]
- [5.Response-กลับไปยัง-Frontend]
--- [Service→ส่งผลลัพธ์กลับ-Controller]
--- [Controller→ส่ง-JSON-response-ให้ผู้ใช้]
-- [สรุป:Request-เดินจาก-Presentation→Business→Data→Database-และ-Responseกลับในทางตรงกันข้าม-Database→Data→Business→Presentation→Frontend]