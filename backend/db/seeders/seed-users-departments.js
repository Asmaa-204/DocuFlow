'use strict';

const bcrypt = require('bcryptjs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {

    const { Department, User } = require('../../src/models'); 

    const now = new Date();

    const departmentNames = [
      'Aeronautical and Aerospace Engineering',
      'Architectural Engineering',
      'Biomedical Engineering and Systems',
      'Chemical Engineering',
      'Computer Engineering',
      'Electrical Power Engineering',
      'Electronics and Communications',
      'Engineering Mathematics and Physics',
      'Irrigation and Hydraulics',
      'Mechanical Design and Production',
      'Mechanical Power Engineering',
      'Mining & Geological Engineering Program',
      'Petroleum Engineering Program',
      'Metallurgical Engineering Program',
      'Public Works',
      'Structural Engineering'
    ];

    // 1️⃣ Create departments first
    const departments = await Department.bulkCreate(
      departmentNames.map(name => ({ name, createdAt: now, updatedAt: now })),
      { returning: true }
    );

    // 2️⃣ Create users for each department
    for (let i = 0; i < departments.length; i++) {
      const dept = departments[i];

      const manager = await User.create({
        firstName: `Manager${i + 1}`,
        lastName: dept.name,
        email: `manager${i + 1}@college.edu`,
        password: 'password123',
        role: 'department_manager',
        departmentId: dept.id
      });

      const affairs = await User.create({
        firstName: `Affairs${i + 1}`,
        lastName: dept.name,
        email: `affairs${i + 1}@college.edu`,
        password: 'password123',
        role: 'administrator',
        departmentId: dept.id
      });

      const professor = await User.create({
        firstName: `Professor${i + 1}`,
        lastName: dept.name,
        email: `professor${i + 1}@college.edu`,
        password: 'password123',
        role: 'professor',
        departmentId: dept.id
      });

      // 3️⃣ Update department with managerId + affairsEmployeeId
      dept.managerId = manager.id;
      dept.affairsEmployeeId = affairs.id;
      await dept.save();
    }
  },

  async down(queryInterface, Sequelize) {

    const { Department, User } = require('../models');

    const emails = [
      ...Array.from({ length: 16 }).map((_, i) => `manager${i + 1}@college.edu`),
      ...Array.from({ length: 16 }).map((_, i) => `affairs${i + 1}@college.edu`),
      ...Array.from({ length: 16 }).map((_, i) => `professor${i + 1}@college.edu`)
    ];

    await User.destroy({ where: { email: emails } });
    await Department.destroy({ where: {} });
  }
};
