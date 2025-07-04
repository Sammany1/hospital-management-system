
# Hospital Management System

This project is a comprehensive Hospital Management System featuring:

- **Database Design**: A robust relational database schema for hospital operations.
- **Documentation**: Entity-Relationship Diagram (ERD) and sample data for easy setup and understanding.
- **Modern Web GUI**: A user-friendly interface built with [Next.js](https://nextjs.org).

---


## Project Structure & Documentation

- **Hospitals_Database_ERD.drawio**: The complete Entity-Relationship Diagram (ERD) for the hospital database, created with Draw.io. This file visually documents all entities, relationships, and key constraints in the system.
- **Hospital_data.sql**: SQL file containing the full database schema and sample data. Use this to set up the database quickly in MySQL or compatible systems.
- **/src/app/**: Contains the Next.js application source code for the graphical user interface (GUI).
- **Live Database Connection**: The GUI is already connected to a live MySQL database instance hosted on a remote server. All data displayed and managed through the application reflects the actual database in real time.

---


## Getting Started

### 1. Database Setup

1. Open `Hospitals_Database_ERD.drawio` in Draw.io or diagrams.net to review the database structure.
2. Import `Hospital_data.sql` into your MySQL server to create all tables and insert sample data:

   ```bash
   mysql -u <username> -p < Hospital_data.sql
   ```

### 2. Running the GUI

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser to use the application.

---


## Project Highlights

- **ERD Documentation**: All entities, relationships, and constraints are clearly documented in `Hospitals_Database_ERD.drawio`.
- **SQL Schema & Data**: The `Hospital_data.sql` file provides a ready-to-use schema and demo data for testing and development.
- **Modern Web Interface**: The GUI is built with Next.js for a fast, responsive, and maintainable user experience.

---


## Project Contributors

This project was developed and maintained by:

- **Abdelrahman Alsammny** (`sammany1`)
- **Abdullah Yasser Ahmed** (`AbdullahYasserIsmail`)
- **Amr Khaled Elnashar** (`Elnasharr`)

---

## Contributing & Feedback

Contributions and feedback are welcome! Please open issues or submit pull requests for improvements.
