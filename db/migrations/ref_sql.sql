CREATE TABLE "course" (
  "id" serial,
  "title" text,
  "created_at" text,
  "created_by" number,
  "description" text,
  "instructor_id" number,
  "program_flag" boolean,
  "price" number,
  "discount_perc" number,
  "final_price" number,
  "revenue" number,
  "item_sold" number,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_course.instructor_id"
    FOREIGN KEY ("instructor_id")
      REFERENCES "instructor"("id")
);

CREATE TABLE "course_images" (
  "id" serial,
  "course_id" number,
  "url" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_course_images.course_id"
    FOREIGN KEY ("course_id")
      REFERENCES "course"("id")
);

CREATE TABLE "student_course_enroll" (
  "id" serial,
  "student_id" number,
  "course_id" number,
  "progress_perc" number,
  "c_s_l" text,
  "purchase_date" date_time,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_student_course_enroll.student_id"
    FOREIGN KEY ("student_id")
      REFERENCES "student"("id"),
  CONSTRAINT "FK_student_course_enroll.course_id"
    FOREIGN KEY ("course_id")
      REFERENCES "course"("id")
);

CREATE TABLE "question" (
  "id" serial,
  "quiz_id" number,
  "description" text,
  "answer" number,
  "option_1" text,
  "option_2" text,
  "option_3" text,
  "option_4" text,
  "option_5" text,
  "explanation" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_question.quiz_id"
    FOREIGN KEY ("quiz_id")
      REFERENCES "quiz"("id")
);

CREATE TABLE "related_course" (
  "id" serial,
  "course_id" number,
  "related_course_id" number,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_related_course.related_course_id"
    FOREIGN KEY ("related_course_id")
      REFERENCES "course"("id"),
  CONSTRAINT "FK_related_course.course_id"
    FOREIGN KEY ("course_id")
      REFERENCES "course"("id")
);

CREATE TABLE "user" (
  "id" serial,
  "email" text,
  "user_name" text,
  "name" text,
  "password" text,
  "phone_no" text,
  "last_login" datetime,
  "gender" text,
  "image_url" text,
  "created_at" datetime,
  "updated_at" datetime,
  "is_active" boolean,
  PRIMARY KEY ("id")
);

CREATE TABLE "program_course" (
  "id" serial,
  "program_id" number,
  "course_id" number,
  "course_order" number,
  "created_at" text,
  "created_by" number,
  "description" text,
  "couse_weight" number,
  "course_order" number,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_program_course.program_id"
    FOREIGN KEY ("program_id")
      REFERENCES "program"("id"),
  CONSTRAINT "FK_program_course.course_id"
    FOREIGN KEY ("course_id")
      REFERENCES "course"("id")
);

CREATE TABLE "lesson" (
  "id" serial,
  "title" text,
  "section_id" number,
  "lesson_weight" number,
  "lesson_order" number,
  "quiz_id" number,
  "description" text,
  "video_split_string" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_lesson.section_id"
    FOREIGN KEY ("section_id")
      REFERENCES "section"("id")
);

CREATE TABLE "content" (
  "id" serial,
  "content_type" text,
  "content_url" text,
  "lesson_id" number,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_content.lesson_id"
    FOREIGN KEY ("lesson_id")
      REFERENCES "lesson"("id")
);

CREATE TABLE "program_images" (
  "id" serial,
  "program_id" number,
  "url" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_program_images.program_id"
    FOREIGN KEY ("program_id")
      REFERENCES "program"("id")
);

CREATE TABLE "section" (
  "id" serial,
  "title" text,
  "course_id" number,
  "section_weight" number,
  "section_order" number,
  "quiz_id" number,
  "description" text,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_section.course_id"
    FOREIGN KEY ("course_id")
      REFERENCES "course"("id")
);

CREATE TABLE "user_logs" (
  "id" serial,
  "user_id" number,
  "login_date" datetime,
  "logout_date" datetime,
  PRIMARY KEY ("id")
);

CREATE TABLE "related_program" (
  "id" serial,
  "program_id" number,
  "related_program_id" number,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_related_program.related_program_id"
    FOREIGN KEY ("related_program_id")
      REFERENCES "program"("id"),
  CONSTRAINT "FK_related_program.program_id"
    FOREIGN KEY ("program_id")
      REFERENCES "program"("id")
);

CREATE TABLE "instructor" (
  "id" serial,
  "user_id" number,
  "linkedin_url" text,
  "website_url" Type,
  "rating" number,
  "about_me" text,
  "twitter_url" text,
  "youtube_url" text,
  "facebook_url" text,
  PRIMARY KEY ("id")
);

CREATE TABLE "student" (
  "id" serial,
  "user_id" number,
  PRIMARY KEY ("id")
);

CREATE TABLE "program" (
  "id" serial,
  "title" text,
  "created_at" text,
  "updated_at" number,
  "description" text,
  "price" number,
  "discount_perc" number,
  "final_price" number,
  "revenue" number,
  "item_sold" number,
  PRIMARY KEY ("id")
);

CREATE TABLE "user_role" (
  "id" serial,
  "role_name" number,
  "user_id" number,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_user_role.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user"("id")
);

CREATE TABLE "category_program_hierarchy" (
  "id" serial,
  "h1(cat)" text,
  "h2(sub_cat)" text,
  "h3(topic)" text,
  "program_id" number,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_category_program_hierarchy.program_id"
    FOREIGN KEY ("program_id")
      REFERENCES "program"("id")
);

CREATE TABLE "quiz" (
  "id" serial,
  "title" text,
  PRIMARY KEY ("id")
);

CREATE TABLE "student_program_enroll" (
  "id" serial,
  "student_id" number,
  "program_id" number,
  "progress_perc" number,
  "p_c_s_l" text,
  "purchase_date" datetime,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_student_program_enroll.student_id"
    FOREIGN KEY ("student_id")
      REFERENCES "student"("id"),
  CONSTRAINT "FK_student_program_enroll.program_id"
    FOREIGN KEY ("program_id")
      REFERENCES "program"("id")
);

CREATE TABLE "category_course_hierarchy" (
  "id" serial,
  "h1(cat)" text,
  "h2(sub_cat)" text,
  "h3(topic)" text,
  "course_id" number,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_category_course_hierarchy.course_id"
    FOREIGN KEY ("course_id")
      REFERENCES "course"("id")
);

