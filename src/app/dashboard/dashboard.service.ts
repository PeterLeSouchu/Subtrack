import api from '@/src/lib/axios.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorType } from '@/src/types/error-response';
import { MensualityPostType, MensualityGetType } from '@/src/types/mensuality';
import { CategoryType } from '@/src/types/category';
import { StatsType } from '@/src/types/stats';

interface MensualityResponsePost {
  data: {
    message: string;
    mensuality: MensualityGetType;
  };
}

interface MensualityResponseGet {
  message: string;
  mensualities: MensualityGetType[];
}

interface CategoryResponse {
  message: string;
  categories: CategoryType[];
}

interface StatsResponse {
  message: string;
  stats: StatsType;
}

export function usePostMensuality() {
  const queryClient = useQueryClient();
  return useMutation<MensualityResponsePost, ErrorType, MensualityPostType>({
    mutationFn: (mensuality) => {
      return api.post('/mensuality', mensuality);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mensuality'] });
    },
  });
}

export function useDeleteMensuality() {
  const queryClient = useQueryClient();

  return useMutation<void, ErrorType, string>({
    mutationFn: (id) => api.delete(`/mensuality/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mensuality'] });
    },
  });
}

export function useGetMensuality() {
  return useQuery<MensualityResponseGet, ErrorType>({
    queryKey: ['mensuality'],
    queryFn: async () => {
      return api.get('/mensuality').then((response) => response.data);
    },
  });
}

export function useGetCategory() {
  return useQuery<CategoryResponse, ErrorType>({
    queryKey: ['category'],
    queryFn: async () => {
      return api.get('/category').then((response) => response.data);
    },
  });
}

export function useGetStats() {
  return useQuery<StatsResponse, ErrorType>({
    queryKey: ['stats'],
    queryFn: async () => {
      return api.get('/stats').then((response) => response.data);
    },
  });
}
