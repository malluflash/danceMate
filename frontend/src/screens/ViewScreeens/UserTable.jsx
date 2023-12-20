import {
  useUserTableQuery,
  useEditUserMutation,
} from "../../Slices/adminApiSlice";
import Loader from "../../components/Loader";

const UserTable = () => {
  const { data: users, isLoading } = useUserTableQuery();
  const [editUser] = useEditUserMutation();

  if (isLoading) {
    return <Loader />;
  }

  const handleStatusChange = async (index, newRole, userStatus) => {
    try {
      const userId = users[index]._id;

      const response = await editUser({
        id: userId,
        role: newRole,
        isActive: userStatus,
      });

      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-left ">Users</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td>
              <td>
                {user.role === "admin" ? (
                  "Admin"
                ) : (
                  <select
                    className="form-select"
                    value={user.role}
                    onChange={(e) =>
                      handleStatusChange(index, e.target.value, user.isActive)
                    }
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                )}
              </td>
              <td>
                {user.role === "admin" && user.isActive === true ? (
                  "Active"
                ) : (
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`userStatus${index}`}
                      checked={user.isActive}
                      onChange={() =>
                        handleStatusChange(index, user.role, !user.isActive)
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`userStatus${index}`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </label>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
