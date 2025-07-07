import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader as ModalHeader,
  DialogTitle as ModalTitle,
  DialogFooter as ModalFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const Bookings = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Bookings List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Field
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      Elite Soccer Complex
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                    <td className="px-6 py-4 whitespace-nowrap">2024-01-15</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800"
                      >
                        Pending
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <Button size="sm" variant="outline">
                        Confirm
                      </Button>
                      <Button size="sm" variant="destructive">
                        Cancel
                      </Button>
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

export default Bookings;
