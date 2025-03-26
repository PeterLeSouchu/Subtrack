import api from '@/src/lib/axios.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorType } from '@/src/types/error-response';
import { CategoryResponse } from '@/src/types/category';

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
    isAlreadyLimit?: boolean;
  };
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

export function useGetAvailableCategory() {
  return useQuery<CategoryResponse, ErrorType>({
    queryKey: ['category/limit'],
    queryFn: async () => {
      return api.get('/category/limit').then((response) => response.data);
    },
  });
}

export function usePostLimit() {
  const queryClient = useQueryClient();
  return useMutation<MensualityResponsePostPatch, ErrorType, LimitPostType>({
    mutationFn: (limit) => {
      return api.post('/profile/limit', limit);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['category/limit'] });
    },
  });
}

export function useGetProfileData() {
  return useQuery<DateResponseGet, ErrorType>({
    queryKey: ['profile'],
    queryFn: async () => {
      return api.get('/profile').then((response) => response.data);
    },
  });
}

export function useDeleteLimit() {
  const queryClient = useQueryClient();

  return useMutation<void, ErrorType, string>({
    mutationFn: (id) => api.delete(`/category/limit/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['category/limit'] });
    },
  });
}
