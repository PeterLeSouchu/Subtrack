import api from '@/src/lib/axios.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorType } from '@/src/types/error-response';

interface LimitPostType {
  price: string;
  category: string;
}

interface LimitGetType {
  price: number;
  category: string;
}

interface MensualityResponsePostPatch {
  data: {
    message: string;
    limit: LimitGetType;
  };
}

export function usePostLimit() {
  const queryClient = useQueryClient();
  return useMutation<MensualityResponsePostPatch, ErrorType, LimitPostType>({
    mutationFn: (limit) => {
      return api.post('/profile/limit', limit);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

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
