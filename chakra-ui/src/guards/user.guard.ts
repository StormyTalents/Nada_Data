import { useUserContext } from '../user/UserContext';
import { Guard } from './guard';

export default function UserGuard(): Guard {
  const { user } = useUserContext();
  return { canActivate: () => Boolean(user) };
}
