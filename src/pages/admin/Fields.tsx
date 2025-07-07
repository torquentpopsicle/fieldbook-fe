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

const features = [
  "Toilet",
  "Kantin",
  "Mushola",
  "Parking",
  "Changing Rooms",
  "Air Conditioning",
];

const Fields = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Example data (replace with real data as needed)
  const field = {
    name: "Garuda Futsal Center",
    image_thumbnail_url:
      "https://asset.ayo.co.id/image/venue/165399734632551.image_cropper_1653997270908.jpg",
    location_summary: "Jl. Pahlawan No. 10, Semarang",
    features: ["Toilet", "Kantin", "Mushola", "Parking"],
    price_per_hour: 95000,
    reviews_count: 150,
    rating: 4.9,
    sport_type: "Futsal",
    capacity: 10,
    status: "Active",
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Fields Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Manage all sports fields here. You can add, edit, or delete fields
              as needed.
            </p>
            <Dialog open={openAdd} onOpenChange={setOpenAdd}>
              <DialogTrigger asChild>
                <Button onClick={() => setOpenAdd(true)}>Add New Field</Button>
              </DialogTrigger>
              <DialogContent>
                <ModalHeader>
                  <ModalTitle>Add New Field</ModalTitle>
                  <DialogDescription>
                    Fill in the details to add a new field.
                  </DialogDescription>
                </ModalHeader>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      placeholder="Field Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Image Thumbnail URL
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      placeholder="Image URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Location Summary
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      placeholder="Location"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Sport Type
                      </label>
                      <select className="w-full border rounded px-3 py-2">
                        <option>Futsal</option>
                        <option>Basketball</option>
                        <option>Tennis</option>
                        <option>Volleyball</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Capacity
                      </label>
                      <input
                        className="w-full border rounded px-3 py-2"
                        placeholder="Capacity"
                        type="number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Features (comma separated)
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      placeholder="e.g. Toilet, Parking, Kantin"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price/Hour
                    </label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      placeholder="Price"
                      type="number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <select className="w-full border rounded px-3 py-2">
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </form>
                <ModalFooter>
                  <Button type="submit">Save</Button>
                  <Button variant="outline" onClick={() => setOpenAdd(false)}>
                    Cancel
                  </Button>
                </ModalFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fields List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Features
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price/Hour
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reviews
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sport Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacity
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
                      <img
                        src={field.image_thumbnail_url}
                        alt={field.name}
                        className="h-16 w-24 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">
                      {field.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {field.location_summary}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {field.features.map((feature) => (
                          <Badge key={feature} variant="secondary">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Rp{field.price_per_hour.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {field.reviews_count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {field.rating} ⭐
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {field.sport_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {field.capacity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {field.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setOpenEdit(true)}
                          >
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <ModalHeader>
                            <ModalTitle>Edit Field</ModalTitle>
                            <DialogDescription>
                              Update the details for this field.
                            </DialogDescription>
                          </ModalHeader>
                          <form className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Name
                              </label>
                              <input
                                className="w-full border rounded px-3 py-2"
                                defaultValue={field.name}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Image Thumbnail URL
                              </label>
                              <input
                                className="w-full border rounded px-3 py-2"
                                defaultValue={field.image_thumbnail_url}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Location Summary
                              </label>
                              <input
                                className="w-full border rounded px-3 py-2"
                                defaultValue={field.location_summary}
                              />
                            </div>
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">
                                  Sport Type
                                </label>
                                <select
                                  className="w-full border rounded px-3 py-2"
                                  defaultValue={field.sport_type}
                                >
                                  <option>Futsal</option>
                                  <option>Basketball</option>
                                  <option>Tennis</option>
                                  <option>Volleyball</option>
                                </select>
                              </div>
                              <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">
                                  Capacity
                                </label>
                                <input
                                  className="w-full border rounded px-3 py-2"
                                  defaultValue={field.capacity}
                                  type="number"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Features (comma separated)
                              </label>
                              <input
                                className="w-full border rounded px-3 py-2"
                                defaultValue={field.features.join(", ")}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Price/Hour
                              </label>
                              <input
                                className="w-full border rounded px-3 py-2"
                                defaultValue={field.price_per_hour}
                                type="number"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Status
                              </label>
                              <select
                                className="w-full border rounded px-3 py-2"
                                defaultValue={field.status}
                              >
                                <option>Active</option>
                                <option>Inactive</option>
                              </select>
                            </div>
                          </form>
                          <ModalFooter>
                            <Button type="submit">Save</Button>
                            <Button
                              variant="outline"
                              onClick={() => setOpenEdit(false)}
                            >
                              Cancel
                            </Button>
                          </ModalFooter>
                        </DialogContent>
                      </Dialog>
                      <AlertDialog
                        open={openDelete}
                        onOpenChange={setOpenDelete}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setOpenDelete(true)}
                            className="ml-2"
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the field.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={() => setOpenDelete(false)}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

export default Fields;
