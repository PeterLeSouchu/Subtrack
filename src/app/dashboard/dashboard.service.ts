import api from '@/src/lib/axios.config';
import { useMutation } from '@tanstack/react-query';

export function usePostMensuality() {
  return useMutation({
    mutationFn: (mensuality: {
      name: string;
      price: number;
      category: string;
    }) => {
      return api.post('/mensuality', mensuality);
    },
  });
}
