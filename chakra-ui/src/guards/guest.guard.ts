import { useUserContext } from '../user/UserContext';
import { Guard } from './guard';

export default function GuestGuard(): Guard {
  const { user } = useUserContext();
  return { canActivate: () => !user };
}
