insert into patient_visits
(patient_id, date, visit_type, HPI, AMS_symptom_score, MRS_symptom_score, current_stress_level, sleep, mood, energy, libido, exercise, diet, meds, supplements, vitals_bp_systolic, vitals_bp_diastolic, vitals_spo2, weight, height, bmi, pbf, vfl, testicular_hypofunction_e29_1, menopausal_and_female_climacteric_states, notes, side_of_pellets)
values
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27);