import api from '@/src/lib/axios.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorType } from '@/src/types/error-response';
import {
  MensualityPostType,
  MensualityGetType,
  MensualityPatchType,
} from '@/src/types/mensuality';
import { CategoryType } from '@/src/types/category';
import { StatsResponse } from '@/src/types/stats';

interface MensualityResponsePostPatch {
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

export function usePostMensuality() {
  const queryClient = useQueryClient();
  return useMutation<
    MensualityResponsePostPatch,
    ErrorType,
    MensualityPostType
  >({
    mutationFn: (mensuality) => {
      return api.post('/mensuality', mensuality);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mensuality'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function usePatchMensuality() {
  const queryClient = useQueryClient();
  return useMutation<
    MensualityResponsePostPatch,
    ErrorType,
    MensualityPatchType
  >({
    mutationFn: (mensuality) => {
      return api.patch('/mensuality', mensuality);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mensuality'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function useDeleteMensuality() {
  const queryClient = useQueryClient();

  return useMutation<void, ErrorType, string>({
    mutationFn: (id) => api.delete(`/mensuality/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mensuality'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
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
