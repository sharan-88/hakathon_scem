type UserRole = 'student' | 'college' | 'company';

interface RoleTabsProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roles: { id: UserRole; label: string }[] = [
  { id: 'student', label: 'Student' },
  { id: 'college', label: 'College' },
  { id: 'company', label: 'Company' }
];

const RoleTabs = ({ activeRole, onRoleChange }: RoleTabsProps) => {
  return (
    <div className="flex rounded-lg bg-gray-100 p-1">
      {roles.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onRoleChange(id)}
          className={`
            flex-1 py-3 px-4 text-sm sm:text-base font-medium rounded-md
            transition-all duration-200 ease-in-out
            ${
              activeRole === id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }
          `}
          aria-current={activeRole === id ? 'page' : undefined}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default RoleTabs; 