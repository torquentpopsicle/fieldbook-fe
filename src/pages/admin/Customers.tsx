import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Customers = () => {
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
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Example row */}
                  <tr className="hover:bg-sport-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>SW</AvatarFallback>
                      </Avatar>
                      <span>Sarah Wilson</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      sarah@example.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="default">Active</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400 italic text-xs">
                      View only
                    </td>
                  </tr>
                  {/* Add more rows dynamically */}
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
