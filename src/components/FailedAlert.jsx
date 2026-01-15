import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function FailedAlert({ alertMessage }) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Failed!</AlertTitle>
        <AlertDescription>
          <p>{alertMessage}</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default FailedAlert;
