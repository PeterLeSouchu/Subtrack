import api from '@/src/lib/axios.config';
import { useQuery } from '@tanstack/react-query';
import { ErrorType } from '@/src/types/error-response';
import { MonthlyStat } from '@/src/types/stats';

interface DateResponseGet {
  message: string;
  date: number[];
}

interface QueryParams {
  year: number | null;
}

interface DateResponseStatsGet {
  message: string;
  stats: {
    totalPrice: number;
    totalMensuality: number;
    averageMonthlyPrice: number;
    monthlyStats: MonthlyStat[];
  };
}

export function useGetYearDate() {
  return useQuery<DateResponseGet, ErrorType>({
    queryKey: ['date/year'],
    queryFn: async () => {
      return api.get('/date/year').then((response) => response.data);
    },
  });
}

export function useGetYearStats({ year }: QueryParams) {
  return useQuery<DateResponseStatsGet, ErrorType>({
    queryKey: ['result/stats', year],
    queryFn: async () => {
      return api
        .get(`/stats/result?year=${year}`)
        .then((response) => response.data);
    },
  });
}
