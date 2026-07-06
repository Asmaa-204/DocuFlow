CREATE TABLE "InstanceProfessors" (
	"instanceId" integer NOT NULL,
	"userId" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "InstanceProfessors_instanceId_userId_pk" PRIMARY KEY("instanceId","userId")
);
--> statement-breakpoint
ALTER TABLE "Stages" ADD COLUMN "isMultiApproval" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "InstanceProfessors" ADD CONSTRAINT "InstanceProfessors_instanceId_WorkflowInstances_id_fk" FOREIGN KEY ("instanceId") REFERENCES "public"."WorkflowInstances"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "InstanceProfessors" ADD CONSTRAINT "InstanceProfessors_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;