// Arabic translations for backend error messages and responses
const ar = {
  // Auth messages
  auth: {
    invalidEmailOrPassword: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    emailAlreadyExists: "البريد الإلكتروني مستخدم بالفعل",
    unauthorized: "غير مصرح",
    noTokenProvided: "لم يتم توفير رمز المصادقة",
    invalidTokenFormat: "تنسيق الرمز غير صحيح",
    userNotFound: "المستخدم غير موجود",
  },

  // General CRUD messages
  general: {
    notFound: "غير موجود",
    somethingWentWrong: "حدث خطأ ما",
  },

  // Workflow messages
  workflow: {
    notFound: "سير العمل غير موجود",
    invalidTemplateIds: (stageTitle) =>
      `معرف قالب واحد أو أكثر غير صالح للمرحلة ${stageTitle}`,
  },

  // Request messages
  request: {
    notFound: "الطلب غير موجود",
    noPermission: "ليس لديك إذن للوصول إلى هذا الطلب",
    noPermissionToUpdate: "ليس لديك إذن لتحديث هذا الطلب",
    invalidStatus: (status) => `${status} حالة طلب غير صالحة`,
    cannotSetPendingNoAssignedUser:
      "لا يمكن تعيين الحالة إلى معلق: لا يوجد مستخدم معين",
    invalidResponseStatus: "حالة الرد غير صالحة",
    rejectionReasonRequired: "يرجى إدخال سبب الرفض",
    cannotSendNoAssignments: "لا يمكن إرسال الطلب: لا يوجد مستخدمون معينون",
    alreadyResponded: "لقد قمت بالفعل بالرد على هذا الطلب",
    notAssignedToUser: "لست معينًا للرد على هذا الطلب",
  },

  // Instance messages
  instance: {
    notFound: "مثيل سير العمل غير موجود",
    noPermission: "ليس لديك إذن للوصول إلى هذا المثيل",
    departmentNotFound: "القسم غير موجود",
    cannotStartWorkflow: (userRole, requiredRole) =>
      `دور المستخدم '${userRole}' لا يمكنه بدء سير العمل. الدور المطلوب: '${requiredRole}'`,
    studentCodeRequired: "كود الطالب مطلوب لإنشاء المثيل",
    studentNotFound: "الطالب المرتبط بكود الطلب غير موجود",
    invalidProfessorId: (id) => `كود الاستاذ المدخل غير صحيح ${id}`,
    duplicateProfessorId: "قائمة الأساتذة تحتوي على معرفات مكررة",
  },

  // Document messages
  document: {
    notFound: "المستند غير موجود",
    noPermissionToView: "ليس لديك إذن لعرض هذا المستند",
    noPermissionToUpdate: "ليس لديك إذن لتحديث هذا المستند",
    schemaNotFound: "مخطط المستند غير موجود",
    invalidData: (errors) => `بيانات غير صالحة: ${errors}`,
    invalidStateMissingRequestId: "حالة مستند غير صالحة: معرف الطلب مفقود",
    templateFileUrlNotFound: "رابط ملف القالب غير موجود",
  },

  // Department messages
  department: {
    notFound: "القسم غير موجود",
    managerNotFound: "المدير غير موجود",
    affairsEmployeeNotFound: "موظف الشؤون غير موجود",
  },

  // Template messages
  template: {
    notFound: "القالب غير موجود",
    invalidSchema: (errors) => `مخطط غير صالح: ${errors}`,
    invalidUiSchema: (errors) => `مخطط واجهة المستخدم غير صالح: ${errors}`,
  },

  // Validation messages
  validation: {
    error: (errors) => `خطأ في التحقق: ${errors}`,
    stageOrderSequential: "يجب أن تكون قيم stageOrder متسلسلة بدءاً من 1",
    professorIdsMustBeArray: "يجب أن تكون قائمة الأساتذة مصفوفة",
  },

  // File upload messages
  upload: {
    onlyDocxAllowed: "يسمح فقط بملفات .docx",
  },

  // Error messages
  error: {
    notFound: (url) => `غير موجود - ${url}`,
  },

  // Profile messages
  profile: {
    updateSuccess: "تم تحديث الملف الشخصي بنجاح",
    passwordChangeSuccess: "تم تغيير كلمة المرور بنجاح",
    oldPasswordIncorrect: "كلمة المرور القديمة غير صحيحة",
    avatarUpdateSuccess: "تم تحديث الصورة الشخصية بنجاح",
  },
  // Student messages
  student: {
    notFound: "الطالب غير موجود",
    alreadyExists: "يوجد بالفعل طالب بهذا الكود",
    invalidDateRange: "يجب أن يكون تاريخ بدء التسجيل قبل تاريخ نهاية التسجيل",
    codeRequired: "كود الطالب مطلوب",
    nameRequired: "اسم الطالب مطلوب",
    registrationStartRequired: "تاريخ بدء التسجيل مطلوب",
    registrationEndRequired: "تاريخ نهاية التسجيل مطلوب",
  },
};

module.exports = ar;
