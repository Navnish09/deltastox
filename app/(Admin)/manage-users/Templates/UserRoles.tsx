import { Role } from "@/app/_globals/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { capitalize } from "@lib/utils";

type Props = {
  roles: Role[];
};

export const UserRoles = ({ roles }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      {roles.map((role, index) => (
        <Badge className="py-2" variant={"outline"} key={role.id}>
          {capitalize(role.name)}
        </Badge>
      ))}
    </div>
  );
};
