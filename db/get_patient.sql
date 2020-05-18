select * from patients
where last_name = $1 or first_name = $1;