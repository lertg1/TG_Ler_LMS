# **Software Requirements Specification (SRS) \-version 1**

## **1\. Introduction**

This document outlines the functional and non-functional requirements for the **Library Management System** (LMS).

## **2\. Functional Requirements**

### **2.1 User Registration & Authentication**

* **FR1:** Users can register as member with a **username, email, and password**.  
* FR2: Registered users can renew membership before expiry  
* FR3: Registered users can reset password  
* **FR4:** Registered users can **log in** to access the system.   
* FR5: Admin can register users as librarian or member roles  
* FR6: Admin can create, update, delete users  
* FR7: Admin can search for members by name or ID

### **2.3 Book Search**

* **FR8:** Users can search for books by **title, author, or ISBN**.  
* **FR9:** The system displays a **list of matching books**.

### **2.4 Borrowing & Returning Books**

* **FR10:** Users can **borrow available books**.  
* **FR11:** Users can **return borrowed books**.  
* **FR12:** The system updates the **status of books accordingly**.  
* FR13: Users can view borrowing history  
* FR14: Users can check due date of borrowed books

### **2.5 Book Management Functions**

* **FR15:** Administrators can **add new books**.  
* **FR16:** Administrators can **update or delete existing books**.  
* FR17: Admin can search for books by various criteria  
* FR18: Admin can track status of books (available, borrowed, reserved, overdue)

### **2.6 Overdue Notifications**

* **FR19:** The system checks for **overdue books** and flags them.  
* **FR20:** Users are notified of **any overdue books**.   
* FR21: The system calculate fines for overdue books

## **3\. Non-Functional Requirements**

* **NFR1:** The system should respond within **3 seconds** for any user action.  
* **NFR2:** The UI must be **user-friendly and accessible**.  
* **NFR3:** The system should handle **up to 100 concurrent users**.

## **4\. System Constraints**

* **Backend:** Built on **Spring Boot with Maven**.  
* **Database:** Uses **MySQL 8+**.  
* **Frontend:** Built with **React 18**.  
* Version control: Git

