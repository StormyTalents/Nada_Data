import { useUserContext } from '../user/UserContext';
import { Guard } from './guard';

export default function AdminGuard(): Guard {
  const { user } = useUserContext();
  return {
    canActivate: () => {
      return (
        !!user && !!user.roles && !!user.roles.find(r => r.name === 'Admin')
      );
    }
  };
}
