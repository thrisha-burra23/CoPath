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
import {
  useAdminDriverRequests,
  useApproveDriver,
  useRejectDriver,
} from "@/src/reactQuery/adminHooks";
import DriverRequestsSkeleton from "@/src/loadingSkeleton/DriverRequestsSkeleton";

/* -------------------- STATUS STYLES -------------------- */
const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  APPROVED: "bg-green-100 text-green-800 border-green-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
};

const DriverRequests = () => {
  const { data: requests = [], isLoading } = useAdminDriverRequests();
  const approveMutation = useApproveDriver();
  const rejectMutation = useRejectDriver();

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  if (isLoading) return <DriverRequestsSkeleton />;
const a=1;
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Driver Requests</h1>
        <p className="text-sm text-muted-foreground">
          Review and approve new driver applications
        </p>
      </div>

      {/* Table */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Pending Requests</CardTitle>
        </CardHeader>

        <CardContent>
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
              {requests.map(({ request, profile, vehicle }) => {
                const isResolved = request.status !== "PENDING";

                return (
                  <tr
                    key={request.$id}
                    className="bg-white rounded-xl shadow-sm"
                  >
                    <td className="px-3 py-4">
                      <div className="font-medium">
                        {profile?.name || "—"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {profile?.email || "—"}
                      </div>
                    </td>

                    <td className="px-3 py-4">
                      {vehicle?.model || "—"}
                    </td>

                    <td className="px-3 py-4">
                      {request.license || "—"}
                    </td>

                    <td className="px-3 py-4">
                      {new Date(request.$createdAt).toDateString()}
                    </td>

                    <td className="px-3 py-4">
                      <Badge
                        variant="outline"
                        className={`border ${statusStyles[request.status]}`}
                      >
                        {request.status}
                      </Badge>
                    </td>

                    <td className="px-3 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedRequest({ request, profile, vehicle });
                            setIsViewOpen(true);
                          }}
                        >
                          View
                        </Button>

                        <Button
                          size="sm"
                          disabled={
                            isResolved ||
                            !profile ||
                            approveMutation.isPending
                          }
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() =>
                            approveMutation.mutate({
                              requestedId: request.$id,
                              profileId: profile.$id,
                              vehicleId:vehicle.$id
                            })
                          }
                        >
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          disabled={isResolved}
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            setSelectedRequest({ request, profile, vehicle });
                            setIsRejectOpen(true);
                          }}
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
        </CardContent>
      </Card>

      {/* ---------------- VIEW DRIVER DETAILS ---------------- */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogOverlay className="bg-white/60 backdrop-blur-sm" />
        <DialogContent className="bg-white rounded-xl p-6">
          <DialogHeader>
            <DialogTitle>Driver Details</DialogTitle>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-2 text-sm">
              <p><b>Name:</b> {selectedRequest.profile?.name || "—"}</p>
              <p><b>Email:</b> {selectedRequest.profile?.email || "—"}</p>

              {selectedRequest.profile?.phone && (
                <p><b>Phone:</b> {selectedRequest.profile.phone}</p>
              )}

              <p><b>Vehicle:</b> {selectedRequest.vehicle?.model || "—"}</p>
              <p><b>License:</b> {selectedRequest.request?.license || "—"}</p>
              <p><b>Seats:</b> {selectedRequest.vehicle?.seats || "—"}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ---------------- REJECT DRIVER ---------------- */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogOverlay className="bg-white/60 backdrop-blur-sm" />
        <DialogContent className="bg-white rounded-xl p-6">
          <DialogHeader>
            <DialogTitle>Reject Driver</DialogTitle>
          </DialogHeader>

          <Textarea
            placeholder="Enter reason for rejection"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsRejectOpen(false)}>
              Cancel
            </Button>

            <Button
              className="bg-red-600 hover:bg-red-700 text-black"
              disabled={!rejectReason.trim() || !selectedRequest}
              onClick={() => {
                if (!selectedRequest) return;

                rejectMutation.mutate({
                  requestedId: selectedRequest.request.$id,
                  reason: rejectReason,
                });

                setIsRejectOpen(false);
                setSelectedRequest(null); 
                setRejectReason("");
              }}
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
