const { User, Workflow, Stage, WorkflowInstance, Request, sequelize } = require('../src/models'); // adjust path
const bcrypt = require('bcryptjs');

async function seed() {
  await sequelize.sync({ force: true }); // WARNING: this will drop all tables

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);
  const [professor, manager, admin] = await Promise.all([
    User.create({ firstName: 'Alice', lastName: 'Prof', email: 'prof@example.com', password: hashedPassword, role: 'professor' }),
    User.create({ firstName: 'Bob', lastName: 'Manager', email: 'manager@example.com', password: hashedPassword, role: 'department_manager' }),
    User.create({ firstName: 'Carol', lastName: 'Admin', email: 'admin@example.com', password: hashedPassword, role: 'administrator' }),
  ]);

  // Create workflow with stages
  const workflow = await Workflow.create({
    title: 'Research Proposal Approval',
    description: 'Workflow for approving research proposals',
  });

  const stages = await Stage.bulkCreate([
    {
      title: 'Initial Submission',
      description: 'Submit proposal',
      role: 'professor',
      stageOrder: 1,
      workflowId: workflow.id,
    },
    {
      title: 'Department Review',
      description: 'Manager reviews',
      role: 'department_manager',
      stageOrder: 2,
      workflowId: workflow.id,
    },
  ]);

  // Create instance
  const instance = await WorkflowInstance.create({
    workflowId: workflow.id,
    stageId: stages[0].id,
    userId: professor.id,
  });

  // Create request
  await Request.create({
    instanceId: instance.id,
    stageId: stages[0].id,
    userId: professor.id,
    note: 'Requesting approval for my AI research proposal',
    status: 'pending',
  });

  console.log('🌱 Seeding complete');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
