import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { adminUsersApi } from "@/lib/adminApi";

const Customers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await adminUsersApi.getAll();
        const data = await res.json();
        console.log("Admin Users GET response:", data);

        // Handle the correct response format: data.data.users
        let usersData = [];
        if (
          data &&
          data.data &&
          data.data.users &&
          Array.isArray(data.data.users)
        ) {
          usersData = data.data.users;
        } else if (data && data.data && Array.isArray(data.data)) {
          usersData = data.data;
        } else if (data && Array.isArray(data)) {
          usersData = data;
        } else {
          console.warn("Unexpected response format:", data);
          usersData = [];
        }

        console.log("Processed users data:", usersData);
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Get initials from name
  const getInitials = (name: string) => {
    if (!name || typeof name !== "string") return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Safe date formatting
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Customers List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8">
                        Loading...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-sport-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {getInitials(user?.name || "Unknown User")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {user?.name || "Unknown User"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user?.email || "No email"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={
                              user?.role === "admin" ? "default" : "secondary"
                            }
                          >
                            {(user?.role || "customer")
                              .charAt(0)
                              .toUpperCase() +
                              (user?.role || "customer").slice(1).toLowerCase()}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user?.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 italic text-xs">
                          View only
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Customers;
