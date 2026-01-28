import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

/* -------------------- MOCK DATA -------------------- */
const initialDriverRequests = [
  {
    id: 1,
    name: "Ankit Sharma",
    email: "ankit@gmail.com",
    phone: "9876543210",
    vehicle: "Car",
    license: "DL-123456",
    experience: "3 years",
    appliedOn: "12 Jan 2026",
    status: "Pending",
  },
  {
    id: 2,
    name: "Rahul Verma",
    email: "rahul@gmail.com",
    phone: "9123456780",
    vehicle: "Bike",
    license: "DL-654321",
    experience: "1 year",
    appliedOn: "10 Jan 2026",
    status: "Pending",
  },
];

/* -------------------- STATUS STYLES -------------------- */
const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Approved: "bg-green-100 text-green-800 border-green-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

/* -------------------- COMPONENT -------------------- */
const DriverRequests = () => {
  const [requests, setRequests] = useState(initialDriverRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  /* -------------------- HELPERS -------------------- */
  const updateStatus = (id, status, reason = "") => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status, rejectReason: reason } : req,
      ),
    );
  };

  const openViewDialog = (req) => {
    setSelectedRequest(req);
    setIsViewOpen(true);
  };

  const openRejectDialog = (req) => {
    setSelectedRequest(req);
    setRejectReason("");
    setIsRejectOpen(true);
  };

  const handleRejectConfirm = () => {
    if (!selectedRequest) return;

    updateStatus(selectedRequest.id, "Rejected", rejectReason);
    setIsRejectOpen(false);
    setSelectedRequest(null);
    setRejectReason("");
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Driver Requests</h1>
        <p className="text-sm text-muted-foreground">
          Review and approve new driver applications
        </p>
      </div>

      {/* Table Card */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Pending Requests</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="px-3">Driver</th>
                  <th className="px-3">Vehicle</th>
                  <th className="px-3">License</th>
                  <th className="px-3">Applied On</th>
                  <th className="px-3">Status</th>
                  <th className="px-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((req) => {
                  const isResolved = req.status !== "Pending";

                  return (
                    <tr
                      key={req.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition"
                    >
                      <td className="px-3 py-4 rounded-l-xl">
                        <div className="font-medium">{req.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {req.email}
                        </div>
                      </td>

                      <td className="px-3 py-4">{req.vehicle}</td>
                      <td className="px-3 py-4">{req.license}</td>
                      <td className="px-3 py-4">{req.appliedOn}</td>

                      <td className="px-3 py-4">
                        <Badge
                          variant="outline"
                          className={`border ${statusStyles[req.status]}`}
                        >
                          {req.status}
                        </Badge>
                      </td>

                      <td className="px-3 py-4 rounded-r-xl">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openViewDialog(req)}
                          >
                            View
                          </Button>

                          <Button
                            size="sm"
                            disabled={isResolved}
                            className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
                            onClick={() => updateStatus(req.id, "Approved")}
                          >
                            Approve
                          </Button>

                          <Button
                            size="sm"
                            disabled={isResolved}
                            className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
                            onClick={() => openRejectDialog(req)}
                          >
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* -------------------- VIEW DRIVER DETAILS -------------------- */}
      <Dialog
        open={isViewOpen}
        onOpenChange={(open) => {
          setIsViewOpen(open);
          if (!open) setSelectedRequest(null);
        }}
      >
        <DialogOverlay className="bg-white/60 backdrop-blur-sm" />
        <DialogContent
          className="max-w-md max-w-lg
      bg-white
      rounded-xl
      border
      border-gray-200
      shadow-2xl
      p-6"
        >
          <DialogHeader>
            <DialogTitle>Driver Details</DialogTitle>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-2 text-sm">
              <p>
                <b>Name:</b> {selectedRequest.name}
              </p>
              <p>
                <b>Email:</b> {selectedRequest.email}
              </p>
              <p>
                <b>Phone:</b> {selectedRequest.phone}
              </p>
              <p>
                <b>Vehicle:</b> {selectedRequest.vehicle}
              </p>
              <p>
                <b>License:</b> {selectedRequest.license}
              </p>
              <p>
                <b>Experience:</b> {selectedRequest.experience}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* -------------------- REJECT WITH REASON -------------------- */}
      <Dialog
        open={isRejectOpen}
        onOpenChange={(open) => {
          setIsRejectOpen(open);
          if (!open) {
            setSelectedRequest(null);
            setRejectReason("");
          }
        }}
      >
        <DialogOverlay className="bg-white/60  backdrop-blur-sm" />
        <DialogContent className="max-w-md max-w-lg bg-white rounded-xl  border  border-gray-200 shadow-2xl  p-6">
          <DialogHeader>
            <DialogTitle>Reject Driver Request</DialogTitle>
          </DialogHeader>

          <Textarea
            placeholder="Enter reason for rejection"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="text-black"
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsRejectOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={!rejectReason.trim()}
              onClick={handleRejectConfirm}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              Reject
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriverRequests;
