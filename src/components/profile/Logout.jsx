import { Button } from "@/components/ui/button";
import { useLogout } from "@/src/reactQuery/authHooks";

const Logout = () => {
  const logoutMutate = useLogout();
  return (
    <div className="border-t p-4">
      <Button
        
        className="w-full text-black bg-red-400 hover:bg-red-600"
        onClick={()=>logoutMutate.mutate()}
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
