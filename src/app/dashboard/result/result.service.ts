import api from '@/src/lib/axios.config';
import { useQuery } from '@tanstack/react-query';
import { ErrorType } from '@/src/types/error-response';

interface DateResponseGet {
  message: string;
  date: string[];
}

export function useGetYearDate() {
  return useQuery<DateResponseGet, ErrorType>({
    queryKey: ['date'],
    queryFn: async () => {
      return api.get('/date/year').then((response) => response.data);
    },
  });
}
