import { useRouter,usePathname} from 'next/navigation';
import { useEffect } from 'react';

export default function withAuth(Component:any) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const route = usePathname();
    
    
    useEffect(() => {
      let storage = localStorage.getItem('user');
        const user =storage? JSON.parse(storage):null;
        const userIsAuthenticated = user !== null;
      if (!userIsAuthenticated) {
        router.push('/');
        
      }
      else if (route === '/student') {
        user.userType === 'admin' ? router.push('/admin') :null;}
        else if (route === '/admin') {
            user.userType === 'student' ? router.push('/student') :null;}
    }, [router,route]);

    return <Component {...props} />;
  };
}