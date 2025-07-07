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
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { adminFieldsApi } from "@/lib/adminApi";

function FieldDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  type,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  initialData?: any;
  type: "add" | "edit";
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogTrigger asChild>
        {type === "add" ? (
          <Button onClick={() => onOpenChange(true)}>Add New Field</Button>
        ) : null}
      </DialogTrigger>
      <DialogContent
        onInteractOutside={
          type === "edit" ? (e) => e.preventDefault() : undefined
        }
      >
        <ModalHeader>
          <ModalTitle>
            {type === "add" ? "Add New Field" : "Edit Field"}
          </ModalTitle>
          <DialogDescription>
            {type === "add"
              ? "Fill in the details to add a new field."
              : "Update the details for this field."}
          </DialogDescription>
        </ModalHeader>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              name="name"
              placeholder="Field Name"
              defaultValue={initialData?.name || ""}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              className="w-full border rounded px-3 py-2"
              name="images"
              placeholder="Image URL"
              defaultValue={initialData?.images || ""}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              name="address"
              placeholder="Address"
              defaultValue={initialData?.address || ""}
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Sport Type <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                name="sport_type"
                defaultValue={initialData?.sport_type || ""}
                required
              >
                <option value="">Select Sport Type</option>
                <option>Futsal</option>
                <option>Basketball</option>
                <option>Tennis</option>
                <option>Volleyball</option>
                <option>Soccer</option>
                <option>Badminton</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Capacity</label>
              <input
                className="w-full border rounded px-3 py-2"
                name="capacity"
                placeholder="Capacity"
                type="number"
                defaultValue={initialData?.capacity || ""}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Facilities (comma separated)
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              name="facilities"
              placeholder="e.g. Indoor, Parking, Changing Rooms"
              defaultValue={
                initialData?.key_facilities
                  ? initialData.key_facilities.join(", ")
                  : ""
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Price/Hour <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              name="price_per_hour"
              placeholder="Price"
              type="number"
              defaultValue={initialData?.price_per_hour || ""}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              name="description"
              placeholder="Description"
              defaultValue={initialData?.description || ""}
              rows={3}
            />
          </div>
          <ModalFooter>
            <Button type="submit">Save</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FieldDeleteDialog({
  open,
  onOpenChange,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            field.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const Fields = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [editDialogId, setEditDialogId] = useState<number | null>(null);
  const [deleteDialogId, setDeleteDialogId] = useState<number | null>(null);
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all fields
  useEffect(() => {
    console.log("Fields useEffect running");
    const fetchFields = async () => {
      setLoading(true);
      try {
        console.log("Calling adminFieldsApi.getAll");
        const res = await adminFieldsApi.getAll();
        const data = await res.json();
        console.log("Admin Fields GET response:", data);
        setFields(data && data.data ? data.data : []);
      } catch (err) {
        console.error("Error fetching fields:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, []);

  // Create field
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const payload: any = {
      name: data.name,
      address: data.address,
      sport_type: data.sport_type,
      price_per_hour: data.price_per_hour
        ? Number(data.price_per_hour)
        : undefined,
      images: data.images || undefined,
      capacity: data.capacity ? Number(data.capacity) : undefined,
      description: data.description || undefined,
      facilities:
        typeof data.facilities === "string" && data.facilities.trim() !== ""
          ? data.facilities.split(",").map((f: string) => f.trim())
          : undefined,
      availability_summary: "Available today",
    };
    // Remove undefined fields
    Object.keys(payload).forEach(
      (key) => payload[key] === undefined && delete payload[key],
    );
    try {
      await adminFieldsApi.create(payload);
      setOpenAdd(false);
      form.reset();
      // Refresh list
      const res = await adminFieldsApi.getAll();
      const newData = await res.json();
      setFields(newData.data || newData);
    } catch (err) {
      // handle error
      console.log("Error creating field:", err);
    }
  };

  // Update field
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editDialogId) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const payload: any = {
      name: data.name || undefined,
      address: data.address || undefined,
      sport_type: data.sport_type || undefined,
      price_per_hour: data.price_per_hour
        ? Number(data.price_per_hour)
        : undefined,
      images: data.images || undefined,
      capacity: data.capacity ? Number(data.capacity) : undefined,
      description: data.description || undefined,
      facilities:
        typeof data.facilities === "string" && data.facilities.trim() !== ""
          ? data.facilities.split(",").map((f: string) => f.trim())
          : undefined,
      availability_summary: "Available today",
    };
    // Remove undefined fields
    Object.keys(payload).forEach(
      (key) => payload[key] === undefined && delete payload[key],
    );
    try {
      await adminFieldsApi.update(editDialogId, payload);
      setEditDialogId(null);
      // Refresh list
      const res = await adminFieldsApi.getAll();
      const newData = await res.json();
      setFields(newData.data || newData);
    } catch (err) {
      // handle error
    }
  };

  // Delete field
  const handleDelete = async (id: number) => {
    try {
      await adminFieldsApi.delete(id);
      // Refresh list
      const res = await adminFieldsApi.getAll();
      const newData = await res.json();
      setFields(newData.data || newData);
    } catch (err) {
      // handle error
    }
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
            <FieldDialog
              open={openAdd}
              onOpenChange={setOpenAdd}
              onSubmit={handleCreate}
              type="add"
            />
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
                      Facilities
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={11} className="text-center py-8">
                        Loading...
                      </td>
                    </tr>
                  ) : fields.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="text-center py-8">
                        No fields found.
                      </td>
                    </tr>
                  ) : (
                    fields.map((field) => (
                      <tr
                        key={field.id}
                        className="hover:bg-sport-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={field.images}
                            alt={field.name}
                            className="h-16 w-24 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {field.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {field.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {(field.key_facilities || []).map(
                              (feature: string) => (
                                <Badge key={feature} variant="secondary">
                                  {feature}
                                </Badge>
                              ),
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          Rp
                          {Number(field.price_per_hour).toLocaleString("id-ID")}
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
                          <FieldDialog
                            open={editDialogId === field.id}
                            onOpenChange={(open) =>
                              setEditDialogId(open ? field.id : null)
                            }
                            onSubmit={handleUpdate}
                            initialData={field}
                            type="edit"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditDialogId(field.id)}
                          >
                            Edit
                          </Button>
                          <FieldDeleteDialog
                            open={deleteDialogId === field.id}
                            onOpenChange={(open) =>
                              setDeleteDialogId(open ? field.id : null)
                            }
                            onDelete={() => {
                              setDeleteDialogId(null);
                              setTimeout(() => handleDelete(field.id), 0);
                            }}
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            className="ml-2"
                            onClick={() => setDeleteDialogId(field.id)}
                          >
                            Delete
                          </Button>
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

export default Fields;
