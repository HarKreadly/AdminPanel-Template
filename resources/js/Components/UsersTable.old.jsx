import { useState, useMemo, useEffect } from "react";
import {
    FiSearch,
    FiFilter,
    FiDownload,
    FiTrash2,
    FiMoreVertical,
    FiChevronDown,
    FiChevronUp,
    FiPhone,
    FiMail,
    FiEdit,
    FiUserPlus,
    FiEye,
    FiEyeOff,
    FiX,
    FiCheck,
} from "react-icons/fi";
import { FaSort } from "react-icons/fa";


export default function UsersTable({ users: initialUsers = [] }) {
    const [users, setUsers] = useState(initialUsers);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [genderFilter, setGenderFilter] = useState("all");
    const [sortField, setSortField] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");
    const [showFilters, setShowFilters] = useState(false);
    const [showColumnVisibility, setShowColumnVisibility] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Update users when prop changes
    useEffect(() => {
        setUsers(initialUsers);
    }, [initialUsers]);

    // Column visibility state
    const [visibleColumns, setVisibleColumns] = useState({
        id: true,
        name: true,
        email: true,
        phone: true,
        gender: true,
        age: true,
        role: true,
        status: true,
        verified: true,
        location: true,
        joinDate: true,
    });

    // Calculate age from date_of_birth
    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) return null;
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    };

    // Toggle column visibility
    const toggleColumn = (column) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };

    // Handle select all
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUsers(filteredAndSortedUsers.map((user) => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    // Handle individual selection
    const handleSelectUser = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    // Sort handler
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    // Filter and sort users
    const filteredAndSortedUsers = useMemo(() => {
        let filtered = users.filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.id.toString().includes(searchTerm) ||
                (user.phone && user.phone.includes(searchTerm));
            const matchesRole =
                roleFilter === "all" || user.role === roleFilter;
            const matchesStatus =
                statusFilter === "all" || user.status === statusFilter;
            const matchesGender =
                genderFilter === "all" || user.gender === genderFilter;
            return (
                matchesSearch && matchesRole && matchesStatus && matchesGender
            );
        });

        filtered.sort((a, b) => {
            let aVal = a[sortField];
            let bVal = b[sortField];

            if (sortField === "age") {
                aVal = calculateAge(a.date_of_birth);
                bVal = calculateAge(b.date_of_birth);
            }

            if (aVal === null) return 1;
            if (bVal === null) return -1;

            if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
            if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [
        users,
        searchTerm,
        roleFilter,
        statusFilter,
        genderFilter,
        sortField,
        sortDirection,
    ]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
    const paginatedUsers = filteredAndSortedUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const SortIcon = ({ field }) => {
        if (sortField !== field) return null;
        return sortDirection === "asc" ? (
            <FiChevronUp className="w-3 h-3" />
        ) : (
            <FiChevronDown className="w-3 h-3" />
        );
    };

    const getAvatarColor = (name) => {
        const colors = [
            "bg-blue-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-red-500",
            "bg-indigo-500",
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const getStatusBadge = (status) => {
        const styles = {
            active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
            inactive:
                "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
            banned: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        };
        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getRoleBadge = (role) => {
        const styles = {
            user: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
            company:
                "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
            admin: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        };
        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role]}`}
            >
                {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
        );
    };

    return (
        <div className="mt-6">
            <div className=" mx-auto">
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col">
                    {/* <caption class="px-5 py-6 text-lg font-semibold text-left text-gray-900 bg-gray-50 dark:text-white dark:bg-gray-800 w-full">
                        Our products
                        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                            Browse a list of Flowbite products designed to help
                            you work and play, stay organized, get answers, keep
                            in touch, grow your business, and more.
                        </p>
                    </caption> */}
                    <div>
                        {/* Header with Filters */}
                        <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
                            <div className="flex items-center gap-3 flex-wrap">
                                {/* Search Input */}
                                <div className="relative flex-1 min-w-[250px]">
                                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
                                    />
                                </div>

                                {/* Dropdown Filters */}
                                <div className="relative">
                                    <select
                                        value={roleFilter}
                                        onChange={(e) =>
                                            setRoleFilter(e.target.value)
                                        }
                                        className="pl-3 pr-8 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-zinc-800/50 appearance-none dark:text-white"
                                    >
                                        <option value="all">All Roles</option>
                                        <option value="user">User</option>
                                        <option value="company">Company</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <div className="relative">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) =>
                                            setStatusFilter(e.target.value)
                                        }
                                        className="pl-3 pr-8 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-zinc-800/50 appearance-none dark:text-white"
                                    >
                                        <option value="all">
                                            All Statuses
                                        </option>
                                        <option value="active">Active</option>
                                        <option value="inactive">
                                            Inactive
                                        </option>
                                        <option value="banned">Banned</option>
                                    </select>
                                </div>

                                <div className="relative">
                                    <select
                                        value={genderFilter}
                                        onChange={(e) =>
                                            setGenderFilter(e.target.value)
                                        }
                                        className="pl-3 pr-8 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-zinc-800/50 appearance-none dark:text-white"
                                    >
                                        <option value="all">All Genders</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="flex-1" />

                                {/* Action Buttons */}
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setShowColumnVisibility(
                                                !showColumnVisibility
                                            )
                                        }
                                        className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
                                        title="Column Visibility"
                                    >
                                        <FiEye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                    </button>
                                    {showColumnVisibility && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() =>
                                                    setShowColumnVisibility(
                                                        false
                                                    )
                                                }
                                            />
                                            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 py-2 z-20">
                                                <div className="px-3 py-2 border-b border-gray-200 dark:border-zinc-700">
                                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                                                        Column Visibility
                                                    </p>
                                                </div>
                                                <div className="max-h-64 overflow-y-auto">
                                                    {Object.entries(
                                                        visibleColumns
                                                    ).map(
                                                        ([column, visible]) => (
                                                            <label
                                                                key={column}
                                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-zinc-700 cursor-pointer"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        visible
                                                                    }
                                                                    onChange={() =>
                                                                        toggleColumn(
                                                                            column
                                                                        )
                                                                    }
                                                                    className="rounded border-gray-300 dark:border-zinc-600"
                                                                />
                                                                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                                                                    {column ===
                                                                    "joinDate"
                                                                        ? "Join Date"
                                                                        : column}
                                                                </span>
                                                            </label>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <button
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
                                    title="Edit"
                                >
                                    <FiEdit className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                                <button
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
                                    title="Export"
                                >
                                    <FiDownload className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                                <button
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
                                    title="Add User"
                                >
                                    <FiUserPlus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                                <button
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
                                    title="Delete"
                                >
                                    <FiTrash2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-zinc-800">
                                        <th className="px-4 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    selectedUsers.length ===
                                                        paginatedUsers.length &&
                                                    paginatedUsers.length > 0
                                                }
                                                onChange={handleSelectAll}
                                                className="rounded border-gray-300 dark:border-zinc-700 w-4 h-4"
                                            />
                                        </th>
                                        {visibleColumns.id && (
                                            <th className="px-4 py-3 text-left">
                                                <button
                                                    onClick={() =>
                                                        handleSort("id")
                                                    }
                                                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                                                >
                                                    ID
                                                    <FaSort field="id" />
                                                </button>
                                            </th>
                                        )}
                                        {visibleColumns.name && (
                                            <th className="px-4 py-3 text-left">
                                                <button
                                                    onClick={() =>
                                                        handleSort("name")
                                                    }
                                                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                                                >
                                                    Name
                                                    <FaSort field="name" />
                                                </button>
                                            </th>
                                        )}
                                        {visibleColumns.email && (
                                            <th className="px-4 py-3 text-left">
                                                <button
                                                    onClick={() =>
                                                        handleSort("email")
                                                    }
                                                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                                                >
                                                    Email
                                                    <FaSort field="email" />
                                                </button>
                                            </th>
                                        )}
                                        {visibleColumns.phone && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Phone
                                            </th>
                                        )}
                                        {visibleColumns.gender && (
                                            <th className="px-4 py-3 text-left">
                                                <button
                                                    onClick={() =>
                                                        handleSort("gender")
                                                    }
                                                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                                                >
                                                    Gender
                                                    <FaSort field="gender" />
                                                </button>
                                            </th>
                                        )}
                                        {visibleColumns.age && (
                                            <th className="px-4 py-3 text-left">
                                                <button
                                                    onClick={() =>
                                                        handleSort("age")
                                                    }
                                                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                                                >
                                                    Age
                                                    <FaSort field="age" />
                                                </button>
                                            </th>
                                        )}
                                        {visibleColumns.role && (
                                            <th className="px-4 py-3 text-left">
                                                <button
                                                    onClick={() =>
                                                        handleSort("role")
                                                    }
                                                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                                                >
                                                    Role
                                                    <FaSort field="role" />
                                                </button>
                                            </th>
                                        )}
                                        {visibleColumns.status && (
                                            <th className="px-4 py-3 text-left">
                                                <button
                                                    onClick={() =>
                                                        handleSort("status")
                                                    }
                                                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                                                >
                                                    Status
                                                    <FaSort field="status" />
                                                </button>
                                            </th>
                                        )}
                                        {visibleColumns.verified && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Verified
                                            </th>
                                        )}
                                        {visibleColumns.location && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Location
                                            </th>
                                        )}
                                        {visibleColumns.joinDate && (
                                            <th className="px-4 py-3 text-left">
                                                <button
                                                    onClick={() =>
                                                        handleSort("created_at")
                                                    }
                                                    className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300"
                                                >
                                                    Join Date
                                                    <FaSort field="created_at" />
                                                </button>
                                            </th>
                                        )}
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {paginatedUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors"
                                        >
                                            <td className="px-4 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.includes(
                                                        user.id
                                                    )}
                                                    onChange={() =>
                                                        handleSelectUser(
                                                            user.id
                                                        )
                                                    }
                                                    className="rounded border-gray-300 dark:border-zinc-700 w-4 h-4"
                                                />
                                            </td>
                                            {visibleColumns.id && (
                                                <td className="px-4 py-4">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {user.id}
                                                    </span>
                                                </td>
                                            )}
                                            {visibleColumns.name && (
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {user.profile_picture ? (
                                                            <img
                                                                src={`/storage/${user.profile_picture}`}
                                                                alt={user.name}
                                                                className="w-8 h-8 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <div
                                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${getAvatarColor(
                                                                    user.name
                                                                )}`}
                                                            >
                                                                {user.first_name?.charAt(
                                                                    0
                                                                ) ||
                                                                    user.name.charAt(
                                                                        0
                                                                    )}
                                                                {user.last_name?.charAt(
                                                                    0
                                                                ) || ""}
                                                            </div>
                                                        )}
                                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            {user.name}
                                                        </span>
                                                    </div>
                                                </td>
                                            )}
                                            {visibleColumns.email && (
                                                <td className="px-4 py-4">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {user.email}
                                                    </span>
                                                </td>
                                            )}
                                            {visibleColumns.phone && (
                                                <td className="px-4 py-4">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {user.phone || "-"}
                                                    </span>
                                                </td>
                                            )}
                                            {visibleColumns.gender && (
                                                <td className="px-4 py-4">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                        {user.gender || "-"}
                                                    </span>
                                                </td>
                                            )}
                                            {visibleColumns.age && (
                                                <td className="px-4 py-4">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {calculateAge(
                                                            user.date_of_birth
                                                        ) || "-"}
                                                    </span>
                                                </td>
                                            )}
                                            {visibleColumns.role && (
                                                <td className="px-4 py-4">
                                                    {getRoleBadge(user.role)}
                                                </td>
                                            )}
                                            {visibleColumns.status && (
                                                <td className="px-4 py-4">
                                                    {getStatusBadge(
                                                        user.status
                                                    )}
                                                </td>
                                            )}
                                            {visibleColumns.verified && (
                                                <td className="px-4 py-4">
                                                    <span
                                                        className={`text-sm ${
                                                            user.verified
                                                                ? "text-green-600 dark:text-green-400"
                                                                : "text-gray-400"
                                                        }`}
                                                    >
                                                        {user.verified
                                                            ? "✓"
                                                            : "✗"}
                                                    </span>
                                                </td>
                                            )}
                                            {visibleColumns.location && (
                                                <td className="px-4 py-4">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {user.city &&
                                                        user.country
                                                            ? `${user.city}, ${user.country}`
                                                            : "-"}
                                                    </span>
                                                </td>
                                            )}
                                            {visibleColumns.joinDate && (
                                                <td className="px-4 py-4">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {new Date(
                                                            user.created_at
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </td>
                                            )}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors"
                                                        title="Call"
                                                    >
                                                        <FiPhone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                    </button>
                                                    <button
                                                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors"
                                                        title="Email"
                                                    >
                                                        <FiMail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                    </button>
                                                    <div className="relative">
                                                        <button
                                                            onClick={() =>
                                                                setActiveDropdown(
                                                                    activeDropdown ===
                                                                        user.id
                                                                        ? null
                                                                        : user.id
                                                                )
                                                            }
                                                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors"
                                                        >
                                                            <FiMoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                        </button>
                                                        {activeDropdown ===
                                                            user.id && (
                                                            <>
                                                                <div
                                                                    className="fixed inset-0 z-10"
                                                                    onClick={() =>
                                                                        setActiveDropdown(
                                                                            null
                                                                        )
                                                                    }
                                                                />
                                                                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 py-1 z-20">
                                                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-zinc-700 dark:text-gray-200">
                                                                        View
                                                                        Profile
                                                                    </button>
                                                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-zinc-700 dark:text-gray-200">
                                                                        Edit
                                                                    </button>
                                                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-zinc-700 dark:text-gray-200">
                                                                        {user.status ===
                                                                        "active"
                                                                            ? "Deactivate"
                                                                            : "Activate"}
                                                                    </button>
                                                                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty State */}
                        {paginatedUsers.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-600 dark:text-gray-400">
                                    No users found
                                </p>
                            </div>
                        )}

                        {/* Footer with Pagination */}
                        <div className="px-4 py-3 bg-gray-50 dark:bg-zinc-900/50 border-t border-gray-200 dark:border-zinc-800">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                    {filteredAndSortedUsers.length > 0
                                        ? `${
                                              (currentPage - 1) * itemsPerPage +
                                              1
                                          } to ${Math.min(
                                              currentPage * itemsPerPage,
                                              filteredAndSortedUsers.length
                                          )} of ${
                                              filteredAndSortedUsers.length
                                          }`
                                        : "0 to 0 of 0"}
                                </span>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}
                                        className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        title="First page"
                                    >
                                        <div className="flex">
                                            <FiChevronDown className="w-3 h-3 rotate-90" />
                                            <FiChevronDown className="w-3 h-3 rotate-90 -ml-1.5" />
                                        </div>
                                    </button>
                                    <button
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.max(1, prev - 1)
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        title="Previous page"
                                    >
                                        <FiChevronDown className="w-4 h-4 rotate-90" />
                                    </button>
                                    <span className="px-4 text-gray-700 dark:text-gray-300 font-medium">
                                        Page {currentPage} of {totalPages || 1}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.min(totalPages, prev + 1)
                                            )
                                        }
                                        disabled={
                                            currentPage === totalPages ||
                                            totalPages === 0
                                        }
                                        className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        title="Next page"
                                    >
                                        <FiChevronDown className="w-4 h-4 -rotate-90" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            setCurrentPage(totalPages)
                                        }
                                        disabled={
                                            currentPage === totalPages ||
                                            totalPages === 0
                                        }
                                        className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        title="Last page"
                                    >
                                        <div className="flex">
                                            <FiChevronDown className="w-3 h-3 -rotate-90" />
                                            <FiChevronDown className="w-3 h-3 -rotate-90 -ml-1.5" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
