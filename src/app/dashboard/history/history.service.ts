import api from '@/src/lib/axios.config';
import { useQuery } from '@tanstack/react-query';
import { ErrorType } from '@/src/types/error-response';
import { DateType } from '@/src/types/date';
import { StatsResponse } from '@/src/types/stats';

interface DateResponseGet {
  message: string;
  date: DateType[];
}
interface QueryParams {
  year: number | null;
  month: string | null;
}

export function useGetDate() {
  return useQuery<DateResponseGet, ErrorType>({
    queryKey: ['date'],
    queryFn: async () => {
      return api.get('/date').then((response) => response.data);
    },
  });
}

export function useGetHistoryStats({ year, month }: QueryParams) {
  return useQuery<StatsResponse, ErrorType>({
    queryKey: ['date'],
    queryFn: async () => {
      return api
        .get(`/history-stats?year=${year}&month=${month}`)
        .then((response) => response.data);
    },
  });
}
