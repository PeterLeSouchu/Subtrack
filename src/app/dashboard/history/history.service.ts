import api from '@/src/lib/axios.config';
import { useQuery } from '@tanstack/react-query';
import { ErrorType } from '@/src/types/error-response';
import { DateType } from '@/src/types/date';

interface DateResponseGet {
  message: string;
  date: DateType[];
}

export function useGetDate() {
  return useQuery<DateResponseGet, ErrorType>({
    queryKey: ['date'],
    queryFn: async () => {
      return api.get('/date').then((response) => response.data);
    },
  });
}
