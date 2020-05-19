update patients
set first_name = $2, last_name = $3, date_of_birth = $4, gender = $5, phone = $6, email = $7
where patient_id = $1;