import api from '@/src/lib/axios.config';
import { useQuery } from '@tanstack/react-query';
import { ErrorType } from '@/src/types/error-response';

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
      console.log('on est ds le service et voila year : ', year);
      return api
        .get(`/stats/result?year=${year}`)
        .then((response) => response.data);
    },
  });
}
