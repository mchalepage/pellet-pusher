CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY,
  "username" varchar(100),
  "hash" text
);

CREATE TABLE "patients" (
  "patient_id" SERIAL PRIMARY KEY,
  "created_by_id" int,
  "first_name" varchar(100),
  "last_name" varchar(100),
  "date_of_birth" date,
  "gender" varchar(50),
  "phone" varchar(20),
  "email" varchar(70),
  "patient_img" text,
  "patient_since" date,
  "total_visits" int,
  "next_appointment" timestamp
);

CREATE TABLE "patient_visits" (
  "visit_id" SERIAL PRIMARY KEY,
  "patient_id" int,
  "date" date,
  "visit_type" varchar(200),
  "HPI" text,
  "AMS_symptom_score" int,
  "MRS_symptom_score" int,
  "current_stress_level" varchar(200),
  "sleep" varchar(200),
  "mood" varchar(200),
  "energy" varchar(200),
  "libido" varchar(200),
  "exercise" varchar(200),
  "diet" varchar(200),
  "meds" text,
  "supplements" text,
  "vitals_bp_systolic" int,
  "vitals_bp_diastolic" int,
  "vitals_spo2" decimal,
  "weight" decimal,
  "height" decimal,
  "bmi" decimal,
  "pbf" decimal,
  "vfl" decimal,
  "testicular_hypofunction_e29_1" text,
  "menopausal_and_female_climacteric_states" text,
  "notes" text,
  "side_of_pellets" varchar(50)
);

CREATE TABLE "patient_files" (
  "patient_id" int,
  "uploaded_by_id" int,
  "file" text
);

ALTER TABLE "patient_visits" ADD FOREIGN KEY ("patient_id") REFERENCES "patients" ("patient_id");

ALTER TABLE "patient_files" ADD FOREIGN KEY ("patient_id") REFERENCES "patients" ("patient_id");

ALTER TABLE "patients" ADD FOREIGN KEY ("created_by_id") REFERENCES "users" ("user_id");

ALTER TABLE "patient_files" ADD FOREIGN KEY ("uploaded_by_id") REFERENCES "users" ("user_id");
