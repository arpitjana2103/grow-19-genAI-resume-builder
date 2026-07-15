import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/features/auth/queries/auth.query";

export default function AppView() {
    const logoutMutation = useLogoutMutation();
    const handleLogut = async function () {
        await logoutMutation.mutateAsync();
    };

    return (
        <div>
            <div>AppView</div>
            <Button onClick={handleLogut}>Logout</Button>
        </div>
    );
}
