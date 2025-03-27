import api from '@/src/lib/axios.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorType } from '@/src/types/error-response';
import { CategoryResponse, Limit } from '@/src/types/category';

interface LimitPostType {
  price: string;
  category: string;
}

interface LimitResponsePostPatch {
  data: {
    message: string;
    limit: Limit;
  };
}

interface UserData {
  email: string;
  limits: Limit[];
  hasAccount?: boolean;
}

interface DateResponseGet {
  message: string;
  userData: UserData;
}

interface LimitPatchType {
  price: string;
  id: string;
}

interface EditPassword {
  formerPassword: string;
  password: string;
  passwordConfirm: string;
}

interface DeleteAccount {
  password: string;
}

interface DeleteGoogleAccount {
  otp: string;
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
  return useMutation<LimitResponsePostPatch, ErrorType, LimitPostType>({
    mutationFn: (limit) => {
      return api.post('/profile/limit', limit);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['category/limit'] });
    },
  });
}

export function useEditPassword() {
  return useMutation<void, ErrorType, EditPassword>({
    mutationFn: (data) => {
      return api.patch('/profile/password', data);
    },
  });
}

export function useDeleteAccount() {
  return useMutation<void, ErrorType, DeleteAccount>({
    mutationFn: (data) => {
      return api.post('/profile/account', data);
    },
  });
}

export function useVerifOtpAccount() {
  return useMutation<void, ErrorType, DeleteGoogleAccount>({
    mutationFn: (data) => {
      return api.post('/profile/account/verif-otp', data);
    },
  });
}

export function useSendOtpAccount() {
  return useMutation<void, ErrorType>({
    mutationFn: () => {
      return api.post('/profile/account/otp-send');
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

export function usePatchLimit() {
  const queryClient = useQueryClient();
  return useMutation<LimitResponsePostPatch, ErrorType, LimitPatchType>({
    mutationFn: (limit) => {
      return api.patch('/profile/limit', limit);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['category/limit'] });
    },
  });
}
