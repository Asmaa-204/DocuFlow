CREATE TYPE "public"."role" AS ENUM('professor', 'department_manager', 'administrator');--> statement-breakpoint
CREATE TYPE "public"."request_status" AS ENUM('draft', 'pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."instance_status" AS ENUM('in_progress', 'completed', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."access_level" AS ENUM('read', 'respond', 'edit');--> statement-breakpoint
CREATE TABLE "Accesses" (
	"requestId" integer NOT NULL,
	"userId" integer NOT NULL,
	"accessLevel" "access_level" NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Accesses_requestId_userId_pk" PRIMARY KEY("requestId","userId")
);
--> statement-breakpoint
CREATE TABLE "Activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"action" text NOT NULL,
	"details" jsonb,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Conditions" (
	"stageId" integer NOT NULL,
	"templateId" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Conditions_stageId_templateId_pk" PRIMARY KEY("stageId","templateId")
);
--> statement-breakpoint
CREATE TABLE "Departments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"managerId" integer,
	"affairsEmployeeId" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"data" jsonb,
	"templateId" integer NOT NULL,
	"requestId" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "role" DEFAULT 'professor' NOT NULL,
	"departmentId" integer,
	"profilePicture" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "Workflows" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Stages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"role" "role" NOT NULL,
	"stageOrder" integer NOT NULL,
	"workflowId" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"schema" jsonb NOT NULL,
	"uiSchema" jsonb NOT NULL,
	"fileUrl" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "WorkflowInstances" (
	"id" serial PRIMARY KEY NOT NULL,
	"workflowId" integer NOT NULL,
	"stageId" integer NOT NULL,
	"userId" integer NOT NULL,
	"departmentId" integer NOT NULL,
	"studentId" text NOT NULL,
	"status" "instance_status" DEFAULT 'in_progress' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"instanceId" integer NOT NULL,
	"stageId" integer NOT NULL,
	"userId" integer NOT NULL,
	"note" text NOT NULL,
	"sentAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Students" (
	"code" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"registrationStart" timestamp with time zone NOT NULL,
	"registrationEnd" timestamp with time zone NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "SupervisedStudents" (
	"studentCode" text NOT NULL,
	"userId" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "SupervisedStudents_studentCode_userId_pk" PRIMARY KEY("studentCode","userId")
);
--> statement-breakpoint
CREATE TABLE "RequestAssignments" (
	"requestId" integer NOT NULL,
	"assignedToUserId" integer NOT NULL,
	"status" "request_status" DEFAULT 'pending' NOT NULL,
	"rejectionReason" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "RequestAssignments_requestId_assignedToUserId_pk" PRIMARY KEY("requestId","assignedToUserId")
);
--> statement-breakpoint
ALTER TABLE "Accesses" ADD CONSTRAINT "Accesses_requestId_Requests_id_fk" FOREIGN KEY ("requestId") REFERENCES "public"."Requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Accesses" ADD CONSTRAINT "Accesses_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Conditions" ADD CONSTRAINT "Conditions_stageId_Stages_id_fk" FOREIGN KEY ("stageId") REFERENCES "public"."Stages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Conditions" ADD CONSTRAINT "Conditions_templateId_Templates_id_fk" FOREIGN KEY ("templateId") REFERENCES "public"."Templates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_templateId_Templates_id_fk" FOREIGN KEY ("templateId") REFERENCES "public"."Templates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_requestId_Requests_id_fk" FOREIGN KEY ("requestId") REFERENCES "public"."Requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Stages" ADD CONSTRAINT "Stages_workflowId_Workflows_id_fk" FOREIGN KEY ("workflowId") REFERENCES "public"."Workflows"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WorkflowInstances" ADD CONSTRAINT "WorkflowInstances_workflowId_Workflows_id_fk" FOREIGN KEY ("workflowId") REFERENCES "public"."Workflows"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WorkflowInstances" ADD CONSTRAINT "WorkflowInstances_stageId_Stages_id_fk" FOREIGN KEY ("stageId") REFERENCES "public"."Stages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WorkflowInstances" ADD CONSTRAINT "WorkflowInstances_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WorkflowInstances" ADD CONSTRAINT "WorkflowInstances_departmentId_Departments_id_fk" FOREIGN KEY ("departmentId") REFERENCES "public"."Departments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WorkflowInstances" ADD CONSTRAINT "WorkflowInstances_studentId_Students_code_fk" FOREIGN KEY ("studentId") REFERENCES "public"."Students"("code") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_instanceId_WorkflowInstances_id_fk" FOREIGN KEY ("instanceId") REFERENCES "public"."WorkflowInstances"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_stageId_Stages_id_fk" FOREIGN KEY ("stageId") REFERENCES "public"."Stages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SupervisedStudents" ADD CONSTRAINT "SupervisedStudents_studentCode_Students_code_fk" FOREIGN KEY ("studentCode") REFERENCES "public"."Students"("code") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SupervisedStudents" ADD CONSTRAINT "SupervisedStudents_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "RequestAssignments" ADD CONSTRAINT "RequestAssignments_requestId_Requests_id_fk" FOREIGN KEY ("requestId") REFERENCES "public"."Requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "RequestAssignments" ADD CONSTRAINT "RequestAssignments_assignedToUserId_Users_id_fk" FOREIGN KEY ("assignedToUserId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "Users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "stages_workflow_order_unique" ON "Stages" USING btree ("workflowId","stageOrder");