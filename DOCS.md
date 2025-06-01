# Database Schema Reference

This document lists all tables and their columns in database `sql12781999`, including data types, nullability, key constraints, and extra attributes.

---

## appointment
| Column Name      | Data Type | Nullable | Key  | Extra          |
|------------------|-----------|----------|------|----------------|
| appointment_id   | int       | NO       | PRI  | auto_increment |
| payment_id       | int       | YES      | MUL  |                |
| patient_id       | int       | NO       | MUL  |                |
| D_employee_id    | int       | NO       | MUL  |                |
| duration         | int       | YES      |      |                |
| date_time        | datetime  | NO       |      |                |

## DEmployee_qualification
| Column Name     | Data Type | Nullable | Key | Extra |
|-----------------|-----------|----------|-----|-------|
| D_employee_id   | int       | NO       | PRI |       |
| qualification   | varchar   | NO       | PRI |       |

## department
| Column Name      | Data Type | Nullable | Key  | Extra          |
|------------------|-----------|----------|------|----------------|
| department_id    | int       | NO       | PRI  | auto_increment |
| name             | varchar   | NO       |      |                |
| phone            | varchar   | NO       |      |                |
| description      | varchar   | YES      |      |                |
| head_doctor_id   | int       | YES      |      |                |

## dialysisRoom
| Column Name              | Data Type | Nullable | Key | Extra |
|--------------------------|-----------|----------|-----|-------|
| Dis_room_id              | int       | NO       | PRI |       |
| no_of_machines_available | int       | NO       |     |       |

## doctor
| Column Name    | Data Type | Nullable | Key | Extra |
|----------------|-----------|----------|-----|-------|
| D_employee_id  | int       | NO       | PRI |       |
| specialization | varchar   | NO       |     |       |

## emergencyRoom
| Column Name   | Data Type | Nullable | Key | Extra |
|---------------|-----------|----------|-----|-------|
| Eme_room_id   | int       | NO       | PRI |       |
| severity_level| varchar   | NO       |     |       |

## employee
| Column Name        | Data Type | Nullable | Key | Extra          |
|--------------------|-----------|----------|-----|----------------|
| employee_id        | int       | NO       | PRI | auto_increment |
| sex                | enum      | NO       |     |                |
| first_name         | varchar   | NO       |     |                |
| last_name          | varchar   | NO       |     |                |
| phone_number       | varchar   | NO       |     |                |
| date_of_birth      | date      | NO       |     |                |
| salary             | decimal   | NO       |     |                |
| start_working_date | date      | NO       |     |                |
| email              | varchar   | NO       |     |                |
| hiring_date        | date      | NO       |     |                |
| employee_type      | varchar   | NO       |     |                |
| postal_code_id     | int       | NO       | MUL  |                |
| department_id      | int       | NO       | MUL  |                |

## employee_area_assigned
| Column Name    | Data Type | Nullable | Key | Extra |
|----------------|-----------|----------|-----|-------|
| HK_employee_id | int       | NO       | PRI |       |
| area_assigned  | varchar   | NO       | PRI |       |

## employee_equipment_expertise
| Column Name        | Data Type | Nullable | Key | Extra |
|--------------------|-----------|----------|-----|-------|
| T_employee_id      | int       | NO       | PRI |       |
| equipment_expertise| varchar   | NO       | PRI |       |

## employee_tech_area
| Column Name  | Data Type | Nullable | Key | Extra |
|--------------|-----------|----------|-----|-------|
| T_employee_id| int       | NO       | PRI |       |
| tech_area    | varchar   | NO       | PRI |       |

## housekeeping_employee
| Column Name    | Data Type | Nullable | Key | Extra |
|----------------|-----------|----------|-----|-------|
| HK_employee_id | int       | NO       | PRI |       |

## ICURoom
| Column Name  | Data Type | Nullable | Key | Extra |
|--------------|-----------|----------|-----|-------|
| ICU_room_id  | int       | NO       | PRI |       |

## isolationRoom
| Column Name     | Data Type | Nullable | Key | Extra |
|-----------------|-----------|----------|-----|-------|
| Iso_room_id     | int       | NO       | PRI |       |
| infection_level | varchar   | NO       |     |       |

## maternityRoom
| Column Name  | Data Type | Nullable | Key | Extra |
|--------------|-----------|----------|-----|-------|
| Mat_room_id  | int       | NO       | PRI |       |

## Nemployee_ward_assigned
| Column Name   | Data Type | Nullable | Key | Extra |
|---------------|-----------|----------|-----|-------|
| N_employee_id | int       | NO       | PRI |       |
| ward_assigned | varchar   | NO       | PRI |       |

## nurse
| Column Name   | Data Type | Nullable | Key | Extra |
|---------------|-----------|----------|-----|-------|
| N_employee_id | int       | NO       | PRI |       |

## occurs_in
| Column Name | Data Type | Nullable | Key | Extra |
|-------------|-----------|----------|-----|-------|
| room_id     | int       | NO       | PRI |       |
| treatment_id| int       | NO       | PRI |       |

## operationRoom
| Column Name | Data Type | Nullable | Key | Extra |
|-------------|-----------|----------|-----|-------|
| OP_room_id  | int       | NO       | PRI |       |
| is_sterile  | tinyint   | NO       |     |       |

## patient
| Column Name    | Data Type | Nullable | Key | Extra          |
|----------------|-----------|----------|-----|----------------|
| patient_id     | int       | NO       | PRI | auto_increment |
| sex            | enum      | NO       |     |                |
| first_name     | varchar   | NO       |     |                |
| last_name      | varchar   | NO       |     |                |
| date_of_birth  | date      | NO       |     |                |
| phone_number   | varchar   | NO       |     |                |
| postal_code_id | int       | NO       | MUL |                |
| email          | varchar   | NO       |     |                |

## payment
| Column Name         | Data Type | Nullable | Key  | Extra          |
|---------------------|-----------|----------|------|----------------|
| payment_id          | int       | NO       | PRI  | auto_increment |
| payment_date        | date      | NO       |      |                |
| amount_paid         | decimal   | NO       |      |                |
| payment_method      | enum      | NO       |      |                |
| transaction_reference| varchar  | YES      |      |                |
| payment_status      | enum      | NO       |      |                |
| patient_id          | int       | NO       | MUL  |                |
| R_employee_id       | int       | YES      | MUL  |                |

## postalcode
| Column Name        | Data Type | Nullable | Key  | Extra          |
|--------------------|-----------|----------|------|----------------|
| postal_code_id     | int       | NO       | PRI  | auto_increment |
| street_name        | varchar   | NO       |      |                |
| country            | varchar   | NO       |      |                |
| state_or_province  | varchar   | YES      |      |                |
| city               | varchar   | NO       |      |                |
| Latitude           | decimal   | YES      |      |                |
| longitude          | decimal   | YES      |      |                |

## radiologyRoom
| Column Name   | Data Type | Nullable | Key | Extra |
|---------------|-----------|----------|-----|-------|
| Rad_room_id   | int       | NO       | PRI |       |
| has_shield    | tinyint   | NO       |     |       |
| imaging_type  | varchar   | NO       |     |       |

## receptionist
| Column Name   | Data Type | Nullable | Key | Extra |
|---------------|-----------|----------|-----|-------|
| R_employee_id | int       | NO       | PRI |       |

## Receptionists_language
| Column Name     | Data Type | Nullable | Key | Extra |
|-----------------|-----------|----------|-----|-------|
| R_employee_id   | int       | NO       | PRI |       |
| language_spoken | varchar   | NO       | PRI |       |

## recoveryRoom
| Column Name         | Data Type | Nullable | Key | Extra |
|---------------------|-----------|----------|-----|-------|
| Rec_room_id         | int       | NO       | PRI |       |
| no_of_beds_available| int       | NO       |     |       |

## refund
| Column Name     | Data Type | Nullable | Key  | Extra          |
|-----------------|-----------|----------|------|----------------|
| refund_id       | int       | NO       | PRI  | auto_increment |
| R_employee_id   | int       | YES      | MUL  |                |
| appointment_id  | int       | YES      | MUL  |                |
| amount          | decimal   | YES      |      |                |
| reason          | varchar   | YES      |      |                |
| method          | varchar   | YES      |      |                |
| status          | enum      | YES      |      |                |

## room
| Column Name     | Data Type | Nullable | Key  | Extra          |
|-----------------|-----------|----------|------|----------------|
| room_id         | int       | NO       | PRI  | auto_increment |
| room_number     | varchar   | NO       | UNI  |                |
| status          | varchar   | NO       |      |                |
| capacity        | int       | YES      |      |                |
| room_type       | varchar   | NO       |      |                |
| price_per_day   | decimal   | YES      |      |                |
| created_at      | datetime  | YES      |      |                |
| department_id   | int       | NO       | MUL  |                |

## Room_ItemContained
| Column Name | Data Type | Nullable | Key | Extra |
|-------------|-----------|----------|-----|-------|
| room_id     | int       | NO       | PRI |       |
| item_name   | varchar   | NO       | PRI |       |
| quantity    | int       | YES      |     |       |

## security
| Column Name     | Data Type | Nullable | Key | Extra |
|-----------------|-----------|----------|-----|-------|
| S_employee_id   | int       | NO       | PRI |       |
| clearance_level | varchar   | YES      |     |       |
| badge_number    | varchar   | YES      |     |       |

## take_care_of
| Column Name     | Data Type | Nullable | Key | Extra |
|-----------------|-----------|----------|-----|-------|
| N_employee_id   | int       | NO       | PRI |       |
| patient_id      | int       | NO       | PRI |       |

## technician
| Column Name     | Data Type | Nullable | Key | Extra |
|-----------------|-----------|----------|-----|-------|
| T_employee_id   | int       | NO       | PRI |       |

## treatment
| Column Name           | Data Type | Nullable | Key | Extra          |
|-----------------------|-----------|----------|-----|----------------|
| treatment_id          | int       | NO       | PRI | auto_increment |
| cost                  | decimal   | NO       |     |                |
| name                  | varchar   | NO       |     |                |
| description           | varchar   | YES      |     |                |
| category              | varchar   | NO       |     |                |
| specilization_required| varchar   | YES      |     |                |
| treatment_minutes     | int       | YES      |     |                |

## treatmentSchedule
| Column Name    | Data Type | Nullable | Key | Extra          |
|----------------|-----------|----------|-----|----------------|
| schedule_id    | int       | NO       | PRI | auto_increment |
| room_id        | int       | YES      | MUL |                |
| assignment_id  | int       | YES      | MUL |                |
| start_date_time| datetime  | YES      |     |                |
| end_date_time  | datetime  | YES      |     |                |

## treatment_assignment
| Column Name    | Data Type | Nullable | Key | Extra          |
|----------------|-----------|----------|-----|----------------|
| assignment_id  | int       | NO       | PRI | auto_increment |
| patient_id     | int       | NO       | MUL |                |
| D_employee_id  | int       | NO       | MUL |                |
| treatment_id   | int       | NO       | MUL |                |
| status         | varchar   | NO       |     |                |
| cost           | decimal   | NO       |     |                |

## treatment_assignment_note
| Column Name   | Data Type | Nullable | Key | Extra          |
|---------------|-----------|----------|-----|----------------|
| note_id       | int       | NO       | PRI | auto_increment |
| assignment_id | int       | NO       | MUL |                |
| note          | text      | NO       |     |                |
