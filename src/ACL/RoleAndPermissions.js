const { DEFAULT_USER_ROLE, SUPER_USER_ROLE } = process.env;

module.exports = [
    {
        name: SUPER_USER_ROLE || "Admin",
        description: "Role of super admin",
        permissions: [
            'permission-list',
            'permission-create',
            'permission-update',
            'permission-delete',
            'role-list',
            'role-create',
            'role-update',
            'role-delete',
            'user-role-update',
        ],
    },
    {
        name: DEFAULT_USER_ROLE || "User",
        description: "Role of default user",
        permissions: [],
    },
];