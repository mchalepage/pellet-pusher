insert into patients
(first_name, last_name, gender, phone, email)
values
($1, $2, $3, $4, $5,)
returning *;