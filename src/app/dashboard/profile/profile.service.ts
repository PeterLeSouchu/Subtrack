import api from '@/src/lib/axios.config';
import { useQuery } from '@tanstack/react-query';
import { ErrorType } from '@/src/types/error-response';

interface Limit {
  price: number;
  category: {
    name: string;
    image: string;
  };
  categoryId: string;
}

interface UserData {
  email: string;
  limits: Limit[];
}

interface DateResponseGet {
  message: string;
  userData: UserData;
}

export function useGetProfileData() {
  return useQuery<DateResponseGet, ErrorType>({
    queryKey: ['profile'],
    queryFn: async () => {
      return api.get('/profile').then((response) => response.data);
    },
  });
}
