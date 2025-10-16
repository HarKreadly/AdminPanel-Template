import { useState, useMemo, useEffect } from "react";
import SearchInput from "./UsersTable/SearchInput";
import FilterSelect from "./UsersTable/FilterSelect";
import ColumnVisibilityDropdown from "./UsersTable/ColumnVisibilityDropdown";
import ActionButtons from "./UsersTable/ActionButtons";
import TableHeader from "./UsersTable/TableHeader";
import UserRow from "./UsersTable/UserRow";
import Pagination from "./UsersTable/Pagination";

export default function UsersTable({ users: initialUsers = [] }) {
    const [users, setUsers] = useState(initialUsers);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [genderFilter, setGenderFilter] = useState("all");
    const [deletedFilter, setDeletedFilter] = useState("active");
    const [sortField, setSortField] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");
    const [showColumnVisibility, setShowColumnVisibility] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const itemsPerPage = 10;

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
        location: false,
        joinDate: true,
    });

    // Update users when prop changes
    useEffect(() => {
        setUsers(initialUsers);
        setSelectedUsers([]);
    }, [initialUsers]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, roleFilter, statusFilter, genderFilter, deletedFilter]);

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
            setSelectedUsers(paginatedUsers.map((user) => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    // Handle individual selection
    const handleSelectUser = (userId) => {
        setSelectedUsers((prev) => {
            if (prev.includes(userId)) {
                return prev.filter((id) => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
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

    // Filter and sort users with transition effect
    const filteredAndSortedUsers = useMemo(() => {
        setIsTransitioning(true);
        const timer = setTimeout(() => setIsTransitioning(false), 300);

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
            const matchesDeleted =
                deletedFilter === "all" ||
                (deletedFilter === "active" && !user.is_deleted) ||
                (deletedFilter === "deleted" && user.is_deleted);

            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus &&
                matchesGender &&
                matchesDeleted
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

        return () => {
            clearTimeout(timer);
            return filtered;
        };
    }, [
        users,
        searchTerm,
        roleFilter,
        statusFilter,
        genderFilter,
        deletedFilter,
        sortField,
        sortDirection,
    ])();

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
    const paginatedUsers = filteredAndSortedUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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

    const roleOptions = [
        { value: "all", label: "All Roles" },
        { value: "user", label: "User" },
        { value: "company", label: "Company" },
        { value: "admin", label: "Admin" },
    ];

    const statusOptions = [
        { value: "all", label: "All Statuses" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "banned", label: "Banned" },
    ];

    const genderOptions = [
        { value: "all", label: "All Genders" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
    ];

    const deletedOptions = [
        { value: "active", label: "Active Only" },
        { value: "deleted", label: "Deleted Only" },
        { value: "all", label: "All Users" },
    ];

    return (
        <div className="mt-6">
            <div className="mx-auto">
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden flex flex-col">
                    <div>
                        {/* Header with Filters */}
                        <div className="p-4 border-b bg-gray-50 dark:bg-zinc-700 border-gray-200 dark:border-zinc-800">
                            <div className="flex items-center gap-3 flex-wrap">
                                <SearchInput
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search users..."
                                />

                                <FilterSelect
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    options={roleOptions}
                                    label="Role Filter"
                                />

                                <FilterSelect
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    options={statusOptions}
                                    label="Status Filter"
                                />

                                <FilterSelect
                                    value={genderFilter}
                                    onChange={(e) => setGenderFilter(e.target.value)}
                                    options={genderOptions}
                                    label="Gender Filter"
                                />

                                <FilterSelect
                                    value={deletedFilter}
                                    onChange={(e) => setDeletedFilter(e.target.value)}
                                    options={deletedOptions}
                                    label="Deleted Filter"
                                />

                                <div className="flex-1" />

                                <ColumnVisibilityDropdown
                                    visibleColumns={visibleColumns}
                                    toggleColumn={toggleColumn}
                                    isOpen={showColumnVisibility}
                                    setIsOpen={setShowColumnVisibility}
                                />
                                <ActionButtons />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <TableHeader
                                    visibleColumns={visibleColumns}
                                    handleSort={handleSort}
                                    sortField={sortField}
                                    handleSelectAll={handleSelectAll}
                                    selectedUsers={selectedUsers}
                                    paginatedUsers={paginatedUsers}
                                />

                                <tbody
                                    className={`transition-opacity duration-300 ${
                                        isTransitioning ? "opacity-100" : "opacity-100"
                                    }`}
                                >
                                    {paginatedUsers.map((user) => (
                                        <UserRow
                                            key={user.id}
                                            user={user}
                                            visibleColumns={visibleColumns}
                                            selectedUsers={selectedUsers}
                                            handleSelectUser={handleSelectUser}
                                            calculateAge={calculateAge}
                                            getAvatarColor={getAvatarColor}
                                            getRoleBadge={getRoleBadge}
                                            getStatusBadge={getStatusBadge}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty State */}
                        {paginatedUsers.length === 0 && (
                            <div className="text-center py-12 ">
                                <p className="text-gray-600 dark:text-gray-400">
                                    No users found
                                </p>
                            </div>
                        )}

                        {/* Footer with Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                            filteredCount={filteredAndSortedUsers.length}
                            itemsPerPage={itemsPerPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
