const { DEFAULT_USER_ROLE, SUPER_USER_ROLE } = process.env;

module.exports = [
    {
        name: SUPER_USER_ROLE || "Admin",
        description: "Role of super admin",
        permissions: [
            "permission-list",
            "user-delete"
        ],
    },
    {
        name: DEFAULT_USER_ROLE || "User",
        description: "Role of default user",
        permissions: [
            "permission-list"
        ],
    },
];